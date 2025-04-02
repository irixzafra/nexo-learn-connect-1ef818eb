
import React from 'react';
import { Home } from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import MenuItem from './common/MenuItem';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { Badge } from '@/components/ui/badge';

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
  const getNotificationBadge = () => {
    if (notificationsCount === 0) return null;
    
    return (
      <Badge 
        variant="secondary" 
        className="ml-2 px-1 min-w-[1.5rem] text-center"
      >
        {notificationsCount}
      </Badge>
    );
  };

  return (
    <div className="mb-2">
      <MenuItem
        to={homePath}
        icon={Home}
        label="Inicio"
        isCollapsed={isCollapsed}
        badge={getNotificationBadge()}
      />
    </div>
  );
};

export default HomeNavigation;
