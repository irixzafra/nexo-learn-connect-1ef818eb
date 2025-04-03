
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/auth/Login'; 
import PlaceholderPage from '@/components/PlaceholderPage';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
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

// Import instructor pages
import InstructorDashboard from '@/pages/instructor/Dashboard';
import InstructorCoursesList from '@/pages/instructor/CoursesList';
import InstructorStudents from '@/pages/instructor/Students';
import InstructorCourseEditor from '@/pages/instructor/CourseEditor';
import InstructorEditCourseStructure from '@/pages/instructor/EditCourseStructure';
import InstructorEditLesson from '@/pages/instructor/EditLesson';

// Import settings pages
import GeneralSettingsPage from '@/pages/settings/GeneralSettingsPage';
import FeatureSettingsPage from '@/pages/settings/FeatureSettingsPage';
import DesignSettingsPage from '@/pages/settings/DesignSettingsPage';
import IntegrationsPage from '@/pages/admin/settings/integrations';
import DataManagementPage from '@/pages/admin/settings/data';
import AnalyticsSettingsPage from '@/pages/admin/settings/analytics';
import RolesAndPermissions from '@/pages/admin/settings/roles';

const AppRoutes: React.FC = () => {
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
        <Route path="admin/analytics/users" element={<SafeRouteWrapper requiredRole={['admin']}><UserAnalytics /></SafeRouteWrapper>} />
        <Route path="admin/analytics/courses" element={<SafeRouteWrapper requiredRole={['admin']}><CourseAnalytics /></SafeRouteWrapper>} />
        <Route path="admin/analytics/revenue" element={<SafeRouteWrapper requiredRole={['admin']}><RevenueAnalytics /></SafeRouteWrapper>} />
        <Route path="admin/ai-services" element={<SafeRouteWrapper requiredRole={['admin']}><AIServicesPage /></SafeRouteWrapper>} />
        <Route path="admin/test-data" element={<SafeRouteWrapper requiredRole={['admin']}><TestDataManagement /></SafeRouteWrapper>} />
        <Route path="admin/access-control" element={<SafeRouteWrapper requiredRole={['admin']}><AccessControl /></SafeRouteWrapper>} />
        <Route path="admin/system-pages" element={<SafeRouteWrapper requiredRole={['admin']}><PagesManagement /></SafeRouteWrapper>} />
        <Route path="admin/design-system" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Design System" /></SafeRouteWrapper>} />
        
        {/* --- Rutas Profesor (con wrapper individual) --- */}
        <Route path="profesor" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><InstructorDashboard /></SafeRouteWrapper>} />
        <Route path="profesor/dashboard" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><InstructorDashboard /></SafeRouteWrapper>} />
        <Route path="profesor/courses" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><InstructorCoursesList /></SafeRouteWrapper>} />
        <Route path="profesor/students" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><InstructorStudents /></SafeRouteWrapper>} />
        <Route path="profesor/courses/:id/editor" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><InstructorCourseEditor /></SafeRouteWrapper>} />
        <Route path="profesor/courses/:id/structure" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><InstructorEditCourseStructure /></SafeRouteWrapper>} />
        <Route path="profesor/courses/:courseId/lessons/:lessonId/edit" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><InstructorEditLesson /></SafeRouteWrapper>} />
        
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
