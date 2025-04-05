
import { useState, useCallback, useEffect } from 'react';
import { Notification } from '@/types/notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Función para cargar notificaciones (simulada)
  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulamos una llamada a la API con un retraso
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Datos simulados de notificaciones
      const mockNotifications: Notification[] = [
        {
          id: '1',
          user_id: 'user1',
          type: 'message',
          title: 'Nuevo mensaje',
          content: 'Has recibido un nuevo mensaje',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'user1',
          type: 'course_completed',
          title: 'Recordatorio de curso',
          content: 'Tu curso comienza en 1 hora',
          is_read: false,
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '3',
          user_id: 'user1',
          type: 'announcement',
          title: 'Actualización de sistema',
          content: 'El sistema se ha actualizado correctamente',
          is_read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Marcar una notificación como leída
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, is_read: true } 
          : notification
      )
    );
    
    // Actualizar contador de no leídos
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  // Marcar todas las notificaciones como leídas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, is_read: true }))
    );
    setUnreadCount(0);
  }, []);

  // Refrescar notificaciones
  const refreshNotifications = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refreshNotifications
  };
}
