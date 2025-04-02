
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import LandingPage from '@/pages/LandingPage';
import PlaceholderPage from '@/components/PlaceholderPage';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';
import ProfileRoutes from './ProfileRoutes';
import CourseRoutes from './CourseRoutes';
import ProfesorRoutes from './InstructorRoutes';
import ModeratorRoutes from './ModeratorRoutes';
import SettingsRoutes from './SettingsRoutes';
import AccessibilityRoutes from './AccessibilityRoutes';
import PaymentRoutes from './PaymentRoutes';
import AppLayout from '@/layouts/AppLayout';
import PublicLayout from '@/layouts/PublicLayout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Ruta raíz - Página principal */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      
      {/* Rutas específicas que corresponden a secciones principales */}
      <Route path="dashboard" element={
        <SafeRouteWrapper>
          <AppLayout>
            <PlaceholderPage 
              title="Dashboard" 
              subtitle="Panel principal del usuario" 
            />
          </AppLayout>
        </SafeRouteWrapper>
      } />
      
      {/* Rutas anidadas - Autenticadas con wrapper */}
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
      
      <Route path="courses" element={
        <PublicLayout>
          <PlaceholderPage 
            title="Cursos" 
            subtitle="Catálogo de cursos disponibles" 
          />
        </PublicLayout>
      } />
      
      <Route path="course/*" element={
        <SafeRouteWrapper>
          <CourseRoutes />
        </SafeRouteWrapper>
      } />
      
      {/* Rutas con roles específicos */}
      <Route path="admin/*" element={
        <SafeRouteWrapper requiredRole={['admin']}>
          <AdminRoutes />
        </SafeRouteWrapper>
      } />
      
      <Route path="profesor/*" element={
        <SafeRouteWrapper requiredRole={['profesor', 'admin']}>
          <ProfesorRoutes />
        </SafeRouteWrapper>
      } />
      
      <Route path="moderator/*" element={
        <SafeRouteWrapper>
          <ModeratorRoutes />
        </SafeRouteWrapper>
      } />
      
      {/* Rutas de autenticación */}
      <Route path="auth/*" element={<AuthRoutes />} />
      
      {/* Otras rutas específicas con wrappers */}
      <Route path="accessibility/*" element={
        <SafeRouteWrapper>
          <AccessibilityRoutes />
        </SafeRouteWrapper>
      } />
      
      <Route path="payment/:status" element={<PaymentRoutes />} />
      
      {/* Ruta para páginas no encontradas - siempre debe ser la última */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
};

export default AppRoutes;
