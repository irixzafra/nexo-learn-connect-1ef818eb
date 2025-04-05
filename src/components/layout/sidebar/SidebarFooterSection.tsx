
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Settings, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { SupportedLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Only for admin users when role simulation is needed
import EnhancedRoleSimulator from '@/components/layout/header/role-simulator/EnhancedRoleSimulator';
import RoleBadge from '@/components/layout/header/role-simulator/RoleBadge';

interface SidebarFooterProps {
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isCollapsed: boolean;
  currentLanguage: string; 
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (code: string) => void;
  logout: () => void;
  isViewingAsOtherRole?: boolean;
  resetToOriginalRole?: () => void;
  forceAdminRole?: () => Promise<void>;
}

const SidebarFooterSection: React.FC<SidebarFooterProps> = ({
  userRole,
  effectiveRole,
  isCollapsed,
  currentLanguage,
  languages,
  changeLanguage,
  logout,
  isViewingAsOtherRole,
  resetToOriginalRole
}) => {
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      {/* Footer Controls as defined in NAVIGATION.md */}
      <div className={cn(
        "flex items-center gap-1", 
        isCollapsed ? "justify-center" : "justify-between w-full"
      )}>
        {/* Left side actions */}
        <div className="flex items-center gap-1">
          {/* Language Selector */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <LanguageSelector 
                  currentLanguage={currentLanguage as SupportedLanguage}
                  languages={languages}
                  onChange={changeLanguage}
                  variant={isCollapsed ? "minimal" : "icon"}
                  align="center"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side={isCollapsed ? "right" : "top"}>
              <p>Cambiar idioma</p>
            </TooltipContent>
          </Tooltip>
        
          {/* Settings Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => console.log('Settings clicked')}
              >
                <Settings className="h-4 w-4" />
                <span className="sr-only">Configuración</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isCollapsed ? "right" : "top"}>
              <p>Configuración</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Right side action */}
        <div>
          {/* Logout Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-red-500 hover:bg-red-500/10 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isCollapsed ? "right" : "top"}>
              <p>Cerrar sesión</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Admin role simulator - only shown when user is admin */}
      {userRole === 'admin' && (
        <div className="text-xs text-center text-muted-foreground pt-1">
          <EnhancedRoleSimulator compact={true} />
        </div>
      )}
    </div>
  );
};

export default SidebarFooterSection;
