
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { useNotifications } from '@/hooks/useNotifications';
import { useSidebarNavigation } from '@/components/layout/sidebar/hooks/useSidebarNavigation';
import { getRoleName, getHomePath } from '@/utils/roleUtils';
import { SidebarMainNavigation } from './navigation/SidebarMainNavigation';
import SidebarFooterSection from './SidebarFooterSection';

interface SidebarNavigationProps {
  viewAsRole?: UserRoleType | null;
  onRoleChange?: (role: UserRoleType) => void;
  isCollapsed?: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  viewAsRole,
  onRoleChange,
  isCollapsed = false
}) => {
  const { userRole, effectiveRole, logout, resetToOriginalRole, isViewingAsOtherRole } = useAuth();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Demo value - replace with actual unread message count

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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <SidebarMainNavigation
          effectiveRole={toUserRoleType(effectiveRole as string)}
          messagesCount={messagesCount}
          notificationsCount={notificationsCount}
          getHomePath={() => getHomePath(effectiveRole as UserRoleType)}
          isCollapsed={isCollapsed}
        />
      </div>
      
      <div className="mt-auto">
        <SidebarFooterSection
          userRole={toUserRoleType(userRole as string)}
          effectiveRole={toUserRoleType(effectiveRole as string)}
          isCollapsed={isCollapsed}
          currentViewRole={currentViewRole}
          getRoleName={getRoleName}
          currentLanguage={currentLanguage}
          languages={languages}
          changeLanguage={changeLanguage}
          logout={logout}
          isViewingAsOtherRole={isViewingAsOtherRole}
          resetToOriginalRole={resetToOriginalRole}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
