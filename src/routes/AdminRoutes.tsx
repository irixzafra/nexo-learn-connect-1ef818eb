
import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route path="courses/:courseId" element={<AdminCourseDetail />} />
      <Route path="settings" element={<SystemSettings />} />
      <Route path="system-settings" element={<Navigate to="/admin/settings" replace />} />
      <Route path="categories" element={<CategoryManagement />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="roles" element={<RoleManagement />} />
      <Route path="test-data" element={<TestDataManagement />} />
      <Route path="instructors" element={<AdminInstructors />} />
      <Route path="audit-log" element={<AuditLog />} />
      <Route path="access" element={<AccessControl />} />
      <Route path="billing" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
