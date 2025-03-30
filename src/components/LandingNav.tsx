
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, LayoutDashboard, BookOpen } from 'lucide-react';

const LandingNav: React.FC = () => {
  const { user, profile, userRole, logout } = useAuth();

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile?.full_name) return 'U';
    
    const names = profile.full_name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <nav 
      className="flex items-center justify-between py-4 px-6 md:px-10 w-full" 
      role="navigation" 
      aria-label="Navegación principal"
    >
      <Link 
        to="/" 
        className="flex items-center space-x-2"
        aria-label="Página principal"
      >
        <NexoLogo />
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center space-x-6" role="menubar">
          <Link 
            to="/courses" 
            className="text-base font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1"
            role="menuitem"
            aria-label="Ver cursos"
          >
            Cursos
          </Link>
          <Link 
            to="/scholarships" 
            className="text-base font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1"
            role="menuitem"
            aria-label="Ver becas y ayudas"
          >
            Becas y Ayudas
          </Link>
          <Link 
            to="/about-us" 
            className="text-base font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1"
            role="menuitem"
            aria-label="Sobre nosotros"
          >
            Nosotros
          </Link>
        </div>
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
              aria-label="Menú de usuario"
            >
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'Usuario'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{profile?.full_name || 'Usuario'}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole || 'Usuario'}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex cursor-pointer items-center" aria-label="Ver perfil">
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/home" className="flex cursor-pointer items-center" aria-label="Ir al panel de control">
                  <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Panel de control</span>
                </Link>
              </DropdownMenuItem>
              {userRole === 'instructor' && (
                <DropdownMenuItem asChild>
                  <Link to="/instructor/courses" className="flex cursor-pointer items-center" aria-label="Ver mis cursos">
                    <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Mis cursos</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={async () => {
                  await logout();
                }}
                className="cursor-pointer"
                aria-label="Cerrar sesión"
              >
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/auth/login" aria-label="Iniciar sesión">Iniciar sesión</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register" aria-label="Crear una cuenta">Registrarse</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNav;
