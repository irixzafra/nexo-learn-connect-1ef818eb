
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "@/layouts/AppLayout";
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import NotFound from '@/pages/NotFound';
import PlaceholderPage from '@/components/PlaceholderPage';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import UserManagement from '@/pages/admin/UserManagement';
import Features from '@/pages/admin/Features';
import Settings from '@/pages/admin/Settings';
import SystemSettings from '@/pages/admin/SystemSettings';
import RoleManagement from '@/pages/admin/RoleManagement';
import AdminCourses from '@/pages/admin/AdminCourses';
import UserAnalytics from '@/pages/admin/UserAnalytics';
import CourseAnalytics from '@/pages/admin/analytics/CourseAnalytics';
import RevenueAnalytics from '@/pages/admin/analytics/RevenueAnalytics';
import AIServicesPage from '@/pages/admin/ai/AIServicesPage';
import TestDataManagement from '@/pages/admin/TestDataManagement';
import AccessControl from '@/pages/admin/access/AccessControl';
import PagesManagement from '@/pages/admin/settings/pages';
import NavigationDiagram from '@/pages/admin/NavigationDiagram';
import AnalyticsOverview from '@/pages/admin/analytics/index';
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
      
      {/* Admin Analytics routes */}
      <Route path="/analytics" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <AnalyticsOverview />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/analytics/users" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <UserAnalytics />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/analytics/courses" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <CourseAnalytics />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/analytics/revenue" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <RevenueAnalytics />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      
      {/* Admin additional routes */}
      <Route path="/navigation-diagram" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <NavigationDiagram />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/reports" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <PlaceholderPage title="Informes" subtitle="Sistema de informes en desarrollo" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/payments" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <PlaceholderPage title="Pagos y Facturación" subtitle="Sistema de pagos en desarrollo" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/ai-services" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <AIServicesPage />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/test-data" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <TestDataManagement />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/access-control" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <AccessControl />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/system-pages" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <PagesManagement />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/settings/pages" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <PagesManagement />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/design-system" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['admin']}>
            <PlaceholderPage title="Design System" />
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
