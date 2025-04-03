
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

/**
 * Hook para gestionar la sincronización y estado de conexión con Supabase
 */
export const useSupabaseSync = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
  const [lastSyncAttempt, setLastSyncAttempt] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Verifica el estado de la conexión a la base de datos
   */
  const checkDatabaseStatus = useCallback(async () => {
    setConnectionStatus('checking');
    setError(null);
    
    try {
      // Realizamos una consulta simple para verificar la conexión
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (error) {
        throw new Error(error.message);
      }
      
      console.log('Conexión a Supabase verificada exitosamente');
      setConnectionStatus('connected');
    } catch (err) {
      console.error('Error al verificar la conexión a Supabase:', err);
      setConnectionStatus('disconnected');
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLastSyncAttempt(new Date());
    }
  }, []);

  // Verificar la conexión al montar el componente
  useEffect(() => {
    checkDatabaseStatus();
    
    // Verificar cada 5 minutos
    const interval = setInterval(() => {
      checkDatabaseStatus();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkDatabaseStatus]);

  return {
    connectionStatus,
    lastSyncAttempt,
    error,
    checkDatabaseStatus
  };
};
