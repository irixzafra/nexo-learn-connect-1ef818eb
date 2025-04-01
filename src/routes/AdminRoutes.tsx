
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from '@/components/LoadingScreen';

// Directly imported components (non-lazy)
import NavigationDiagram from '@/pages/admin/NavigationDiagram';
import RouteValidator from '@/pages/admin/RouteValidator';
import LinkDashboard from '@/pages/admin/LinkDashboard';

// Lazy-loaded admin components
const AdminDashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<LoadingScreen />}>
          <AdminDashboard />
        </Suspense>
      } />
      <Route path="/dashboard" element={
        <Suspense fallback={<LoadingScreen />}>
          <AdminDashboard />
        </Suspense>
      } />
      <Route path="/navigation-diagram" element={<NavigationDiagram />} />
      <Route path="/route-validator" element={<RouteValidator />} />
      <Route path="/link-dashboard" element={<LinkDashboard />} />
      <Route path="*" element={
        <Suspense fallback={<LoadingScreen />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
};

export default AdminRoutes;
