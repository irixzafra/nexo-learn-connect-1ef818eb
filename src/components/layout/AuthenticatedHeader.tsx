
import React from 'react';
import { Link } from 'react-router-dom';
import { UserMenu } from '@/components/layout/header/UserMenu';
import { Button } from '@/components/ui/button';
import { Menu, Bell, MessageSquare, Palette } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import DatabaseConnectionIndicator from '@/components/DatabaseConnectionIndicator';

interface AuthenticatedHeaderProps {
  onToggleSidebar?: () => void;
}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({ 
  onToggleSidebar 
}) => {
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Demo value - replace with actual count
  
  return (
    <header className="sticky top-0 z-40 border-b border-border/30 py-2 px-4 bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="md:hidden rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/app" className="flex items-center transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 rounded-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
              <span className="text-sm font-bold">N</span>
            </div>
            <div className="ml-2.5 flex flex-col">
              <div className="font-semibold text-base leading-tight hidden md:inline-block">Logo Animado Nexo Learning</div>
              <span className="text-[10px] text-muted-foreground opacity-80 hidden md:inline-block">ecosistema educativo</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Database Connection Indicator */}
          <DatabaseConnectionIndicator />
          
          {/* Theme Switcher - Ahora más prominente con texto y animación */}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors px-3 py-2 rounded-md text-sm"
          >
            <Palette className="h-4 w-4 text-primary" />
            <span className="hidden md:inline">Tema</span>
            <div className="relative">
              <ThemeSwitcher showTooltip={true} />
            </div>
          </Button>
          
          {/* Notification & Messages buttons */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "relative rounded-full h-10 w-10 hover:bg-muted/50 transition-all duration-200",
              notificationsCount > 0 && "text-primary"
            )}
            asChild
          >
            <Link to="/app/notifications">
              <Bell className="h-[21px] w-[21px]" />
              {notificationsCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                  {notificationsCount}
                </span>
              )}
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "relative rounded-full h-10 w-10 hover:bg-muted/50 transition-all duration-200",
              messagesCount > 0 && "text-primary" 
            )}
            asChild
          >
            <Link to="/app/messages">
              <MessageSquare className="h-[21px] w-[21px]" />
              {messagesCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                  {messagesCount}
                </span>
              )}
            </Link>
          </Button>
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
