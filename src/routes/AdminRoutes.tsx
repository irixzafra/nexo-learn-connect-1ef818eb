
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
import AdminCourses from "@/pages/admin/courses/AdminCourses";
import AdminCourseDetail from "@/pages/admin/courses/AdminCourseDetail";
import AdminInstructors from "@/pages/admin/instructors/AdminInstructors";
import AccessControl from "@/pages/admin/access/AccessControl";
import AuditLog from "@/pages/admin/audit/AuditLog";

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
      <Route path="/courses" element={
        <ProtectedRoute requiredRole="admin">
          <AdminCourses />
        </ProtectedRoute>
      } />
      <Route path="/courses/:courseId" element={
        <ProtectedRoute requiredRole="admin">
          <AdminCourseDetail />
        </ProtectedRoute>
      } />
      <Route path="/instructors" element={
        <ProtectedRoute requiredRole="admin">
          <AdminInstructors />
        </ProtectedRoute>
      } />
      <Route path="/access" element={
        <ProtectedRoute requiredRole="admin">
          <AccessControl />
        </ProtectedRoute>
      } />
      <Route path="/audit-log" element={
        <ProtectedRoute requiredRole="admin">
          <AuditLog />
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
