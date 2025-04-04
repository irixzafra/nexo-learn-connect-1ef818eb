
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';

const LandingNav: React.FC = () => {
  const { isAuthenticated, profile } = useAuth();

  return (
    <nav className="container mx-auto py-4 flex items-center justify-between">
      <div>
        <Link to="/" className="text-2xl font-bold">Academia LMS</Link>
      </div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <Button asChild variant="outline">
              <Link to="/app/dashboard">Dashboard</Link>
            </Button>
            <Button asChild>
              <Link to="/app/my-courses">Mis Cursos</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link to="/auth/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Registrarse</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default LandingNav;
