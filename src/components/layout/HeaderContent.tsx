
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from './header/UserMenu';
import { HeaderActions } from './header/HeaderActions';
import { useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NexoLogo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import { RoleIndicator } from './header/RoleIndicator';
import { Home, BookOpen, MessageSquare, Search, Calendar } from 'lucide-react';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SidebarNavigation from './SidebarNavigation';

interface HeaderContentProps {
  onRoleChange?: (role: UserRole) => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ onRoleChange }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  
  // Extract page title from path
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
  
  const LogoComponent = () => (
    <Link to="/" className="flex items-center">
      <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
    </Link>
  );

  return (
    <header className="w-full py-2 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 border-b">
      <div className="container mx-auto flex justify-between items-center h-14">
        {/* Left section with logo and mobile menu */}
        <div className="flex items-center gap-4">
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-10 w-10">
                  <Menu className="h-5 w-5" />
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
            <SidebarTrigger className="hidden md:flex" />
          )}
          
          <LogoComponent />
          
          <span className="text-lg font-medium md:block">{getPageTitle()}</span>
        </div>
        
        {/* Center - Horizontal Navigation Menu with Icons Only */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/home">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname.includes('/home') ? "text-primary" : "",
                    "flex justify-center items-center w-10 h-10 p-0"
                  )}
                  title="Inicio"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Inicio</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/courses">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname.includes('/courses') ? "text-primary" : "",
                    "flex justify-center items-center w-10 h-10 p-0"
                  )}
                  title="Cursos"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="sr-only">Cursos</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/search">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname.includes('/search') ? "text-primary" : "",
                    "flex justify-center items-center w-10 h-10 p-0"
                  )}
                  title="Buscar"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Buscar</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/messages">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname.includes('/messages') ? "text-primary" : "",
                    "flex justify-center items-center w-10 h-10 p-0"
                  )}
                  title="Mensajes"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Mensajes</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/calendar">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname.includes('/calendar') ? "text-primary" : "",
                    "flex justify-center items-center w-10 h-10 p-0"
                  )}
                  title="Calendario"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="sr-only">Calendario</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Right section */}
        <div className="flex items-center gap-2">
          {userRole && <RoleIndicator viewingAs={userRole} onRoleChange={onRoleChange} />}
          <HeaderActions />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
