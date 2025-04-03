
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType, toUserRoleType } from '@/types/auth';
import { fetchUserProfile, ensureUserProfile } from './profileUtils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRoleType | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  isInitialized: boolean;
  isAuthenticated: boolean;
  effectiveRole: UserRoleType | null;
  viewAsRole: 'current' | UserRoleType;
  setViewAsRole: (role: 'current' | UserRoleType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [viewAsRole, setViewAsRole] = useLocalStorage<'current' | UserRoleType>('viewAsRole', 'current');
  
  // Determine the actual user role
  const userRole = profile?.role ? toUserRoleType(profile.role) : null;
  
  // Calculate the effective role based on viewAsRole setting
  const effectiveRole = viewAsRole === 'current' 
    ? userRole 
    : viewAsRole;
  
  // Check if the user is authenticated
  const isAuthenticated = !!session && !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get the initial session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
          } else if (session?.user.email) {
            // Create a profile if it doesn't exist
            const newProfile = await ensureUserProfile(session.user.id, session.user.email);
            setProfile(newProfile);
          }
        }

        // Set up the auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
              const userProfile = await fetchUserProfile(session.user.id);
              setProfile(userProfile);
            } else {
              setProfile(null);
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in auth initialization:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      
      // Reset role viewing state
      setViewAsRole('current');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    profile,
    userRole,
    isLoading,
    logout,
    login,
    isInitialized,
    isAuthenticated,
    effectiveRole,
    viewAsRole,
    setViewAsRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export * from './types';
