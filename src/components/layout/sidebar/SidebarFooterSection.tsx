
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
import { Globe, Users, ArrowLeftRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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
  
  return (
    <div className={cn(
      "mt-auto flex flex-col border-t border-gray-200 dark:border-gray-800",
      isCollapsed ? "items-center py-3" : "px-3 py-3"
    )}>
      {/* Si estamos viendo como otro rol, mostrar un botón destacado para volver */}
      {isViewingAsOtherRole && !isCollapsed && (
        <Button
          variant="outline"
          size="sm"
          className="mb-3 w-full flex items-center justify-center gap-1.5 text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:text-primary hover:border-primary/30"
          onClick={() => handleRoleChange(userRole)}
        >
          <ArrowLeftRight className="h-3 w-3" />
          <span className="truncate">Volver a mi rol</span>
        </Button>
      )}
      
      <div className={cn(
        "flex items-center",
        isCollapsed ? "justify-center flex-col space-y-3" : "justify-between"
      )}>
        {/* Language Selector */}
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
        
        {/* Role Switcher - Only for admins */}
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
        
        {/* Return to original role button - for collapsed sidebar */}
        {isViewingAsOtherRole && isCollapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                onClick={() => handleRoleChange(userRole)}
              >
                <ArrowLeftRight className="h-4 w-4" />
                <span className="sr-only">Volver a mi rol</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Volver a mi rol</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default SidebarFooterSection;
