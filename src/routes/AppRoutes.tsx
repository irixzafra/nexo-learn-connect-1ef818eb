
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import PageRenderer from '@/features/pages/PageRenderer';
import AdminRoutes from './AdminRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Auth routes */}
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/register" element={<div>Register Page</div>} />

      {/* Course routes */}
      <Route path="/courses" element={<div>Courses Page</div>} />
      <Route path="/courses/:courseId" element={<div>Course Detail Page</div>} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      <Route path="/profile/settings" element={<div>Profile Settings Page</div>} />
      
      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Dynamic page route - must be after all specific routes */}
      <Route path="/:slug" element={<PageRenderer />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
