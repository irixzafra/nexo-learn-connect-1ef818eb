
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import UserManagement from '@/pages/admin/users/UserManagement';
import RoleManagement from '@/pages/admin/roles/RoleManagement';
import CourseManagement from '@/pages/admin/courses/CourseManagement';
import EnrollmentManagement from '@/pages/admin/enrollments/EnrollmentManagement';
import TestDataGenerator from '@/pages/admin/data/TestDataGenerator';
import PageManagement from '@/pages/admin/pages/PageManagement';
import CreatePage from '@/pages/admin/pages/CreatePage';
import EditPage from '@/pages/admin/pages/EditPage';
import AIServicesPage from '@/pages/admin/ai/AIServicesPage';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* User Management */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        
        {/* Course Management */}
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/enrollments" element={<EnrollmentManagement />} />
        
        {/* Content Management */}
        <Route path="/settings/pages" element={<PageManagement />} />
        <Route path="/settings/pages/create" element={<CreatePage />} />
        <Route path="/settings/pages/:id" element={<EditPage />} />
        
        {/* AI Services */}
        <Route path="/ai/services" element={<AIServicesPage />} />
        
        {/* Test Data */}
        <Route path="/data/generate" element={<TestDataGenerator />} />
        
        {/* Default redirect */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
