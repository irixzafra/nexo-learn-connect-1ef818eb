
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType } from '@/types/auth';
import { toast } from 'sonner';
import { fetchUserProfile, ensureUserProfile } from './profileUtils';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.info('Setting up auth state listener');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.info('Auth state changed:', event, newSession?.user?.id);
        
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          setUserRole(null);
          return;
        }
        
        if (newSession?.user) {
          setSession(newSession);
          setUser(newSession.user);
          
          // Use setTimeout to avoid potential deadlock with Supabase client
          setTimeout(async () => {
            const userProfile = await ensureUserProfile(newSession.user.id, newSession.user.email || '');
            if (userProfile) {
              setProfile(userProfile);
              setUserRole(userProfile.role || null);
            }
          }, 0);
        }
      }
    );

    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          console.info('Found existing session for user:', currentSession.user.id);
          setSession(currentSession);
          setUser(currentSession.user);
          
          const userProfile = await ensureUserProfile(currentSession.user.id, currentSession.user.email || '');
          if (userProfile) {
            console.info('Found/created profile with role:', userProfile.role);
            setProfile(userProfile);
            setUserRole(userProfile.role || null);
          } else {
            console.warn('No profile found for user:', currentSession.user.id);
          }
        } else {
          console.info('No active session found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      console.log('Intentando login con:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error signing in:', error);
        toast.error('Error al iniciar sesión', {
          description: 'Verifica tus credenciales e intenta de nuevo',
        });
        throw error;
      }

      if (data?.user) {
        // Auth state change will handle updating the user state
        console.log('User signed in successfully:', data.user.id);
        toast.success('Inicio de sesión exitoso');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error al iniciar sesión', {
        description: 'Verifica tus credenciales e intenta de nuevo',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.info('Logging out user');
      await supabase.auth.signOut();
      toast.success('Has cerrado sesión correctamente');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error al cerrar sesión');
      throw error;
    }
  };

  const isAuthenticated = !!session && !!user;

  const value = {
    user,
    session,
    profile,
    userRole,
    isLoading,
    login,
    logout,
    isInitialized,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
