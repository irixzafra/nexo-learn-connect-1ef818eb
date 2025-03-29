
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

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes are accessible without authentication */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* User routes for standard authenticated users */}
      <Route path="/home/*" element={<UserRoutes />} />
      
      {/* Role-specific routes */}
      <Route path="/instructor/*" element={<InstructorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Direct profile access route */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      {/* Index redirect to home or landing page */}
      <Route path="/index" element={<Navigate to="/" replace />} />
      
      {/* Course catalog and detail routes that should be accessible to everyone */}
      <Route path="/courses" element={<CoursesCatalog />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      
      {/* My courses redirect for authenticated users */}
      <Route path="/my-courses" element={
        <ProtectedRoute>
          <Navigate to="/home/my-courses" replace />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route for not found pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
