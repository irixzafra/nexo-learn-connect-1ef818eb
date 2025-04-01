
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationDiagram from '../pages/admin/NavigationDiagram';
import RouteValidator from '../pages/admin/RouteValidator';

// Lazy-loaded admin components
const AdminDashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<div>Loading dashboard...</div>}>
          <AdminDashboard />
        </Suspense>
      } />
      <Route path="/dashboard" element={
        <Suspense fallback={<div>Loading dashboard...</div>}>
          <AdminDashboard />
        </Suspense>
      } />
      <Route path="/navigation-diagram" element={<NavigationDiagram />} />
      <Route path="/route-validator" element={<RouteValidator />} />
      <Route path="*" element={
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
};

export default AdminRoutes;
