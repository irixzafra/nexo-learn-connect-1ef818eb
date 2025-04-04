
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import ProtectedRoute from '@/components/ProtectedRoute';

/**
 * A wrapper around ProtectedRoute that enforces admin role
 */
const AdminRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="admin">
      {children || <Outlet />}
    </ProtectedRoute>
  );
};

export default AdminRoute;
