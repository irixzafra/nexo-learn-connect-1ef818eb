import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import MyCoursesPage from './pages/MyCoursesPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminInstructorsPage from './pages/admin/AdminInstructorsPage';
import AdminPagesPage from './pages/admin/AdminPagesPage';
import AdminDevelopmentPage from './pages/admin/AdminDevelopmentPage';
import AccessibilityPage from './pages/AccessibilityPage';
import Features from './pages/admin/Features';
import OrphanReviewPage from './pages/admin/OrphanReviewPage';

// Importar la nueva página de gestión de navegación
import NavigationManagerPage from './pages/admin/NavigationManagerPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {/* App Routes (Authenticated) */}
        <Route path="/app" element={<AppLayout />} >
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="my-courses" element={<MyCoursesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/app/admin" element={<AppLayout />} >
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="instructors" element={<AdminInstructorsPage />} />
          <Route path="pages" element={<AdminPagesPage />} />
          <Route path="development" element={<AdminDevelopmentPage />} />
          <Route path="features" element={<Features />} />
          <Route path="orphan-review" element={<OrphanReviewPage />} />
        </Route>
        
        {/* Ruta para el gestor de navegación */}
        <Route path="/app/admin/navigation-manager" element={<NavigationManagerPage />} />
        
        {/* Accessibility Route (Example) */}
        <Route path="/accessibility" element={<AccessibilityPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
