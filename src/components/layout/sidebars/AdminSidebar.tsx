
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { useNotifications } from '@/hooks/useNotifications';
import ConditionalSidebar from '../ConditionalSidebar';
import { useSidebarNavigation } from '../sidebar/hooks/useSidebarNavigation';
import { getRoleName, getHomePath } from '@/utils/roleUtils';
import { toUserRoleType } from '@/types/auth';

const AdminSidebar: React.FC = () => {
  const { userRole, effectiveRole } = useAuth();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Demo value
  const { state } = useSidebar();
  
  const {
    currentViewRole,
    currentLanguage,
    changeLanguage
  } = useSidebarNavigation(toUserRoleType(userRole as string));

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];
  
  return (
    <ConditionalSidebar 
      userRole={toUserRoleType(userRole as string)}
      effectiveRole={toUserRoleType(effectiveRole as string)}
      messagesCount={messagesCount}
      notificationsCount={notificationsCount}
      isCollapsed={state === "collapsed"}
      currentViewRole={currentViewRole}
      currentLanguage={currentLanguage}
      languages={languages}
      getRoleName={getRoleName}
      getHomePath={getHomePath}
      changeLanguage={changeLanguage}
    />
  );
};

export default AdminSidebar;
