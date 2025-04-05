import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';

// Pages
import NotFound from '@/pages/NotFound';
import LandingPage from '@/pages/LandingPage';

// Domain-specific routes
import UserRoutes from '@/routes/UserRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import InstructorRoutes from '@/routes/InstructorRoutes';
import CourseRoutes from '@/routes/CourseRoutes';
import AuthRoutes from '@/routes/AuthRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={<PublicLayout><LandingPage /></PublicLayout>} 
      />

      {/* Auth Routes */}
      <Route 
        path="/auth/*" 
        element={<AuthLayout><AuthRoutes /></AuthLayout>} 
      />
      
      {/* App Routes - All protected by SafeRouteWrapper */}
      <Route path="/app/*" element={<AppLayout />}>
        {/* Index route redirects to student dashboard */}
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        
        {/* Student Routes - Keep only functional routes */}
        <Route path="dashboard/*" element={<UserRoutes />} />
        <Route path="profile/*" element={<UserRoutes />} />
        <Route path="my-courses/*" element={<UserRoutes />} />
        
        {/* Course Routes */}
        <Route path="course/*" element={<CourseRoutes />} />
        
        {/* Admin Routes */}
        <Route path="admin/*" element={<AdminRoutes />} />
        
        {/* Instructor Routes */}
        <Route path="instructor/*" element={<InstructorRoutes />} />
        
        {/* Catch-all for undefined routes within app */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Global catch-all for undefined routes */}
      <Route 
        path="*" 
        element={<PublicLayout><NotFound /></PublicLayout>} 
      />
    </Routes>
  );
};

export default AppRoutes;
