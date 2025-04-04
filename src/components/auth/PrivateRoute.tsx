
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import ProtectedRoute from '@/components/ProtectedRoute';

/**
 * A wrapper around ProtectedRoute that enforces user authentication
 * This component exists for backwards compatibility with existing code
 */
const PrivateRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute>
      {children || <Outlet />}
    </ProtectedRoute>
  );
};

export default PrivateRoute;
