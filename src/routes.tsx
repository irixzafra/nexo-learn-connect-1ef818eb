
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AdminRoutes from './routes/AdminRoutes';
import ModeratorRoutes from './routes/ModeratorRoutes';
import LearningPathsPage from './pages/student/LearningPathsPage';
import AuthRoutes from './routes/AuthRoutes';
import AuthLayout from './layouts/AuthLayout';
import CourseRoutes from './routes/CourseRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthLayout><AuthRoutes /></AuthLayout>} />
      
      {/* App Routes (Authenticated) */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<div>DashboardPage</div>} />
        <Route path="courses/*" element={<CourseRoutes />} />
        <Route path="profile" element={<div>ProfilePage</div>} />
        <Route path="learning-paths" element={<LearningPathsPage />} />
        
        {/* Admin Routes */}
        <Route path="admin/*" element={<AdminRoutes />} />
        
        {/* Moderator Routes */}
        <Route path="moderator/*" element={<ModeratorRoutes />} />
      </Route>

      {/* Direct content-review route */}
      <Route path="/content-review" element={<AppLayout><ModeratorRoutes /></AppLayout>} />

      {/* Public course routes */}
      <Route path="/courses/*" element={<CourseRoutes />} />

      {/* Redirect root to auth/login */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
