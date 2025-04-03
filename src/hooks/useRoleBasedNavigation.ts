
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRoleType } from '@/types/auth';
import { getHomePathByRole } from '@/config/navigation/utils';
import { routeMap } from '@/utils/routeUtils';
import { isValidPath } from '@/utils/routeValidation';

/**
 * Hook para manejar la navegación basada en roles de usuario
 * @param userRole - Rol del usuario actual
 * @returns Funciones y utilidades de navegación
 */
export function useRoleBasedNavigation(userRole: UserRoleType = 'student') {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPaths, setPreviousPaths] = useState<string[]>([]);
  
  // Registrar rutas visitadas
  useEffect(() => {
    setPreviousPaths(prev => {
      // Solo almacenar hasta 10 rutas previas
      const newPaths = [...prev];
      if (newPaths[newPaths.length - 1] !== location.pathname) {
        newPaths.push(location.pathname);
      }
      return newPaths.slice(-10);
    });
  }, [location.pathname]);
  
  // Ruta de inicio según el rol
  const homePath = useMemo(() => getHomePathByRole(userRole), [userRole]);
  
  // Verificar si la ruta actual es válida para el rol
  const isCurrentRouteValid = useMemo(() => {
    const currentPath = location.pathname;
    
    // Intentamos determinar si una ruta es válida para el rol actual
    // Esto es una verificación simplificada, en un caso real
    // se consultaría una lista definitiva de rutas por rol
    if (userRole === 'admin') {
      return true; // Administradores pueden acceder a todo
    }
    
    if (userRole === 'professor' || userRole === 'instructor') {
      return !currentPath.includes('/admin') ||
             currentPath.includes('/instructor') ||
             isValidPath(currentPath);
    }
    
    if (userRole === 'student') {
      return !currentPath.includes('/admin') && 
             !currentPath.includes('/instructor') &&
             isValidPath(currentPath);
    }
    
    return isValidPath(currentPath);
  }, [location.pathname, userRole]);
  
  // Funciones de navegación
  const goToHome = () => navigate(homePath);
  const goBack = () => {
    if (previousPaths.length > 1) {
      navigate(previousPaths[previousPaths.length - 2]);
    } else {
      navigate(homePath);
    }
  };
  
  // Obtener rutas relevantes para el rol actual
  const roleBasedRoutes = useMemo(() => {
    // Filtrar las rutas según el rol
    const routes = Object.entries(routeMap).reduce((acc, [key, path]) => {
      // Ignorar rutas de función
      if (typeof path === 'function') return acc;
      
      // Verificar si la ruta es adecuada para el rol
      let isRouteForRole = true;
      
      if (userRole !== 'admin') {
        if (path.includes('/admin') && userRole !== 'admin') {
          isRouteForRole = false;
        }
        
        if (path.includes('/instructor') && 
           userRole !== 'instructor' && 
           userRole !== 'professor') {
          isRouteForRole = false;
        }
      }
      
      if (isRouteForRole) {
        acc[key] = path;
      }
      
      return acc;
    }, {} as Record<string, string>);
    
    return routes;
  }, [userRole]);
  
  return {
    navigate,
    goToHome,
    goBack,
    homePath,
    previousPaths,
    isCurrentRouteValid,
    roleBasedRoutes
  };
}

export default useRoleBasedNavigation;
