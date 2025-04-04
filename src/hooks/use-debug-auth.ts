
import { useState } from 'react';
import { useAuth } from '@/contexts/auth/useAuth';

/**
 * Hook de depuración que envuelve el hook useAuth principal para diagnóstico
 */
export const useDebugAuth = () => {
  const [lastAttempt, setLastAttempt] = useState<{
    email: string;
    timestamp: string;
    success: boolean;
    error?: string;
  } | null>(null);
  
  const auth = useAuth();
  
  const debugLogin = async (email: string, password: string, remember: boolean = false) => {
    console.log('[AuthDebug] Intento de login con:', { email, remember });
    
    try {
      console.log('[AuthDebug] Llamando a auth.login...');
      const result = await auth.login(email, password, remember);
      console.log('[AuthDebug] Resultado login:', result);
      
      setLastAttempt({
        email,
        timestamp: new Date().toISOString(),
        success: result.success,
        error: result.error
      });
      
      return result;
    } catch (error: any) {
      console.error('[AuthDebug] Error en login:', error);
      
      setLastAttempt({
        email,
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message || 'Error desconocido'
      });
      
      return { success: false, error: error.message || 'Error desconocido' };
    }
  };
  
  return {
    ...auth,
    login: debugLogin,
    lastAttempt,
    _originalAuth: auth
  };
};
