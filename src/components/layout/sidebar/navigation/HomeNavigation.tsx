
import React from 'react';
import { Home } from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import MenuItem from './common/MenuItem';

interface HomeNavigationProps {
  role: UserRoleType;
  notificationsCount: number;
  homePath?: string;
  isCollapsed: boolean;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ 
  role, 
  notificationsCount, 
  homePath = '/',
  isCollapsed
}) => {
  return (
    <div className="mb-2">
      <MenuItem
        to={homePath}
        icon={Home}
        label="Inicio"
        isCollapsed={isCollapsed}
        badge={notificationsCount > 0 ? notificationsCount : undefined}
      />
    </div>
  );
};

export default HomeNavigation;
