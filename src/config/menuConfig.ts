
import { UserRoleType } from '@/types/auth';
import { 
  MenuItem, 
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
} from './navigation';
import { NavigationMenus } from '@/types/navigation';

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
