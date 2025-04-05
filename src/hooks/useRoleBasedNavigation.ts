
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType } from '@/types/auth';

/**
 * Hook para manejar la navegación personalizada según el rol del usuario
 * 
 * @returns Objeto con funciones para navegar según el rol
 */
export const useRoleBasedNavigation = () => {
  const { userRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [homePath, setHomePath] = useState<string>('/dashboard');

  useEffect(() => {
    // Determinar la ruta de inicio según el rol
    if (isAuthenticated) {
      switch (userRole as UserRoleType) {
        case 'admin':
          setHomePath('/admin/dashboard');
          break;
        case 'instructor': 
          setHomePath('/instructor/dashboard');
          break;
        case 'moderator':
          setHomePath('/moderation/dashboard');
          break;
        default:
          setHomePath('/student/dashboard'); // Default for student role
      }
    } else {
      setHomePath('/landing');
    }
  }, [userRole, isAuthenticated]);

  /**
   * Navega a la ruta de inicio específica para el rol del usuario
   */
  const goToRoleHome = () => {
    navigate(homePath);
  };

  /**
   * Obtiene la ruta de inicio para el rol actual
   */
  const getRoleHomePath = () => {
    return homePath;
  };

  /**
   * Navega a una ruta específica manteniendo la estructura basada en rol
   * @param path Ruta relativa a navegar
   */
  const navigateWithinRole = (path: string) => {
    // Si la ruta ya comienza con /, usarla directamente
    if (path.startsWith('/')) {
      navigate(path);
      return;
    }

    // De lo contrario, construir una ruta basada en el rol
    const basePath = homePath.split('/')[1]; // Obtener el primer segmento (admin, instructor, etc.)
    navigate(`/${basePath}/${path}`);
  };

  return {
    goToRoleHome,
    getRoleHomePath,
    navigateWithinRole
  };
};
