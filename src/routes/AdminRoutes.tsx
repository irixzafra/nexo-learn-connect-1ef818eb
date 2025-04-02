
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SystemPagesNavigation } from '@/features/admin/components/settings/SystemPagesNavigation';
import DesignSystemPage from '@/pages/design-system/DesignSystemPage';
import ButtonPage from '@/pages/design-system/components/ButtonPage';
import AdminDashboard from '@/pages/admin/Dashboard';
import AnalyticsOverview from '@/pages/admin/analytics';
import UserAnalytics from '@/pages/admin/analytics/UserAnalytics';
import CourseAnalytics from '@/pages/admin/analytics/CourseAnalytics';
import RevenueAnalytics from '@/pages/admin/analytics/RevenueAnalytics';

// Lazy load components to improve performance
const LazyNavigationDiagram = React.lazy(() => import('@/pages/admin/NavigationDiagram'));

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<div>User Management</div>} />
      <Route path="courses" element={<div>Course Management</div>} />
      <Route path="analytics" element={<AnalyticsOverview />} />
      <Route path="analytics/overview" element={<AnalyticsOverview />} />
      <Route path="analytics/users" element={<UserAnalytics />} />
      <Route path="analytics/courses" element={<CourseAnalytics />} />
      <Route path="analytics/revenue" element={<RevenueAnalytics />} />
      <Route path="system-pages" element={<SystemPagesNavigation />} />
      <Route path="design-system" element={<DesignSystemPage />} />
      <Route path="design-system/components/button" element={<ButtonPage />} />
      <Route path="navigation-diagram" element={
        <Suspense fallback={<div>Cargando diagrama de navegación...</div>}>
          <LazyNavigationDiagram />
        </Suspense>
      } />
      <Route path="*" element={<div>Admin Not Found</div>} />
    </Routes>
  );
};

export default AdminRoutes;
