
import { useState, useEffect, useCallback } from 'react';
import { checkDatabaseConnection } from '@/lib/supabase';

type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

export const useSupabaseSync = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
  const [lastSyncAttempt, setLastSyncAttempt] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const checkDatabaseStatus = useCallback(async () => {
    setConnectionStatus('checking');
    setError(null);
    
    try {
      const isConnected = await checkDatabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      setLastSyncAttempt(new Date());
      
      if (!isConnected) {
        setError(new Error('Could not connect to Supabase database'));
      }
      
      return isConnected;
    } catch (err) {
      setConnectionStatus('disconnected');
      setError(err instanceof Error ? err : new Error('Unknown error checking database connection'));
      setLastSyncAttempt(new Date());
      return false;
    }
  }, []);

  useEffect(() => {
    // Check connection status on component mount
    checkDatabaseStatus();
    
    // Set up interval to periodically check connection status (every 5 minutes)
    const intervalId = setInterval(() => {
      checkDatabaseStatus();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [checkDatabaseStatus]);

  return {
    connectionStatus,
    lastSyncAttempt,
    error,
    checkDatabaseStatus
  };
};

export default useSupabaseSync;
