import React, { createContext, useState, useEffect, useContext } from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType, toUserRoleType } from '@/types/auth';

interface AuthContextType {
  isLoading: boolean;
  isAuthReady: boolean;
  user: any | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRoleType | null;
  theme: string;
  supabaseClient: any;
  showAuthModal: boolean;
  toggleAuthModal: () => void;
  logout: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  setTheme: (theme: string) => void;
  setUserRole: (role: UserRoleType) => void;
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
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark');
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const { data: profileData, error, status } = await supabaseClient
            .from('profiles')
            .select(`full_name, avatar_url, username, website, role, bio, created_at, updated_at`)
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
        setIsAuthReady(true);
      }
    };

    getProfile();
  }, [user, supabaseClient]);
  
  useEffect(() => {
    // Load theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
    
    // Load user role from localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(toUserRoleType(storedRole));
    }
  }, []);

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const logout = async () => {
    try {
      await supabaseClient.auth.signOut();
      setProfile(null);
      setRole(null);
      router.push('/auth/login');
    } catch (error: any) {
      console.error('Error during logout:', error.message);
    }
  };

  const updateProfile = async (updates: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.from('profiles').upsert(
        {
          id: user?.id,
          updated_at: new Date().toISOString(),
          ...updates,
        },
        { returning: 'minimal' }
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

  const setTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const setUserRole = (role: UserRoleType) => {
    setRole(role);
  };

  const saveUserPreferences = async (preferences: { theme?: string; role?: UserRoleType }) => {
    if (preferences.theme) {
      setTheme(preferences.theme);
      localStorage.setItem('theme', preferences.theme);
    }
    
    if (preferences.role) {
      setRole(preferences.role);
      localStorage.setItem('userRole', preferences.role);
    }
  };

  const value: AuthContextType = {
    isLoading,
    isAuthReady,
    user,
    session,
    profile,
    userRole: role,
    theme,
    supabaseClient,
    showAuthModal,
    toggleAuthModal,
    logout,
    updateProfile,
    setTheme,
    setUserRole,
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
