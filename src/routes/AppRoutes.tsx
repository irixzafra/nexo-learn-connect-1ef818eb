import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import LoginPage from '@/pages/auth/LoginPage';
import HomePage from '@/pages/HomePage';
import NotFound from '@/pages/NotFound';
import MaterialDesign from '@/pages/MaterialDesign';

// Resto de importaciones para tu aplicación...

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
          
          {/* Resto de rutas de tu aplicación... */}
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
