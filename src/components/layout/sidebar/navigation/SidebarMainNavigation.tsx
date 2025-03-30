
import React from 'react';
import { cn } from '@/lib/utils';
import { UserRoleType } from '@/types/auth';
import SidebarNavItems from './SidebarNavItems';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  return (
    <div className={cn(
      "flex-1 overflow-auto",
      isCollapsed ? "px-2" : "px-4"
    )}>
      <div className="space-y-1 pt-4">
        <SidebarNavItems 
          role={effectiveRole}
          isCollapsed={isCollapsed}
          notificationsCount={notificationsCount}
          messagesCount={messagesCount}
        />
      </div>
    </div>
  );
};

export default SidebarMainNavigation;
