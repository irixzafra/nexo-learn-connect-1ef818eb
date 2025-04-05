import { useState, useEffect, useCallback } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { getNavigationByRole } from '@/config/navigation';
import { useAuth } from '@/contexts/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { fetchNavigationItems } from '@/services/navigationService';

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
  const { state } = useSidebar();
  const { setSimulatedRole } = useAuth();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    if (viewAsRole && viewAsRole !== currentViewRole) {
      setCurrentViewRole(viewAsRole);
      setIsUsingSimulatedRole(viewAsRole !== userRole);
    }
  }, [viewAsRole, userRole, currentViewRole]);

  // Load navigation items for the current role
  useEffect(() => {
    const loadItems = async () => {
      try {
        // Get navigation from API or config
        const navigationItems = await fetchNavigationItems(currentViewRole);
        setMenuItems(navigationItems);
      } catch (error) {
        console.error('Error loading navigation items:', error);
        // Fallback to static configuration
        const fallbackItems = await fetchNavigationItems(currentViewRole);
        setMenuItems(fallbackItems);
      }
    };
    
    loadItems();
  }, [currentViewRole]);

  const handleRoleChange = useCallback((role: UserRoleType) => {
    console.log('>>> DEBUG useSidebarNavigation: handleRoleChange called with:', role);
    setCurrentViewRole(role);
    setSimulatedRole(role);
    
    // Call the onRoleChange callback if provided
    if (onRoleChange) {
      onRoleChange(role);
    }
  }, [onRoleChange, setSimulatedRole]);

  // Function to get navigation items by role
  const getNavigationItemsByRole = (role?: UserRoleType) => {
    const roleToUse = role || currentViewRole;
    return getNavigationByRole(roleToUse);
  };

  return {
    menuItems,
    currentRole: userRole,
    currentViewRole,
    isCollapsed,
    isUsingSimulatedRole,
    getNavigationItemsByRole,
    handleRoleChange
  };
}
