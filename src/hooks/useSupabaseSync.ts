
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  
  // Check online status
  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      setIsOnline(online);
    });
    
    // Initialize with current status
    setIsOnline(connectionService.isCurrentlyOnline());
    
    return unsubscribe;
  }, []);
  
  // Check Supabase connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('checking');
        const { data, error } = await supabase.from('_view_database_info').select('*').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('disconnected');
          toast.error('No se pudo conectar a la base de datos');
        } else {
          console.log('Supabase connection successful');
          setConnectionStatus('connected');
        }
      } catch (err) {
        console.error('Supabase connection check failed:', err);
        setConnectionStatus('disconnected');
      }
    };
    
    checkConnection();
  }, []);
  
  // Función para iniciar la sincronización
  const startSync = useCallback(async () => {
    if (connectionStatus !== 'connected') {
      toast.error('No hay conexión con la base de datos');
      return false;
    }
    
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
  }, [pendingOperations, connectionStatus]);
  
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
      setConnectionStatus('checking');
      const { data, error } = await supabase.from('_view_database_info').select('*').limit(1);
      
      if (error) {
        setConnectionStatus('disconnected');
        throw error;
      }
      
      setConnectionStatus('connected');
      return { success: true, data };
    } catch (err) {
      console.error('Error al verificar estado de la base de datos:', err);
      setConnectionStatus('disconnected');
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
    syncNow,
    connectionStatus
  };
};

export default useSupabaseSync;
