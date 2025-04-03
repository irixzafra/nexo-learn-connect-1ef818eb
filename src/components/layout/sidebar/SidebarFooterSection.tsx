
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRoleType } from '@/types/auth';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { PowerIcon, BellIcon } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';
import { useAuth } from '@/contexts/auth';

interface SidebarFooterSectionProps {
  userRole: UserRoleType;
  isCollapsed: boolean;
  effectiveRole: UserRoleType;
  currentViewRole: UserRoleType | null;
  handleRoleChange: (role: UserRoleType) => void;
  getRoleName: (role: UserRoleType) => string;
  currentLanguage: string;
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (language: string) => void;
  logout: () => void;
  resetToOriginalRole: () => void;
}

const SidebarFooterSection: React.FC<SidebarFooterSectionProps> = ({
  isCollapsed,
  currentViewRole,
  handleRoleChange,
  getRoleName,
  currentLanguage,
  languages,
  changeLanguage,
  userRole: propUserRole,
  effectiveRole,
  logout,
  resetToOriginalRole
}) => {
  // Get userRole directly from context for debugging
  const { userRole } = useAuth();
  const unreadNotifications = 3; // Example count - replace with actual state
  
  console.log('>>> DEBUG SidebarFooterSection:', { 
    userRole, 
    propUserRole,
    effectiveRole,
    isConditionMet: userRole === 'admin' 
  });

  // Verificar si el usuario es administrador y si está viendo como otro rol
  const isViewingAsOtherRole = userRole === 'admin' && effectiveRole !== userRole;

  // --- BLOQUE DE DEPURACIÓN TEMPORAL ---
  if (process.env.NODE_ENV === 'development') { // Solo en desarrollo
    return (
      <div style={{ border: '2px solid red', padding: '5px', margin: '5px', backgroundColor: 'lightyellow', color: 'black' }}>
        <p>DEBUG SidebarFooterSection:</p>
        <p>userRole (from context): {JSON.stringify(userRole)}</p>
        <p>userRole (from props): {JSON.stringify(propUserRole)}</p>
        <p>Condition (userRole === 'admin'): {JSON.stringify(userRole === 'admin')}</p>
      </div>
    );
  }
  // --- FIN BLOQUE DE DEPURACIÓN ---

  return (
    <div className="mt-auto pt-2">
      {/* Add RoleSwitcher for admin users */}
      {userRole === 'admin' && (
        <div className={cn(
          "px-3 pb-3 border-b border-border",
          isCollapsed ? "flex justify-center" : ""
        )}>
          <RoleSwitcher 
            className={cn(
              "w-full",
              isCollapsed ? "scale-75" : ""
            )}
          />
        </div>
      )}
      
      <div className={cn(
        "flex items-center",
        isCollapsed ? "justify-center space-y-4 flex-col" : "justify-between px-3 pb-2"
      )}>
        {/* User Menu - Always at the left (or centered when collapsed) */}
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col space-y-3" : "space-x-2"
        )}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={logout}
          >
            <PowerIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
          
          {/* Reset role button (visible only when viewing as another role) */}
          {isViewingAsOtherRole && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={resetToOriginalRole}
            >
              Volver a admin
            </Button>
          )}
        </div>
        
        {/* Tools Group - Always aligned (right or centered when collapsed) */}
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col space-y-3" : "space-x-2"
        )}>
          {/* Notifications Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full relative"
              >
                <BellIcon className="h-4 w-4 text-muted-foreground" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Notificaciones</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Language Selector */}
          <LanguageSelector variant={isCollapsed ? 'minimal' : 'icon'} />
          
          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SidebarFooterSection;
