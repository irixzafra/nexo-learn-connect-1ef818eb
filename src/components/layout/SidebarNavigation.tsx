
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';
import { useSidebarNavigation } from '@/components/layout/sidebar/hooks/useSidebarNavigation';
import ConditionalSidebar from './ConditionalSidebar';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRoleType;
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
  
  const {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    handleRoleChange,
    getRoleName,
    getHomePath,
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
      effectiveRole={effectiveRole || toUserRoleType(userRole as string)}
      messagesCount={messagesCount}
      notificationsCount={notificationsCount}
      isCollapsed={isCollapsed}
      currentViewRole={currentViewRole}
      currentLanguage={currentLanguage}
      languages={languages}
      handleRoleChange={handleRoleChange}
      getRoleName={getRoleName}
      getHomePath={getHomePath}
      changeLanguage={changeLanguage}
    />
  );
};

export default SidebarNavigation;
