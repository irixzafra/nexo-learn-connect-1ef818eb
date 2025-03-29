
import { useEffect, useState } from 'react';
import { connectionService } from './connectionService';
import { getPendingSyncOperations, markAsSynced } from './indexedDB';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useSyncManager = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingOperations, setPendingOperations] = useState(0);

  // Función para sincronizar una operación
  const syncOperation = async (operation: any) => {
    try {
      // Diferentes lógicas según el tipo de operación
      if (operation.type === 'message' && operation.action === 'create') {
        // Enviar mensaje al servidor
        const { error } = await supabase
          .from('messages')
          .insert(operation.data);
          
        if (error) throw error;
      } 
      else if (operation.type === 'course_progress' && operation.action === 'update') {
        // Actualizar progreso del curso
        const { error } = await supabase
          .from('lesson_progress')
          .upsert(operation.data);
          
        if (error) throw error;
      }
      else if (operation.type === 'comment' && operation.action === 'create') {
        // Crear comentario
        const { error } = await supabase
          .from('comments')
          .insert(operation.data);
          
        if (error) throw error;
      }
      
      // Marcar como sincronizado
      await markAsSynced(operation.id);
      return true;
    } catch (error) {
      console.error(`Error al sincronizar operación ${operation.id}:`, error);
      return false;
    }
  };

  // Función para sincronizar todas las operaciones pendientes
  const syncAllPending = async () => {
    if (!connectionService.isCurrentlyOnline() || isSyncing) return;
    
    setIsSyncing(true);
    
    try {
      const operations = await getPendingSyncOperations();
      setPendingOperations(operations.length);
      
      if (operations.length === 0) {
        setIsSyncing(false);
        return;
      }
      
      // Sincronizar operaciones secuencialmente
      let syncedCount = 0;
      for (const op of operations) {
        const success = await syncOperation(op);
        if (success) syncedCount++;
      }
      
      // Notificar resultados
      if (syncedCount > 0) {
        toast.success(`Sincronización completada`, {
          description: `${syncedCount} cambios sincronizados correctamente`
        });
      }
      
      // Actualizar conteo de pendientes
      const remainingOps = await getPendingSyncOperations();
      setPendingOperations(remainingOps.length);
    } catch (error) {
      console.error('Error en sincronización:', error);
      toast.error('Error al sincronizar', {
        description: 'Algunos cambios no pudieron sincronizarse'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Intentar sincronizar cuando la conexión se restablece
  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      if (online) {
        syncAllPending();
      }
    });
    
    // Verificar operaciones pendientes al montar
    getPendingSyncOperations().then(ops => setPendingOperations(ops.length));
    
    return unsubscribe;
  }, []);

  // Intentar sincronizar periódicamente mientras esté online
  useEffect(() => {
    if (!connectionService.isCurrentlyOnline()) return;
    
    const interval = setInterval(() => {
      syncAllPending();
    }, 60000); // Intentar cada minuto
    
    return () => clearInterval(interval);
  }, []);

  return {
    isSyncing,
    pendingOperations,
    syncNow: syncAllPending
  };
};
