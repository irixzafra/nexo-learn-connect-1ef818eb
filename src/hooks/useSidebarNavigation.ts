
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { useDynamicNavigation } from './useDynamicNavigation';

export const useSidebarNavigation = (
  userRole: UserRoleType,
  viewAsRole?: UserRoleType | null,
  onRoleChange?: (role: UserRoleType) => void
) => {
  const { menuItems, currentViewRole, isUsingSimulatedRole } = useDynamicNavigation(
    userRole,
    viewAsRole
  );
  
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  return {
    menuItems,
    currentViewRole,
    isUsingSimulatedRole,
    selectedItem,
    setSelectedItem
  };
};

export default useSidebarNavigation;
