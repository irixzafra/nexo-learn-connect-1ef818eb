
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Carga simulada de notificaciones
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      
      // Simulación de carga de datos de API
      const timer = setTimeout(() => {
        // Número aleatorio entre 0 y 10 para simular notificaciones
        const randomCount = Math.floor(Math.random() * 11);
        setUnreadCount(randomCount);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);
  
  const markAllAsRead = () => {
    setUnreadCount(0);
  };
  
  const markAsRead = (notificationId: string) => {
    // En implementación real, aquí se actualizaría una notificación específica
    if (unreadCount > 0) {
      setUnreadCount(prev => prev - 1);
    }
  };
  
  return {
    unreadCount,
    notifications,
    isLoading,
    markAllAsRead,
    markAsRead
  };
};
