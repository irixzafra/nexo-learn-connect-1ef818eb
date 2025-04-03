
import React from 'react';
import { Link } from 'react-router-dom';
import { UserMenu } from '@/components/layout/header/UserMenu';
import { Button } from '@/components/ui/button';
import { Menu, Bell, MessageSquare } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

interface AuthenticatedHeaderProps {
  onToggleSidebar?: () => void;
}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({ 
  onToggleSidebar 
}) => {
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Demo value - replace with actual count
  
  return (
    <header className="sticky top-0 z-40 border-b py-2.5 px-4 bg-background/95 backdrop-blur-sm shadow-sm">
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
          
          <Link to="/app" className="flex items-center transition-opacity hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
              <span className="text-sm font-bold">N</span>
            </div>
            <div className="ml-2.5 flex flex-col">
              <span className="font-semibold text-lg hidden md:inline-block">Nexo Learning</span>
              <span className="text-[10px] text-muted-foreground hidden md:inline-block">ecosistema educativo</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="hidden md:flex space-x-1">
            <Button 
              variant="ghost" 
              asChild 
              className="px-3 py-2 h-9 rounded-full hover:bg-primary/10 font-medium transition-colors"
            >
              <Link to="/app/courses">Mis Cursos</Link>
            </Button>
          </div>
          
          {/* Notification & Messages buttons */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "relative rounded-full h-9 w-9 hover:bg-muted/40 transition-colors",
              notificationsCount > 0 && "text-primary"
            )}
            asChild
          >
            <Link to="/app/notifications">
              <Bell className="h-5 w-5" />
              {notificationsCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {notificationsCount}
                </span>
              )}
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "relative rounded-full h-9 w-9 hover:bg-muted/40 transition-colors",
              messagesCount > 0 && "text-primary" 
            )}
            asChild
          >
            <Link to="/app/messages">
              <MessageSquare className="h-5 w-5" />
              {messagesCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
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
