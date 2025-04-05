
import { useState, useEffect, useCallback } from 'react';
import { Notification } from '@/types/notifications';

export interface UseNotificationsResult {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useNotifications = (): UseNotificationsResult => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Mock data for demonstration
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock notifications data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          userId: 'user1',
          type: 'message',
          title: 'Nuevo mensaje',
          content: 'Has recibido un mensaje de Juan Pérez.',
          isRead: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          senderId: 'user2',
          senderName: 'Juan Pérez',
          actionUrl: '/messages/1'
        },
        {
          id: '2',
          userId: 'user1',
          type: 'course_completed',
          title: '¡Curso completado!',
          content: 'Felicidades por completar el curso de React Avanzado.',
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          resourceType: 'course',
          resourceId: 'course1',
          actionUrl: '/courses/course1/certificate'
        },
        {
          id: '3',
          userId: 'user1',
          type: 'announcement',
          title: 'Nuevo curso disponible',
          content: 'Acabamos de lanzar un nuevo curso de TypeScript Avanzado.',
          isRead: false,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          actionUrl: '/courses/typescript-advanced'
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      throw err;
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications
  };
};
