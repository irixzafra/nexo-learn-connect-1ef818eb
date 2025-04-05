
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useSidebarNavigation } from '@/hooks/useSidebarNavigation';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { MenuItem } from '@/types/navigation';
import SidebarContent from './sidebar/SidebarContent';
import SidebarFooter from './sidebar/SidebarFooter';

interface ConditionalSidebarProps {
  userRole: UserRoleType;
  effectiveRole: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
  currentViewRole: UserRoleType;
  getRoleName: (role: UserRoleType) => string;
  getHomePath: (role: UserRoleType) => string;
}

const ConditionalSidebar: React.FC<ConditionalSidebarProps> = ({
  userRole,
  effectiveRole,
  messagesCount,
  notificationsCount,
  currentViewRole,
  getRoleName,
  getHomePath
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const sidebarNavigation = useSidebarNavigation(userRole, currentViewRole);

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <SidebarContent userRole={effectiveRole} />
      </div>
      
      <SidebarFooter />
    </>
  );
};

export default ConditionalSidebar;
