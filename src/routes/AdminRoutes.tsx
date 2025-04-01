
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import NotFound from '@/pages/NotFound';
import Page404 from '@/pages/NotFound';
import Features from '@/pages/admin/Features';
import Analytics from '@/pages/admin/analytics';
import NavigationExplorer from '@/pages/admin/navigation/NavigationExplorer';
import UserManagement from '@/pages/admin/UserManagement';
import SettingsRoutes from './SettingsRoutes';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import PagesManagement from '@/pages/admin/settings/pages';

// Placeholder components until actual ones are created
const Dashboard = () => <div>Dashboard Content</div>;
const Courses = () => <div>Courses Content</div>;
const CourseDetail = () => <div>Course Detail Content</div>;

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <AdminPageLayout title="Dashboard">
            <Dashboard />
          </AdminPageLayout>
        }
      />
      <Route
        path="/users"
        element={
          <AdminPageLayout title="Gestión de Usuarios">
            <UserManagement />
          </AdminPageLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <AdminPageLayout title="Cursos">
            <Courses />
          </AdminPageLayout>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <AdminPageLayout title="Detalle de Curso">
            <CourseDetail />
          </AdminPageLayout>
        }
      />
      <Route
        path="/features"
        element={
          <AdminPageLayout title="Gestión de Características">
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
              <Features />
            </ErrorBoundary>
          </AdminPageLayout>
        }
      />
      <Route path="/settings/*" element={<SettingsRoutes />} />
      <Route
        path="/pages"
        element={
          <AdminPageLayout title="Gestión de Páginas" subtitle="Administra las páginas y la navegación del sistema">
            <PagesManagement />
          </AdminPageLayout>
        }
      />
      <Route
        path="/analytics/*"
        element={
          <AdminPageLayout title="Analíticas">
            <Analytics />
          </AdminPageLayout>
        }
      />
      <Route
        path="/navigation"
        element={
          <AdminPageLayout title="Explorador de Navegación">
            <NavigationExplorer />
          </AdminPageLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AdminRoutes;
