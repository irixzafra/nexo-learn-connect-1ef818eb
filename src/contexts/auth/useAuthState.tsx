
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
  const { 
    user, 
    session, 
    setUser, 
    setSession 
  } = useAuthSession({ setIsAuthReady });

  // User profile management
  const { 
    profile, 
    role, 
    setProfile, 
    setRole, 
    updateUserProfile
  } = useAuthProfile({ user, setIsLoading });

  // Authentication methods
  const { 
    login, 
    signup, 
    logout, 
    resetPassword 
  } = useAuthMethods({ setProfile, setRole, navigate });

  // User preferences
  const { 
    theme, 
    viewAs, 
    setTheme, 
    setUserRole,
    setViewAs, 
    setViewAsRole,
    switchViewAsRole,
    saveUserPreferences 
  } = useUserPreferences({ setRole });

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  return {
    isLoading,
    isAuthReady,
    isAuthenticated: !!session,
    user,
    session,
    profile,
    userRole: role,
    viewAsRole: viewAs,
    theme,
    showAuthModal,
    toggleAuthModal,
    login,
    signup,
    logout,
    resetPassword,
    updateUserProfile,
    setTheme,
    setUserRole,
    setViewAsRole,
    switchViewAsRole,
    saveUserPreferences,
  };
}
