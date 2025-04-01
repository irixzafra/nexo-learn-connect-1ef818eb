
import { UserRoleType } from '@/types/auth';
import { NavigationMenus } from './types';
import { mainNavigation } from './mainNavigation';
import { adminNavigation } from './adminNavigation';
import { gamificationNavigation } from './gamificationNavigation';
import { filterMenuItemsByRole, getHomePathByRole } from './utils';

export * from './types';
export * from './mainNavigation';
export * from './adminNavigation';
export * from './gamificationNavigation';
export * from './utils';

/**
 * Obtiene todos los menús filtrados por rol de usuario
 * @param role Rol del usuario
 */
export const getNavigationByRole = (role: UserRoleType): NavigationMenus => {
  return {
    main: filterMenuItemsByRole(mainNavigation, role),
    admin: filterMenuItemsByRole(adminNavigation, role),
    gamification: filterMenuItemsByRole(gamificationNavigation, role)
  };
};
