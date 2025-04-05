
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
  terms: '/terms',
  privacy: '/privacy',
  contact: '/contact',
  aboutUs: '/about-us',
  courses: '/courses',
  
  // Rutas legales y de soporte adicionales
  cookies: '/cookies',
  accessibility: '/accessibility',
  team: '/team',
  mission: '/mission',
  scholarships: '/scholarships',
  helpCenter: '/help-center',
  
  // Rutas de aplicación autenticada
  app: '/app',
  dashboard: '/app/dashboard',
  myCourses: '/app/my-courses',
  dashboardStats: '/app/dashboard/stats',
  dashboardActivity: '/app/dashboard/activity',
  dashboardHistory: '/app/dashboard/history',
  
  // Rutas de administración
  admin: '/app/admin',
  adminDashboard: '/app/admin/dashboard',
  adminUsers: '/app/admin/users',
  adminCourses: '/app/admin/courses',
  adminSystemPages: '/app/admin/system-pages',
  adminDesignSystem: '/app/admin/design-system',
  adminDesignSystemButton: '/app/admin/design-system/components/button',
  adminNavigationDiagram: '/app/admin/navigation-diagram',
  adminReviewElements: '/app/admin/review-elements',
  adminOrphanReview: '/app/admin/orphan-review',
  adminDevelopment: '/app/admin/development',
  adminFeatures: '/app/admin/features',
  
  // Rutas de instructor
  profesor: '/app/profesor',
  profesorDashboard: '/app/profesor/dashboard',
  profesorCourses: '/app/profesor/courses',
  profesorStudents: '/app/profesor/students',
  instructor: '/app/instructor',
  instructorDashboard: '/app/instructor/dashboard',
  instructorCourses: '/app/instructor/courses',
  instructorCreateCourse: '/app/instructor/courses/create',
  instructorStudents: '/app/instructor/students',
  
  // Rutas de perfil y configuración
  profile: '/app/profile',
  settings: '/app/settings',
  
  // Rutas de cursos
  courseDetail: (id: string) => `/app/course/${id}`,
  courseLesson: (courseId: string, lessonId: string) => `/app/course/${courseId}/lesson/${lessonId}`,
  exploreCourses: '/app/courses',
  
  // Rutas de certificados
  certificates: '/certificates',
  certificateDetail: (id: string) => `/app/certificate/${id}`,
  certificateVerificationPortal: '/certificates/verify',
  
  // Rutas de perfil
  profileSettings: '/app/profile/settings',
  profileAchievements: '/app/profile/achievements',
  profileBilling: '/app/profile/billing',
  
  // Rutas de comunidad
  community: '/app/community',
  messages: '/app/messages',
  notifications: '/app/notifications',
  
  // Otras rutas
  help: '/help',
  support: '/app/support',
  learningPaths: '/learning-paths',
  achievements: '/app/achievements',
  calendar: '/app/calendar'
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
