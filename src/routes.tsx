
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import NavigationManagerPage from './pages/admin/NavigationManagerPage';

// Importar la nueva página de gestión de navegación
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
        <Route path="/app" element={<AppLayout />} >
          <Route index element={<div>DashboardPage</div>} />
          <Route path="dashboard" element={<div>DashboardPage</div>} />
          <Route path="courses" element={<div>CoursesPage</div>} />
          <Route path="my-courses" element={<div>MyCoursesPage</div>} />
          <Route path="profile" element={<div>ProfilePage</div>} />
          <Route path="settings" element={<div>SettingsPage</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/app/admin" element={<AppLayout />} >
          <Route index element={<div>AdminDashboardPage</div>} />
          <Route path="dashboard" element={<div>AdminDashboardPage</div>} />
          <Route path="users" element={<div>AdminUsersPage</div>} />
          <Route path="courses" element={<div>AdminCoursesPage</div>} />
          <Route path="instructors" element={<div>AdminInstructorsPage</div>} />
          <Route path="pages" element={<div>AdminPagesPage</div>} />
          <Route path="development" element={<div>AdminDevelopmentPage</div>} />
          <Route path="features" element={<div>Features</div>} />
          <Route path="orphan-review" element={<div>OrphanReviewPage</div>} />
        </Route>
        
        {/* Ruta para el gestor de navegación */}
        <Route path="/app/admin/navigation-manager" element={<NavigationManagerPage />} />
        
        {/* Accessibility Route (Example) */}
        <Route path="/accessibility" element={<div>AccessibilityPage</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
