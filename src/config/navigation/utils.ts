
import { UserRoleType } from '@/types/auth';
import { MenuItem, NavigationMenus } from './types';

/**
 * Filtra ítems de menú según el rol del usuario
 * @param items Lista de ítems de menú
 * @param role Rol del usuario actual
 */
export const filterMenuItemsByRole = (items: MenuItem[], role: UserRoleType): MenuItem[] => {
  return items.filter(item => {
    if (!item.requiredRole) return true;
    
    if (Array.isArray(item.requiredRole)) {
      return item.requiredRole.includes(role);
    } else {
      return item.requiredRole === role;
    }
  });
};

/**
 * Determina la ruta de inicio según el rol
 * @param role Rol del usuario
 */
export const getHomePathByRole = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'instructor':
      return '/instructor/dashboard';
    case 'student':
    default:
      return '/home';
  }
};
