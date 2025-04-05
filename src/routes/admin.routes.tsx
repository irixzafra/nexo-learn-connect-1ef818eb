
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

// Import admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import RoleManagement from '@/pages/admin/RoleManagement';
import FeatureManagement from '@/pages/admin/FeatureManagement';
import Features from '@/pages/admin/Features';

export const adminRoutes: RouteObject[] = [
  {
    path: '/app/admin',
    element: <Navigate to="/app/admin/dashboard" replace />
  },
  {
    path: '/app/admin/dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/app/admin/roles',
    element: <RoleManagement />
  },
  {
    path: '/app/admin/features',
    element: <FeatureManagement />
  },
  {
    path: '/app/admin/features-old',
    element: <Features />
  }
];
