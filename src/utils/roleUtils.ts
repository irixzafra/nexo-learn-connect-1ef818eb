
import { UserRoleType } from '@/types/auth';

/**
 * Get a human-readable name for a user role
 */
export const getRoleName = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'instructor':
      return 'Instructor';
    case 'student':
      return 'Estudiante';
    default:
      return 'Usuario';
  }
};

/**
 * Get the home path for a specific role
 */
export const getHomePath = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'instructor':
      return '/instructor/dashboard';
    case 'student':
      return '/dashboard';
    default:
      return '/dashboard';
  }
};

/**
 * Check if a user has permission for an action
 */
export const hasPermission = (
  userRole: UserRoleType | null, 
  requiredRole: UserRoleType | UserRoleType[]
): boolean => {
  if (!userRole) return false;
  
  // Admin can do everything
  if (userRole === 'admin') return true;
  
  // Check against an array of roles
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  
  // Check against a single role
  return userRole === requiredRole;
};
