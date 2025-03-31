
import { User } from '@supabase/supabase-js';

export type UserRoleType = 'admin' | 'instructor' | 'student' | 'guest';

export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  role: UserRoleType;
  preferences?: {
    theme?: string;
    language?: string;
    email_notifications?: boolean;
    [key: string]: any;
  };
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextType {
  isLoading: boolean;
  isAuthReady: boolean;
  isAuthenticated: boolean;
  user: User | null;
  session: any;
  profile: UserProfile | null;
  userRole: UserRoleType;
  viewAsRole: UserRoleType | 'current';
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, userData?: any) => Promise<{ error: any, user: any }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<{ error: any, data: any }>;
  switchViewAsRole: (role: UserRoleType | 'current') => void;
  saveUserPreferences: (preferences: { theme?: string; role?: UserRoleType }) => Promise<boolean>;
}
