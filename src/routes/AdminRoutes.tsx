
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";

// Admin pages
import Home from "@/pages/Home";
import TestDataManagement from '@/pages/admin/TestDataManagement';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute requiredRole="admin">
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/content" element={
        <ProtectedRoute requiredRole="admin">
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/test-data" element={
        <ProtectedRoute requiredRole="admin">
          <TestDataManagement />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
