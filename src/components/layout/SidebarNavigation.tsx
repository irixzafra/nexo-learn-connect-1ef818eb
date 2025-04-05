
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { useNotifications } from '@/hooks/useNotifications';
import { useSidebarNavigation } from '@/hooks/useSidebarNavigation';
import ConditionalSidebar from './ConditionalSidebar';
import { getRoleName, getHomePath } from '@/utils/roleUtils';

interface SidebarNavigationProps {
  viewAsRole?: UserRoleType | null;
  onRoleChange?: (role: UserRoleType) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { userRole, effectiveRole } = useAuth();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  
  const {
    currentViewRole,
  } = useSidebarNavigation(
    toUserRoleType(userRole as string), 
    viewAsRole,
    onRoleChange
  );

  return (
    <ConditionalSidebar
      userRole={toUserRoleType(userRole as string)}
      effectiveRole={effectiveRole || toUserRoleType(userRole as string)}
      messagesCount={messagesCount}
      notificationsCount={notificationsCount}
      currentViewRole={currentViewRole}
      getRoleName={getRoleName}
      getHomePath={getHomePath}
    />
  );
};

export default SidebarNavigation;
