
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, BookOpen, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PublicLayout from '@/layouts/PublicLayout';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  // Determinar ruta de inicio según el rol del usuario
  const getHomeRoute = () => {
    if (!isAuthenticated) return '/';
    
    switch (userRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'instructor':
        return '/instructor/dashboard';
      default:
        return '/home';
    }
  };

  // Generar enlaces de navegación basados en el rol
  const getNavigationLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: '/', icon: <Home className="h-4 w-4" />, label: 'Inicio' },
        { to: '/courses', icon: <BookOpen className="h-4 w-4" />, label: 'Cursos' },
        { to: '/auth/login', icon: <User className="h-4 w-4" />, label: 'Iniciar sesión' },
      ];
    }

    switch (userRole) {
      case 'admin':
        return [
          { to: '/admin/dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
          { to: '/admin/users', icon: <User className="h-4 w-4" />, label: 'Usuarios' },
          { to: '/admin/courses', icon: <BookOpen className="h-4 w-4" />, label: 'Cursos' },
        ];
      case 'instructor':
        return [
          { to: '/instructor/dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
          { to: '/instructor/courses', icon: <BookOpen className="h-4 w-4" />, label: 'Mis Cursos' },
          { to: '/instructor/students', icon: <User className="h-4 w-4" />, label: 'Estudiantes' },
        ];
      default:
        return [
          { to: '/home', icon: <Home className="h-4 w-4" />, label: 'Inicio' },
          { to: '/home/my-courses', icon: <BookOpen className="h-4 w-4" />, label: 'Mis Cursos' },
          { to: '/profile', icon: <User className="h-4 w-4" />, label: 'Mi Perfil' },
        ];
    }
  };

  const notFoundContent = (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-2">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido trasladada a otra ubicación.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver atrás
          </Button>
          <Button asChild className="gap-2">
            <Link to={getHomeRoute()}>
              <Home className="h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
        </div>
        
        {/* Enlaces de navegación principales */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Enlaces rápidos</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {getNavigationLinks().map((link, index) => (
              <Button 
                key={index} 
                variant="secondary" 
                asChild 
                className="gap-2"
              >
                <Link to={link.to}>
                  {link.icon}
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PublicLayout>
      {notFoundContent}
    </PublicLayout>
  );
};

export default NotFound;
