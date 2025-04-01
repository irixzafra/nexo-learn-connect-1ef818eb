
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { getRoleHomePath } = useRoleBasedNavigation();
  
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Usar nuestra nueva función para obtener la ruta personalizada según el rol
        const homePath = getRoleHomePath();
        navigate(homePath);
      } else {
        // Si no está autenticado, redirigir a la página configurada
        // Obtener configuración desde localStorage o usar valor por defecto
        const settings = localStorage.getItem('nexo_settings');
        let defaultLandingUrl = '/landing'; // Valor por defecto
        
        if (settings) {
          try {
            const parsedSettings = JSON.parse(settings);
            defaultLandingUrl = parsedSettings.default_landing_url || defaultLandingUrl;
          } catch (error) {
            console.error('Error parsing settings:', error);
          }
        }
        
        navigate(defaultLandingUrl);
      }
    }
  }, [navigate, isAuthenticated, isLoading, getRoleHomePath]);
  
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
