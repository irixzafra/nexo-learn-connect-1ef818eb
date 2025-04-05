
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';

// Pages
import NotFound from '@/pages/NotFound';

// Domain-specific routes
import UserRoutes from '@/routes/UserRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import ModeratorRoutes from '@/routes/ModeratorRoutes';
import InstructorRoutes from '@/routes/InstructorRoutes';
import CourseRoutes from '@/routes/CourseRoutes';
import AuthRoutes from '@/routes/AuthRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route 
        path="/auth/*" 
        element={<AuthLayout><AuthRoutes /></AuthLayout>} 
      />
      
      {/* App Routes - All protected by SafeRouteWrapper */}
      <Route path="/app/*" element={<AppLayout />}>
        {/* Index route redirects to student dashboard */}
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        
        {/* Student Routes */}
        <Route path="dashboard/*" element={<UserRoutes />} />
        <Route path="profile/*" element={<UserRoutes />} />
        
        {/* Course Routes */}
        <Route path="courses/*" element={<CourseRoutes />} />
        
        {/* Admin Routes */}
        <Route path="admin/*" element={<AdminRoutes />} />
        
        {/* Moderator Routes */}
        <Route path="moderator/*" element={<ModeratorRoutes />} />
        
        {/* Instructor Routes */}
        <Route path="instructor/*" element={<InstructorRoutes />} />
      </Route>

      {/* Public course routes */}
      <Route path="/courses/*" element={<PublicLayout><CourseRoutes /></PublicLayout>} />
      
      {/* Direct content-review route */}
      <Route path="/content-review" element={<AppLayout><ModeratorRoutes /></AppLayout>} />

      {/* Redirect root to auth/login */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      
      {/* Global catch-all for undefined routes */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
};

export default AppRoutes;
