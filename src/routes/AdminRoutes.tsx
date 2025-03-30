
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminCourses from '@/pages/admin/courses/AdminCourses';
import AdminCourseDetail from '@/pages/admin/courses/AdminCourseDetail';
import AdminSettings from '@/pages/admin/AdminSettings';
import AccessControl from '@/pages/admin/access/AccessControl';
import FinanceManagement from '@/pages/admin/FinanceManagement';
import AuditLog from '@/pages/admin/audit/AuditLog';
import AdminInstructors from '@/pages/admin/instructors/AdminInstructors';
import NotFound from '@/pages/NotFound';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/courses" element={<AdminCourses />} />
      <Route path="/courses/:courseId" element={<AdminCourseDetail />} />
      <Route path="/instructors" element={<AdminInstructors />} />
      <Route path="/finanzas" element={<FinanceManagement />} />
      <Route path="/access" element={<AccessControl />} />
      <Route path="/settings" element={<AdminSettings />} />
      <Route path="/audit" element={<AuditLog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
