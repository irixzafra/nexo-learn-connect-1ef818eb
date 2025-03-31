
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType, toUserRoleType } from '@/types/auth';
import { useNavigate } from 'react-router-dom';

export function useAuthState() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRoleType | null>(null);
  const [viewAs, setViewAs] = useState<UserRoleType | 'current'>('current');
  const [theme, setThemeState] = useState<string>(localStorage.getItem('theme') || 'dark');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  const navigate = useNavigate();

  // Handle authentication state changes
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
    };
    
    getSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      setIsAuthReady(true);
      
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setRole(null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile when user changes
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const { data: profileData, error, status } = await supabase
            .from('profiles')
            .select(`full_name, avatar_url, username, role, bio, created_at, updated_at`)
            .eq('id', user.id)
            .single();

          if (error && status !== 406) {
            throw error;
          }
          
          if (profileData) {
            const userProfile: UserProfile = {
              id: user.id,
              email: user.email || undefined,
              full_name: profileData.full_name || undefined,
              avatar_url: profileData.avatar_url || undefined,
              username: profileData.username || undefined,
              role: toUserRoleType(profileData.role) || 'student',
              bio: profileData.bio || undefined,
              created_at: profileData.created_at || undefined,
              updated_at: profileData.updated_at || undefined,
            };
            
            setProfile(userProfile);
            setRole(toUserRoleType(userProfile.role));
          }
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      getProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  // Load preferences from localStorage
  useEffect(() => {
    // Load theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setThemeState(storedTheme);
    }
    
    // Load user role from localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(toUserRoleType(storedRole));
    }
    
    // Load viewAsRole from localStorage
    const storedViewAsRole = localStorage.getItem('viewAsRole');
    if (storedViewAsRole) {
      setViewAs(storedViewAsRole as UserRoleType | 'current');
    }
  }, []);

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signup = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: userData 
        }
      });
      return { error, user: data.user };
    } catch (error) {
      return { error, user: null };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
      setRole(null);
      navigate('/auth/login');
    } catch (error: any) {
      console.error('Error during logout:', error.message);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase.from('profiles').upsert(
        {
          id: user?.id,
          updated_at: new Date().toISOString(),
          ...updates,
        },
        { onConflict: 'id' }
      );
      
      if (error) {
        throw error;
      }
      
      setProfile((prevProfile: UserProfile | null) => {
        if (!prevProfile) return null;
        return {
          ...prevProfile,
          ...updates,
        };
      });

      return { error: null, data };
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setUserRole = (newRole: UserRoleType) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };
  
  const setViewAsRole = (newViewAsRole: UserRoleType | 'current') => {
    setViewAs(newViewAsRole);
    localStorage.setItem('viewAsRole', newViewAsRole);
  };

  // Alias for compatibility with existing code
  const switchViewAsRole = (newViewAsRole: UserRoleType | 'current') => {
    setViewAsRole(newViewAsRole);
  };

  const saveUserPreferences = async (preferences: { theme?: string; role?: UserRoleType }) => {
    if (preferences.theme) {
      setTheme(preferences.theme);
    }
    
    if (preferences.role) {
      setUserRole(preferences.role);
    }

    return true;
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
