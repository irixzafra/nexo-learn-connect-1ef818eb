
import { supabase } from '@/lib/supabase';
import { NavigateFunction } from 'react-router-dom';
import { UserProfile, UserRoleType } from '@/types/auth';

interface UseAuthMethodsProps {
  setProfile: (profile: UserProfile | null) => void;
  setRole: (role: UserRoleType | null) => void;
  navigate: NavigateFunction;
}

export function useAuthMethods({ setProfile, setRole, navigate }: UseAuthMethodsProps) {
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

  return {
    login,
    signup,
    logout,
    resetPassword
  };
}
