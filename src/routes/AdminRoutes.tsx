
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import AppLayout from "@/layouts/AppLayout";

// Admin pages
import AdminDashboard from "@/pages/admin/dashboard";
import TestDataManagement from "@/pages/admin/TestDataManagement";
import Users from "@/pages/placeholder/Users";
import Billing from "@/pages/placeholder/Billing";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <AppLayout>
            <AdminDashboard />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/test-data" element={
        <ProtectedRoute requiredRole="admin">
          <AppLayout>
            <TestDataManagement />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute requiredRole="admin">
          <AppLayout>
            <Users />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/billing" element={
        <ProtectedRoute requiredRole="admin">
          <AppLayout>
            <Billing />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={
        <ProtectedRoute requiredRole="admin">
          <AppLayout>
            <NotFound />
          </AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AdminRoutes;
