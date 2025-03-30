
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { NotificationType } from '@/types/notifications';

interface Notification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  user_id: string;
  action_url?: string;
  resource_type?: string;
  resource_id?: string;
  sender_id?: string;
  sender_name?: string;
  sender_avatar?: string;
}

export function useNotifications() {
  const { user } = useAuth();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async (): Promise<Notification[]> => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user?.id,
  });
  
  const unreadCount = data ? data.filter(notification => !notification.is_read).length : 0;
  
  const markAsRead = async (notificationId: string) => {
    if (!user?.id) return;
    
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id);
      
    if (error) {
      console.error('Error marking notification as read:', error);
      return;
    }
    
    await refetch();
  };
  
  const markAllAsRead = async () => {
    if (!user?.id) return;
    
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
      
    if (error) {
      console.error('Error marking all notifications as read:', error);
      return;
    }
    
    await refetch();
  };
  
  return {
    notifications: data || [],
    isLoading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch
  };
}
