import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import PlaceholderPage from '@/components/PlaceholderPage';
import ReviewElementsPage from '@/pages/admin/ReviewElementsPage';

import NotFound from '@/pages/NotFound';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/auth/Login'; 
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';

// Import pages for student routes
import StudentDashboard from '@/pages/student/Dashboard';
import StudentMyCourses from '@/pages/student/MyCourses';
import LessonView from '@/pages/student/LessonView';

// Import course pages
import CourseCatalog from '@/pages/courses/CourseCatalog';
import CourseDetail from '@/pages/courses/CourseDetail';
import CourseEnrollment from '@/pages/courses/CourseEnrollment';

// Import pages for profile routes
import ProfileDashboard from '@/pages/profile/ProfileDashboard';
import ProfileEdit from '@/pages/profile/ProfileEdit';
import ProfileSecurity from '@/pages/profile/ProfileSecurity';
import ProfileNotifications from '@/pages/profile/ProfileNotifications';
import ProfileSubscriptions from '@/pages/profile/ProfileSubscriptions';

// Import pages for admin routes
import UserManagement from '@/pages/admin/UserManagement';
import Features from '@/pages/admin/Features';
import Settings from '@/pages/admin/Settings';
import SystemSettings from '@/pages/admin/SystemSettings';
import RoleManagement from '@/pages/admin/RoleManagement';
import AdminCourses from '@/pages/admin/AdminCourses';
import LinkDashboard from '@/pages/admin/LinkDashboard';
import UserAnalytics from '@/pages/admin/UserAnalytics';
import CourseAnalytics from '@/pages/admin/analytics/CourseAnalytics';
import RevenueAnalytics from '@/pages/admin/analytics/RevenueAnalytics';
import AIServicesPage from '@/pages/admin/ai/AIServicesPage';
import TestDataManagement from '@/pages/admin/TestDataManagement';
import AccessControl from '@/pages/admin/access/AccessControl';
import AdminDashboard from '@/pages/admin/Dashboard';
import PagesManagement from '@/pages/admin/settings/pages';
import OrphanReviewPage from '@/pages/admin/OrphanReviewPage';
import NavigationDiagram from '@/pages/admin/NavigationDiagram';
import AnalyticsOverview from '@/pages/admin/analytics/index';

// Import instructor pages
import InstructorDashboard from '@/pages/instructor/Dashboard';
import InstructorCoursesList from '@/pages/instructor/CoursesList';
import InstructorStudents from '@/pages/instructor/Students';
import InstructorCourseEditor from '@/pages/instructor/CourseEditor';
import InstructorEditCourseStructure from '@/pages/instructor/EditCourseStructure';
import InstructorEditLesson from '@/pages/instructor/EditLesson';
import CreateCourse from '@/pages/instructor/CreateCourse';
import EditCourseDetails from '@/pages/instructor/EditCourseDetails';

