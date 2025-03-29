
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TestDataManagement from '@/pages/admin/TestDataManagement';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
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
          <ProtectedRoute checkFn={isAdmin} fallbackPath="/unauthorized">
            <h1>Panel de Administración (en desarrollo)</h1>
          </ProtectedRoute>
        }
      />
      <Route
        path="/test-data"
        element={
          <ProtectedRoute checkFn={isAdmin} fallbackPath="/unauthorized">
            <TestDataManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute checkFn={isAdmin} fallbackPath="/unauthorized">
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <ProtectedRoute checkFn={isAdmin} fallbackPath="/unauthorized">
            <Billing />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute checkFn={isAdmin} fallbackPath="/unauthorized">
            <div>Página no encontrada en administración</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
