
import { UserRoleType } from '@/types/auth';

/**
 * Get user-friendly role display name
 */
export const getRoleName = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'profesor':
      return 'Profesor';
    case 'student':
      return 'Estudiante';
    default:
      return role;
  }
};

/**
 * Get badge color for role
 */
export const getRoleBadgeColor = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return "bg-red-100 text-red-800 hover:bg-red-100/80";
    case 'profesor':
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
    case 'student':
      return "bg-green-100 text-green-800 hover:bg-green-100/80";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
  }
};

/**
 * Get home page path based on user role
 */
export const getHomePath = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'profesor':
      return '/profesor/dashboard';
    default:
      return '/student/dashboard';
  }
};
