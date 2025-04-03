
import { UserRoleType } from '@/types/auth';
import { Shield, BookOpen, GraduationCap, Terminal, Ghost, UserCog, Users } from 'lucide-react';

/**
 * Get the friendly display name for a role
 */
export const getRoleName = (role: string): string => {
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
    default:
      return role.charAt(0).toUpperCase() + role.slice(1);
  }
};

/**
 * Get the badge styling based on the role
 */
export const getRoleBadgeColor = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200';
    case 'instructor':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200';
    case 'student':
      return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200';
    case 'sistemas':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200';
    case 'moderator':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200';
    case 'content_creator':
      return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300';
  }
};

/**
 * Get an appropriate icon for each role
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

// List of available roles for quick selection
export const availableRoles: UserRoleType[] = [
  'admin',
  'instructor',
  'student',
  'sistemas',
  'moderator',
  'content_creator',
  'guest',
  'anonimo'
];
