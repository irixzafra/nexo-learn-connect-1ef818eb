
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NexoLogo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, LayoutDashboard, BookOpen, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const LandingNav: React.FC = () => {
  const { user, profile, userRole, logout } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile?.full_name) return 'U';
    
    const names = profile.full_name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren" 
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <nav 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 w-full"
      role="navigation" 
      aria-label="Navegación principal"
    >
      <div className="container max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between py-3 px-4 md:px-6">
          <Link 
            to="/" 
            className="flex items-center"
            aria-label="Página principal"
          >
            <NexoLogo 
              className="h-10 md:h-12 w-auto" 
              variant="default"
              subtitle=""
            />
            <div className="flex flex-col ml-2">
              <span className="text-xl md:text-2xl font-bold tracking-tight">nexo</span>
              <span className="text-xs text-muted-foreground">ecosistema creativo</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Desktop menu */}
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
                <Button variant="ghost" asChild className="hidden md:flex">
                  <Link to="/auth/login" aria-label="Iniciar sesión">Iniciar sesión</Link>
                </Button>
                <Button asChild className="hidden md:flex">
                  <Link to="/auth/register" aria-label="Crear una cuenta">Registrarse</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden border-t"
            >
              <div className="px-4 py-4 flex flex-col space-y-4">
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/courses" 
                    className="flex w-full py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Cursos
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/scholarships" 
                    className="flex w-full py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Becas y Ayudas
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/about-us" 
                    className="flex w-full py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Nosotros
                  </Link>
                </motion.div>
                
                {!user && (
                  <>
                    <motion.div variants={itemVariants} className="pt-2">
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                          Iniciar sesión
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Button asChild className="w-full">
                        <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                          Registrarse
                        </Link>
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default LandingNav;
