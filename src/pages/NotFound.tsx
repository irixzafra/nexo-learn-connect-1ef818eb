
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import { useAuth } from '@/contexts/AuthContext';

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

  return (
    <AppLayout>
      <div className="container mx-auto flex items-center justify-center min-h-[80vh] p-6">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-2">Página no encontrada</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido trasladada a otra ubicación.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
