
import { UserRoleType } from '@/types/auth';
import { 
  MenuItem, 
  NavigationMenus,
  adminNavigation,
  exploreNavigation,
  instructorNavigation,
  academicNavigation,
  financeNavigation,
  settingsNavigation,
  mainNavigation,
  filterMenuItemsByRole,
  getHomePathByRole,
  getNavigationByRole
} from './navigation';

// Re-export everything for backward compatibility
export {
  mainNavigation,
  adminNavigation,
  exploreNavigation,
  instructorNavigation,
  academicNavigation,
  financeNavigation,
  settingsNavigation,
  filterMenuItemsByRole,
  getHomePathByRole,
  getNavigationByRole
};

// Re-export types
export type { MenuItem, NavigationMenus };
