
import { useState, useEffect } from 'react';
import { connectionService } from '@/lib/offline/connectionService';
import { 
  getCachedMessages,
  addMessageToCache,
  addToSyncQueue
} from '@/lib/offline/indexedDB';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useOfflineMessages = (conversationId: string) => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar mensajes (online u offline)
  const loadMessages = async () => {
    setIsLoading(true);
    
    try {
      if (isOnline) {
        // Obtener desde API
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('sent_at', { ascending: true });
          
        if (error) throw error;
        
        // Guardar en caché para uso offline
        if (data) {
          for (const message of data) {
            await addMessageToCache(message);
          }
          setMessages(data);
        }
      } else {
        // Obtener desde caché
        const cachedMessages = await getCachedMessages(conversationId);
        setMessages(cachedMessages);
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
      
      // Si falla online, intentar desde caché
      if (isOnline) {
        const cachedMessages = await getCachedMessages(conversationId);
        setMessages(cachedMessages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Enviar mensaje (online u offline)
  const sendMessage = async (content: string) => {
    if (!user) return null;
    
    // Crear objeto de mensaje
    const message = {
      id: crypto.randomUUID(), // ID temporal para offline
      conversation_id: conversationId,
      sender_id: user.id,
      content,
      sent_at: new Date().toISOString(),
      status: isOnline ? 'sent' : 'pending',
      created_at: new Date().toISOString()
    };
    
    // Actualizar UI inmediatamente
    setMessages(prev => [...prev, message]);
    
    // Guardar en caché
    await addMessageToCache(message);
    
    if (isOnline) {
      try {
        // Enviar a API
        const { data, error } = await supabase
          .from('messages')
          .insert(message)
          .select()
          .single();
          
        if (error) throw error;
        
        // Actualizar con ID real si es necesario
        if (data && data.id !== message.id) {
          setMessages(prev => 
            prev.map(m => m.id === message.id ? data : m)
          );
          await addMessageToCache(data);
        }
        
        return data;
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        
        // Añadir a cola de sincronización
        await addToSyncQueue({
          type: 'message',
          action: 'create',
          data: message
        });
        
        return message;
      }
    } else {
      // Modo offline: añadir a cola de sincronización
      await addToSyncQueue({
        type: 'message',
        action: 'create',
        data: message
      });
      
      return message;
    }
  };

  // Escuchar cambios en conexión
  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      setIsOnline(online);
      if (online) {
        loadMessages(); // Recargar cuando hay conexión
      }
    });
    
    // Cargar mensajes al inicio
    loadMessages();
    
    return unsubscribe;
  }, [conversationId]);

  return {
    isOnline,
    messages,
    isLoading,
    sendMessage,
    refreshMessages: loadMessages
  };
};
