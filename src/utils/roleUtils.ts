
import { UserRoleType } from '@/types/auth';

/**
 * Get the display name for a user role
 * @param role The user role
 * @returns Readable name of the role in Spanish
 */
export function getRoleName(role: UserRoleType): string {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'instructor':
      return 'Instructor';
    case 'student':
      return 'Estudiante';
    case 'sistemas':
      return 'Sistemas';
    case 'moderator':
      return 'Moderador';
    case 'content_creator':
      return 'Creador de Contenido';
    case 'beta_tester':
      return 'Beta Tester';
    case 'guest':
      return 'Invitado';
    case 'anonimo':
      return 'Anónimo';
    default:
      return 'Usuario';
  }
}

/**
 * Get the home path for a specific user role
 * @param role The user role
 * @returns The home path for the role
 */
export function getHomePath(role: UserRoleType): string {
  switch (role) {
    case 'admin':
      return '/app/admin/dashboard';
    case 'instructor':
      return '/app/instructor/dashboard';
    case 'sistemas':
      return '/app/admin/system';
    case 'moderator':
      return '/app/moderation/dashboard';
    case 'content_creator':
      return '/app/content/dashboard';
    case 'student':
    default:
      return '/app/dashboard';
  }
}
