
import { useState, useEffect, useCallback } from 'react';
import { Notification } from '@/types/notifications';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  // Fetch notifications
  const {
    data: notifications = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(30);
      
      if (error) {
        console.error('Error fetching notifications:', error);
        return [];
      }
      
      return data as Notification[];
    },
    enabled: !!userId,
  });

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!userId) return;

    // Listen for new notifications
    const channel = supabase
      .channel('db-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Update the cache with the new notification
          const newNotification = payload.new as Notification;
          
          queryClient.setQueryData(
            ['notifications', userId],
            (old: Notification[] | undefined) => {
              const currentNotifications = old || [];
              // Add the new notification at the beginning of the array
              return [newNotification, ...currentNotifications];
            }
          );
          
          // Show a toast notification
          toast(newNotification.title, {
            description: newNotification.content,
            action: {
              label: 'Ver',
              onClick: () => {
                if (newNotification.action_url) {
                  window.location.href = newNotification.action_url;
                }
              },
            },
          });
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  // Mark a notification as read
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      if (!userId) return;
      
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error marking notification as read:', error);
        throw error;
      }
    },
    onSuccess: (_, notificationId) => {
      // Update the cache
      queryClient.setQueryData(
        ['notifications', userId],
        (old: Notification[] | undefined) => {
          if (!old) return [];
          
          return old.map((notification) => {
            if (notification.id === notificationId) {
              return { ...notification, is_read: true };
            }
            return notification;
          });
        }
      );
    },
  });

  // Mark all notifications as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      if (!userId) return;
      
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);
      
      if (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Update the cache
      queryClient.setQueryData(
        ['notifications', userId],
        (old: Notification[] | undefined) => {
          if (!old) return [];
          
          return old.map((notification) => ({
            ...notification,
            is_read: true,
          }));
        }
      );
      
      toast.success('Todas las notificaciones marcadas como leídas');
    },
  });

  // Mark a notification as read
  const markAsRead = useCallback((notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  }, [markAsReadMutation]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  // Refresh notifications
  const refreshNotifications = useCallback(() => {
    refetch();
  }, [refetch]);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    isError,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  };
};
