
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/auth/Login'; 
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import StudentDashboard from '@/pages/student/Dashboard';
import StudentMyCourses from '@/pages/student/MyCourses';
import ProfileRoutes from '@/routes/ProfileRoutes';
import SettingsRoutes from '@/routes/SettingsRoutes';
import CourseRoutes from '@/routes/CourseRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import InstructorRoutes from '@/routes/InstructorRoutes';

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
      
      {/* 3. Ruta Base App (Autenticada) con rutas anidadas */}
      <Route 
        path="/app" 
        element={
          <SafeRouteWrapper>
            <AppLayout />
          </SafeRouteWrapper>
        } 
      >
        {/* Rutas anidadas dentro de /app */}
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-courses" element={<StudentMyCourses />} />
        <Route path="profile/*" element={<ProfileRoutes />} />
        <Route path="settings/*" element={<SettingsRoutes />} />
        <Route path="course/*" element={<CourseRoutes />} />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="profesor/*" element={<InstructorRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>

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
