
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType } from '@/types/auth';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRoleType | null;
  simulatedRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  isInitialized: boolean;
  isAuthenticated: boolean;
  setSimulatedRole: (role: UserRoleType | null) => void;
  isViewingAsOtherRole: boolean;
  resetToOriginalRole: () => void;
}
