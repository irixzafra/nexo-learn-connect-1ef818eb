
import React, { useState } from 'react';
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

  // Get current language name for display
  const getCurrentLanguageName = (): string => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.name : 'Español';
  };
  
  // If sidebar is collapsed, show only minimal UI with icons
  if (isCollapsed) {
    return (
      <div className="mt-auto flex flex-col items-center gap-3 px-2 py-4">
        {/* Language Selector - Collapsed */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <span>{getLanguageFlag(currentLanguage)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="right">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{getLanguageFlag(lang.code)}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Cambiar idioma</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Role Switcher - Only for admins - Collapsed */}
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
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" side="right">
                  {(['admin', 'instructor', 'student', 'sistemas', 'anonimo'] as UserRoleType[]).map((role) => (
                    <DropdownMenuItem 
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className="cursor-pointer"
                    >
                      <RoleIndicator role={role} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Vista previa como otro rol</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  }
  
  // If sidebar is expanded, show more detailed UI
  return (
    <div className="mt-auto flex flex-col gap-3 px-3 py-4">
      <div className="flex justify-between items-center">
        {/* Language Selector - Expanded */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 w-full justify-start">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{getCurrentLanguageName()}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="cursor-pointer"
              >
                <span className="mr-2">{getLanguageFlag(lang.code)}</span>
                <span>{lang.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Role Switcher - Only for admins - Expanded */}
      {userRole === 'admin' && (
        <div className="flex justify-between items-center mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 w-full justify-start">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Vista como: {getRoleName(effectiveRole)}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
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
        </div>
      )}
    </div>
  );
};

export default SidebarFooterSection;
