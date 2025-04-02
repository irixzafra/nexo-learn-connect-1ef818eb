
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
        <Route path="settings" element={<PlaceholderPage title="Configuración General" />} />
        <Route path="settings/features" element={<PlaceholderPage title="Funcionalidades" />} />
        <Route path="settings/account" element={<PlaceholderPage title="Cuenta" />} />
        <Route path="settings/notifications" element={<PlaceholderPage title="Notificaciones" />} />
        <Route path="settings/security" element={<PlaceholderPage title="Seguridad" />} />
        
        {/* --- Rutas Course --- */}
        <Route path="course" element={<PlaceholderPage title="Catálogo de Cursos" />} />
        <Route path="course/:courseId" element={<PlaceholderPage title="Detalle de Curso" />} />
        <Route path="course/:courseId/lesson/:lessonId" element={<PlaceholderPage title="Lección de Curso" />} />
        <Route path="course/:courseId/modules" element={<PlaceholderPage title="Módulos del Curso" />} />
        <Route path="course/:courseId/students" element={<PlaceholderPage title="Estudiantes del Curso" />} />
        
        {/* --- Rutas Admin (con wrapper individual) --- */}
        <Route path="admin" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Panel de Administración" /></SafeRouteWrapper>} />
        <Route path="admin/dashboard" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Dashboard Admin" /></SafeRouteWrapper>} />
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
        <Route path="admin/system-pages" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Páginas del Sistema" /></SafeRouteWrapper>} />
        <Route path="admin/design-system" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Design System" /></SafeRouteWrapper>} />
        
        {/* --- Rutas Profesor (con wrapper individual) --- */}
        <Route path="profesor" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><PlaceholderPage title="Panel de Profesor" /></SafeRouteWrapper>} />
        <Route path="profesor/dashboard" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><PlaceholderPage title="Dashboard Profesor" /></SafeRouteWrapper>} />
        <Route path="profesor/courses" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><PlaceholderPage title="Mis Cursos (Profesor)" /></SafeRouteWrapper>} />
        <Route path="profesor/students" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><PlaceholderPage title="Mis Estudiantes" /></SafeRouteWrapper>} />
        <Route path="profesor/content" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><PlaceholderPage title="Gestión de Contenido" /></SafeRouteWrapper>} />
        <Route path="profesor/lessons" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><PlaceholderPage title="Lecciones" /></SafeRouteWrapper>} />
        <Route path="profesor/assignments" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><PlaceholderPage title="Tareas" /></SafeRouteWrapper>} />
        
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
