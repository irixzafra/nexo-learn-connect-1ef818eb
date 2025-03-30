
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import AdminDashboard from '@/pages/admin/dashboard';
import AdminCourses from '@/pages/admin/courses/AdminCourses';
import AdminCourseDetail from '@/pages/admin/courses/AdminCourseDetail';
import SystemSettings from '@/pages/admin/SystemSettings';
import CategoryManagement from '@/pages/admin/CategoryManagement';
import UserManagement from '@/pages/admin/UserManagement';
import RoleManagement from '@/pages/admin/RoleManagement';
import TestDataManagement from '@/pages/admin/TestDataManagement';
import AdminInstructors from '@/pages/admin/instructors/AdminInstructors';
import AuditLog from '@/pages/admin/audit/AuditLog';
import AccessControl from '@/pages/admin/access/AccessControl';
import { Navigate } from 'react-router-dom';
import AdminNavigation from '@/components/admin/AdminNavigation';

// Create a wrapper component for Admin content that includes the navigation
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppLayout>
      <AdminNavigation />
      <div className="container mx-auto px-4 py-4">
        {children}
      </div>
    </AppLayout>
  );
};

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      } />
      <Route path="courses" element={
        <AdminLayout>
          <AdminCourses />
        </AdminLayout>
      } />
      <Route path="courses/:courseId" element={
        <AdminLayout>
          <AdminCourseDetail />
        </AdminLayout>
      } />
      <Route path="settings" element={
        <AdminLayout>
          <SystemSettings />
        </AdminLayout>
      } />
      <Route path="system-settings" element={<Navigate to="/admin/settings" replace />} />
      <Route path="categories" element={
        <AdminLayout>
          <CategoryManagement />
        </AdminLayout>
      } />
      <Route path="users" element={
        <AdminLayout>
          <UserManagement />
        </AdminLayout>
      } />
      <Route path="roles" element={
        <AdminLayout>
          <RoleManagement />
        </AdminLayout>
      } />
      <Route path="test-data" element={
        <AdminLayout>
          <TestDataManagement />
        </AdminLayout>
      } />
      <Route path="instructors" element={
        <AdminLayout>
          <AdminInstructors />
        </AdminLayout>
      } />
      <Route path="audit-log" element={
        <AdminLayout>
          <AuditLog />
        </AdminLayout>
      } />
      <Route path="access" element={
        <AdminLayout>
          <AccessControl />
        </AdminLayout>
      } />
      <Route path="billing" element={
        <AdminLayout>
          <Navigate to="/admin/dashboard" replace />
        </AdminLayout>
      } />
      <Route path="*" element={
        <AdminLayout>
          <Navigate to="/admin/dashboard" replace />
        </AdminLayout>
      } />
    </Routes>
  );
};

export default AdminRoutes;
