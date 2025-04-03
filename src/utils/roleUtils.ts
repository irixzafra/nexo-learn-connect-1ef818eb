
import { UserRoleType } from '@/types/auth';

/**
 * Obtiene el nombre para mostrar de un rol
 * @param role Rol del usuario
 * @returns String con el nombre legible del rol
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
    case 'guest':
      return 'Invitado';
    case 'anonimo':
      return 'Anónimo';
    case 'beta_tester':
      return 'Beta Tester';
    default:
      return role;
  }
}

/**
 * Obtiene una clase CSS para colorear un badge de rol
 * @param role Rol del usuario
 * @returns String con clase CSS para color
 */
export function getRoleBadgeColor(role: UserRoleType): string {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'instructor':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'sistemas':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'moderator':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'content_creator':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'student':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'beta_tester':
      return 'bg-cyan-100 text-cyan-800 border-cyan-300';
    case 'guest':
    case 'anonimo':
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

/**
 * Determina si un rol tiene permisos administrativos
 * @param role Rol a verificar
 * @returns Booleano indicando si tiene permisos admin
 */
export function hasAdminPermissions(role: UserRoleType): boolean {
  return ['admin', 'sistemas'].includes(role);
}

/**
 * Determina si un rol tiene permisos de instructor
 * @param role Rol a verificar
 * @returns Booleano indicando si tiene permisos de instructor
 */
export function hasInstructorPermissions(role: UserRoleType): boolean {
  return ['admin', 'instructor', 'sistemas'].includes(role);
}
