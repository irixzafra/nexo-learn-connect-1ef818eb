
import { useState, useCallback } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';

// Mock data - esto normalmente vendría de una API
const navigationByRole: Record<UserRoleType | string, NavigationItemWithChildren[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Users', path: '/admin/users', icon: 'Users' },
    { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
  ],
  instructor: [
    { label: 'Dashboard', path: '/instructor/dashboard', icon: 'LayoutDashboard' },
    { label: 'My Courses', path: '/instructor/courses', icon: 'BookOpen' },
    { label: 'Students', path: '/instructor/students', icon: 'Users' },
  ],
  student: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'My Courses', path: '/my-courses', icon: 'BookOpen' },
    { label: 'Explore', path: '/explore', icon: 'Compass' },
  ],
  moderator: [
    { label: 'Dashboard', path: '/moderator/dashboard', icon: 'LayoutDashboard' },
    { label: 'Reports', path: '/moderator/reports', icon: 'Flag' },
    { label: 'Content Review', path: '/moderator/review', icon: 'CheckSquare' },
  ],
  manager: [
    { label: 'Dashboard', path: '/manager/dashboard', icon: 'LayoutDashboard' },
    { label: 'Teams', path: '/manager/teams', icon: 'Users' },
    { label: 'Reports', path: '/manager/reports', icon: 'BarChart' },
  ],
  anonymous: [
    { label: 'Login', path: '/auth/login', icon: 'LogIn' },
    { label: 'Register', path: '/auth/register', icon: 'UserPlus' },
    { label: 'Explore', path: '/explore', icon: 'Compass' },
  ],
  // Agregando los roles faltantes
  sistemas: [
    { label: 'Dashboard', path: '/sistemas/dashboard', icon: 'Terminal' },
    { label: 'Configuración', path: '/sistemas/config', icon: 'Settings' },
  ],
  content_creator: [
    { label: 'Dashboard', path: '/content/dashboard', icon: 'PenTool' },
    { label: 'Mis Contenidos', path: '/content/my-content', icon: 'FileText' },
  ],
  guest: [
    { label: 'Explorar', path: '/explore', icon: 'Compass' },
    { label: 'Iniciar Sesión', path: '/auth/login', icon: 'LogIn' },
  ],
  beta_tester: [
    { label: 'Dashboard', path: '/beta/dashboard', icon: 'LayoutDashboard' },
    { label: 'Reportar Bug', path: '/beta/report-bug', icon: 'Bug' },
  ],
  anonimo: [
    { label: 'Explorar', path: '/explorar', icon: 'Compass' },
    { label: 'Iniciar Sesión', path: '/auth/login', icon: 'LogIn' },
  ],
  // Agregar un valor predeterminado para roles desconocidos
  default: [
    { label: 'Inicio', path: '/', icon: 'Home' },
    { label: 'Explorar', path: '/explore', icon: 'Compass' },
  ]
};

export const useDynamicNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getNavigationItemsByRole = useCallback(async (role: UserRoleType | string): Promise<NavigationItemWithChildren[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Devolver navegación para el rol especificado, o array vacío si no se encuentra
      return navigationByRole[role] || navigationByRole.default || [];
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch navigation items');
      setError(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getNavigationItemsByRole,
    isLoading,
    error
  };
};
