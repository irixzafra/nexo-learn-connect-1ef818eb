
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface UseAuthSessionProps {
  setIsAuthReady: (value: boolean) => void;
}

export function useAuthSession({ setIsAuthReady }: UseAuthSessionProps) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  // Handle authentication state changes
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
    };
    
    getSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      setIsAuthReady(true);
      
      if (event === 'SIGNED_OUT') {
        // Profile and role updates will be handled by the parent component
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setIsAuthReady]);

  return {
    user,
    session,
    setUser,
    setSession
  };
}
