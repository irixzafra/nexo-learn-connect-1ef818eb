
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import GlobalRoleSwitcher from '@/components/layout/GlobalRoleSwitcher';
import { Separator } from '@/components/ui/separator';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();
  
  // Get avatar image and name from user profile if available
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.avatarUrl;
  const displayName = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
  const userEmail = user?.email || '';
  const isAdmin = userRole === 'admin';
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className={cn(
      "mt-auto border-t border-border pt-4 px-3",
      isCollapsed ? "text-center" : ""
    )}>
      {/* Admin Role Switcher - Always visible for admins */}
      {isAdmin && (
        <div className={cn(
          "mb-3",
          isCollapsed ? "flex justify-center" : ""
        )}>
          <GlobalRoleSwitcher 
            showLabel={!isCollapsed}
            compact={isCollapsed}
            className={cn(
              "w-full",
              isCollapsed ? "flex justify-center" : ""
            )}
          />
        </div>
      )}

      <Separator className="my-2" />

      <div className={cn(
        "flex items-center",
        isCollapsed ? "flex-col space-y-2" : "justify-between"
      )}>
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col" : "gap-3"
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{displayName.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{displayName}</span>
              <span className="text-xs text-muted-foreground">{userEmail}</span>
            </div>
          )}
        </div>

        <div className={cn(
          "flex",
          isCollapsed ? "flex-col space-y-2 mt-2" : "gap-1"
        )}>
          {isCollapsed ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Configuración</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Configuración</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Cerrar sesión</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Cerrar sesión</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
