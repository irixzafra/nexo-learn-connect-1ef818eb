
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { SidebarMainMenuItem } from './SidebarMainMenuItem';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  messagesCount: number;
  notificationsCount: number;
  navigationMenus: NavigationItemWithChildren[];
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  messagesCount,
  notificationsCount,
  navigationMenus = []
}) => {
  if (!navigationMenus.length) {
    return <div className="py-2 text-center text-muted-foreground text-sm">Loading navigation...</div>;
  }

  return (
    <nav className="space-y-1 py-2">
      {navigationMenus.map((item) => (
        <SidebarMainMenuItem
          key={item.path}
          item={item}
          badge={
            item.path === '/notifications' 
              ? notificationsCount 
              : item.path === '/messages' 
                ? messagesCount 
                : item.badge
          }
        />
      ))}
    </nav>
  );
};
