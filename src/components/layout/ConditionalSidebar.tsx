
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
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
  currentViewRole
}) => {
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
