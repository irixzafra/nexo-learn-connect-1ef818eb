
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
      {/* 1. Ruta Raíz Pública */}
      <Route 
        path="/" 
        element={
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        } 
      />

      {/* 2. Ruta de Login (Ejemplo Auth) */}
      <Route 
        path="/auth/login" 
        element={
          <AuthLayout>
            <Login /> 
          </AuthLayout>
        } 
      />
      
      {/* 3. Ruta Base App (Autenticada) */}
      <Route 
        path="/app" 
        element={
          <SafeRouteWrapper>
            <AppLayout>
              {/* Renderiza un placeholder directamente aquí por ahora */}
              <PlaceholderPage title="App Base" subtitle="Contenido autenticado irá aquí" />
              {/* <Outlet /> se usará más tarde cuando volvamos a anidar */}
            </AppLayout>
          </SafeRouteWrapper>
        } 
      />

      {/* 4. Ruta NotFound Global */}
      <Route 
        path="*" 
        element={
          <PublicLayout>
            <NotFound />
          </PublicLayout>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
