
import { UserRoleType } from '@/types/auth';

/**
 * Get user-friendly role display name
 */
export const getRoleName = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'instructor':
      return 'Instructor';
    case 'student':
      return 'Estudiante';
    case 'sistemas':
      return 'Sistemas';
    case 'anonimo':
      return 'Anónimo';
    case 'moderator':
      return 'Moderador';
    case 'content_creator':
      return 'Creador de Contenido';
    case 'guest':
      return 'Invitado';
    case 'beta_tester':
      return 'Beta Tester';
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
    case 'instructor':
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
    case 'student':
      return "bg-green-100 text-green-800 hover:bg-green-100/80";
    case 'sistemas':
      return "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
    case 'anonimo':
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
    case 'moderator':
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
    case 'content_creator':
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80";
    case 'guest':
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80";
    case 'beta_tester':
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80";
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
    case 'instructor':
      return '/instructor/dashboard';
    case 'sistemas':
      return '/admin/systems';
    default:
      return '/home';
  }
};
