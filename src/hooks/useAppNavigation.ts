
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeMap } from '@/utils/routeUtils';

/**
 * Hook para facilitar la navegación consistente en toda la aplicación
 * utilizando el mapa de rutas centralizado.
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();
  
  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);
  
  const navigateToHome = useCallback(() => {
    navigate(routeMap.home);
  }, [navigate]);
  
  const navigateToInstructorDashboard = useCallback(() => {
    navigate(routeMap.profesorDashboard);
  }, [navigate]);
  
  const navigateToInstructorCourses = useCallback(() => {
    navigate(routeMap.profesorCourses);
  }, [navigate]);
  
  const navigateToInstructorStudents = useCallback(() => {
    navigate(routeMap.profesorStudents);
  }, [navigate]);
  
  const navigateToProfile = useCallback(() => {
    navigate(routeMap.profile);
  }, [navigate]);
  
  const navigateToSettings = useCallback(() => {
    navigate(routeMap.settings);
  }, [navigate]);
  
  const navigateToAdminDashboard = useCallback(() => {
    navigate(routeMap.adminDashboard);
  }, [navigate]);
  
  const navigateToStudentDashboard = useCallback(() => {
    navigate(routeMap.dashboard);
  }, [navigate]);
  
  const navigateToMyCourses = useCallback(() => {
    navigate(routeMap.myCourses);
  }, [navigate]);
  
  const navigateToCourseDetail = useCallback((id: string) => {
    navigate(routeMap.courseDetail(id));
  }, [navigate]);
  
  return {
    routes: routeMap,
    navigateTo,
    navigateToHome,
    navigateToInstructorDashboard,
    navigateToInstructorCourses,
    navigateToInstructorStudents,
    navigateToProfile,
    navigateToSettings,
    navigateToAdminDashboard,
    navigateToStudentDashboard,
    navigateToMyCourses,
    navigateToCourseDetail
  };
};
