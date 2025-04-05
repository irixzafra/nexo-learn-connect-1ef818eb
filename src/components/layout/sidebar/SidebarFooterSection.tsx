
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EnhancedRoleSimulator from '@/components/layout/header/role-simulator/EnhancedRoleSimulator';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { SupportedLanguage } from '@/contexts/LanguageContext';

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
  resetToOriginalRole,
  forceAdminRole
}) => {
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  return (
    <div className="space-y-4 p-3">
      {/* Role Switcher - Only for admins */}
      {userRole === 'admin' && (
        <div className="mb-2 pb-2 border-b border-border">
          <EnhancedRoleSimulator compact={isCollapsed} />
        </div>
      )}

      {/* Language Selector */}
      <div className="mb-2">
        {isCollapsed ? (
          <div className="flex justify-center">
            <LanguageSelector 
              currentLanguage={currentLanguage as SupportedLanguage}
              languages={languages}
              onChange={changeLanguage}
              variant="minimal"
              align="center"
            />
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-1 px-1">Idioma</p>
            <LanguageSelector 
              currentLanguage={currentLanguage as SupportedLanguage}
              languages={languages}
              onChange={changeLanguage}
              variant="full"
              align="center"
            />
          </>
        )}
      </div>

      {/* Settings Button */}
      <Button
        variant="ghost"
        className={cn(
          "w-full font-normal",
          isCollapsed ? "justify-center px-2" : "justify-start px-3"
        )}
        onClick={() => console.log('Settings clicked')}
      >
        <Settings className="h-4 w-4 mr-2" />
        {!isCollapsed && <span>Configuración</span>}
      </Button>

      {/* Logout Button */}
      <Button
        variant="ghost"
        className={cn(
          "w-full font-normal",
          isCollapsed ? "justify-center px-2" : "justify-start px-3"
        )}
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        {!isCollapsed && <span>Cerrar sesión</span>}
      </Button>
    </div>
  );
};

export default SidebarFooterSection;
