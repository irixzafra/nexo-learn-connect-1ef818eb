
import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Simulación de carga de notificaciones
  useEffect(() => {
    // Aquí se implementaría la lógica real para obtener notificaciones
    // Por ahora, usamos un número aleatorio para la demo
    const randomCount = Math.floor(Math.random() * 5);
    setUnreadCount(randomCount);
    
    return () => {
      // Limpieza si es necesario
    };
  }, []);
  
  return {
    unreadCount,
    markAsRead: () => setUnreadCount(0),
    addNotification: () => setUnreadCount(prev => prev + 1)
  };
};
