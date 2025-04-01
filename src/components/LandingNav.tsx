
import React, { useState, useEffect } from 'react';
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
import { LogOut, User, LayoutDashboard, BookOpen, Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const LandingNav: React.FC = () => {
  const { user, profile, userRole, logout } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      role="navigation" 
      aria-label="Navegación principal"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between py-4 px-5 md:px-8">
          <Link 
            to="/" 
            className="flex items-center group"
            aria-label="Página principal"
          >
            <NexoLogo 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
              variant="icon"
              subtitle=""
            />
            <div className="flex flex-col ml-2">
              <span className="text-xl md:text-2xl font-bold tracking-tight">nexo</span>
              <span className="text-xs text-muted-foreground">ecosistema creativo</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              <Link 
                to="/" 
                className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
                role="menuitem"
                aria-label="Ver landing page"
              >
                Inicio
              </Link>
              <Link 
                to="/courses" 
                className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
                role="menuitem"
                aria-label="Ver cursos"
              >
                Cursos
              </Link>
              <Link 
                to="/scholarships" 
                className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
                role="menuitem"
                aria-label="Ver becas y ayudas"
              >
                Becas y Ayudas
              </Link>
              <Link 
                to="/about-us" 
                className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
                role="menuitem"
                aria-label="Sobre nosotros"
              >
                Nosotros
              </Link>
            </div>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-full transition-transform hover:scale-105"
                  aria-label="Menú de usuario"
                >
                  <div className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 transition-colors">
                    <Avatar className="h-9 w-9 cursor-pointer border-2 border-blue-100">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'Usuario'} />
                      <AvatarFallback className="bg-blue-600 text-white">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm hidden md:block">{profile?.full_name?.split(' ')[0] || 'Usuario'}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-lg animate-in zoom-in-90 bg-white">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">{profile?.full_name || 'Usuario'}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole || 'Usuario'}</p>
                  </div>
                  <div className="py-2">
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 py-2">
                      <Link to="/profile" className="flex items-center" aria-label="Ver perfil">
                        <User className="mr-2 h-4 w-4 text-blue-600" aria-hidden="true" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 py-2">
                      <Link to="/home" className="flex items-center" aria-label="Ir al panel de control">
                        <LayoutDashboard className="mr-2 h-4 w-4 text-blue-600" aria-hidden="true" />
                        <span>Panel de control</span>
                      </Link>
                    </DropdownMenuItem>
                    {userRole === 'instructor' && (
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 py-2">
                        <Link to="/instructor/courses" className="flex items-center" aria-label="Ver mis cursos">
                          <BookOpen className="mr-2 h-4 w-4 text-blue-600" aria-hidden="true" />
                          <span>Mis cursos</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </div>
                  <DropdownMenuSeparator className="my-1" />
                  <div className="py-2">
                    <DropdownMenuItem 
                      onClick={async () => {
                        await logout();
                      }}
                      className="rounded-lg cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-600 py-2"
                      aria-label="Cerrar sesión"
                    >
                      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild className="hidden md:flex py-2 px-4 hover:bg-blue-50">
                  <Link to="/auth/login" aria-label="Iniciar sesión" className="text-blue-600">Iniciar sesión</Link>
                </Button>
                <Button asChild className="hidden md:flex py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-md transition-all duration-300">
                  <Link to="/auth/register" aria-label="Crear una cuenta">Registrarse</Link>
                </Button>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-10 w-10 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden border-t bg-white shadow-lg"
            >
              <div className="px-5 py-5 flex flex-col space-y-4">
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/" 
                    className="flex w-full py-3 text-base font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/courses" 
                    className="flex w-full py-3 text-base font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cursos
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/scholarships" 
                    className="flex w-full py-3 text-base font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Becas y Ayudas
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/about-us" 
                    className="flex w-full py-3 text-base font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
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
                      <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
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
