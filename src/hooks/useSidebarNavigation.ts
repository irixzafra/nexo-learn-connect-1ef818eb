import { useState, useEffect } from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { getNavigationByRole } from '@/config/navigation';

export function useSidebarNavigation(
  userRole: UserRoleType,
  viewAsRole?: UserRoleType | null,
  onRoleChange?: (role: UserRoleType) => void
) {
  // Keep track of which role's navigation we're currently viewing
  const [currentViewRole, setCurrentViewRole] = useState<UserRoleType>(
    viewAsRole || userRole
  );
  const [menuItems, setMenuItems] = useState<NavigationItemWithChildren[]>([]);
  const [isUsingSimulatedRole, setIsUsingSimulatedRole] = useState<boolean>(
    Boolean(viewAsRole && viewAsRole !== userRole)
  );

  useEffect(() => {
    if (viewAsRole && viewAsRole !== currentViewRole) {
      setCurrentViewRole(viewAsRole);
      setIsUsingSimulatedRole(viewAsRole !== userRole);
    }
  }, [viewAsRole, userRole, currentViewRole]);

  // Load navigation items for the current role
  useEffect(() => {
    // Get navigation from config
    const navigationItems = getNavigationByRole(currentViewRole);
    setMenuItems(navigationItems as NavigationItemWithChildren[]);
  }, [currentViewRole]);

  // Function to get navigation items by role
  const getNavigationItemsByRole = (role?: UserRoleType) => {
    const roleToUse = role || currentViewRole;
    return getNavigationByRole(roleToUse);
  };

  return {
    menuItems,
    currentRole: userRole,
    currentViewRole,
    isUsingSimulatedRole,
    getNavigationItemsByRole
  };
}

export default useSidebarNavigation;
