
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Settings, Globe, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import RoleIndicator from '@/components/layout/header/RoleIndicator';
import EnhancedRoleSimulator from '@/components/layout/header/role-simulator/EnhancedRoleSimulator';

interface SidebarFooterProps {
  userRole: UserRoleType;
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  currentLanguage: string; 
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (code: string) => void;
  logout: () => void;
  currentViewRole?: UserRoleType | null;
  getRoleName?: (role: UserRoleType) => string;
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
  currentViewRole,
  getRoleName,
  isViewingAsOtherRole,
  resetToOriginalRole,
  forceAdminRole
}) => {
  // Check if user is an administrator (has admin role)
  const isAdmin = userRole === 'admin';

  return (
    <div className="space-y-2 p-2">
      {/* Role Switcher - Only for admins */}
      {isAdmin && (
        <div className={cn(
          "mb-2 pb-2 border-b border-border",
          isCollapsed ? "px-2" : "px-4"
        )}>
          <EnhancedRoleSimulator />
        </div>
      )}

      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full font-normal",
              isCollapsed ? "justify-center px-2" : "justify-between pl-4 pr-2"
            )}
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {!isCollapsed && <span>{languages.find(l => l.code === currentLanguage)?.name}</span>}
            </div>
            {!isCollapsed && <ChevronDown className="h-4 w-4 opacity-50" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isCollapsed ? "center" : "start"} className="w-48">
          {languages.map(lang => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "cursor-pointer",
                lang.code === currentLanguage && "bg-muted font-medium"
              )}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Button */}
      <Button
        variant="ghost"
        className={cn(
          "w-full font-normal",
          isCollapsed ? "justify-center px-2" : "justify-start pl-4"
        )}
        onClick={logout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        {!isCollapsed && <span>Cerrar sesión</span>}
      </Button>
    </div>
  );
};

export default SidebarFooterSection;
