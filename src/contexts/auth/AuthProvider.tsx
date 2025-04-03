
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRoleType, UserProfile, toUserRoleType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isViewingAsOtherRole: boolean;
  simulatedUserId: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData?: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: any }>;
  setSimulatedRole: (role: UserRoleType, userId?: string) => void;
  resetToOriginalRole: () => void;
  simulatedRole: UserRoleType | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  user: null,
  session: null,
  userProfile: null,
  userRole: null,
  effectiveRole: null,
  isViewingAsOtherRole: false,
  simulatedUserId: null,
  login: async () => ({ success: false }),
  logout: async () => {},
  signup: async () => ({ success: false }),
  updateProfile: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  setSimulatedRole: () => {},
  resetToOriginalRole: () => {},
  simulatedRole: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [simulatedRole, setSimulatedRoleState] = useState<UserRoleType | null>(null);
  const [simulatedUserId, setSimulatedUserId] = useState<string | null>(null);

  // The effective role is either the simulated role or the user's actual role
  const effectiveRole = simulatedRole || userRole;
  const isViewingAsOtherRole = simulatedRole !== null;

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('userId', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUserProfile(data as UserProfile);
        setUserRole(toUserRoleType(data.role || 'student'));
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // First set up the auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, newSession) => {
          console.log('Auth state changed:', event, newSession?.user?.id);
          setSession(newSession);
          setUser(newSession?.user || null);
          
          // When user signs in, fetch their profile
          if (newSession?.user && event === 'SIGNED_IN') {
            setTimeout(() => {
              fetchUserProfile(newSession.user.id);
            }, 0);
          }
          
          // When user signs out, clear profile and role
          if (event === 'SIGNED_OUT') {
            setUserProfile(null);
            setUserRole(null);
            setSimulatedRoleState(null);
            setSimulatedUserId(null);
          }
        }
      );
      
      // Then check for existing session
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      setSession(existingSession);
      setUser(existingSession?.user || null);
      
      // If there's a user, fetch their profile
      if (existingSession?.user) {
        await fetchUserProfile(existingSession.user.id);
      }
      
      setIsLoading(false);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);

  // Mock authentication functions (replace with actual implementation)
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSimulatedRoleState(null);
    setSimulatedUserId(null);
  };

  const signup = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      // Create profile after signup
      if (data.user) {
        const profile = {
          userId: data.user.id,
          email: data.user.email,
          role: 'student' as UserRoleType,
          ...userData,
        };
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profile]);
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('userId', user.id);
        
      if (error) {
        return { success: false, error: error.message };
      }
      
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
      
      // Update role if it's changed
      if (profileData.role) {
        setUserRole(toUserRoleType(profileData.role));
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Function to set simulated role for role switching
  const setSimulatedRole = (role: UserRoleType, userId?: string) => {
    console.log('Setting simulated role:', role, userId);
    setSimulatedRoleState(role);
    setSimulatedUserId(userId || null);
  };

  // Function to reset to original role
  const resetToOriginalRole = () => {
    console.log('Resetting to original role');
    setSimulatedRoleState(null);
    setSimulatedUserId(null);
  };

  const value = {
    isLoading,
    user,
    session,
    userProfile,
    userRole,
    effectiveRole,
    isViewingAsOtherRole,
    simulatedUserId,
    login,
    logout,
    signup,
    updateProfile,
    updatePassword,
    setSimulatedRole,
    resetToOriginalRole,
    simulatedRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
