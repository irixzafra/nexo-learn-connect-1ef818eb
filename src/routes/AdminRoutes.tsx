
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "@/layouts/AppLayout";
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import NotFound from '@/pages/NotFound';

// Admin pages (mantener solo los funcionales)
import AdminDashboard from '@/pages/admin/Dashboard';
import UserManagement from '@/pages/admin/UserManagement';
import AdminCourses from '@/pages/admin/AdminCourses';
import Features from '@/pages/admin/Features';
import Settings from '@/pages/admin/Settings';
import SystemSettings from '@/pages/admin/SystemSettings';
import RoleManagement from '@/pages/admin/RoleManagement';
import NavigationDiagram from '@/pages/admin/NavigationDiagram';
import ReviewElementsPage from '@/pages/admin/ReviewElementsPage';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <AdminDashboard />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/dashboard" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <AdminDashboard />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/users" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <UserManagement />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <AdminCourses />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/features" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <Features />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/settings" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <Settings />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/system-settings" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <SystemSettings />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/roles" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <RoleManagement />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/navigation-diagram" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <NavigationDiagram />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/review-elements" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <ReviewElementsPage />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      
      {/* Catch-all route for admin routes not found */}
      <Route path="*" element={
        <AppLayout>
          <Navigate to="/app/admin/dashboard" replace />
        </AppLayout>
      } />
    </Routes>
  );
};

export default AdminRoutes;
