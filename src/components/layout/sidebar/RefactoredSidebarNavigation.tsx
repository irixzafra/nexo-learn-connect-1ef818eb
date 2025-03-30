
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';

// Import subcomponents
import SidebarFooterSection from './SidebarFooterSection';
import SidebarMainNavigation from './navigation/SidebarMainNavigation';
import SidebarLogoSection from './SidebarLogoSection';
import { useSidebarNavigation } from './hooks/useSidebarNavigation';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRoleType;
  onRoleChange?: (role: UserRoleType) => void;
}

const RefactoredSidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { userRole } = useAuth();
  const { state } = useSidebar();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  
  const {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    effectiveRole,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  } = useSidebarNavigation(toUserRoleType(userRole as string), viewAsRole, onRoleChange);

  // Mostrar Landing Page para usuarios anónimos
  if (effectiveRole === 'anonimo') {
    return null; // Los usuarios anónimos solo ven la Landing Page
  }

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  return (
    <div className="h-full flex flex-col py-4">
      {/* Logo at the top with full title and subtitle */}
      <SidebarLogoSection isCollapsed={isCollapsed} toggleSidebar={null} />

      {/* Main Navigation Section */}
      <SidebarMainNavigation 
        effectiveRole={effectiveRole}
        isCollapsed={isCollapsed}
        messagesCount={messagesCount}
        notificationsCount={notificationsCount}
        getHomePath={() => getHomePath(effectiveRole)}
      />
      
      {/* Footer Section with Role Switcher and Language Selector */}
      <SidebarFooterSection 
        userRole={toUserRoleType(userRole as string)}
        isCollapsed={isCollapsed}
        effectiveRole={effectiveRole}
        currentViewRole={currentViewRole}
        handleRoleChange={handleRoleChange}
        getRoleName={getRoleName}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
      />
    </div>
  );
};

export default RefactoredSidebarNavigation;
