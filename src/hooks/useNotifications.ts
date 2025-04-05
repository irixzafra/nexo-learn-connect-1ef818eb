
import { useState, useEffect } from 'react';
import { Notification } from '@/types/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For compatibility

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setIsLoading(true);
      try {
        // This is a mock implementation
        // In a real app, you would fetch from an API
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'Nueva tarea asignada',
            message: 'Se te ha asignado una nueva tarea para el curso de React.',
            read: false,
            date: new Date(),
            is_read: false,
            type: 'info',
            created_at: new Date().toISOString(),
            content: 'Se te ha asignado una nueva tarea para el curso de React.'
          },
          {
            id: '2',
            title: 'Recordatorio: examen próximo',
            message: 'Tienes un examen pendiente para el curso de TypeScript.',
            read: false,
            date: new Date(Date.now() - 86400000), // 1 day ago
            is_read: false,
            type: 'warning',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            content: 'Tienes un examen pendiente para el curso de TypeScript.'
          },
          {
            id: '3',
            title: 'Actualización del curso',
            message: 'Se ha actualizado el contenido del curso de JavaScript.',
            read: true,
            date: new Date(Date.now() - 172800000), // 2 days ago
            is_read: true,
            type: 'success',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            content: 'Se ha actualizado el contenido del curso de JavaScript.'
          }
        ];
        
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true, is_read: true } 
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true, is_read: true }))
    );
    setUnreadCount(0);
  };

  const refreshNotifications = async () => {
    // In a real app, this would refetch notifications
    console.log('Refreshing notifications');
  };

  return {
    notifications,
    unreadCount,
    loading,
    isLoading,
    markAsRead,
    markAllAsRead,
    refreshNotifications
  };
};

export default useNotifications;
