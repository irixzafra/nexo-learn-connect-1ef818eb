
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import PageRenderer from '@/features/pages/PageRenderer';
import AdminRoutes from './AdminRoutes';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import LandingPage from '@/pages/LandingPage';
import PlaceholderPage from '@/components/PlaceholderPage';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import AccessibilityPage from '@/pages/accessibility/AccessibilityPage';
import RouteRedirector from '@/components/RouteRedirector';
import UserRoutes from './UserRoutes';
import ProfileRoutes from './ProfileRoutes';
import CourseRoutes from './CourseRoutes';
import ProfesorRoutes from './InstructorRoutes';
import ModeratorRoutes from './ModeratorRoutes';
import SettingsRoutes from './SettingsRoutes';
import AccessibilityRoutes from './AccessibilityRoutes';
import PaymentRoutes from './PaymentRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Ruta raíz - Página principal */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Rutas específicas que corresponden a secciones principales */}
      <Route path="dashboard" element={
        <SafeRouteWrapper>
          <PlaceholderPage title="Dashboard" subtitle="Panel principal del usuario" />
        </SafeRouteWrapper>
      } />
      
      <Route path="profile/*" element={
        <SafeRouteWrapper>
          <ProfileRoutes />
        </SafeRouteWrapper>
      } />
      
      <Route path="settings/*" element={
        <SafeRouteWrapper>
          <SettingsRoutes />
        </SafeRouteWrapper>
      } />
      
      <Route path="courses" element={<PlaceholderPage title="Cursos" subtitle="Catálogo de cursos disponibles" />} />
      <Route path="courses/:courseId" element={<PlaceholderPage title="Detalle del Curso" subtitle="Información detallada del curso" />} />
      <Route path="course/*" element={<SafeRouteWrapper><CourseRoutes /></SafeRouteWrapper>} />
      
      {/* Rutas de redirección y utilidad */}
      <Route path="accessibility/*" element={<SafeRouteWrapper><AccessibilityRoutes /></SafeRouteWrapper>} />
      <Route path="accessibility" element={<AccessibilityPage />} />
      <Route path="r/:path" element={<RouteRedirector />} />
      <Route path="redirect/:path" element={<RouteRedirector />} />
      
      {/* Rutas con roles específicos */}
      <Route path="admin/*" element={<SafeRouteWrapper requiredRole={['admin']}><AdminRoutes /></SafeRouteWrapper>} />
      <Route path="profesor/*" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><ProfesorRoutes /></SafeRouteWrapper>} />
      <Route path="moderator/*" element={<SafeRouteWrapper><ModeratorRoutes /></SafeRouteWrapper>} />
      <Route path="user/*" element={<SafeRouteWrapper><UserRoutes /></SafeRouteWrapper>} />
      <Route path="payment/:status" element={<PaymentRoutes />} />
      
      {/* Rutas de autenticación */}
      <Route path="auth/*" element={<AuthRoutes />} />
      
      {/* Rutas públicas anidadas */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Ruta dinámica de páginas - debe estar después de todas las rutas específicas pero antes del 404 */}
      <Route path=":slug" element={<PageRenderer />} />
      
      {/* Ruta para páginas no encontradas - siempre debe ser la última */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
