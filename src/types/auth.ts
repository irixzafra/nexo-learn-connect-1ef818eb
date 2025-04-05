
/**
 * Tipos de roles de usuario en el sistema
 */
export type UserRoleType = 'admin' | 'instructor' | 'student' | 'moderator' | 'manager' | 'anonymous' | 'sistemas' | 'content_creator' | 'guest' | 'beta_tester' | 'anonimo';

/**
 * Convertir cadena a tipo de rol de usuario
 */
export const toUserRoleType = (role?: string): UserRoleType => {
  if (!role) return 'anonymous';
  
  switch (role.toLowerCase()) {
    case 'admin':
    case 'administrator':
      return 'admin';
    case 'instructor':
    case 'teacher':
    case 'professor':
      return 'instructor';
    case 'student':
    case 'learner':
      return 'student';
    case 'moderator':
      return 'moderator';
    case 'manager':
      return 'manager';
    case 'sistemas':
      return 'sistemas';
    case 'content_creator':
      return 'content_creator';
    case 'guest':
      return 'guest';
    case 'beta_tester':
      return 'beta_tester';
    case 'anonimo':
      return 'anonimo';
    default:
      return 'anonymous';
  }
};

/**
 * Function to convert strings to UserRoleType
 */
export const asUserRoleType = (role: string): UserRoleType => {
  return toUserRoleType(role);
};

/**
 * Interface para el objeto de usuario autenticado
 */
export interface User {
  id: string;
  email: string;
  role: UserRoleType;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
}

/**
 * Interface para el perfil de usuario
 */
export interface UserProfile {
  userId: string;
  bio?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    emailNotifications?: boolean;
    pushNotifications?: boolean;
  };
  id?: string;
  role?: UserRoleType;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * User role interface
 */
export interface UserRole {
  id: string;
  name: string;
  description?: string;
}

/**
 * Interface para respuestas de autenticación
 */
export interface AuthResponse {
  user: User | null;
  session?: any;
  error?: Error;
}
