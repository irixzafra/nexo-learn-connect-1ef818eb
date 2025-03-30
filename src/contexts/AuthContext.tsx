
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType, toUserRoleType } from '@/types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoading: boolean;
  isAuthReady: boolean;
  isAuthenticated: boolean;
  user: any | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRoleType | null;
  viewAsRole: UserRoleType | 'current';
  theme: string;
  showAuthModal: boolean;
  toggleAuthModal: () => void;
  logout: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  setTheme: (theme: string) => void;
  setUserRole: (role: UserRoleType) => void;
  setViewAsRole: (role: UserRoleType | 'current') => void;
  saveUserPreferences: (preferences: { theme?: string; role?: UserRoleType }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const updateProfile = async (updates: any) => {
    setIsLoading(true);
    try {
      // Fix: Remove the 'returning' option as it's not supported in the current Supabase version
      const { error } = await supabase.from('profiles').upsert(
        {
          id: user?.id,
          updated_at: new Date().toISOString(),
          ...updates,
        },
        { onConflict: 'id' } // Only specify supported options
      );
      
      if (error) {
        throw error;
      }
      
      setProfile((prevProfile: any) => ({
        ...prevProfile,
        ...updates,
      }));
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
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

  const saveUserPreferences = async (preferences: { theme?: string; role?: UserRoleType }) => {
    if (preferences.theme) {
      setTheme(preferences.theme);
    }
    
    if (preferences.role) {
      setUserRole(preferences.role);
    }
  };

  const value: AuthContextType = {
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
    logout,
    updateProfile,
    setTheme,
    setUserRole,
    setViewAsRole,
    saveUserPreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
