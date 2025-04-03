
import { UserRoleType } from '@/types/auth';
import { Shield, BookOpen, GraduationCap, Terminal, Ghost, UserCog, Users } from 'lucide-react';
import React from 'react';

/**
 * Obtiene el nombre para mostrar de un rol
 * @param role Rol del usuario
 * @returns String con el nombre legible del rol
 */
export function getRoleName(role: UserRoleType | string): string {
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
      return String(role);
  }
}

/**
 * Obtiene una clase CSS para colorear un badge de rol
 * @param role Rol del usuario
 * @returns String con clase CSS para color
 */
export function getRoleBadgeColor(role: UserRoleType | string): string {
  switch (role) {
    case 'admin':
      return 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400';
    case 'instructor':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400';
    case 'sistemas':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400';
    case 'moderator':
      return 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400';
    case 'content_creator':
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400';
    case 'student':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400';
    case 'beta_tester':
      return 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400';
    case 'guest':
    case 'anonimo':
    default:
      return 'bg-gray-50 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400';
  }
}

/**
 * Returns the appropriate icon component for a role
 * @param role The user role
 * @returns A React element with the appropriate icon
 */
export const getRoleIcon = (role: string): React.ReactElement => {
  switch (role) {
    case 'admin':
      return React.createElement(Shield, { className: "h-4 w-4" });
    case 'instructor':
      return React.createElement(BookOpen, { className: "h-4 w-4" });
    case 'student':
      return React.createElement(GraduationCap, { className: "h-4 w-4" });
    case 'sistemas':
      return React.createElement(Terminal, { className: "h-4 w-4" });
    case 'moderator':
      return React.createElement(UserCog, { className: "h-4 w-4" });
    case 'content_creator':
      return React.createElement(Users, { className: "h-4 w-4" });
    case 'anonimo':
    case 'guest':
      return React.createElement(Ghost, { className: "h-4 w-4" });
    default:
      return React.createElement(Users, { className: "h-4 w-4" });
  }
};
