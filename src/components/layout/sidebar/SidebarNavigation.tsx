
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { useNotifications } from '@/hooks/useNotifications';
import { useSidebarNavigation } from '@/components/layout/sidebar/hooks/useSidebarNavigation';
import ConditionalSidebar from '../ConditionalSidebar';
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
  const { state } = useSidebar();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  
  // Log initial props and context values for debugging
  console.log('>>> DEBUG SidebarNavigation INIT with:', {
    userRoleFromContext: userRole,
    effectiveRoleFromContext: effectiveRole,
    viewAsRoleProp: viewAsRole,
    sidebarState: state
  });

  const {
    currentViewRole,
    currentLanguage,
    changeLanguage
  } = useSidebarNavigation(toUserRoleType(userRole as string), viewAsRole, onRoleChange);

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

export default SidebarNavigation;
