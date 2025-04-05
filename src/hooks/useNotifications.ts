
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useNotifications = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // This is a mock implementation. In a real app, you would fetch notifications from an API
    if (user) {
      // Simulate loading
      setIsLoading(true);
      
      // Mock data - replace with actual API call in production
      setTimeout(() => {
        const mockNotifications = [
          { id: 1, read: false, message: 'Nueva calificación en tu curso', timestamp: new Date() },
          { id: 2, read: false, message: 'Comentario nuevo en tu publicación', timestamp: new Date() },
          { id: 3, read: true, message: 'Curso completado', timestamp: new Date() }
        ];
        
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
        setIsLoading(false);
      }, 500);
    }
  }, [user]);

  const markAsRead = (notificationId: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
    
    // Update unread count
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    // Reset unread count
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead
  };
};
