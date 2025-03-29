
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';
import InstructorRoutes from './InstructorRoutes';
import AdminRoutes from './AdminRoutes';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import CoursesCatalog from '@/pages/CoursesCatalog';
import CourseDetail from '@/pages/CourseDetail';
import AppLayout from '@/layouts/AppLayout';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes are accessible without authentication */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* User routes for standard authenticated users */}
      <Route path="/home/*" element={
        <ProtectedRoute>
          <UserRoutes />
        </ProtectedRoute>
      } />
      
      {/* Role-specific routes */}
      <Route path="/instructor/*" element={
        <ProtectedRoute>
          <InstructorRoutes />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminRoutes />
        </ProtectedRoute>
      } />
      
      {/* Sistemas routes */}
      <Route path="/sistemas/*" element={
        <ProtectedRoute>
          <AppLayout>
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold mb-4">Sistemas</h1>
              <p className="text-muted-foreground">Esta sección está en desarrollo.</p>
            </div>
          </AppLayout>
        </ProtectedRoute>
      } />
      
      {/* Course catalog and detail routes with proper layout */}
      <Route path="/courses" element={
        <AppLayout>
          <div className="container mx-auto px-4 py-6">
            <CoursesCatalog />
          </div>
        </AppLayout>
      } />
      
      <Route path="/courses/:id" element={
        <AppLayout>
          <div className="container mx-auto px-4 py-6">
            <CourseDetail />
          </div>
        </AppLayout>
      } />
      
      {/* My courses route with redirection to user routes */}
      <Route path="/my-courses" element={
        <ProtectedRoute>
          <Navigate to="/home/my-courses" replace />
        </ProtectedRoute>
      } />
      
      {/* Profile with layout */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <AppLayout>
            <div className="container mx-auto px-4 py-6">
              <Profile />
            </div>
          </AppLayout>
        </ProtectedRoute>
      } />
      
      {/* Index redirect to home or landing page */}
      <Route path="/index" element={<Navigate to="/" replace />} />
      
      {/* Catch-all route for not found pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
