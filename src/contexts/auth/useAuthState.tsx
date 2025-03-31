
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

  // Make sure this function matches the signature in AuthContextType
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!sessionData.user) throw new Error("No authenticated user");
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', sessionData.user.id);
      
      if (error) throw error;
      
      // Update local state
      profileData.setProfile(prevProfile => 
        prevProfile ? { ...prevProfile, ...updates } : null
      );
      
      // Update role if changed
      if (updates.role) {
        profileData.setRole(updates.role);
      }
      
      return { error: null, data: updates };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return { error, data: null };
    }
  };

  // Make sure this function matches the signature in AuthContextType
  const switchViewAsRole = (role: UserRoleType | 'current') => {
    userPreferences.setViewAsRole(role);
  };

  // Construct and log the return value to help debug
  const returnValue = { 
    // Status information
    isLoading,
    isAuthReady,
    isAuthenticated: !!sessionData.session,

    // UI state/functions
    showAuthModal,
    toggleAuthModal,
    
    // Add these properties from authMethods
    login: authMethods.login,
    signup: authMethods.signup,
    resetPassword: authMethods.resetPassword,
    logout: authMethods.logout,
    
    // Make sure these specific functions are available
    updateUserProfile,
    switchViewAsRole,

    // Spread remaining data from our hooks
    ...sessionData,
    ...profileData,
    ...userPreferences
  };
  
  // Add a debug log to see what's returned
  console.log('Keys returned by useAuthState:', Object.keys(returnValue));
  
  return returnValue;
}
