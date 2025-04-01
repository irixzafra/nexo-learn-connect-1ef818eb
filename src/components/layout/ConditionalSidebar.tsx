
import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import SidebarMainNavigation from './sidebar/navigation/SidebarMainNavigation';
import SidebarLogoSection from './sidebar/SidebarLogoSection';
import SidebarFooterSection from './sidebar/SidebarFooterSection';
import AdminNavigation from '@/components/admin/AdminNavigation';

interface ConditionalSidebarProps {
  userRole: UserRoleType;
  effectiveRole: UserRoleType;
  messagesCount: number;
  notificationsCount: number;
  isCollapsed: boolean;
  currentViewRole: 'current' | UserRoleType;
  currentLanguage: string;
  languages: Array<{ code: string; name: string }>;
  handleRoleChange: (role: UserRoleType) => void;
  getRoleName: (role: UserRoleType) => string;
  getHomePath: (role: UserRoleType) => string;
  changeLanguage: (code: string) => void;
}

const ConditionalSidebar: React.FC<ConditionalSidebarProps> = ({
  userRole,
  effectiveRole,
  messagesCount,
  notificationsCount,
  isCollapsed,
  currentViewRole,
  currentLanguage,
  languages,
  handleRoleChange,
  getRoleName,
  getHomePath,
  changeLanguage
}) => {
  const location = useLocation();
  const { toggleSidebar } = useSidebar();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="h-full flex flex-col py-4 bg-background border-r border-border">
      {/* Logo at the top with full title and subtitle */}
      <SidebarLogoSection isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Navigation or Admin Navigation based on the route */}
      {isAdminPage ? (
        <AdminNavigation enabled={true} />
      ) : (
        <SidebarMainNavigation 
          effectiveRole={effectiveRole}
          isCollapsed={isCollapsed}
          messagesCount={messagesCount}
          notificationsCount={notificationsCount}
          getHomePath={() => getHomePath(effectiveRole)}
        />
      )}
      
      {/* Footer Section with Role Switcher and Language Selector */}
      <SidebarFooterSection 
        userRole={userRole}
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

export default ConditionalSidebar;
