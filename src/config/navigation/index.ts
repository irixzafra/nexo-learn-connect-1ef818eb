
import { UserRoleType } from '@/types/auth';
import { NavigationMenus } from '@/types/navigation';
import { mainNavigation } from './mainNavigation';
import { adminNavigation } from './adminNavigation';
import { exploreNavigation } from './exploreNavigation';
import { instructorNavigation } from './instructorNavigation';
import { academicNavigation } from './academicNavigation';
import { financeNavigation } from './financeNavigation';
import { settingsNavigation } from './settingsNavigation';
import { filterMenuItemsByRole, getHomePathByRole } from './utils';

export * from './types';
export * from './mainNavigation';
export * from './adminNavigation';
export * from './exploreNavigation';
export * from './instructorNavigation';
export * from './academicNavigation';
export * from './financeNavigation';
export * from './settingsNavigation';
export * from './utils';

/**
 * Obtiene todos los menús filtrados por rol de usuario
 * @param role Rol del usuario
 */
export const getNavigationByRole = (role: UserRoleType): NavigationMenus => {
  return {
    main: filterMenuItemsByRole(mainNavigation, role),
    admin: filterMenuItemsByRole(adminNavigation, role),
    explore: filterMenuItemsByRole(exploreNavigation, role),
    instructor: filterMenuItemsByRole(instructorNavigation, role),
    academic: filterMenuItemsByRole(academicNavigation, role),
    finance: filterMenuItemsByRole(financeNavigation, role),
    settings: filterMenuItemsByRole(settingsNavigation, role),
    gamification: []
  };
};
