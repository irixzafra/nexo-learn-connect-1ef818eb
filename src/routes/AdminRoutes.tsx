
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";

// Admin pages
import AdminDashboard from "@/pages/admin/dashboard";
import TestDataManagement from "@/pages/admin/TestDataManagement";
import UserManagement from "@/pages/admin/UserManagement";
import Billing from "@/pages/placeholder/Billing";
import RoleManagement from "@/pages/admin/RoleManagement";
import SystemSettings from "@/pages/admin/SystemSettings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/test-data" element={
        <ProtectedRoute requiredRole="admin">
          <TestDataManagement />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute requiredRole="admin">
          <UserManagement />
        </ProtectedRoute>
      } />
      <Route path="/billing" element={
        <ProtectedRoute requiredRole="admin">
          <Billing />
        </ProtectedRoute>
      } />
      <Route path="/roles" element={
        <ProtectedRoute requiredRole="admin">
          <RoleManagement />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute requiredRole="admin">
          <SystemSettings />
        </ProtectedRoute>
      } />
      <Route path="*" element={
        <ProtectedRoute requiredRole="admin">
          <NotFound />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AdminRoutes;
