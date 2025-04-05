
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: Date;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // This is a mock implementation
        // In a real app, you would fetch from an API
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'Nueva tarea asignada',
            message: 'Se te ha asignado una nueva tarea para el curso de React.',
            read: false,
            date: new Date()
          },
          {
            id: '2',
            title: 'Recordatorio: examen próximo',
            message: 'Tienes un examen pendiente para el curso de TypeScript.',
            read: false,
            date: new Date(Date.now() - 86400000) // 1 day ago
          },
          {
            id: '3',
            title: 'Actualización del curso',
            message: 'Se ha actualizado el contenido del curso de JavaScript.',
            read: true,
            date: new Date(Date.now() - 172800000) // 2 days ago
          }
        ];
        
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead
  };
};
