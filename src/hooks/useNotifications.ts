
import { useState, useEffect } from 'react';
import { Notification } from '@/types/notifications';
import { v4 as uuidv4 } from 'uuid';

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    title: 'Nuevo curso disponible',
    content: 'Se ha publicado el curso "Introducción a React"',
    type: 'announcement',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    user_id: 'user-1',
    action_url: '/courses/react-intro'
  },
  {
    id: 'notification-2',
    title: 'Mensaje de Instructor',
    content: 'Has recibido un mensaje nuevo de tu instructor',
    type: 'message',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    user_id: 'user-1',
    action_url: '/messages/inbox'
  },
  {
    id: 'notification-3',
    title: '¡Felicidades!',
    content: 'Has completado el curso "JavaScript Avanzado"',
    type: 'course_completed',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    user_id: 'user-1',
    action_url: '/courses/javascript-advanced/certificate'
  },
  {
    id: 'notification-4',
    title: 'Nuevo logro desbloqueado',
    content: 'Has obtenido el logro "Experto en CSS"',
    type: 'achievement',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    user_id: 'user-1',
    action_url: '/achievements'
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([...mockNotifications]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Derived state: unread count
  const unreadCount = notifications.filter(n => !n.is_read).length;
  
  // Simulated data loading
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      setNotifications([...mockNotifications]);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mark a specific notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, is_read: true } 
          : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, is_read: true }))
    );
  };
  
  // Add a new notification
  const addNotification = () => {
    const newNotification: Notification = {
      id: uuidv4(),
      title: 'Nueva notificación',
      content: 'Contenido de la notificación',
      type: 'system',
      is_read: false,
      created_at: new Date().toISOString(),
      user_id: 'user-1'
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  // Refresh notifications (simulate fetching new data)
  const refreshNotifications = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Add a new random notification occasionally
      const shouldAddNew = Math.random() > 0.7;
      
      if (shouldAddNew) {
        const types: Array<Notification['type']> = ['message', 'course_completed', 'announcement', 'achievement'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        const newNotification: Notification = {
          id: uuidv4(),
          title: `Nueva ${randomType === 'message' ? 'mensaje' : 
                      randomType === 'course_completed' ? 'curso completado' : 
                      randomType === 'announcement' ? 'anuncio' : 'logro'}`,
          content: `Contenido de la notificación de tipo ${randomType}`,
          type: randomType,
          is_read: false,
          created_at: new Date().toISOString(),
          user_id: 'user-1',
          action_url: randomType === 'message' ? '/messages' : 
                      randomType === 'course_completed' ? '/courses' :
                      randomType === 'announcement' ? '/announcements' : '/achievements'
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      }
      
      setIsLoading(false);
    }, 800);
  };
  
  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    addNotification,
    refreshNotifications
  };
};
