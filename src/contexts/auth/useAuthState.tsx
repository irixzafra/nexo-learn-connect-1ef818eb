
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from './hooks/useAuthSession';
import { useAuthProfile } from './hooks/useAuthProfile';
import { useAuthMethods } from './hooks/useAuthMethods';
import { useUserPreferences } from './hooks/useUserPreferences';

export function useAuthState() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  
  // Session management
  const sessionData = useAuthSession({ setIsAuthReady });

  // User profile management
  const profileData = useAuthProfile({ user: sessionData.user, setIsLoading });

  // Authentication methods
  const authMethods = useAuthMethods({ 
    setProfile: profileData.setProfile, 
    setRole: profileData.setRole, 
    navigate 
  });

  // User preferences
  const userPreferences = useUserPreferences({ setRole: profileData.setRole });

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  return {
    // Status information
    isLoading,
    isAuthReady,
    isAuthenticated: !!sessionData.session,
    
    // User and session data
    ...sessionData,
    
    // Profile management
    profile: profileData.profile,
    userRole: profileData.role,
    updateUserProfile: profileData.updateUserProfile,
    
    // Authentication methods
    login: authMethods.login,
    signup: authMethods.signup,
    logout: authMethods.logout,
    resetPassword: authMethods.resetPassword,
    
    // UI functions
    showAuthModal,
    toggleAuthModal,
    
    // Preferences management
    theme: userPreferences.theme,
    viewAsRole: userPreferences.viewAs,
    setTheme: userPreferences.setTheme,
    setUserRole: userPreferences.setUserRole,
    setViewAsRole: userPreferences.setViewAsRole,
    switchViewAsRole: userPreferences.switchViewAsRole,
    saveUserPreferences: userPreferences.saveUserPreferences
  };
}
