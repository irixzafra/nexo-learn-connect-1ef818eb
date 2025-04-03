
import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import SidebarMainNavigation from './sidebar/navigation/SidebarMainNavigation';
import SidebarLogoSection from './sidebar/SidebarLogoSection';
import SidebarFooterSection from './sidebar/SidebarFooterSection';
import { useAuth } from '@/contexts/auth';

interface ConditionalSidebarProps {
  userRole: UserRoleType;
  effectiveRole: UserRoleType;
  messagesCount: number;
  notificationsCount: number;
  isCollapsed: boolean;
  currentViewRole: UserRoleType | null;
  currentLanguage: string;
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (code: string) => void;
  getRoleName: (role: UserRoleType) => string;
  getHomePath: (role: UserRoleType) => string;
}

/**
 * ConditionalSidebar determina qué navegación mostrar basado en la ruta actual.
 * Es un componente unificado que maneja tanto la navegación regular como la administrativa.
 */
const ConditionalSidebar: React.FC<ConditionalSidebarProps> = ({
  userRole,
  effectiveRole,
  messagesCount,
  notificationsCount,
  isCollapsed,
  currentViewRole,
  currentLanguage,
  languages,
  getRoleName,
  getHomePath,
  changeLanguage
}) => {
  const { toggleSidebar } = useSidebar();
  const { logout } = useAuth();

  console.log('>>> DEBUG ConditionalSidebar:', {
    userRoleProp: userRole,
    effectiveRoleProp: effectiveRole,
    isCollapsed,
    currentViewRole
  });

  return (
    <div className="h-full flex flex-col py-4 bg-background border-r border-border">
      {/* Logo at the top with full title and subtitle */}
      <SidebarLogoSection isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Navegación principal para todas las rutas */}
      <SidebarMainNavigation 
        effectiveRole={effectiveRole}
        messagesCount={messagesCount}
        notificationsCount={notificationsCount}
        getHomePath={() => getHomePath(effectiveRole)}
      />
      
      {/* Footer Section with Role Switcher and Language Selector */}
      <SidebarFooterSection 
        userRole={userRole}
        effectiveRole={effectiveRole}
        isCollapsed={isCollapsed}
        currentViewRole={currentViewRole}
        getRoleName={getRoleName}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
        logout={logout}
      />
    </div>
  );
};

export default ConditionalSidebar;
