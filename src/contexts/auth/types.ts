
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType } from '@/types/auth';

export interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  profile: UserProfile | null; // Adding alias for backward compatibility
  userRole: UserRoleType | null;
  simulatedRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isViewingAsOtherRole: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData?: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: any }>;
  forceUpdateRole: (email: string, roleToSet: UserRoleType) => Promise<{ success: boolean; error?: any }>;
  setSimulatedRole: (role: UserRoleType | null) => void;
  resetToOriginalRole: () => void;
}
