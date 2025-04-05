
import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy loaded pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const UsersPage = lazy(() => import('@/pages/admin/UsersPage'));
const CoursesPage = lazy(() => import('@/pages/admin/CoursesPage'));
const SystemPagesPage = lazy(() => import('@/pages/admin/SystemPagesPage'));
const DesignSystemPage = lazy(() => import('@/pages/admin/DesignSystemPage'));
const OrphanReviewPage = lazy(() => import('@/pages/admin/OrphanReviewPage'));
const NavigationDiagramPage = lazy(() => import('@/pages/admin/NavigationDiagramPage'));
const NavigationManagerPage = lazy(() => import('@/pages/admin/NavigationManagerPage'));
const DevelopmentToolsPage = lazy(() => import('@/pages/admin/DevelopmentToolsPage'));
const ReviewElementsPage = lazy(() => import('@/pages/admin/ReviewElementsPage'));
const FeaturesPage = lazy(() => import('@/pages/admin/settings/features'));
const SystemSettings = lazy(() => import('@/pages/admin/SystemSettings'));
const DeveloperSettingsPage = lazy(() => import('@/pages/admin/settings/developer'));
const ComingSoonPage = lazy(() => import('@/pages/common/ComingSoonPage'));
const PagesManagement = lazy(() => import('@/pages/admin/settings/pages'));

// Routes that are part of the admin module
const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="pages" element={<SystemPagesPage />} />
        <Route path="system-pages" element={<SystemPagesPage />} />
        <Route path="settings/pages" element={<PagesManagement />} />
        <Route path="design-system" element={<DesignSystemPage />} />
        <Route path="navigation-diagram" element={<NavigationDiagramPage />} />
        <Route path="navigation-manager" element={<NavigationManagerPage />} />
        <Route path="orphan-review" element={<OrphanReviewPage />} />
        <Route path="development" element={<DevelopmentToolsPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="review-elements" element={<ReviewElementsPage />} />
        <Route path="settings" element={<SystemSettings />} />
        <Route path="settings/developer" element={<DeveloperSettingsPage />} />
        <Route path="database" element={<ComingSoonPage />} />
        <Route path="security" element={<ComingSoonPage />} />
        <Route path="system/health" element={<ComingSoonPage />} />
        <Route path="system/logs" element={<ComingSoonPage />} />
        <Route path="*" element={<Navigate to="/app/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
