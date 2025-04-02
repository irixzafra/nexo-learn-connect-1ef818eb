
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
      
      {/* Ruta App Base - SOLO Placeholder en AppLayout (protegido) */}
      <Route 
        path="/app" 
        element={
          <SafeRouteWrapper>
            <AppLayout>
              <PlaceholderPage title="App Base" subtitle="Contenido Autenticado" />
            </AppLayout>
          </SafeRouteWrapper>
        } 
      />

      {/* Ruta NotFound Global - SOLO NotFound en PublicLayout */}
      <Route 
        path="*" 
        element={<PublicLayout><NotFound /></PublicLayout>} 
      />
    </Routes>
  );
};

export default AppRoutes;
