
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
import { UserMenu } from '../header/UserMenu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Switch } from '@/components/ui/switch';

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
    <div className="mt-auto">
      {/* User Menu */}
      <div className={`border-t pt-3 pb-2 px-3`}>
        <UserMenu />
      </div>
      
      {/* Footer Actions Row - unified in a single row */}
      <div className={`flex items-center justify-center gap-1 p-2 border-t`}>
        {/* Language Selector */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-secondary/20">
                  <Globe className="h-4 w-4 text-muted-foreground" />
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
            <p>Idioma</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Role Switcher - Only for admins */}
        {userRole === 'admin' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-secondary/20"
                  >
                    <Users className="h-4 w-4 text-muted-foreground" />
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
              <p>Cambiar rol</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default SidebarFooterSection;
