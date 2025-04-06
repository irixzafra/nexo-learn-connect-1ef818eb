
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export type UserRoleType = 'admin' | 'instructor' | 'student' | 'moderator' | 'guest';

export interface User extends SupabaseUser {
  role?: UserRoleType;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRoleType;
  email?: string;
  created_at?: string;
  updated_at?: string;
  bio?: string;
  website?: string;
  location?: string;
}

export interface AuthContextType {
  user: User | null;
  userRole: UserRoleType | null;
  profile: UserProfile | null;
  effectiveRole: UserRoleType | null;
  simulatedRole: UserRoleType | null;
  isViewingAsOtherRole: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setSimulatedRole: (role: UserRoleType | null) => Promise<void>;
  resetToOriginalRole: () => void;
  forceUpdateRole: () => Promise<void>;
  userProfile: UserProfile | null;
}

export function toUserRoleType(role: string | null): UserRoleType {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'admin';
    case 'instructor':
      return 'instructor';
    case 'moderator':
      return 'moderator';
    case 'guest':
      return 'guest';
    case 'student':
    default:
      return 'student';
  }
}

export function asUserRoleType(role: string): UserRoleType {
  return toUserRoleType(role);
}
