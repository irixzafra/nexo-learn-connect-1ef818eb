
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import LandingPage from '@/pages/LandingPage';
import PlaceholderPage from '@/components/PlaceholderPage';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import AuthRoutes from './AuthRoutes';
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';

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
      
      {/* Rutas de autenticación */}
      <Route path="auth/*" element={
        <AuthLayout>
          <AuthRoutes />
        </AuthLayout>
      } />
      
      {/* Rutas de aplicación autenticada */}
      <Route path="app/*" element={
        <SafeRouteWrapper>
          <AppLayout>
            <Routes>
              <Route path="/" element={
                <PlaceholderPage 
                  title="Dashboard" 
                  subtitle="Panel principal del usuario autenticado" 
                />
              } />
              <Route path="dashboard" element={
                <PlaceholderPage 
                  title="Dashboard" 
                  subtitle="Panel principal del usuario autenticado" 
                />
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </SafeRouteWrapper>
      } />
      
      {/* Ruta para páginas no encontradas - siempre debe ser la última */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
};

export default AppRoutes;
