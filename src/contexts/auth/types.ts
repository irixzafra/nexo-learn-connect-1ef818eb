
import { Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType } from '@/types/auth';

export interface AuthContextType {
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
  saveUserPreferences: (preferences: { theme?: string; role?: UserRoleType }) => Promise<boolean>;
}
