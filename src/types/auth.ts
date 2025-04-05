
export type UserRoleType = 
  | 'admin' 
  | 'instructor' 
  | 'student' 
  | 'support' 
  | 'sistemas' 
  | 'content_manager' 
  | 'content_creator' 
  | 'analytics' 
  | 'finance' 
  | 'moderator' 
  | 'guest' 
  | 'beta_tester' 
  | 'anonimo';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRoleType;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: UserRoleType | UserRoleType[]) => boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Add user profile interface
export interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  role: UserRoleType;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  last_sign_in?: string;
  bio?: string;
  headline?: string;
  location?: string;
  website?: string;
  phone?: string;
}

// Add UserRole interface
export interface UserRole {
  id: string;
  name: string;
  description?: string;
  permissions?: string[];
}

/**
 * Utility function to safely convert any string to a valid UserRoleType
 * Falls back to 'student' if an invalid role type is provided
 */
export const toUserRoleType = (role?: string | null): UserRoleType => {
  if (!role) return 'student';
  
  const normalizedRole = String(role).toLowerCase().trim();
  
  // Check if the role is a valid UserRoleType
  const validRoles: UserRoleType[] = [
    'admin', 
    'instructor', 
    'student', 
    'support', 
    'sistemas', 
    'content_manager', 
    'content_creator', 
    'analytics', 
    'finance', 
    'moderator', 
    'guest', 
    'beta_tester', 
    'anonimo'
  ];
  
  return validRoles.includes(normalizedRole as UserRoleType) 
    ? (normalizedRole as UserRoleType) 
    : 'student';
};

/**
 * Alias for toUserRoleType for backward compatibility
 */
export const asUserRoleType = toUserRoleType;

/**
 * Checks if a role is a valid UserRoleType
 */
export const isValidRole = (role?: string | null): boolean => {
  if (!role) return false;
  
  const normalizedRole = String(role).toLowerCase().trim();
  
  const validRoles: UserRoleType[] = [
    'admin', 
    'instructor', 
    'student', 
    'support', 
    'sistemas', 
    'content_manager', 
    'content_creator', 
    'analytics', 
    'finance', 
    'moderator', 
    'guest', 
    'beta_tester', 
    'anonimo'
  ];
  
  return validRoles.includes(normalizedRole as UserRoleType);
};
