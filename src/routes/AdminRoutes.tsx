
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminDashboard from '@/pages/admin/dashboard';
import TestDataManagement from '@/pages/admin/TestDataManagement';
import Users from '@/pages/placeholder/Users';
import Billing from '@/pages/placeholder/Billing';

const AdminRoutes: React.FC = () => {
  const { userRole } = useAuth();

  // Función para verificar si el usuario es administrador
  const isAdmin = () => userRole === 'admin';

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="admin" fallbackPath="/unauthorized">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test-data"
        element={
          <ProtectedRoute requiredRole="admin" fallbackPath="/unauthorized">
            <TestDataManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="admin" fallbackPath="/unauthorized">
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <ProtectedRoute requiredRole="admin" fallbackPath="/unauthorized">
            <Billing />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute requiredRole="admin" fallbackPath="/unauthorized">
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
