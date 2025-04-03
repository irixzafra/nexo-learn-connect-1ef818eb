
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRoleType, UserProfile, toUserRoleType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

export interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  profile: UserProfile | null; // Adding alias for backward compatibility
  userRole: UserRoleType | null;
  simulatedRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isViewingAsOtherRole: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData?: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: any }>;
  forceUpdateRole: (email: string, roleToSet: UserRoleType) => Promise<{ success: boolean; error?: any }>;
  setSimulatedRole: (role: UserRoleType | null) => void;
  resetToOriginalRole: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  session: null,
  userProfile: null,
  profile: null,
  userRole: null,
  simulatedRole: null,
  effectiveRole: null,
  isViewingAsOtherRole: false,
  login: async () => ({ success: false }),
  logout: async () => {},
  signup: async () => ({ success: false }),
  updateProfile: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  forceUpdateRole: async () => ({ success: false }),
  setSimulatedRole: () => {},
  resetToOriginalRole: () => {},
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [simulatedRole, setSimulatedRoleState] = useState<UserRoleType | null>(null);

  // Calculate derived values
  const effectiveRole = simulatedRole || userRole;
  const isViewingAsOtherRole = simulatedRole !== null;
  const isAuthenticated = !!session && !!user;

  // Debug the state on each render
  console.log('>>> DEBUG AuthProvider RENDER:', {
    userRole,
    simulatedRole,
    effectiveRole,
    isViewingAsOtherRole,
    isAuthenticated,
    userRoleType: typeof userRole,
    userRoleExactValue: JSON.stringify(userRole),
    userProfileRole: userProfile?.role,
  });

  // Implementation of setSimulatedRole
  const setSimulatedRole = (role: UserRoleType | null) => {
    const currentRole = userRole; // Capture real role before changing
    setSimulatedRoleState(role);
    
    // Simple persistence with 'viewAsRole' key
    if (role) {
      localStorage.setItem('viewAsRole', role);
      toast({
        title: "Vista cambiada",
        description: `Ahora estás viendo como: ${role}`,
      });
    } else {
      localStorage.removeItem('viewAsRole'); // Clean up when returning to original
      if (currentRole) {
        toast({
          title: "Vista restablecida",
          description: `Volviendo a tu rol original: ${currentRole}`,
        });
      }
    }
  };

  // Implementation of resetToOriginalRole
  const resetToOriginalRole = () => {
    setSimulatedRole(null);
  };

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        console.log('Profile data received:', data);
        setUserProfile(data as UserProfile);
        
        // Ensure role is properly formatted (all lowercase)
        const normalizedRole = data.role ? String(data.role).toLowerCase().trim() : 'student';
        console.log(`Setting userRole to: "${normalizedRole}" (original: "${data.role}")`);
        setUserRole(toUserRoleType(normalizedRole));
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  // Force update a user's role by email
  const forceUpdateRole = async (email: string, roleToSet: UserRoleType) => {
    try {
      console.log(`Attempting to force update role for ${email} to ${roleToSet}`);
      
      // First try to find the user by email in profiles table
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, email, role')
        .eq('email', email)
        .single();
      
      if (userError) {
        console.error('Error finding user by email:', userError);
        
        // If we couldn't find by email, let's try the current user
        if (user) {
          console.log('Attempting to update role for current user:', user.id);
          
          const { error: currentUserError } = await supabase
            .from('profiles')
            .update({ role: roleToSet })
            .eq('id', user.id);
            
          if (currentUserError) {
            console.error('Error updating role for current user:', currentUserError);
            return { success: false, error: currentUserError.message };
          }
          
          console.log(`Updated role to ${roleToSet} for current user`);
          setUserRole(roleToSet);
          setUserProfile(prev => prev ? { ...prev, role: roleToSet } : null);
          return { success: true };
        }
        
        return { success: false, error: userError.message };
      }
      
      if (userData) {
        console.log('Found user:', userData);
        
        // Update the role in profiles
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: roleToSet })
          .eq('id', userData.id);
          
        if (updateError) {
          console.error('Error updating role:', updateError);
          return { success: false, error: updateError.message };
        }
        
        console.log(`Successfully updated role for ${email} to ${roleToSet}`);
        
        // If this is the current user, update the local state
        if (user && userData.id === user.id) {
          setUserRole(roleToSet);
          setUserProfile(prev => prev ? { ...prev, role: roleToSet } : null);
        }
        
        return { success: true };
      } else {
        console.error('User not found');
        return { success: false, error: 'User not found' };
      }
    } catch (error: any) {
      console.error('Error in forceUpdateRole:', error);
      return { success: false, error: error.message };
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
          if (newSession?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            setTimeout(() => {
              fetchUserProfile(newSession.user.id);
            }, 0);
          }
          
          // When user signs out, clear profile and role
          if (event === 'SIGNED_OUT') {
            setUserProfile(null);
            setUserRole(null);
            setSimulatedRoleState(null);
            localStorage.removeItem('viewAsRole');
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
      
      // Special case: If the user is admin@nexo.com, ensure they have admin role
      if (existingSession?.user && existingSession.user.email === 'admin@nexo.com') {
        console.log('Found admin@nexo.com user, ensuring admin role');
        await forceUpdateRole('admin@nexo.com', 'admin');
      }
      
      // Initialize simulated role from localStorage
      try {
        const storedRole = localStorage.getItem('viewAsRole');
        // Ensure the stored role is valid before using it
        if (storedRole && storedRole !== 'current') {
          // Check if the stored role is a valid UserRoleType
          if (['admin', 'student', 'instructor', 'sistemas', 'moderator', 
               'content_creator', 'guest', 'beta_tester', 'anonimo'].includes(storedRole)) {
            setSimulatedRoleState(toUserRoleType(storedRole));
          } else {
            // Clean up if invalid
            localStorage.removeItem('viewAsRole');
          }
        }
      } catch (error) {
        console.error("Error reading simulated role from localStorage", error);
        localStorage.removeItem('viewAsRole');
      }
      
      setIsLoading(false);
      setIsInitialized(true);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);

  // Authentication functions
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
    // Clear simulated role before signing out
    setSimulatedRoleState(null);
    localStorage.removeItem('viewAsRole');
    await supabase.auth.signOut();
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

  const value = {
    isLoading,
    isAuthenticated,
    isInitialized,
    user,
    session,
    userProfile,
    profile: userProfile, // Add alias for backward compatibility
    userRole,
    simulatedRole,
    effectiveRole,
    isViewingAsOtherRole,
    login,
    logout,
    signup,
    updateProfile,
    updatePassword,
    forceUpdateRole,
    setSimulatedRole,
    resetToOriginalRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
