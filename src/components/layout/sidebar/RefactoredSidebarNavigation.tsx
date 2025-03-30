
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';
import { useLocation } from 'react-router-dom';

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
  const { user, session, profile } = useAuth();
  const { state } = useSidebar();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  const location = useLocation();
  
  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/landing' || location.pathname === '/';
  
  // Extract the user role from the profile
  const currentUserRole = profile?.role || 'student';
  
  const {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    effectiveRole,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  } = useSidebarNavigation(toUserRoleType(currentUserRole), viewAsRole, onRoleChange);

  // Don't show sidebar for anonymous users on landing page
  if (effectiveRole === 'anonimo' && isLandingPage) {
    return null;
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
        userRole={toUserRoleType(currentUserRole)}
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
