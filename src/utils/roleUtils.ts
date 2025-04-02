
import { UserRoleType } from '@/types/auth';

/**
 * Get user-friendly role display name
 */
export const getRoleName = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'profesor':
    case 'instructor': // For backward compatibility
      return 'Profesor';
    case 'student':
      return 'Estudiante';
    case 'sistemas':
      return 'Sistemas';
    case 'moderator':
      return 'Moderador';
    case 'content_creator':
      return 'Creador de Contenido';
    case 'guest':
      return 'Invitado';
    case 'beta_tester':
      return 'Beta Tester';
    case 'anonimo':
      return 'Anónimo';
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
    case 'instructor': // For backward compatibility
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
    case 'student':
      return "bg-green-100 text-green-800 hover:bg-green-100/80";
    case 'sistemas':
      return "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
    case 'moderator':
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
    case 'content_creator':
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80";
    case 'beta_tester':
      return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100/80";
    case 'anonimo':
    case 'guest':
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
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
    case 'instructor': // For backward compatibility
      return '/profesor/dashboard';
    case 'sistemas':
      return '/admin/dashboard';
    case 'moderator':
      return '/moderator/dashboard';
    case 'content_creator':
      return '/content/dashboard';
    case 'beta_tester':
      return '/beta/dashboard';
    default:
      return '/student/dashboard';
  }
};
