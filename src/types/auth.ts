
// Define los tipos de roles de usuario
export type UserRoleType = 
  | 'admin'
  | 'instructor'
  | 'student'
  | 'moderator'
  | 'manager'
  | 'anonymous'
  | 'sistemas'
  | 'content_creator'
  | 'guest'
  | 'beta_tester'
  | 'anonimo';

// Para validar/convertir strings a UserRoleType
export function toUserRoleType(role: string): UserRoleType {
  const validRoles = [
    'admin',
    'instructor',
    'student',
    'moderator',
    'manager',
    'anonymous',
    'sistemas',
    'content_creator',
    'guest',
    'beta_tester',
    'anonimo'
  ];
  
  if (validRoles.includes(role)) {
    return role as UserRoleType;
  }
  
  // Valor predeterminado si no coincide
  return 'anonymous';
}

// Interfaces para el sistema de autenticación
export interface AuthUser {
  id: string;
  email: string;
  role: UserRoleType;
  avatar?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  created_at?: string;
  updated_at?: string;
  displayName?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
}

// User Profile definition
export interface UserProfile {
  id: string;
  userId?: string;
  email: string;
  role: UserRoleType;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  preferences?: UserPreferences;
  created_at?: string;
  updated_at?: string;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
  language?: string;
  timezone?: string;
}

// User Role Management
export interface UserRole {
  id: string;
  name: UserRoleType;
  displayName: string;
  description?: string;
  permissions?: string[];
}

// Alias for backward compatibility
export const asUserRoleType = toUserRoleType;

// Define base User type for Supabase/Auth integration
export interface User {
  id: string;
  email: string;
  role: UserRoleType;
  displayName?: string;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}
