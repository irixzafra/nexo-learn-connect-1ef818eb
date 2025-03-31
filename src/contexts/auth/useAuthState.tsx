
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

  // Aseguramos que updateUserProfile esté definida aquí, aunque ya venga de profileData
  // Esto garantiza que coincida con la firma en AuthContextType
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

  // Aseguramos que switchViewAsRole esté definida aquí, aunque ya venga de userPreferences
  // Esto garantiza que coincida con la firma en AuthContextType
  const switchViewAsRole = (role: UserRoleType | 'current') => {
    userPreferences.setViewAsRole(role);
  };

  const returnValue = { 
    // Status information
    isLoading,
    isAuthReady,
    isAuthenticated: !!sessionData.session,

    // UI state/functions
    showAuthModal,
    toggleAuthModal,
    
    // Aseguramos que estas funciones estén definidas en el objeto retornado
    updateUserProfile,
    switchViewAsRole,

    // Spread results from specialized hooks
    ...sessionData,
    ...profileData,
    ...authMethods,
    ...userPreferences
  };
  
  console.log('Keys returned by useAuthState:', Object.keys(returnValue));
  
  return returnValue;
}
