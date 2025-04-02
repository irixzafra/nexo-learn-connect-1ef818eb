
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import PageRenderer from '@/features/pages/PageRenderer';
import AdminRoutes from './AdminRoutes';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Auth routes */}
      <Route path="auth/*" element={<AuthRoutes />} />
      
      {/* Fallback legacy routes - for backward compatibility */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Course routes */}
      <Route path="courses" element={<div>Courses Page</div>} />
      <Route path="courses/:courseId" element={<div>Course Detail Page</div>} />
      
      {/* Protected routes */}
      <Route path="dashboard" element={<div>Dashboard Page</div>} />
      <Route path="profile/settings" element={<div>Profile Settings Page</div>} />
      
      {/* Admin routes */}
      <Route path="admin/*" element={<AdminRoutes />} />
      
      {/* Dynamic page route - must be after all specific routes */}
      <Route path=":slug" element={<PageRenderer />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
