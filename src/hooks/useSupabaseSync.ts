
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { connectionService } from '@/lib/offline/connectionService';

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export const useSupabaseSync = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [pendingOperations, setPendingOperations] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Check online status
  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      setIsOnline(online);
    });
    
    // Initialize with current status
    setIsOnline(connectionService.isCurrentlyOnline());
    
    return unsubscribe;
  }, []);
  
  // Función para iniciar la sincronización
  const startSync = useCallback(async () => {
    setIsLoading(true);
    setIsSyncing(true);
    setSyncStatus('syncing');
    setError(null);
    
    try {
      // Verificar la conexión a Supabase primero
      const { error: connectionError } = await supabase.auth.getSession();
      
      if (connectionError) {
        throw new Error(`Error de conexión: ${connectionError.message}`);
      }
      
      // Aquí se implementaría la lógica real de sincronización
      // Por ahora es un simulador que espera 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate some pending operations
      setPendingOperations(Math.max(0, pendingOperations - Math.floor(Math.random() * 3)));
      setLastSynced(new Date());
      setSyncStatus('success');
      return true;
    } catch (err) {
      const error = err as Error;
      console.error('Error en la sincronización:', error);
      setSyncStatus('error');
      setError(error);
      toast.error(`Error al sincronizar: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, [pendingOperations]);
  
  // Función para cancelar la sincronización
  const cancelSync = useCallback(() => {
    if (syncStatus === 'syncing') {
      setSyncStatus('idle');
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, [syncStatus]);
  
  // Función para verificar el estado de la base de datos
  const checkDatabaseStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('_view_database_info').select('*').limit(1);
      
      if (error) {
        throw error;
      }
      
      return { success: true, data };
    } catch (err) {
      console.error('Error al verificar estado de la base de datos:', err);
      return { success: false, error: err };
    }
  }, []);

  // For simulation purposes, set random pending operations
  useEffect(() => {
    // Initialize with a random number of pending operations for demo
    if (pendingOperations === 0) {
      setPendingOperations(Math.floor(Math.random() * 5));
    }
  }, [pendingOperations]);
  
  // Convenience function to trigger sync
  const syncNow = useCallback(() => {
    if (!isOnline || isSyncing) return Promise.resolve(false);
    return startSync();
  }, [isOnline, isSyncing, startSync]);

  return {
    syncStatus,
    isLoading,
    error,
    startSync,
    cancelSync,
    checkDatabaseStatus,
    isOnline,
    lastSynced,
    pendingOperations,
    isSyncing,
    syncNow
  };
};

export default useSupabaseSync;
