import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRole, UserRoleType } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRoleType | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  isInitialized: boolean;
  isAuthenticated: boolean;
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
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
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

  // Create or update user profile if it doesn't exist
  const ensureUserProfile = async (userId: string, email: string) => {
    try {
      // First check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (!existingProfile) {
        console.log('No profile found, creating one for user:', userId);
        // Create a basic profile with default role 'student'
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            full_name: email.split('@')[0],
            role: 'student', // Default role
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (createError) {
          console.error('Error creating user profile:', createError);
          return null;
        }
        
        // Now fetch the newly created profile
        return await fetchUserProfile(userId);
      }
      
      return existingProfile as UserProfile;
    } catch (error) {
      console.error('Error in ensureUserProfile:', error);
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
        
        if (event === 'SIGNED_OUT') {
          // Clear all auth state when signed out
          setSession(null);
          setUser(null);
          setProfile(null);
          setUserRole(null);
          return;
        }
        
        if (newSession?.user) {
          setSession(newSession);
          setUser(newSession.user);
          
          // Use setTimeout to prevent potential deadlock with Supabase client
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

    // Then, check for an existing session
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

    // Cleanup the subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Log out function
  const logout = async (): Promise<void> => {
    try {
      console.info('Logging out user');
      await supabase.auth.signOut();
      // Auth state change listener will handle state clearing
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  // Compute the authentication status based on session existence
  const isAuthenticated = !!session && !!user;

  // Helper function to ensure role is a valid UserRoleType
  const ensureValidRole = (role: string | null): UserRoleType => {
    if (!role) return 'student';
  
    const validRoles: UserRoleType[] = [
      'admin', 'instructor', 'student', 'moderator', 
      'content_creator', 'guest', 'beta_tester', 'sistemas', 'anonimo'
    ];
  
    return validRoles.includes(role as UserRoleType) 
      ? (role as UserRoleType) 
      : 'student';
  };

  const value = {
    user,
    session,
    profile,
    userRole,
    isLoading,
    logout,
    isInitialized,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
