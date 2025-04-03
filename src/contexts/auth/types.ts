
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, UserRoleType } from '@/types/auth';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRoleType | null;
  
  // Role simulation properties
  simulatedRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isViewingAsOtherRole: boolean;
  
  isLoading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  isInitialized: boolean;
  isAuthenticated: boolean;
  forceUpdateRole: (email: string, roleToSet: UserRoleType) => Promise<void>;
  
  // Role simulation methods
  setSimulatedRole: (role: UserRoleType | null) => void;
  resetToOriginalRole: () => void;
}
