
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { SidebarMainNavigation } from './sidebar/navigation/SidebarMainNavigation';
import SidebarLogoSection from './sidebar/SidebarLogoSection';
import SidebarFooterSection from './sidebar/SidebarFooterSection';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';

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
  const { logout, resetToOriginalRole, isViewingAsOtherRole } = useAuth();

  return (
    <div className={cn(
      "h-full flex flex-col pb-2 bg-background border-r border-border/50 transition-all",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Logo at the top with full title and subtitle */}
      <div className="p-3 border-b border-border/30 mb-1">
        <SidebarLogoSection isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      </div>

      {/* Navegación principal para todas las rutas */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent px-2">
        <SidebarMainNavigation 
          effectiveRole={effectiveRole}
          messagesCount={messagesCount}
          notificationsCount={notificationsCount}
          getHomePath={() => getHomePath(effectiveRole)}
          isCollapsed={isCollapsed}
        />
      </div>
      
      {/* Footer Section with Role Switcher and Language Selector */}
      <div className="mt-auto border-t border-border/40 pt-2 px-2">
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
          isViewingAsOtherRole={isViewingAsOtherRole}
          resetToOriginalRole={resetToOriginalRole}
        />
      </div>
    </div>
  );
};

export default ConditionalSidebar;
