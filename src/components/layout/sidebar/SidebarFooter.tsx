
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
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
      <div className={cn(
        "flex items-center",
        isCollapsed ? "flex-col space-y-2" : "justify-between"
      )}>
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col" : "gap-3"
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatarUrl} alt={user?.name || 'Usuario'} />
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name || 'Usuario'}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
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
