
import React from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { RoleIndicator } from '../header/RoleIndicator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Types for SidebarFooterSection
interface SidebarFooterSectionProps {
  userRole: UserRoleType;
  isCollapsed: boolean;
  effectiveRole: UserRoleType;
  currentViewRole: 'current' | UserRoleType;
  handleRoleChange: (role: UserRoleType) => void;
  getRoleName: (role: UserRoleType) => string;
  currentLanguage: string;
  languages: { code: string; name: string }[];
  changeLanguage: (code: string) => void;
}

const SidebarFooterSection: React.FC<SidebarFooterSectionProps> = ({
  userRole,
  isCollapsed,
  effectiveRole,
  currentViewRole,
  handleRoleChange,
  getRoleName,
  currentLanguage,
  languages,
  changeLanguage
}) => {
  const isViewingAsOtherRole = currentViewRole !== 'current' && toUserRoleType(currentViewRole as string) !== userRole;
  
  // Get language flag emoji based on language code
  const getLanguageFlag = (code: string): string => {
    switch (code) {
      case 'es': return '🇪🇸';
      case 'en': return '🇺🇸';
      case 'pt': return '🇧🇷';
      default: return '🌐';
    }
  };

  return (
    <div className="mt-auto flex items-center justify-between gap-2 px-2 py-4">
      {/* Language Selector - Icon only */}
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Cambiar idioma</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isCollapsed ? "center" : "start"} side={isCollapsed ? "right" : "top"}>
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <span>{getLanguageFlag(lang.code)}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side={isCollapsed ? "right" : "bottom"}>
          <p>Cambiar idioma</p>
        </TooltipContent>
      </Tooltip>
      
      {/* Role Switcher - Only for admins - Icon only */}
      {userRole === 'admin' && (
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                >
                  <Users className="h-4 w-4" />
                  <span className="sr-only">Vista previa como otro rol</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isCollapsed ? "center" : "end"} side={isCollapsed ? "right" : "top"}>
                {(['admin', 'instructor', 'student', 'sistemas', 'anonimo'] as UserRoleType[]).map((role) => (
                  <DropdownMenuItem 
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`cursor-pointer ${effectiveRole === role ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <RoleIndicator role={role} />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent side={isCollapsed ? "right" : "bottom"}>
            <p>Vista previa como otro rol</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default SidebarFooterSection;
