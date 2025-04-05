
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { useNotifications } from '@/hooks/useNotifications';
import ConditionalSidebar from '../ConditionalSidebar';
import { useSidebarNavigation } from '../sidebar/hooks/useSidebarNavigation';
import { getRoleName } from '@/utils/roleUtils';
import { toUserRoleType } from '@/types/auth';
import { getHomePathByRole } from '@/config/navigation/roleBasedNavigation';

const AdminSidebar: React.FC = () => {
  const { userRole, effectiveRole } = useAuth();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Demo value
  
  const {
    currentViewRole,
  } = useSidebarNavigation(toUserRoleType(userRole as string));
  
  return (
    <ConditionalSidebar 
      userRole={toUserRoleType(userRole as string)}
      effectiveRole={toUserRoleType(effectiveRole as string)}
      messagesCount={messagesCount}
      notificationsCount={notificationsCount}
      currentViewRole={currentViewRole}
      getRoleName={getRoleName}
      getHomePath={getHomePathByRole}
    />
  );
};

export default AdminSidebar;
