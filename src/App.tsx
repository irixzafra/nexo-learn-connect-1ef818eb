import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/auth';
import { DesignSystemProvider } from '@/contexts/DesignSystemContext';
import { FeaturesProvider } from '@/contexts/features';
import { TestDataProvider } from '@/contexts/test-data/TestDataContext';
import { ToastContainer } from 'sonner';

// Import page components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import DesignSystem from './pages/admin/design/DesignSystem';
import ComponentsShowcase from './pages/ComponentsShowcase';
import MaterialDesign from './pages/MaterialDesign';
import ImpersonatePage from './pages/admin/ImpersonatePage';
import FeaturesConfigPage from './pages/admin/FeaturesConfigPage';
import ThemeSettings from './pages/admin/settings/ThemeSettings';
import DesignPage from './pages/admin/settings/design';

// Add MaterialDesignDemo to the routes
import MaterialDesignDemo from './pages/MaterialDesignDemo';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/components-showcase" element={<ComponentsShowcase />} />
      <Route path="/material-design" element={<MaterialDesign />} />

      {/* Protected Routes */}
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />
      <Route path="/admin/settings/design" element={<DesignPage />} />
      <Route path="/admin/settings/theme" element={<ThemeSettings />} />
      <Route path="/admin/design-system" element={<DesignSystem />} />
      <Route path="/admin/impersonate/:userId" element={<ImpersonatePage />} />
      <Route path="/admin/features" element={<FeaturesConfigPage />} />

      {/* Material Design Demo */}
      <Route path="/material-design" element={<MaterialDesignDemo />} />
    </Routes>
  );
}

function App() {
  return (
    <FeaturesProvider>
      <AuthProvider>
        <ThemeProvider>
          <DesignSystemProvider>
            <TestDataProvider>
              <Router>
                <AppRoutes />
              </Router>
              <ToastContainer />
            </TestDataProvider>
          </DesignSystemProvider>
        </ThemeProvider>
      </AuthProvider>
    </FeaturesProvider>
  );
}

export default App;
