
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRole } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRole | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  isInitialized: boolean;
}

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
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Set up auth state listener and fetch initial session
  useEffect(() => {
    console.info('Setting up auth state listener');
    
    // First, set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.info('Auth state changed:', event, newSession?.user?.id);
        
        setSession(newSession);
        setUser(newSession?.user || null);
        
        if (newSession?.user) {
          // Use setTimeout to prevent potential deadlock with Supabase client
          setTimeout(async () => {
            const userProfile = await fetchUserProfile(newSession.user.id);
            setProfile(userProfile);
            setUserRole(userProfile?.role || null);
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
        }
      }
    );

    // Then, check for an existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        if (currentSession?.user) {
          const userProfile = await fetchUserProfile(currentSession.user.id);
          setProfile(userProfile);
          setUserRole(userProfile?.role || null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    // Cleanup the subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Log out function
  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setUserRole(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    profile,
    userRole,
    isLoading,
    logout,
    isInitialized
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
