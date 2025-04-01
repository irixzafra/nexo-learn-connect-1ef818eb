import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Mapa centralizado de rutas del sistema
 * Esto ayuda a mantener las rutas consistentes en toda la aplicación
 */
export const routeMap = {
  // Rutas públicas
  landing: '/landing',
  login: '/auth/login',
  register: '/auth/register',
  about: '/about-us',
  scholarships: '/scholarships',
  contact: '/contact',
  unauthorized: '/unauthorized',
  courses: '/courses',
  courseDetail: (courseId: string) => `/courses/${courseId}`,
  terms: '/terms',
  privacy: '/privacy',
  cookies: '/cookies',
  accessibility: '/accessibility',
  dynamicPage: (slug: string) => `/pages/${slug}`,
  certificateVerify: (certificateId: string) => `/certificates/verify/${certificateId}`,
  certificateVerificationPortal: '/certificates/verification-portal',
  
  // Rutas de usuario autenticado
  dashboard: '/home',
  profile: '/profile',
  profileSettings: '/profile/settings',
  myCourses: '/my-courses',
  courseLearn: (courseId: string) => `/courses/${courseId}/learn`,
  lessonView: (courseId: string, lessonId: string) => `/courses/${courseId}/learn/${lessonId}`,
  courseNotes: (courseId: string) => `/courses/${courseId}/notes`,
  checkout: (courseId: string) => `/checkout/${courseId}`,
  payment: (status: string) => `/payment/${status}`,
  invoices: '/invoices',
  calendar: '/calendar',
  messages: '/messages',
  notifications: '/notifications',
  community: '/community',
  settings: '/settings',
  userCertificates: '/certificates',
  
  // Rutas de instructor
  instructorDashboard: '/instructor/dashboard',
  instructorCourses: '/instructor/courses',
  createCourse: '/instructor/courses/create',
  editCourseDetails: (id: string) => `/instructor/courses/${id}/edit`,
  courseEditor: (id: string) => `/instructor/courses/${id}/editor`,
  editCourseStructure: (id: string) => `/instructor/courses/${id}/structure`,
  editLesson: (courseId: string, lessonId: string) => `/instructor/courses/${courseId}/lessons/${lessonId}/edit`,
  instructorStudents: '/instructor/students',
  
  // Rutas de administración
  adminDashboard: '/admin/dashboard',
  adminUsers: '/admin/users',
  adminRoles: '/admin/roles',
  adminCourses: '/admin/courses',
  adminCategories: '/admin/categories',
  adminLearning: '/admin/learning',
  adminCertificates: '/admin/certificates',
  adminCertificateVerify: (certificateId: string) => `/admin/certificates/verify/${certificateId}`,
  adminCertificateVerificationPortal: '/admin/certificates/verification-portal',
  adminActivity: '/admin/activity',
  adminInvoices: '/admin/invoices',
  adminSubscriptions: '/admin/subscriptions',
  adminBanks: '/admin/banks',
  adminCashflow: '/admin/cashflow',
  adminAlerts: '/admin/alerts',
  adminAnalytics: '/admin/analytics',
  adminContent: '/admin/content',
  adminPages: '/admin/pages',
  adminCreatePage: '/admin/pages/create',
  adminEditPage: (id: string) => `/admin/pages/${id}`,
  adminSettings: '/admin/settings',
  adminFeatures: '/admin/features',
  adminIntegrations: '/admin/integrations',
  adminData: '/admin/data',
  adminAudit: '/admin/audit',
  adminAccess: '/admin/access',
  adminAI: '/admin/ai',
  adminDesign: '/admin/design',
  adminNavigation: '/admin/navigation',
  adminNavigationDiagram: '/admin/navigation-diagram',
  adminRouteValidator: '/admin/route-validator',
  adminResources: '/admin/resources'
};

/**
 * Hook para facilitar la navegación usando las rutas definidas
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();
  
  /**
   * Navega a una ruta específica
   * @param path Ruta a la que navegar (usar routeMap para mantener consistencia)
   */
  const navigateTo = (path: string) => {
    navigate(path);
  };
  
  /**
   * Función para usar en manejadores de eventos que previene el comportamiento por defecto
   * @param path Ruta a la que navegar
   */
  const handleNavigate = (path: string) => (e?: SyntheticEvent) => {
    if (e) e.preventDefault();
    navigate(path);
  };
  
  return {
    navigateTo,
    handleNavigate,
    routes: routeMap
  };
};

/**
 * Verifica si una ruta coincide con un patrón
 * Útil para determinar si estamos en una sección específica
 * 
 * @param currentPath Ruta actual
 * @param pattern Patrón a verificar (puede ser exacto o usar * como comodín)
 */
export const matchRoute = (currentPath: string, pattern: string): boolean => {
  // Si el patrón termina con *, verificamos que la ruta comience con el resto del patrón
  if (pattern.endsWith('*')) {
    const basePattern = pattern.slice(0, -1);
    return currentPath.startsWith(basePattern);
  }
  
  // De lo contrario, buscamos una coincidencia exacta
  return currentPath === pattern;
};

/**
 * Obtiene la parte más específica de una ruta
 * Por ejemplo, para /admin/users/edit/123 retornaría 'edit'
 * 
 * @param path Ruta completa
 * @param level Nivel de profundidad (por defecto 2, lo que significa el tercer segmento)
 */
export const getRouteSegment = (path: string, level: number = 2): string => {
  const segments = path.split('/').filter(Boolean);
  return segments.length > level ? segments[level] : '';
};

/**
 * Verifica si una ruta está actualmente activa
 * Útil para resaltar elementos de navegación
 * 
 * @param currentPath Ruta actual
 * @param targetPath Ruta objetivo a comparar
 * @param exact Si debe coincidir exactamente o solo el comienzo
 */
export const isRouteActive = (currentPath: string, targetPath: string, exact: boolean = false): boolean => {
  if (exact) {
    return currentPath === targetPath;
  }
  return currentPath.startsWith(targetPath);
};
