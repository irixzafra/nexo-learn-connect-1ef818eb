
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import LandingPage from '@/pages/LandingPage';
import PlaceholderPage from '@/components/PlaceholderPage';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import AuthRoutes from './AuthRoutes';
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import AdminRoutes from './AdminRoutes';
import ProfileRoutes from './ProfileRoutes';
import CourseRoutes from './CourseRoutes';
import SettingsRoutes from './SettingsRoutes';
import InstructorRoutes from './InstructorRoutes';
import StudentDashboard from '@/pages/student/StudentDashboard';
import StudentMyCourses from '@/pages/student/StudentMyCourses';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Ruta raíz - Página principal */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      
      {/* Rutas públicas específicas */}
      <Route path="courses" element={
        <PublicLayout>
          <PlaceholderPage 
            title="Cursos" 
            subtitle="Catálogo de cursos disponibles" 
          />
        </PublicLayout>
      } />
      
      <Route path="about-us" element={
        <PublicLayout>
          <PlaceholderPage 
            title="Sobre Nosotros" 
            subtitle="Conoce más acerca de Nexo Learning" 
          />
        </PublicLayout>
      } />

      {/* Rutas de footer */}
      <Route path="terms" element={
        <PublicLayout>
          <PlaceholderPage 
            title="Términos de Servicio" 
            subtitle="Términos y condiciones de uso de Nexo Learning" 
          />
        </PublicLayout>
      } />

      <Route path="privacy" element={
        <PublicLayout>
          <PlaceholderPage 
            title="Política de Privacidad" 
            subtitle="Información sobre cómo protegemos tus datos" 
          />
        </PublicLayout>
      } />
      
      <Route path="contact" element={
        <PublicLayout>
          <PlaceholderPage 
            title="Contacto" 
            subtitle="Ponte en contacto con nosotros" 
          />
        </PublicLayout>
      } />
      
      {/* Rutas de autenticación */}
      <Route path="auth/*" element={
        <AuthLayout>
          <AuthRoutes />
        </AuthLayout>
      } />
      
      {/* Ruta para redirigir a /app */}
      <Route path="dashboard" element={
        <SafeRouteWrapper>
          {/* Esto redirigirá al dashboard principal */}
          <Navigate to="/app/dashboard" replace />
        </SafeRouteWrapper>
      } />
      
      {/* Rutas de aplicación autenticada */}
      <Route 
        path="/app" 
        element={
          <SafeRouteWrapper>
            <AppLayout />
          </SafeRouteWrapper>
        }
      >
        {/* Rutas Anidadas dentro de AppLayout */}
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-courses" element={<StudentMyCourses />} />

        {/* Rutas de Profile (para todos los autenticados) */}
        <Route path="profile/*" element={<ProfileRoutes />} />
        
        {/* Rutas de Settings (para todos los autenticados) */}
        <Route path="settings/*" element={<SettingsRoutes />} />

        {/* Rutas de Courses (para todos los autenticados) */}
        <Route path="course/*" element={<CourseRoutes />} /> 

        {/* Rutas de Admin (con protección de rol) */}
        <Route 
          path="admin/*" 
          element={
            <SafeRouteWrapper requiredRole={['admin']}>
              <AdminRoutes />
            </SafeRouteWrapper>
          } 
        />

        {/* Rutas de Profesor (con protección de rol) */}
        <Route 
          path="profesor/*" 
          element={
            <SafeRouteWrapper requiredRole={['profesor', 'admin']}> 
              <InstructorRoutes />
            </SafeRouteWrapper>
          } 
        />

        {/* Catch-all para rutas no encontradas DENTRO de /app */}
        <Route path="*" element={<NotFound />} /> 
      </Route>
      
      {/* Ruta para páginas no encontradas - siempre debe ser la última */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
};

export default AppRoutes;
