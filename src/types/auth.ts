
/**
 * Tipos de roles de usuario en el sistema
 */
export type UserRoleType = 'admin' | 'instructor' | 'student' | 'moderator' | 'manager' | 'anonymous';

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
    default:
      return 'anonymous';
  }
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
}

/**
 * Interface para respuestas de autenticación
 */
export interface AuthResponse {
  user: User | null;
  session?: any;
  error?: Error;
}
