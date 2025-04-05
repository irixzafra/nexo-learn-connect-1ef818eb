
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Settings, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EnhancedRoleSimulator from '@/components/layout/header/role-simulator/EnhancedRoleSimulator';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { SupportedLanguage } from '@/contexts/LanguageContext';
import RoleBadge from '@/components/layout/header/role-simulator/RoleBadge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className={cn("p-2 flex flex-col gap-1", isCollapsed ? "items-center" : "")}>
      {/* Role Indicator - Compact design */}
      {userRole === 'admin' && (
        <div className={cn("mb-1 w-full", isCollapsed ? "flex justify-center" : "")}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    "w-9 h-9 rounded-full p-0", 
                    isViewingAsOtherRole && "ring-1 ring-primary"
                  )}
                  onClick={() => window.open('/app/admin/roles', '_self')}
                >
                  <RoleBadge role={effectiveRole as UserRoleType} showText={false} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Vista como: {effectiveRole}</p>
                <p className="text-xs text-muted-foreground">Clic para cambiar rol</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <EnhancedRoleSimulator compact={isCollapsed} />
          )}
        </div>
      )}

      <div className={cn("flex", isCollapsed ? "flex-col items-center" : "justify-between w-full")}>
        {/* Left side actions */}
        <div className={cn("flex", isCollapsed ? "flex-col gap-1" : "gap-1")}>
          {/* Language Selector - More compact */}
          <LanguageSelector 
            currentLanguage={currentLanguage as SupportedLanguage}
            languages={languages}
            onChange={changeLanguage}
            variant={isCollapsed ? "minimal" : "icon"}
            align="center"
          />
        
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
    </div>
  );
};

export default SidebarFooterSection;
