
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
