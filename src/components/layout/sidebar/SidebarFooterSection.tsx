
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Settings, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EnhancedRoleSimulator from '@/components/layout/header/role-simulator/EnhancedRoleSimulator';
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

  const handleLanguageChange = (code: string) => {
    console.log('Changing language to:', code);
    changeLanguage(code);
  };

  console.log('SidebarFooterSection rendering with:', { 
    userRole, effectiveRole, isCollapsed, currentLanguage, languages 
  });

  // Function to render the language selector
  const renderLanguageSelector = () => {
    return (
      <div className={`mb-3 flex ${isCollapsed ? 'justify-center' : ''}`}>
        {isCollapsed ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8" 
            onClick={() => {
              // Cycle through languages when in collapsed mode
              const currentIndex = languages.findIndex(l => l.code === currentLanguage);
              const nextIndex = (currentIndex + 1) % languages.length;
              handleLanguageChange(languages[nextIndex].code);
            }}
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">Cambiar idioma</span>
          </Button>
        ) : (
          <div className="flex flex-col w-full gap-1">
            <p className="text-xs text-muted-foreground px-2">Idioma</p>
            <div className="flex flex-wrap gap-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={currentLanguage === lang.code ? "secondary" : "ghost"}
                  size="sm"
                  className="px-2 py-1 h-8"
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2 p-2">
      {/* Role Switcher - Only for admins */}
      {userRole === 'admin' && (
        <div className={`mb-2 pb-2 border-b border-border ${isCollapsed ? 'px-2' : 'px-4'}`}>
          <EnhancedRoleSimulator compact={isCollapsed} />
        </div>
      )}

      {/* Language Selector */}
      {renderLanguageSelector()}

      {/* Settings Button */}
      <Button
        variant="ghost"
        className={cn(
          "w-full font-normal",
          isCollapsed ? "justify-center px-2" : "justify-start pl-4"
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
          isCollapsed ? "justify-center px-2" : "justify-start pl-4"
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
