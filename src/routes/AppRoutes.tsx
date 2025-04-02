
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
import AdminRoutes from '@/routes/AdminRoutes';
import ProfileRoutes from '@/routes/ProfileRoutes';
import CourseRoutes from '@/routes/CourseRoutes';
import InstructorRoutes from '@/routes/InstructorRoutes';
import SettingsRoutes from '@/routes/SettingsRoutes';

// Import pages for student routes
import StudentDashboard from '@/pages/student/Dashboard';
import StudentMyCourses from '@/pages/student/MyCourses';

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
      
      {/* Ruta App Base - AppLayout con Outlet para rutas anidadas */}
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
        
        {/* Rutas de Admin (CON protección de rol) */}
        <Route 
          path="admin/*" 
          element={
            <SafeRouteWrapper requiredRole={['admin']}>
              <AdminRoutes />
            </SafeRouteWrapper>
          } 
        />

        {/* Rutas de Profesor (CON protección de rol) */}
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

      {/* Ruta NotFound Global - SOLO NotFound en PublicLayout */}
      <Route 
        path="*" 
        element={<PublicLayout><NotFound /></PublicLayout>} 
      />
    </Routes>
  );
};

export default AppRoutes;
