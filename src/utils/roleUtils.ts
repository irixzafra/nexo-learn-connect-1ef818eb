
import { UserRoleType } from '@/types/auth';

/**
 * Gets the display name for a user role
 */
export const getRoleName = (role: UserRoleType): string => {
  const roleMap: Record<string, string> = {
    admin: 'Administrador',
    instructor: 'Instructor',
    student: 'Estudiante',
    moderator: 'Moderador',
    manager: 'Gestor',
    anonymous: 'Invitado'
  };
  
  return roleMap[role] || 'Usuario';
};

/**
 * Gets the home path for a specific role
 */
export const getHomePath = (role: UserRoleType): string => {
  const pathMap: Record<string, string> = {
    admin: '/app/admin/dashboard',
    instructor: '/app/instructor/dashboard',
    student: '/app/dashboard',
    moderator: '/app/moderator/dashboard',
    manager: '/app/manager/dashboard',
    anonymous: '/'
  };
  
  return pathMap[role] || '/app/dashboard';
};
