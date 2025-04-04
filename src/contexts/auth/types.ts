
import { Session, User } from '@supabase/supabase-js';
import { UserProfile, UserRoleType } from '@/types/auth';

export interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  profile: UserProfile | null; // Alias para mantener compatibilidad
  userRole: string | null;
  simulatedRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isViewingAsOtherRole: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string; data?: any }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData?: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  forceUpdateRole: (email: string, role: UserRoleType) => Promise<{ success: boolean; error?: string }>;
  setSimulatedRole: (role: UserRoleType | null) => void;
  resetToOriginalRole: () => void;
}
