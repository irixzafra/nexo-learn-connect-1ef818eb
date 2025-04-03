
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

export function useSupabaseSync() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
  
  const checkDatabaseStatus = useCallback(async () => {
    try {
      setConnectionStatus('checking');
      
      // Try a simple query that doesn't require specific tables
      // Use a query that's guaranteed to work on any Postgres DB
      const { data, error } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Database connection error:", error);
        setConnectionStatus('disconnected');
        toast.error("No se puede conectar a la base de datos", {
          description: "Verifica tu conexión a internet o contacta a soporte."
        });
        return false;
      }
      
      setConnectionStatus('connected');
      return true;
    } catch (err) {
      console.error('Failed to check database connection:', err);
      setConnectionStatus('disconnected');
      return false;
    }
  }, []);
  
  // Check connection status on mount
  useEffect(() => {
    checkDatabaseStatus();
    
    // Set up a periodic check (every 5 minutes)
    const interval = setInterval(() => {
      checkDatabaseStatus();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkDatabaseStatus]);
  
  return { connectionStatus, checkDatabaseStatus };
}
