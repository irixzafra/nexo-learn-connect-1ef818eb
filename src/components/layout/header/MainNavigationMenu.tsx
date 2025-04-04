
import React from 'react';
import { UserRoleType } from '@/types/auth';

interface MainNavigationMenuProps {
  userRole: UserRoleType | null;
  hasUnreadMessages?: number;
}

const MainNavigationMenu: React.FC<MainNavigationMenuProps> = () => {
  // Return null to completely remove the old navigation menu
  return null;
};

export default MainNavigationMenu;