// Import settings pages
import GeneralSettingsPage from '@/pages/settings/GeneralSettingsPage';
import FeatureSettingsPage from '@/pages/settings/FeatureSettingsPage';
import DesignSettingsPage from '@/pages/settings/DesignSettingsPage';
import IntegrationsPage from '@/pages/admin/settings/integrations';
import DataManagementPage from '@/pages/admin/settings/data';
import AnalyticsSettingsPage from '@/pages/admin/settings/analytics';
import RolesAndPermissions from '@/pages/admin/settings/roles';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta Raíz - SOLO LandingPage en PublicLayout */}
      <Route 
        path="/" 
        element={<PublicLayout><LandingPage /></PublicLayout>} 
      />

      {/* Ruta Login - SOLO Login en AuthLayout */}
      <Route 
        path="/auth/login" 
        element={<AuthLayout><Login /></AuthLayout>} 
      />
      
      {/* Ruta App Base - AppLayout con Outlet para rutas anidadas */}
      {/* PRUEBA DIAGNÓSTICA: SafeRouteWrapper temporalmente eliminado */}
      <Route 
        path="/app/*" 
        element={<AppLayout />} 
      >
        {/* --- Rutas Estudiante --- */}
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-courses" element={<StudentMyCourses />} />
        
        {/* --- Rutas Profile --- */}
        <Route path="profile" element={<ProfileDashboard />} />
        <Route path="profile/edit" element={<ProfileEdit />} />
        <Route path="profile/security" element={<ProfileSecurity />} />
        <Route path="profile/notifications" element={<ProfileNotifications />} />
        <Route path="profile/subscriptions" element={<ProfileSubscriptions />} />
        
        {/* --- Rutas Settings --- */}
        <Route path="settings" element={<GeneralSettingsPage />} />
        <Route path="settings/features" element={<FeatureSettingsPage />} />
        <Route path="settings/design" element={<DesignSettingsPage />} />
        <Route path="settings/integrations" element={<IntegrationsPage />} />
        <Route path="settings/data" element={<DataManagementPage />} />
        <Route path="settings/pages" element={<PagesManagement />} />
        <Route path="settings/analytics" element={<AnalyticsSettingsPage />} />
        <Route path="settings/roles" element={<RolesAndPermissions />} />
        
        {/* --- Rutas Course --- */}
        <Route path="course" element={<CourseCatalog />} />
        <Route path="course/:courseId" element={<CourseDetail />} />
        <Route path="course/:courseId/enroll" element={<CourseEnrollment />} />
        <Route path="course/:courseId/lesson/:lessonId" element={<LessonView />} />
        
        {/* --- Rutas Student adicionales --- */}
        <Route path="student/dashboard" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><StudentDashboard /></SafeRouteWrapper>} />
        <Route path="student/courses" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><StudentMyCourses /></SafeRouteWrapper>} />
        <Route path="student/learning-paths" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Rutas de Aprendizaje" subtitle="Explora rutas de aprendizaje diseñadas para tu desarrollo profesional" /></SafeRouteWrapper>} />
        <Route path="student/achievements" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Logros y Certificados" subtitle="Visualiza tus logros y certificados obtenidos" /></SafeRouteWrapper>} />
        <Route path="student/calendar" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Calendario Académico" subtitle="Gestiona tus eventos y fechas importantes" /></SafeRouteWrapper>} />
        
        {/* --- Rutas adicionales de aprendizaje --- */}
        <Route path="learning-paths" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Rutas de Aprendizaje" subtitle="Explora rutas de aprendizaje personalizadas" /></SafeRouteWrapper>} />
        <Route path="certificates" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Certificados" subtitle="Gestiona tus certificados obtenidos" /></SafeRouteWrapper>} />
        <Route path="achievements" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Logros" subtitle="Visualiza tus logros en la plataforma" /></SafeRouteWrapper>} />
        <Route path="leaderboard" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Tabla de Posiciones" subtitle="Compara tu rendimiento con otros estudiantes" /></SafeRouteWrapper>} />
        <Route path="challenges" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Desafíos" subtitle="Participa en desafíos para mejorar tus habilidades" /></SafeRouteWrapper>} />
        <Route path="calendar" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Calendario" subtitle="Gestiona tus eventos y fechas importantes" /></SafeRouteWrapper>} />
        <Route path="help" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Ayuda" subtitle="Centro de ayuda y soporte" /></SafeRouteWrapper>} />
        <Route path="recommendations" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Recomendaciones" subtitle="Cursos y contenido recomendado para ti" /></SafeRouteWrapper>} />
        <Route path="community" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Comunidad" subtitle="Conecta con otros estudiantes y profesores" /></SafeRouteWrapper>} />
        <Route path="messages" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Mensajes" subtitle="Centro de mensajería interna" /></SafeRouteWrapper>} />
        <Route path="notifications" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Notificaciones" subtitle="Gestiona tus notificaciones" /></SafeRouteWrapper>} />
        <Route path="preferences" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Preferencias" subtitle="Configura tus preferencias de aprendizaje" /></SafeRouteWrapper>} />
        <Route path="analytics/personal" element={<SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}><PlaceholderPage title="Analíticas Personales" subtitle="Visualiza tu progreso y estadísticas" /></SafeRouteWrapper>} />
        <Route path="my-courses/in-progress" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Cursos en Progreso" subtitle="Tus cursos actuales" /></SafeRouteWrapper>} />
        <Route path="my-courses/completed" element={<SafeRouteWrapper requiredRole={['student', 'admin']}><PlaceholderPage title="Cursos Completados" subtitle="Cursos que has finalizado" /></SafeRouteWrapper>} />
        
        {/* --- Rutas Admin (con wrapper individual) --- */}
        <Route path="admin" element={<SafeRouteWrapper requiredRole={['admin']}><AdminDashboard /></SafeRouteWrapper>} />
        <Route path="admin/dashboard" element={<SafeRouteWrapper requiredRole={['admin']}><AdminDashboard /></SafeRouteWrapper>} />
        <Route path="admin/users" element={<SafeRouteWrapper requiredRole={['admin']}><UserManagement /></SafeRouteWrapper>} />
        <Route path="admin/courses" element={<SafeRouteWrapper requiredRole={['admin']}><AdminCourses /></SafeRouteWrapper>} />
        <Route path="admin/features" element={<SafeRouteWrapper requiredRole={['admin']}><Features /></SafeRouteWrapper>} />
        <Route path="admin/settings" element={<SafeRouteWrapper requiredRole={['admin']}><Settings /></SafeRouteWrapper>} />
        <Route path="admin/system-settings" element={<SafeRouteWrapper requiredRole={['admin']}><SystemSettings /></SafeRouteWrapper>} />
        <Route path="admin/roles" element={<SafeRouteWrapper requiredRole={['admin']}><RoleManagement /></SafeRouteWrapper>} />
        <Route path="admin/link-dashboard" element={<SafeRouteWrapper requiredRole={['admin']}><LinkDashboard /></SafeRouteWrapper>} />
        
        {/* --- Rutas Admin Analytics --- */}
        <Route path="admin/analytics" element={<SafeRouteWrapper requiredRole={['admin']}><AnalyticsOverview /></SafeRouteWrapper>} />
        <Route path="admin/analytics/users" element={<SafeRouteWrapper requiredRole={['admin']}><UserAnalytics /></SafeRouteWrapper>} />
        <Route path="admin/analytics/courses" element={<SafeRouteWrapper requiredRole={['admin']}><CourseAnalytics /></SafeRouteWrapper>} />
        <Route path="admin/analytics/revenue" element={<SafeRouteWrapper requiredRole={['admin']}><RevenueAnalytics /></SafeRouteWrapper>} />
        
        {/* --- Rutas Admin adicionales --- */}
        <Route path="admin/navigation-diagram" element={<SafeRouteWrapper requiredRole={['admin']}><NavigationDiagram /></SafeRouteWrapper>} />
        <Route path="admin/reports" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Informes" subtitle="Sistema de informes en desarrollo" /></SafeRouteWrapper>} />
        <Route path="admin/payments" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Pagos y Facturación" subtitle="Sistema de pagos en desarrollo" /></SafeRouteWrapper>} />
        <Route path="admin/ai-services" element={<SafeRouteWrapper requiredRole={['admin']}><AIServicesPage /></SafeRouteWrapper>} />
        <Route path="admin/test-data" element={<SafeRouteWrapper requiredRole={['admin']}><TestDataManagement /></SafeRouteWrapper>} />
        <Route path="admin/access-control" element={<SafeRouteWrapper requiredRole={['admin']}><AccessControl /></SafeRouteWrapper>} />
        <Route path="admin/system-pages" element={<SafeRouteWrapper requiredRole={['admin']}><PagesManagement /></SafeRouteWrapper>} />
        <Route path="admin/orphan-review" element={<SafeRouteWrapper requiredRole={['admin']}><OrphanReviewPage /></SafeRouteWrapper>} />
        <Route path="admin/design-system" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Design System" /></SafeRouteWrapper>} />
        
        {/* --- Nueva ruta para revisión de elementos obsoletos --- */}
        <Route path="admin/review-elements" element={<SafeRouteWrapper requiredRole={['admin']}><ReviewElementsPage /></SafeRouteWrapper>} />
        
        {/* --- Rutas Instructor (con wrapper individual) --- */}
        <Route path="instructor" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><InstructorDashboard /></SafeRouteWrapper>} />
        <Route path="instructor/dashboard" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><InstructorDashboard /></SafeRouteWrapper>} />
        <Route path="instructor/courses" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><InstructorCoursesList /></SafeRouteWrapper>} />
        <Route path="instructor/students" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><InstructorStudents /></SafeRouteWrapper>} />
        <Route path="instructor/courses/create" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><CreateCourse /></SafeRouteWrapper>} />
        <Route path="instructor/courses/:id/edit" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><EditCourseDetails /></SafeRouteWrapper>} />
        <Route path="instructor/courses/:id/analytics" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><PlaceholderPage title="Analíticas del Curso (Instructor)" /></SafeRouteWrapper>} />
        <Route path="instructor/courses/:id/editor" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><InstructorCourseEditor /></SafeRouteWrapper>} />
        <Route path="instructor/courses/:id/structure" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><InstructorEditCourseStructure /></SafeRouteWrapper>} />
        <Route path="instructor/courses/:courseId/lessons/:lessonId/edit" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><InstructorEditLesson /></SafeRouteWrapper>} />
        
        {/* --- Rutas Instructor adicionales --- */}
        <Route path="instructor/assignments" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><PlaceholderPage title="Notas y Tareas" subtitle="Sistema de gestión de tareas en desarrollo" /></SafeRouteWrapper>} />
        <Route path="instructor/messages" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><PlaceholderPage title="Mensajes de Instructor" subtitle="Sistema de mensajería en desarrollo" /></SafeRouteWrapper>} />
        <Route path="instructor/analytics" element={<SafeRouteWrapper requiredRole={['instructor', 'admin']}><PlaceholderPage title="Analíticas de Instructor" subtitle="Dashboard de analíticas en desarrollo" /></SafeRouteWrapper>} />
        
        {/* Catch-all para rutas no encontradas DENTRO de /app */}
        <Route path="*" element={<NotFound />} /> 
      </Route>

      {/* Ruta NotFound Global - SOLO NotFound en PublicLayout */}
      <Route 
        path="*" 
        element={<PublicLayout><NotFound /></PublicLayout>} 
      />
    </Routes>
  );
};

export default AppRoutes;
