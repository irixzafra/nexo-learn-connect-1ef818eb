import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AdminRoutes from './routes/AdminRoutes';
import SystemPagesPage from './pages/admin/SystemPagesPage';
import ComingSoonPage from './pages/common/ComingSoonPage';
import LearningPathsPage from './pages/student/LearningPathsPage';
import AuthRoutes from './routes/AuthRoutes';
import AuthLayout from './layouts/AuthLayout';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes - Updated to use the AuthRoutes component */}
        <Route path="/auth/*" element={<AuthLayout><AuthRoutes /></AuthLayout>} />
        
        {/* Public Routes - Keep for backward compatibility */}
        <Route path="/login" element={<AuthLayout><AuthRoutes /></AuthLayout>} />

        {/* App Routes (Authenticated) */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<div>DashboardPage</div>} />
          <Route path="dashboard" element={<div>DashboardPage</div>} />
          <Route path="courses" element={<div>CoursesPage</div>} />
          <Route path="my-courses" element={<div>MyCoursesPage</div>} />
          <Route path="profile" element={<div>ProfilePage</div>} />
          <Route path="settings" element={<div>SettingsPage</div>} />
          
          {/* Updated routes with specific page components */}
          <Route path="learning-paths" element={<LearningPathsPage />} />
          <Route path="recommendations" element={<ComingSoonPage />} />
          
          {/* Admin Routes */}
          <Route path="admin/*" element={<AdminRoutes />} />
        </Route>

        {/* Catch direct /learning-paths URL without /app prefix */}
        <Route path="/learning-paths" element={<AppLayout><LearningPathsPage /></AppLayout>} />

        {/* Redirect root to auth/login */}
        <Route path="/" element={<AuthLayout><AuthRoutes /></AuthLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
