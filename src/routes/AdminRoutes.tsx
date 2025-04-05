
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
const ComingSoonPage = lazy(() => import('@/pages/common/ComingSoonPage'));

// Routes that are part of the admin module
const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="system-pages" element={<SystemPagesPage />} />
        <Route path="design-system" element={<DesignSystemPage />} />
        <Route path="navigation-diagram" element={<NavigationDiagramPage />} />
        <Route path="navigation-manager" element={<NavigationManagerPage />} />
        <Route path="orphan-review" element={<OrphanReviewPage />} />
        <Route path="development" element={<DevelopmentToolsPage />} />
        <Route path="features" element={<ComingSoonPage />} />
        <Route path="review-elements" element={<ReviewElementsPage />} />
        <Route path="*" element={<Navigate to="/app/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
