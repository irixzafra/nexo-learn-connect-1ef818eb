
import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  content?: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    // Update unread count when notifications change
    const count = notifications.filter(notification => !notification.isRead).length;
    setUnreadCount(count);
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would fetch from an API
      // For now, we'll use mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Welcome to the platform',
          content: 'Thank you for joining! Let us know if you need help.',
          type: 'info',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        {
          id: '2',
          title: 'New course available',
          content: 'Check out our latest course on React development!',
          type: 'success',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
          actionUrl: '/courses/react-development',
        },
        {
          id: '3',
          title: 'System maintenance',
          content: 'The system will be under maintenance on Sunday from 2-4 AM.',
          type: 'warning',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        },
      ];

      setNotifications(mockNotifications);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // In a real app, this would call an API
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, isRead: true } 
            : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      // In a real app, this would call an API
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      throw err;
    }
  };

  const refresh = async () => {
    return fetchNotifications();
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refresh
  };
}
