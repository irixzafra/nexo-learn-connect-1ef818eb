
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AdminRoutes from './routes/AdminRoutes';
import NavigationManagerPage from './pages/admin/NavigationManagerPage';
import SystemPagesPage from './pages/admin/SystemPagesPage';
import PagesManagement from './pages/admin/settings/pages';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<div>LoginPage</div>} />
        <Route path="/auth/register" element={<div>RegisterPage</div>} />
        <Route path="/auth/forgot-password" element={<div>ForgotPasswordPage</div>} />
        <Route path="/auth/reset-password" element={<div>ResetPasswordPage</div>} />

        {/* App Routes (Authenticated) */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<div>DashboardPage</div>} />
          <Route path="dashboard" element={<div>DashboardPage</div>} />
          <Route path="courses" element={<div>CoursesPage</div>} />
          <Route path="my-courses" element={<div>MyCoursesPage</div>} />
          <Route path="profile" element={<div>ProfilePage</div>} />
          <Route path="settings" element={<div>SettingsPage</div>} />
          
          {/* Admin Routes */}
          <Route path="admin/*" element={<AdminRoutes />} />
        </Route>

        {/* Accessibility Route (Example) */}
        <Route path="/accessibility" element={<div>AccessibilityPage</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
