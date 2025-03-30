
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  Search, 
  Users, 
  Award, 
  FileText, 
  MapPin,
  LayoutDashboard,
  User,
  MessageCircle,
  Phone,
  Headphones,
  Settings
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserRoleType } from '@/types/auth';

interface MainNavigationMenuProps {
  userRole: UserRoleType | null;
  hasUnreadMessages?: number;
}

const MainNavigationMenu: React.FC<MainNavigationMenuProps> = ({ 
  userRole,
  hasUnreadMessages = 0
}) => {
  const location = useLocation();
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            location.pathname === '/home' || location.pathname === '/' ? "text-primary" : ""
          )}>
            <Home className="h-4 w-4 mr-2" />
            Inicio
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[220px]">
            <div className="p-2 grid gap-1">
              <Link to="/home/my-courses" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <BookOpen className="h-4 w-4" />
                <span>Mis Cursos</span>
              </Link>
              <Link to="/home/certificates" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Award className="h-4 w-4" />
                <span>Certificados</span>
              </Link>
              <Link to="/home/progress" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <FileText className="h-4 w-4" />
                <span>Mi Progreso</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            location.pathname.includes('/courses') || location.pathname.includes('/learning-paths') ? "text-primary" : ""
          )}>
            <Search className="h-4 w-4 mr-2" />
            Explorar
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[220px]">
            <div className="p-2 grid gap-1">
              <Link to="/courses" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <BookOpen className="h-4 w-4" />
                <span>Cursos</span>
              </Link>
              <Link to="/learning-paths" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <MapPin className="h-4 w-4" />
                <span>Rutas de Aprendizaje</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            location.pathname.includes('/community') ? "text-primary" : ""
          )}>
            <Users className="h-4 w-4 mr-2" />
            Comunidad
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[220px]">
            <div className="p-2 grid gap-1">
              <Link to="/community/feed" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <FileText className="h-4 w-4" />
                <span>Feed</span>
              </Link>
              <Link to="/messages" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <MessageSquare className="h-4 w-4" />
                <span>Mensajes</span>
              </Link>
              <Link to="/community/contacts" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Users className="h-4 w-4" />
                <span>Contactos</span>
              </Link>
              <Link to="/community/groups" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Users className="h-4 w-4" />
                <span>Grupos</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/messages">
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              location.pathname.includes('/messages') ? "text-primary" : "",
              "relative"
            )}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Mensajes
              {hasUnreadMessages > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5 h-5 min-w-[20px] flex items-center justify-center">
                  {hasUnreadMessages}
                </Badge>
              )}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        {(userRole === 'admin' || userRole === 'instructor') && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              location.pathname.includes('/admin') ? "text-primary" : ""
            )}>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Administración
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[220px]">
              <div className="p-2 grid gap-1">
                <Link to="/admin/dashboard" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/admin/users" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                  <Users className="h-4 w-4" />
                  <span>Usuarios</span>
                </Link>
                <Link to="/admin/courses" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                  <BookOpen className="h-4 w-4" />
                  <span>Cursos</span>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            location.pathname.includes('/profile') ? "text-primary" : ""
          )}>
            <User className="h-4 w-4 mr-2" />
            Perfil
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[220px]">
            <div className="p-2 grid gap-1">
              <Link to="/profile" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <User className="h-4 w-4" />
                <span>Mi Perfil</span>
              </Link>
              <Link to="/settings" className="group flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Phone className="h-4 w-4 mr-2" />
            Contacto
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[220px]">
            <div className="p-2 grid gap-1">
              <Button 
                variant="ghost"
                className="flex justify-start hover:bg-accent"
                onClick={() => window.open('https://wa.me/123456789', '_blank')}
              >
                <div className="flex items-center gap-2 p-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </div>
              </Button>
              <Button 
                variant="ghost"
                className="flex justify-start hover:bg-accent"
                onClick={() => {
                  alert('Voice bot activado');
                }}
              >
                <div className="flex items-center gap-2 p-2">
                  <Headphones className="h-4 w-4" />
                  <span>Voice Bot</span>
                </div>
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigationMenu;
