
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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Ruta raíz - Página principal */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Rutas públicas */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Rutas de autenticación */}
      <Route path="auth/*" element={<AuthRoutes />} />
      
      {/* Placeholders para rutas principales */}
      <Route path="dashboard" element={
        <SafeRouteWrapper>
          <PlaceholderPage title="Dashboard" subtitle="Panel principal del usuario" />
        </SafeRouteWrapper>
      } />
      
      <Route path="profile" element={
        <SafeRouteWrapper>
          <PlaceholderPage title="Mi Perfil" subtitle="Información del perfil de usuario" />
        </SafeRouteWrapper>
      } />
      
      <Route path="settings" element={
        <SafeRouteWrapper>
          <PlaceholderPage title="Configuración" subtitle="Opciones y preferencias del usuario" />
        </SafeRouteWrapper>
      } />
      
      <Route path="courses" element={<PlaceholderPage title="Cursos" subtitle="Catálogo de cursos disponibles" />} />
      
      <Route path="courses/:courseId" element={<PlaceholderPage title="Detalle del Curso" subtitle="Información detallada del curso" />} />
      
      {/* Rutas de administración */}
      <Route path="admin/*" element={<AdminRoutes />} />
      
      {/* Ruta dinámica de páginas - debe estar después de todas las rutas específicas */}
      <Route path=":slug" element={<PageRenderer />} />
      
      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
