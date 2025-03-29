
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";

// Admin pages
import Home from "@/pages/Home";
import TestDataManagement from '@/pages/admin/TestDataManagement';

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/admin/content" element={
        <ProtectedRoute requiredRole="admin">
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/admin/test-data" element={
        <ProtectedRoute requiredRole="admin">
          <TestDataManagement />
        </ProtectedRoute>
      } />
    </>
  );
};

export default AdminRoutes;
