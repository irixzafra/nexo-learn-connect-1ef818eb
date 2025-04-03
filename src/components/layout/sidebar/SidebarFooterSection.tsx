
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarFooterSectionProps {
  userRole: UserRoleType;
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  currentViewRole: UserRoleType | null;
  getRoleName: (role: UserRoleType) => string;
  currentLanguage: string;
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (code: string) => void;
  logout: () => Promise<void>;
  isViewingAsOtherRole: boolean;
  resetToOriginalRole: () => void;
}

const SidebarFooterSection: React.FC<SidebarFooterSectionProps> = ({
  userRole,
  effectiveRole,
  isCollapsed,
  currentViewRole,
  getRoleName,
  currentLanguage,
  languages,
  changeLanguage,
  logout,
  isViewingAsOtherRole,
  resetToOriginalRole
}) => {
  // Language selector
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLogout = async () => {
    await logout();
  };

  if (isCollapsed) {
    return (
      <div className="mt-auto p-2 flex flex-col items-center space-y-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="w-full h-8"
        >
          <LogOut className="h-4 w-4" />
        </Button>
        
        {isViewingAsOtherRole && (
          <Button
            variant="outline"
            size="icon"
            onClick={resetToOriginalRole}
            className="w-full h-8 border-yellow-500"
          >
            <User className="h-4 w-4 text-yellow-500" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-auto p-2 space-y-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedLanguage.name}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={currentLanguage === lang.code ? "bg-muted" : ""}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Show viewing as badge and reset button if simulating a role */}
      {isViewingAsOtherRole && (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-md text-xs flex justify-between items-center">
          <span>Viendo como: <strong>{getRoleName(effectiveRole)}</strong></span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetToOriginalRole}
            className="h-6 text-xs"
          >
            Restablecer
          </Button>
        </div>
      )}

      {/* Logout Button */}
      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="w-full"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default SidebarFooterSection;
