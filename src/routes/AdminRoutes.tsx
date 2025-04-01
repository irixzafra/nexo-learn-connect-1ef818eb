
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationDiagram from '@/pages/admin/NavigationDiagram';
import RouteValidator from '@/pages/admin/RouteValidator';

// Lazy-loaded admin components
const AdminDashboard = React.lazy(() => import('@/pages/admin/Dashboard'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/navigation-diagram" element={<NavigationDiagram />} />
      <Route path="/route-validator" element={<RouteValidator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
