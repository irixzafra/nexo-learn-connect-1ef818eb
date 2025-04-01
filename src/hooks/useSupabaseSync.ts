
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SyncStatus {
  isOnline: boolean;
  lastSynced: Date | null;
  pendingOperations: number;
  isSyncing: boolean;
}

export const useSupabaseSync = () => {
  const [status, setStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    lastSynced: null,
    pendingOperations: 0,
    isSyncing: false
  });

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({ ...prev, isOnline: true }));
      toast.success('Conexión restablecida', {
        description: 'La sincronización automática está disponible'
      });
      syncPendingOperations();
    };

    const handleOffline = () => {
      setStatus(prev => ({ ...prev, isOnline: false }));
      toast.error('Conexión perdida', {
        description: 'Los cambios se guardarán localmente hasta que vuelvas a estar en línea'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check connection to Supabase
  const checkConnection = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.getSession();
      return !error;
    } catch (error) {
      console.error("Error checking Supabase connection:", error);
      return false;
    }
  };

  // Mock function to simulate pending operations
  const getPendingOperationsCount = (): Promise<number> => {
    // In a real app, this would check IndexedDB or localStorage for pending changes
    return Promise.resolve(Math.floor(Math.random() * 3)); // Mock 0-2 pending operations
  };

  // Sync pending operations with Supabase
  const syncPendingOperations = async () => {
    if (!status.isOnline || status.isSyncing) return;

    try {
      setStatus(prev => ({ ...prev, isSyncing: true }));
      
      // Check if we're connected to Supabase
      const isConnected = await checkConnection();
      if (!isConnected) {
        toast.error('No se puede conectar a Supabase');
        setStatus(prev => ({ ...prev, isSyncing: false }));
        return;
      }
      
      // Get pending operations count
      const count = await getPendingOperationsCount();
      
      if (count > 0) {
        // In a real app, this would process and upload pending changes
        // Simulating processing time based on number of operations
        await new Promise(resolve => setTimeout(resolve, count * 500));
        
        toast.success(`Sincronización completa`, {
          description: `Se han sincronizado ${count} operaciones pendientes`
        });
      }
      
      setStatus(prev => ({ 
        ...prev, 
        isSyncing: false,
        lastSynced: new Date(),
        pendingOperations: 0
      }));
    } catch (error) {
      console.error("Sync error:", error);
      toast.error('Error en la sincronización');
      setStatus(prev => ({ ...prev, isSyncing: false }));
    }
  };

  // Manually check for pending operations
  const checkPendingOperations = async () => {
    const count = await getPendingOperationsCount();
    setStatus(prev => ({ ...prev, pendingOperations: count }));
    return count;
  };

  // Check pending operations initially and set up interval
  useEffect(() => {
    checkPendingOperations();
    
    // Check for pending operations every minute
    const interval = setInterval(() => {
      checkPendingOperations().then(count => {
        if (count > 0 && status.isOnline) {
          syncPendingOperations();
        }
      });
    }, 60000);
    
    return () => clearInterval(interval);
  }, [status.isOnline]);

  return {
    ...status,
    syncNow: syncPendingOperations,
    checkConnection
  };
};

export default useSupabaseSync;
