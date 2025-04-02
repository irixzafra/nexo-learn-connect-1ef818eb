
/**
 * Verifica si una ruta está activa basada en la ruta actual y la ruta de destino
 * 
 * @param currentPath Ruta actual del navegador
 * @param targetPath Ruta de destino para verificar
 * @param exact Si se debe hacer una coincidencia exacta (true) o parcial (false)
 * @returns Booleano indicando si la ruta está activa
 */
export function isRouteActive(currentPath: string, targetPath: string, exact: boolean = false): boolean {
  if (targetPath === '/') {
    return exact ? currentPath === '/' : currentPath === '/';
  }
  
  // Eliminar los parámetros de consulta si existen
  const cleanCurrentPath = currentPath.split('?')[0];
  
  if (exact) {
    return cleanCurrentPath === targetPath;
  }
  
  return cleanCurrentPath === targetPath || 
         cleanCurrentPath.startsWith(targetPath + '/');
}

/**
 * Mapa de rutas para la aplicación
 * Centraliza las definiciones de rutas para evitar errores de typo y facilitar cambios
 */
export const routeMap = {
  // Rutas públicas
  home: '/',
  landing: '/landing',
  login: '/auth/login',
  register: '/auth/register',
  resetPassword: '/auth/reset-password',
  
  // Rutas de dashboard
  dashboard: '/dashboard',
  dashboardStats: '/dashboard/stats',
  dashboardActivity: '/dashboard/activity',
  dashboardHistory: '/dashboard/history',
  
  // Rutas de administración
  admin: '/admin',
  adminDashboard: '/admin/dashboard',
  adminUsers: '/admin/users',
  adminCourses: '/admin/courses',
  adminSystemPages: '/admin/system-pages',
  adminDesignSystem: '/admin/design-system',
  adminDesignSystemButton: '/admin/design-system/components/button',
  
  // Rutas de cursos
  courses: '/courses',
  courseDetail: (id: string) => `/course/${id}`,
  courseLesson: (courseId: string, lessonId: string) => `/course/${courseId}/lesson/${lessonId}`,
  
  // Rutas de certificados
  certificates: '/certificates',
  certificateDetail: (id: string) => `/certificate/${id}`,
  certificateVerificationPortal: '/certificates/verify',
  
  // Rutas de perfil
  profile: '/profile',
  profileSettings: '/profile/settings',
  profileAchievements: '/profile/achievements',
  
  // Otras rutas
  about: '/about-us',
  help: '/help',
  settings: '/settings'
};

/**
 * Hook para usar la navegación con rutas predefinidas
 * @returns Objeto con funciones para navegar
 */
export const useAppNavigation = () => {
  return {
    routes: routeMap,
    handleNavigate: (path: string) => () => {
      window.location.href = path;
    }
  };
};
