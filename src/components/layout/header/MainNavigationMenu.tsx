
import React from 'react';
import { UserRoleType } from '@/types/auth';

interface MainNavigationMenuProps {
  userRole: UserRoleType | null;
  hasUnreadMessages?: number;
}

const MainNavigationMenu: React.FC<MainNavigationMenuProps> = () => {
  // Render nothing - removing horizontal menu as requested
  return null;
};

export default MainNavigationMenu;
