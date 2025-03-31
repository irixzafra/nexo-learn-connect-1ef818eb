
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import PageRenderer from '@/features/pages/PageRenderer';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas principales - Importa estas páginas cuando estén disponibles */}
      <Route path="/" element={<PageRenderer />} />
      
      {/* Rutas de autenticación */}
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/register" element={<div>Register Page</div>} />

      {/* Rutas de cursos */}
      <Route path="/courses" element={<div>Courses Page</div>} />
      <Route path="/courses/:courseId" element={<div>Course Detail Page</div>} />
      
      {/* Rutas protegidas */}
      <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      <Route path="/profile/settings" element={<div>Profile Settings Page</div>} />
      
      {/* Rutas de administración */}
      <Route path="/admin/*" element={<div>Admin Routes</div>} />
      
      {/* Dynamic page route - must be after all specific routes */}
      <Route path="/:slug" element={<PageRenderer />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
