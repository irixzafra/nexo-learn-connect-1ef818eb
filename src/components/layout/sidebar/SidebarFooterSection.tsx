
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Settings, Globe, LogOut, RefreshCw, ChevronDown } from 'lucide-react';
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
  currentViewRole: UserRoleType | null;
  currentLanguage: string; 
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (code: string) => void;
  logout: () => void;
  isViewingAsOtherRole: boolean;
  resetToOriginalRole: () => void;
  getRoleName: (role: UserRoleType) => string;
}

const SidebarFooterSection: React.FC<SidebarFooterProps> = ({
  userRole,
  effectiveRole,
  isCollapsed,
  currentViewRole,
  currentLanguage,
  languages,
  changeLanguage,
  logout,
  isViewingAsOtherRole,
  resetToOriginalRole,
  getRoleName
}) => {
  // Only show role switcher if original user role is admin
  const showRoleSwitcher = userRole === 'admin';
  
  // Render the collapsed version
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        {/* Language selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost"
              size="icon" 
              className="h-9 w-9 rounded-full hover:bg-muted/40"
            >
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border border-border/50">
            {languages.map(lang => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "cursor-pointer flex items-center py-1.5",
                  lang.code === currentLanguage && "bg-muted font-medium"
                )}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Return to original role if viewing as another role */}
        {isViewingAsOtherRole && (
          <Button
            variant="ghost"
            size="icon"
            onClick={resetToOriginalRole}
            className="h-9 w-9 rounded-full hover:bg-muted/40"
          >
            <RefreshCw className="h-4 w-4 text-yellow-500" />
          </Button>
        )}

        {/* Role switcher (admin only) */}
        {showRoleSwitcher && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-muted/40"
                disabled={isViewingAsOtherRole}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border border-border/50">
              <DropdownMenuItem 
                className="flex items-center py-1.5 cursor-pointer"
                onClick={() => {/* Navigate to settings */}}
              >
                <Settings className="mr-2 h-4 w-4" /> 
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive flex items-center py-1.5 cursor-pointer hover:text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" /> 
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        {/* Logout */}
        {!showRoleSwitcher && (
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="h-9 w-9 rounded-full hover:bg-muted/40 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
  
  // Render the expanded version
  return (
    <div className="space-y-2 px-2 py-2">
      {/* Language switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between pl-3 pr-2 py-2 text-muted-foreground hover:text-foreground h-auto font-medium"
          >
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              <span>
                {languages.find(l => l.code === currentLanguage)?.name || 'Idioma'}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-popover border border-border/50">
          {languages.map(lang => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "cursor-pointer flex items-center py-1.5",
                lang.code === currentLanguage && "bg-muted font-medium"
              )}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Return to original role if viewing as another role */}
      {isViewingAsOtherRole && (
        <Button
          variant="outline"
          className="w-full justify-start text-yellow-500 border-yellow-500/30"
          onClick={resetToOriginalRole}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Volver a rol original</span>
        </Button>
      )}

      {/* Role switcher (admin only) */}
      {showRoleSwitcher && !isViewingAsOtherRole && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost" 
              className="w-full justify-between pl-3 pr-2 py-2 text-muted-foreground hover:text-foreground h-auto font-medium"
            >
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                <span>Ver como: {getRoleName(effectiveRole)}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover border border-border/50">
            <DropdownMenuItem 
              className={cn(
                "cursor-pointer flex items-center gap-2 py-1.5",
                effectiveRole === 'admin' && "bg-muted font-medium"
              )}
            >
              <span className={cn(
                "h-2 w-2 rounded-full",
                effectiveRole === 'admin' ? "bg-primary" : "bg-muted-foreground"
              )}></span>
              Administrador
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={cn(
                "cursor-pointer flex items-center gap-2 py-1.5",
                effectiveRole === 'instructor' && "bg-muted font-medium"
              )}
            >
              <span className={cn(
                "h-2 w-2 rounded-full",
                effectiveRole === 'instructor' ? "bg-primary" : "bg-muted-foreground"
              )}></span>
              Instructor
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={cn(
                "cursor-pointer flex items-center gap-2 py-1.5",
                effectiveRole === 'student' && "bg-muted font-medium"
              )}
            >
              <span className={cn(
                "h-2 w-2 rounded-full",
                effectiveRole === 'student' ? "bg-primary" : "bg-muted-foreground"
              )}></span>
              Estudiante
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Logout button */}
      <Button
        variant="ghost"
        className="w-full justify-start pl-3 text-muted-foreground hover:text-destructive h-auto font-medium"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Cerrar sesión</span>
      </Button>
    </div>
  );
};

export default SidebarFooterSection;
