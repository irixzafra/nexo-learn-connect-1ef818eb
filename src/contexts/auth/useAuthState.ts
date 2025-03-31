
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserRoleType, UserProfile } from '@/types/auth';
import { setupAdminUser } from '@/utils/adminUtils';

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [viewAsRole, setViewAsRole] = useState<UserRoleType | 'current'>('current');
  const [theme, setTheme] = useState('light');
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Run the admin setup function when the app initializes
    setupAdminUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error('Error fetching user profile:', error);
          } else {
            setProfile(profile);
            setUserRole(profile.role);
          }
        } catch (error) {
          console.error('Error in profile fetch:', error);
        }
      } else {
        setProfile(null);
        setUserRole(null);
      }
      
      setIsLoading(false);
      setIsAuthReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setUserRole(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setProfile(prevProfile => ({
        ...prevProfile,
        ...updates
      }));
      
      // Update role if changed
      if (updates.role) {
        setUserRole(updates.role);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const saveUserPreferences = async (preferences: { theme?: string; role?: UserRoleType }) => {
    try {
      if (preferences.theme) {
        setTheme(preferences.theme);
        localStorage.setItem('userTheme', preferences.theme);
      }
      
      if (preferences.role) {
        setUserRole(preferences.role);
        if (user) {
          await updateProfile({ role: preferences.role });
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return false;
    }
  };

  return {
    isLoading,
    isAuthReady,
    isAuthenticated,
    user,
    session,
    profile,
    userRole,
    viewAsRole,
    theme,
    showAuthModal,
    toggleAuthModal,
    logout,
    updateProfile,
    setTheme,
    setUserRole,
    setViewAsRole,
    saveUserPreferences,
  };
};
