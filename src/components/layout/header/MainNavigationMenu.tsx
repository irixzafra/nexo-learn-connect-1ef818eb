
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Database,
  Settings,
  Shield,
  Home,
  Compass,
  MessageCircle,
  Award,
  Network
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MainNavigationMenuProps {
  userRole: UserRoleType | null;
  hasUnreadMessages?: number;
}

const MainNavigationMenu: React.FC<MainNavigationMenuProps> = ({ 
  userRole,
  hasUnreadMessages = 0 
}) => {
  const isAdmin = userRole === 'admin';

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <Link to="/home" className={navigationMenuTriggerStyle()}>
            <Home className="h-4 w-4 mr-2" />
            <span>Inicio</span>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/courses" className={navigationMenuTriggerStyle()}>
            <Compass className="h-4 w-4 mr-2" />
            <span>Explorar</span>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/community" className={navigationMenuTriggerStyle()}>
            <Network className="h-4 w-4 mr-2" />
            <span>Comunidad</span>
          </Link>
        </NavigationMenuItem>
        
        {hasUnreadMessages > 0 ? (
          <NavigationMenuItem>
            <Link to="/messages" className={navigationMenuTriggerStyle()}>
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>Mensajes</span>
              <Badge variant="default" className="ml-1 px-1 py-0 h-5 min-w-5">
                {hasUnreadMessages}
              </Badge>
            </Link>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Link to="/messages" className={navigationMenuTriggerStyle()}>
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>Mensajes</span>
            </Link>
          </NavigationMenuItem>
        )}
        
        {isAdmin && (
          <NavigationMenuItem>
            <Link to="/admin/dashboard" className={navigationMenuTriggerStyle()}>
              <Shield className="h-4 w-4 mr-2" />
              <span>Administración</span>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigationMenu;
