
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/Users';
import AdminCourses from '@/pages/admin/Courses';
import AdminSettings from '@/pages/admin/Settings';
import AdminNotFound from '@/pages/admin/NotFound';
import DatabaseSettings from '@/pages/admin/settings/DatabaseSettings';
import TestDataDashboard from '@/pages/admin/TestDataDashboard';
import NavigationDiagram from '@/pages/admin/NavigationDiagram';

// Lazy-loaded settings pages
const FeaturesSettings = lazy(() => import('@/pages/admin/settings/FeaturesSettings'));
const ThemeSettings = lazy(() => import('@/pages/admin/settings/ThemeSettings'));
const IntegrationsSettings = lazy(() => import('@/pages/admin/settings/IntegrationsSettings'));
const RolesSettings = lazy(() => import('@/pages/admin/settings/RolesSettings'));

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="courses/*" element={<AdminCourses />} />
        <Route path="navigation-diagram" element={<NavigationDiagram />} />
        
        {/* Settings Routes */}
        <Route path="settings" element={<AdminSettings />} />
        <Route
          path="settings/features"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <FeaturesSettings />
            </Suspense>
          }
        />
        <Route
          path="settings/theme"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <ThemeSettings />
            </Suspense>
          }
        />
        <Route
          path="settings/integrations"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <IntegrationsSettings />
            </Suspense>
          }
        />
        <Route
          path="settings/roles"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <RolesSettings />
            </Suspense>
          }
        />
        <Route path="settings/database" element={<DatabaseSettings />} />
        
        {/* Test Data Routes */}
        <Route path="test-data" element={<TestDataDashboard />} />
        
        {/* Catch-all for undefined admin routes */}
        <Route path="*" element={<AdminNotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
