
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Mapa de redirección de rutas antiguas a nuevas
const redirectMap: Record<string, string> = {
  // Cambiamos rutas con más de 2 niveles por sus equivalentes de máximo 2 niveles
  '/admin/finance/invoices': '/admin/invoices',
  '/admin/finance/subscriptions': '/admin/subscriptions',
  '/admin/finance/banks': '/admin/banks',
  '/admin/finance/cash-flow': '/admin/cashflow',
  '/admin/finance/alerts': '/admin/alerts',
  '/admin/finance/analytics': '/admin/analytics',
  '/admin/settings/features': '/admin/features',
  '/admin/settings/integrations': '/admin/integrations',
  '/admin/settings/data': '/admin/data',
  '/admin/student-activity': '/admin/activity',
  '/admin/learning-paths': '/admin/learning',
  '/analytics/personal': '/analytics',
  '/job-board': '/jobs',
  '/home/my-courses': '/my-courses',
  // Agrega más redirecciones según sea necesario
};

interface RouteRedirectorProps {
  children: React.ReactNode;
}

/**
 * Componente que intercepta la navegación y redirecciona 
 * desde rutas antiguas a nuevas según el mapa de redirección
 */
const RouteRedirector: React.FC<RouteRedirectorProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Comprobar si la ruta actual está en el mapa de redirección
    const newPath = redirectMap[currentPath];
    
    if (newPath) {
      // Preservar parámetros de consulta y hash si existen
      const query = location.search || '';
      const hash = location.hash || '';
      
      // Redireccionar a la nueva ruta
      navigate(`${newPath}${query}${hash}`, { replace: true });
      
      // Registrar la redirección para análisis
      console.log(`Redirección: ${currentPath} -> ${newPath}`);
    }
  }, [currentPath, navigate, location]);

  return <>{children}</>;
};

export default RouteRedirector;
