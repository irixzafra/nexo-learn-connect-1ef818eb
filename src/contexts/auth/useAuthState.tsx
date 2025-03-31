
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from './hooks/useAuthSession';
import { useAuthProfile } from './hooks/useAuthProfile';
import { useAuthMethods } from './hooks/useAuthMethods';
import { useUserPreferences } from './hooks/useUserPreferences';
import { toast } from 'sonner';

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

  // Cargar los roles del usuario desde la tabla user_roles
  useEffect(() => {
    const loadUserRoles = async () => {
      if (!sessionData.user) return;
      
      try {
        const { data, error } = await supabase
          .rpc('get_user_roles', { p_user_id: sessionData.user.id });
          
        if (error) {
          console.error('Error loading user roles:', error);
          return;
        }
        
        // Si no hay roles asignados, mantenemos el rol del perfil
        if (!data || data.length === 0) {
          console.log('No specific roles found for user, using profile role');
          return;
        }
        
        // Para compatibilidad, usamos el primer rol como rol principal
        // En el futuro, podríamos manejar múltiples roles
        const primaryRole = data[0].role_name;
        console.log('User primary role from user_roles:', primaryRole);
        
        if (primaryRole && primaryRole !== profileData.role) {
          profileData.setRole(primaryRole as UserRoleType);
        }
      } catch (error) {
        console.error('Error in loadUserRoles:', error);
      }
    };
    
    loadUserRoles();
  }, [sessionData.user, profileData.profile]);

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
        
        // Si se cambia el rol en el perfil, también actualizamos la tabla user_roles
        try {
          // Primero obtenemos el id del rol
          const { data: roleData, error: roleError } = await supabase
            .from('roles')
            .select('id')
            .eq('name', updates.role)
            .single();
            
          if (roleError || !roleData) {
            console.error('Error finding role:', roleError);
            return { error: null, data: updates };
          }
          
          // Eliminamos todos los roles actuales
          await supabase
            .from('user_roles')
            .delete()
            .eq('user_id', sessionData.user.id);
            
          // Asignamos el nuevo rol
          await supabase
            .from('user_roles')
            .insert({ user_id: sessionData.user.id, role_id: roleData.id });
            
        } catch (roleUpdateError) {
          console.error('Error updating user_roles:', roleUpdateError);
        }
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
    
    // Notificar al usuario del cambio
    if (role === 'current') {
      toast.success(`Volviendo a tu rol actual: ${profileData.role}`);
    } else {
      toast.success(`Viendo como: ${role}`);
    }
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
