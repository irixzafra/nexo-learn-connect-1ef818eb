
import React, { useState, useEffect } from 'react';
import { UserRoleType, UserProfile, toUserRoleType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';
import { 
  fetchUserProfile, 
  forceUpdateUserRole, 
  saveSimulatedRole,
  getStoredSimulatedRole
} from './authHelpers';
import {
  loginService,
  logoutService,
  signupService,
  updateProfileService,
  updatePasswordService
} from './authServices';

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
    saveSimulatedRole(role, currentRole);
  };

  // Implementation of resetToOriginalRole
  const resetToOriginalRole = () => {
    setSimulatedRole(null);
  };

  // Force update a user's role by email
  const forceUpdateRole = async (email: string, roleToSet: UserRoleType) => {
    try {
      // First attempt to update the user by email
      const result = await forceUpdateUserRole(email, roleToSet);
      
      // If this is the current user, update the local state
      if (result.success && user && email === user.email) {
        setUserRole(roleToSet);
        setUserProfile(prev => prev ? { ...prev, role: roleToSet } : null);
      }
      
      return result;
    } catch (error: any) {
      console.error('Error in forceUpdateRole:', error);
      return { success: false, error: error.message };
    }
  };

  // Authentication functions
  const login = async (email: string, password: string) => {
    return loginService(email, password);
  };

  const logout = async () => {
    // Clear simulated role before signing out
    setSimulatedRoleState(null);
    localStorage.removeItem('viewAsRole');
    await logoutService();
  };

  const signup = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    return signupService(email, password, userData);
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    const result = await updateProfileService(user.id, profileData);
    
    if (result.success) {
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
      
      // Update role if it's changed
      if (profileData.role) {
        setUserRole(toUserRoleType(profileData.role));
      }
    }
    
    return result;
  };

  const updatePassword = async (password: string) => {
    return updatePasswordService(password);
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
              fetchUserProfile(newSession.user.id).then(profile => {
                if (profile) {
                  setUserProfile(profile);
                  
                  // Ensure role is properly formatted (all lowercase)
                  const normalizedRole = profile.role ? String(profile.role).toLowerCase().trim() : 'student';
                  console.log(`Setting userRole to: "${normalizedRole}" (original: "${profile.role}")`);
                  setUserRole(toUserRoleType(normalizedRole));
                }
              });
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
        const profile = await fetchUserProfile(existingSession.user.id);
        if (profile) {
          setUserProfile(profile);
          setUserRole(toUserRoleType(profile.role));
        }
      }
      
      // Special case: If the user is admin@nexo.com, ensure they have admin role
      if (existingSession?.user && existingSession.user.email === 'admin@nexo.com') {
        console.log('Found admin@nexo.com user, ensuring admin role');
        await forceUpdateRole('admin@nexo.com', 'admin');
      }
      
      // Initialize simulated role from localStorage
      const storedRole = getStoredSimulatedRole();
      if (storedRole) {
        setSimulatedRoleState(storedRole);
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
