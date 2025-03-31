
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { Notification } from '@/types/notifications';

export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Función para cargar las notificaciones
  const loadNotifications = useCallback(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      
      // Simulación de carga de datos de API
      const timer = setTimeout(() => {
        // Generar datos de prueba para notificaciones
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'Nuevo mensaje recibido',
            content: 'Tienes un nuevo mensaje de María García sobre el curso de React',
            type: 'message',
            is_read: false,
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
            user_id: '123',
            action_url: '/messages/1',
            sender_name: 'María García'
          },
          {
            id: '2',
            title: '¡Curso completado!',
            content: 'Has completado el curso de Fundamentos de JavaScript. ¡Felicidades!',
            type: 'course_completed',
            is_read: false,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            user_id: '123',
            action_url: '/courses/javascript-foundations'
          },
          {
            id: '3',
            title: 'Anuncio importante',
            content: 'El seminario web de mañana ha sido reprogramado para las 18:00h',
            type: 'announcement',
            is_read: true,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            user_id: '123'
          },
          {
            id: '4',
            title: 'Logro desbloqueado',
            content: 'Has desbloqueado el logro "Aprendiz constante" por completar 7 días consecutivos de estudio',
            type: 'achievement',
            is_read: true,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
            user_id: '123',
            action_url: '/achievements'
          }
        ];

        setNotifications(mockNotifications);
        
        // Establecer el contador de no leídas 
        const unreadCount = mockNotifications.filter(n => !n.is_read).length;
        setUnreadCount(unreadCount);
        
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);
  
  // Carga de notificaciones al iniciar
  useEffect(() => {
    const cleanup = loadNotifications();
    return cleanup;
  }, [loadNotifications]);
  
  // Función para refrescar notificaciones manualmente
  const refreshNotifications = () => {
    loadNotifications();
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, is_read: true }))
    );
    setUnreadCount(0);
  };
  
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, is_read: true } 
          : notification
      )
    );
    
    // Actualizar contador de no leídas
    if (unreadCount > 0) {
      setUnreadCount(prev => prev - 1);
    }
  };
  
  return {
    unreadCount,
    notifications,
    isLoading,
    markAllAsRead,
    markAsRead,
    refreshNotifications
  };
};
