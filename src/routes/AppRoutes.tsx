
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import LoginPage from '@/pages/auth/LoginPage';
import HomePage from '@/pages/HomePage';
import NotFound from '@/pages/NotFound';
import MaterialDesign from '@/pages/MaterialDesign';
import ButtonPage from '@/pages/design-system/components/ButtonPage';
import DesignSystemPage from '@/pages/design-system/DesignSystemPage';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas con el layout principal */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Ruta para el Material Design System */}
          <Route path="/material-design" element={<MaterialDesign />} />
          
          {/* Rutas para el Design System */}
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/design-system/components/button" element={<ButtonPage />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
