
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

// Available roles for quick selection
export const availableRoles: UserRoleType[] = [
  'admin', 
  'instructor', 
  'student', 
  'sistemas',
  'moderator',
  'content_creator',
  'guest'
];

/**
 * Returns the appropriate icon component for a role
 * @param role The user role
 * @returns A React element with the appropriate icon
 */
export const getRoleIcon = (role: string) => {
  switch (role) {
    case 'admin':
      return <Shield className="h-4 w-4" />;
    case 'instructor':
      return <BookOpen className="h-4 w-4" />;
    case 'student':
      return <GraduationCap className="h-4 w-4" />;
    case 'sistemas':
      return <Terminal className="h-4 w-4" />;
    case 'moderator':
      return <UserCog className="h-4 w-4" />;
    case 'content_creator':
      return <Users className="h-4 w-4" />;
    case 'anonimo':
    case 'guest':
      return <Ghost className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};
