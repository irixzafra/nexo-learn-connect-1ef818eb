
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { routeMap } from '@/utils/routeUtils';

const LandingNav: React.FC = () => {
  const { isAuthenticated, profile } = useAuth();

  return (
    <nav className="container mx-auto py-4 flex items-center justify-between">
      <div>
        <Link to={routeMap.home} className="text-2xl font-bold">Academia LMS</Link>
      </div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <Button asChild variant="outline">
              <Link to={routeMap.dashboard}>Dashboard</Link>
            </Button>
            <Button asChild>
              <Link to={routeMap.myCourses}>Mis Cursos</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link to={routeMap.login}>Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link to={routeMap.register}>Registrarse</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default LandingNav;
