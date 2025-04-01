
import { UserRoleType } from '@/types/auth';
import { NavigationMenus } from '@/types/navigation';
import { mainNavigation } from './mainNavigation';
import { adminNavigation } from './adminNavigation';
import { exploreNavigation } from './exploreNavigation';
import { instructorNavigation } from './instructorNavigation';
import { academicNavigation } from './academicNavigation';
import { financeNavigation } from './financeNavigation';
import { settingsNavigation } from './settingsNavigation';
import { gamificationNavigation } from './gamificationNavigation';
import { filterMenuItemsByRole, getHomePathByRole } from './utils';

export * from './types';
export * from './mainNavigation';
export * from './adminNavigation';
export * from './exploreNavigation';
export * from './instructorNavigation';
export * from './academicNavigation';
export * from './financeNavigation';
export * from './settingsNavigation';
export * from './gamificationNavigation';
export * from './utils';

/**
 * Obtiene todos los menús filtrados por rol de usuario
 * @param role Rol del usuario
 */
export const getNavigationByRole = (role: UserRoleType): NavigationMenus => {
  // Using as any to bridge the type gap between the two MenuItem interfaces
  // This is safe because we control both interfaces and ensure they're compatible
  return {
    main: filterMenuItemsByRole(mainNavigation as any, role),
    admin: filterMenuItemsByRole(adminNavigation as any, role),
    explore: filterMenuItemsByRole(exploreNavigation as any, role),
    instructor: filterMenuItemsByRole(instructorNavigation as any, role),
    academic: filterMenuItemsByRole(academicNavigation as any, role),
    finance: filterMenuItemsByRole(financeNavigation as any, role),
    settings: filterMenuItemsByRole(settingsNavigation as any, role),
    gamification: filterMenuItemsByRole(gamificationNavigation as any, role)
  };
};
