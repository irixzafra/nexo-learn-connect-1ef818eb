
import { useState, useCallback, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

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
          title: 'Nuevo mensaje',
          message: 'Has recibido un nuevo mensaje',
          isRead: false,
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Recordatorio de curso',
          message: 'Tu curso comienza en 1 hora',
          isRead: false,
          createdAt: new Date(Date.now() - 3600000)
        },
        {
          id: '3',
          title: 'Actualización de sistema',
          message: 'El sistema se ha actualizado correctamente',
          isRead: true,
          createdAt: new Date(Date.now() - 86400000)
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
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
          ? { ...notification, isRead: true } 
          : notification
      )
    );
    
    // Actualizar contador de no leídos
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  // Marcar todas las notificaciones como leídas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
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
