

import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Edit, 
  CheckSquare, 
  Home, 
  HelpCircle,
  ChevronRight,
  Menu
} from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SidebarNavigation from './SidebarNavigation';

interface HeaderContentProps {
  userRole: string | null;
  viewingAs: string | null;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ userRole, viewingAs }) => {
  const { user, profile, logout } = useAuth();
  const { isEditMode, toggleEditMode } = useEditMode();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/home') return 'Inicio';
    if (path === '/profile') return 'Perfil';
    if (path === '/courses') return 'Catálogo de Cursos';
    if (path === '/my-courses') return 'Mis Cursos';
    if (path === '/scholarships') return 'Becas';
    if (path === '/settings') return 'Configuración';
    if (path === '/calendar') return 'Calendario';
    if (path === '/messages') return 'Mensajes';
    if (path.startsWith('/admin/dashboard')) return 'Panel de Administración';
    if (path.startsWith('/admin/users')) return 'Gestión de Usuarios';
    if (path.startsWith('/admin/test-data')) return 'Datos de Prueba';
    if (path.startsWith('/admin/billing')) return 'Facturación';
    if (path.startsWith('/instructor/dashboard')) return 'Panel de Instructor';
    if (path.startsWith('/instructor/courses')) return 'Cursos del Instructor';
    if (path.startsWith('/instructor/students')) return 'Estudiantes';
    if (path.startsWith('/about-us')) return 'Acerca de Nosotros';
    return '';
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      const nameParts = profile.full_name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return profile.full_name.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'UN';
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Sesión cerrada exitosamente");
    navigate('/auth/login');
  };

  return (
    <div className="w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto py-2 px-4 flex justify-between items-center">
        {/* Left side: Logo/Trigger */}
        <div className="flex items-center gap-2">
          {/* SidebarTrigger visible on desktop */}
          <div className="hidden md:block">
            <SidebarTrigger className="h-8 w-8" />
          </div>
          
          {/* Logo with sheet trigger for mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
                    <SidebarNavigation viewAsRole={viewingAs || 'current'} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Breadcrumb/Title */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground pl-2">
            <Link to="/home" className="hover:text-foreground">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Inicio</span>
            </Link>
            {getPageTitle() && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground">{getPageTitle()}</span>
              </>
            )}
          </div>
          
          {/* Role view indicator */}
          {viewingAs && (
            <div className="ml-4 px-3 py-1 bg-amber-50 text-amber-800 dark:bg-amber-800/30 dark:text-amber-500 text-xs font-medium rounded-full">
              Viendo como: <span className="capitalize font-semibold">{viewingAs}</span>
            </div>
          )}
        </div>
        
        {/* Right side: Actions and user menu */}
        <div className="flex items-center gap-2">
          {/* Edit Mode Toggle - only visible for admins */}
          {userRole === 'admin' && (
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={toggleEditMode}
              className={cn(
                "gap-1",
                isEditMode ? 'bg-primary text-primary-foreground' : '',
              )}
              title="Modo de edición"
            >
              {isEditMode ? (
                <>
                  <CheckSquare className="h-4 w-4" />
                  <span className="hidden md:inline">Editando</span>
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  <span className="hidden md:inline">Editar</span>
                </>
              )}
            </Button>
          )}
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
              2
            </span>
          </Button>
          
          {/* Help */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "Usuario"} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "Usuario"} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5 leading-none">
                  {profile?.full_name && (
                    <p className="font-medium text-sm">{profile.full_name}</p>
                  )}
                  <p className="text-xs text-muted-foreground capitalize">
                    {userRole === 'admin' ? 'Administrador' : userRole === 'instructor' ? 'Instructor' : 'Estudiante'}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
