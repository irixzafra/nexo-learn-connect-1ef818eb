
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, X, Home, Palette, User, Shield, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AppLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4 sm:px-8">
          <Link to="/" className="font-bold text-xl md-hover-scale mr-6">
            Nexo Learning
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
            <Link to="/" className="font-medium transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link to="/material-design" className="font-medium transition-colors hover:text-primary">
              Material Design
            </Link>
            <Link to="/design-system" className="font-medium transition-colors hover:text-primary">
              Design System
            </Link>
            
            {/* Admin Links */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1">
                    <Shield size={16} />
                    <span>Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Panel Admin
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/design-system" className="flex items-center">
                      <Palette className="mr-2 h-4 w-4" />
                      Sistema de Diseño
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Right side items */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeSwitcher />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="cursor-pointer w-full">
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/preferencias" className="cursor-pointer w-full">
                      Preferencias
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-500 focus:text-red-500" 
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="filled" size="sm" className="md-hover-scale">
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-background transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-16 px-6">
          <nav className="space-y-4 mt-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              <Home size={20} />
              Inicio
            </Link>
            <Link 
              to="/material-design" 
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              <Palette size={20} />
              Material Design
            </Link>
            <Link 
              to="/design-system" 
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              <Palette size={20} />
              Design System
            </Link>
            
            {/* Admin Links on Mobile */}
            {user && (
              <>
                <div className="border-t my-4"></div>
                <h3 className="text-sm font-medium text-muted-foreground px-2">Administración</h3>
                <Link 
                  to="/admin/dashboard" 
                  className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  <LayoutDashboard size={20} />
                  Panel Admin
                </Link>
                <Link 
                  to="/admin/design-system" 
                  className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  <Palette size={20} />
                  Sistema de Diseño
                </Link>
              </>
            )}
          </nav>
          
          {user && (
            <button 
              className="mt-auto mb-8 flex items-center gap-2 text-red-500 font-medium p-2 hover:bg-red-500/10 rounded-md"
              onClick={() => {
                signOut();
                closeMenu();
              }}
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
      
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/50" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 md:flex md:h-14 md:items-center md:justify-between">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Nexo Learning. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 md:mt-0">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Términos
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
