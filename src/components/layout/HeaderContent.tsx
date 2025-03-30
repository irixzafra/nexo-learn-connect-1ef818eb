
import React, { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from './header/UserMenu';
import { HeaderActions } from './header/HeaderActions';
import { useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NexoLogoBase } from '@/components/ui/logo/nexo-logo-base';
import { useAuth } from '@/contexts/AuthContext';
import { RoleIndicator } from './header/RoleIndicator';
import { Home, BookOpen, MessageSquare, Search, Calendar, User, Bell, Shield } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/auth';

interface HeaderContentProps {
  viewAsRole?: 'current' | string;
  onRoleChange?: (role: string) => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ viewAsRole = 'current', onRoleChange }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  
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
      'dashboard': 'Dashboard'
    };
    
    return titleMap[lastSegment] || 
      (lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase());
  };

  const handleRoleChange = (role: string) => {
    if (onRoleChange) {
      onRoleChange(role);
    }
    setIsAdminMenuOpen(false);
  };
  
  return (
    <header className="w-full py-2 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 border-b">
      <div className="container mx-auto flex justify-between items-center h-14">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <NexoLogoBase className="hidden sm:flex" />
          <span className="text-lg font-medium">{getPageTitle()}</span>
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
            {(userRole === 'admin' || userRole === 'instructor') && (
              <NavigationMenuItem>
                <Popover open={isAdminMenuOpen} onOpenChange={setIsAdminMenuOpen}>
                  <PopoverTrigger asChild>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname.includes('/admin') ? "text-primary" : "",
                        "flex justify-center items-center w-10 h-10 p-0 cursor-pointer"
                      )}
                      title="Administración"
                      onClick={() => setIsAdminMenuOpen(true)}
                    >
                      <Shield className="h-5 w-5" />
                      <span className="sr-only">Administración</span>
                    </NavigationMenuLink>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-4" align="center">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Vista previa como:</h4>
                      <RadioGroup 
                        value={viewAsRole === 'current' ? userRole : viewAsRole} 
                        onValueChange={handleRoleChange}
                        className="gap-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="admin" id="role-admin" />
                          <Label htmlFor="role-admin">Administrador</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="instructor" id="role-instructor" />
                          <Label htmlFor="role-instructor">Instructor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="student" id="role-student" />
                          <Label htmlFor="role-student">Estudiante</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="anonimo" id="role-anonimo" />
                          <Label htmlFor="role-anonimo">Anónimo</Label>
                        </div>
                      </RadioGroup>
                      
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={() => {
                            if (location.pathname.includes('/admin')) {
                              handleRoleChange('admin');
                            } else {
                              handleRoleChange('current');
                            }
                          }}
                        >
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Right side */}
        <div className="flex items-center gap-2">
          {userRole && <RoleIndicator viewingAs={viewAsRole === 'current' ? userRole : viewAsRole} />}
          <HeaderActions />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
