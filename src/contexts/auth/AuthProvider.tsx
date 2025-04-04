
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

  const effectiveRole = simulatedRole || userRole;
  const isViewingAsOtherRole = simulatedRole !== null;
  const isAuthenticated = !!session && !!user;

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

  const setSimulatedRole = (role: UserRoleType | null) => {
    const currentRole = userRole;
    setSimulatedRoleState(role);
    saveSimulatedRole(role, currentRole);
  };

  const resetToOriginalRole = () => {
    setSimulatedRole(null);
  };

  const forceUpdateRole = async (email: string, roleToSet: UserRoleType) => {
    try {
      const result = await forceUpdateUserRole(email, roleToSet);
      
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

  const login = async (email: string, password: string, remember: boolean = false) => {
    console.log("AuthProvider: login called with", email, "and remember:", remember);
    setIsLoading(true);
    try {
      const result = await loginService(email, password, remember);
      console.log("AuthProvider: login result", result);
      setIsLoading(false);
      return result;
    } catch (error: any) {
      console.error("AuthProvider: login error", error);
      setIsLoading(false);
      return { success: false, error: error.message || "Error desconocido" };
    }
  };

  const logout = async () => {
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
      setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
      
      if (profileData.role) {
        setUserRole(toUserRoleType(profileData.role));
      }
    }
    
    return result;
  };

  const updatePassword = async (password: string) => {
    return updatePasswordService(password);
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      console.log("AuthProvider: Initializing auth...");
      
      // Set up subscription to auth state changes FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log('Auth state changed:', event, newSession?.user?.id);
          setSession(newSession);
          setUser(newSession?.user || null);
          
          if (newSession?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            // Use setTimeout to avoid Supabase deadlocks
            setTimeout(async () => {
              try {
                const profile = await fetchUserProfile(newSession.user.id);
                if (profile) {
                  setUserProfile(profile);
                  
                  const normalizedRole = profile.role ? String(profile.role).toLowerCase().trim() : 'student';
                  console.log(`Setting userRole to: "${normalizedRole}" (original: "${profile.role}")`);
                  setUserRole(toUserRoleType(normalizedRole));
                }
              } catch (err) {
                console.error("Error fetching profile after auth state change:", err);
              }
            }, 0);
          }
          
          if (event === 'SIGNED_OUT') {
            setUserProfile(null);
            setUserRole(null);
            setSimulatedRoleState(null);
            localStorage.removeItem('viewAsRole');
          }
        }
      );
      
      try {
        // THEN check for existing session
        console.log("AuthProvider: Checking for existing session...");
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
        }
        
        console.log("AuthProvider: Existing session:", existingSession?.user?.id || "none");
        setSession(existingSession);
        setUser(existingSession?.user || null);
        
        if (existingSession?.user) {
          try {
            const profile = await fetchUserProfile(existingSession.user.id);
            if (profile) {
              setUserProfile(profile);
              setUserRole(toUserRoleType(profile.role));
            }
          } catch (err) {
            console.error("Error fetching profile during init:", err);
          }
        }
      } catch (err) {
        console.error("Error in auth initialization:", err);
      }
      
      if (user && user.email === 'admin@nexo.com') {
        console.log('Found admin@nexo.com user, ensuring admin role');
        await forceUpdateRole('admin@nexo.com', 'admin');
      }
      
      const storedRole = getStoredSimulatedRole();
      if (storedRole) {
        setSimulatedRoleState(storedRole);
      }
      
      setIsLoading(false);
      setIsInitialized(true);
      
      return () => {
        // Cleanup on unmount
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
    profile: userProfile,
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
