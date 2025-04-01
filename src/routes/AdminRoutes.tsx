
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import AdminLayout from '@/layouts/AdminLayout';
import { LoadingPage } from '@/components/ui/loading-page';

// Use existing components for admin pages
import Settings from '@/pages/admin/Settings';
import AdminCourses from '@/pages/admin/courses/AdminCourses';

// Create a placeholder component for missing pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container py-8">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground">Esta página está en desarrollo.</p>
  </div>
);

// Admin dashboard placeholders
const AdminDashboard = () => <PlaceholderPage title="Dashboard de Administración" />;
const AdminUsers = () => <PlaceholderPage title="Gestión de Usuarios" />;
const AdminNotFound = () => <PlaceholderPage title="Página no encontrada" />;
const TestDataDashboard = () => <PlaceholderPage title="Datos de Prueba" />;
const NavigationDiagram = () => <PlaceholderPage title="Diagrama de Navegación" />;
const DatabaseSettings = () => <PlaceholderPage title="Configuración de Base de Datos" />;

// Lazy-loaded settings pages
const FeaturesSettings = lazy(() => import('@/features/admin/components/settings/FeaturesSettings'));
const ThemeSettings = lazy(() => import('../pages/admin/settings/ThemeSettings'));
const IntegrationsSettings = lazy(() => import('../pages/admin/settings/IntegrationsSettings'));
const RolesSettings = lazy(() => import('../pages/admin/settings/RolesSettings'));

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
        <Route path="settings" element={<Settings />} />
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
