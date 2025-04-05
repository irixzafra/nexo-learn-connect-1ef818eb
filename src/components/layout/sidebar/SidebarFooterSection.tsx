
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

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
  isCollapsed,
  logout
}) => {
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  return (
    <div className="space-y-2 p-2">
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
