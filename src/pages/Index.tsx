
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, userRole } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Redirigir según el rol del usuario
        switch (userRole) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'instructor':
            navigate('/instructor/dashboard');
            break;
          case 'student':
          default:
            navigate('/home');
        }
      } else {
        // Si no está autenticado, redirigir a la página de landing
        navigate('/landing');
      }
    }
  }, [navigate, isAuthenticated, isLoading, userRole]);
  
  // Mostrar un estado de carga mejorado mientras se determina el estado de autenticación
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando aplicación...</p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default Index;
