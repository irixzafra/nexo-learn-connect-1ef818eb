
import React from 'react';
import { UserRole } from '@/types/auth';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserRoleType } from '@/features/users/UserRoleType';
import { Shield, Globe } from 'lucide-react';

interface SidebarFooterSectionProps {
  userRole: UserRole | null;
  isCollapsed: boolean;
  effectiveRole: UserRole;
  currentViewRole: 'current' | UserRole;
  handleRoleChange: (role: UserRole) => void;
  getRoleName: (role: UserRole) => string;
  currentLanguage: string;
  languages: { code: string; name: string }[];
  changeLanguage: (langCode: string) => void;
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
  // Available roles for switching view
  const availableRoles: UserRole[] = ['admin', 'instructor', 'student', 'sistemas', 'anonimo'];

  return (
    <div className="mt-auto pt-4 border-t px-4">
      {/* Role Switcher - Only shown for admins */}
      {userRole === 'admin' && (
        <div className="mb-3">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Shield className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Cambiar vista de rol</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                  <Shield className="h-4 w-4" />
                  <span>{getRoleName(effectiveRole as UserRole)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {availableRoles.map(role => (
                  <DropdownMenuItem 
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={cn(
                      "cursor-pointer",
                      currentViewRole === role && "font-bold bg-primary/10"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <UserRoleType role={role} />
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
      
      {/* Language Switcher */}
      <div className="mb-3 flex justify-center">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Cambiar idioma</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                <Globe className="h-4 w-4" />
                <span>{languages.find(lang => lang.code === currentLanguage)?.name || 'Idioma'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {languages.map(lang => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn(
                    "cursor-pointer",
                    currentLanguage === lang.code && "font-bold bg-primary/10"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Nexo Academia © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default SidebarFooterSection;
