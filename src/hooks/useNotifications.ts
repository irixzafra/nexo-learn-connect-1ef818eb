
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Notification } from '@/types/notifications';

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch notifications when the user changes
  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  // Function to fetch notifications from the server
  const fetchNotifications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // This is a placeholder. In a real application, you'd fetch notifications from your API
      // For demo purposes, we'll just set some sample data
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          user_id: user.id,
          type: 'message',
          title: 'New message from instructor',
          content: 'You have a new message regarding your course',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: user.id,
          type: 'course_completed',
          title: 'Course completed',
          content: 'Congratulations on completing the course!',
          is_read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          user_id: user.id,
          type: 'announcement',
          title: 'New platform feature',
          content: 'We have added new features to the platform!',
          is_read: false,
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ];

      setNotifications(sampleNotifications);
      setUnreadCount(sampleNotifications.filter(n => !n.is_read).length);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
    } finally {
      setIsLoading(false);
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId: string) => {
    if (!user) return;
    
    try {
      // In a real application, you'd update the notification in your API
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return;
    
    try {
      // In a real application, you'd update the notifications in your API
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
      
      // Update unread count
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications
  };
}

export default useNotifications;
