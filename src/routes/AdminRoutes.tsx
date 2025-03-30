
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

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route path="courses/:courseId" element={<AdminCourseDetail />} />
      <Route path="system-settings" element={<SystemSettings />} />
      <Route path="categories" element={<CategoryManagement />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="roles" element={<RoleManagement />} />
      <Route path="test-data" element={<TestDataManagement />} />
      <Route path="instructors" element={<AdminInstructors />} />
    </Routes>
  );
};

export default AdminRoutes;
