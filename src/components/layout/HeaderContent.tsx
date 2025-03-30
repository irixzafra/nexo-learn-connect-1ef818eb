import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from './header/UserMenu';
import { HeaderActions } from './header/HeaderActions';
import { useLocation } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NexoLogo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  Search, 
  Users, 
  GraduationCap, 
  Award, 
  FileText, 
  MapPin, 
  Settings, 
  Phone,
  Headphones,
  Bell, 
  LayoutDashboard,
  User,
  MessageCircle
} from 'lucide-react';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SidebarNavigation from './SidebarNavigation';
import { Badge } from '@/components/ui/badge';

interface HeaderContentProps {
  onRoleChange?: (role: UserRole) => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ onRoleChange }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  
  const getPageTitle = () => {
    const path = location.pathname.split('/').filter(p => p);
    if (path.length === 0) return 'Inicio';
    
    const lastSegment = path[path.length - 1];
    
    const titleMap: { [key: string]: string } = {
      'profile': 'Mi Perfil',
      'courses': 'Cursos',
      'my-courses': 'Mis Cursos',
      'settings': 'Configuración',
      'messages': 'Mensajes',
      'calendar': 'Calendario',
      'admin': 'Administración',
      'instructor': 'Instructor',
      'dashboard': 'Dashboard',
      'search': 'Búsqueda'
    };
    
    return titleMap[lastSegment] || 
      (lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase());
  };
  
  const hasUnreadMessages = 3; // Example counter for unread messages

  const LogoComponent = () => (
    <Link to="/" className="flex items-center">
      <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
    </Link>
  );

  return (
    <header className="w-full py-2 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 border-b">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div className="flex items-center gap-4">
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-10 w-10">
                  <LogoComponent />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="border-b px-6 py-4 flex items-center">
                    <NexoLogo className="h-8 w-auto" />
                  </div>
                  <div className="flex-1 overflow-auto">
                    <SidebarNavigation viewAsRole={userRole as UserRole} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <SidebarTrigger className="hidden md:flex" />
              <LogoComponent />
            </>
          )}
          
          {!isMobile && <span className="text-lg font-medium">{getPageTitle()}</span>}
        </div>
        
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
        
        <div className="flex items-center gap-2">
          <HeaderActions />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
