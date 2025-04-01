
import { UserRoleType } from '@/types/auth';
import { MenuItem } from './types';

/**
 * Filtra un array de ítems de menú según el rol del usuario
 * @param items Array de ítems de menú
 * @param role Rol del usuario actual
 * @returns Array de ítems filtrados que el usuario puede ver
 */
export const filterMenuItemsByRole = (items: MenuItem[], role: UserRoleType): MenuItem[] => {
  return items.filter(item => {
    if (!item.requiredRole) return true;
    
    if (Array.isArray(item.requiredRole)) {
      return item.requiredRole.includes(role);
    }
    
    return item.requiredRole === role;
  });
};

/**
 * Obtiene la ruta de inicio según el rol del usuario
 * @param role Rol del usuario
 */
export const getHomePathByRole = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'instructor':
      return '/instructor/dashboard';
    case 'sistemas':
      return '/admin/systems';
    case 'moderator':
      return '/moderation/dashboard';
    case 'content_creator':
      return '/content/dashboard';
    case 'beta_tester':
      return '/beta/dashboard';
    default:
      return '/home';
  }
};
