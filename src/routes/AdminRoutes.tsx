
import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCourses from '@/pages/admin/AdminCourses';
import UserManagement from '@/pages/admin/UserManagement';
import DesignSystem from '@/pages/admin/design/DesignSystem';
import PageManagement from '@/pages/admin/pages/PageManagement';
import CreatePage from '@/pages/admin/pages/CreatePage';
import EditPage from '@/pages/admin/pages/EditPage';
import Features from '@/pages/admin/Features';
import Settings from '@/pages/admin/Settings';
import SystemSettings from '@/pages/admin/SystemSettings';
import TestDataManagement from '@/pages/admin/TestDataManagement';
import AdminFinances from '@/pages/admin/finances/AdminFinances';
import RoadmapManagerPage from '@/pages/admin/RoadmapManagerPage';

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="courses/*" element={<AdminCourses />} />
      <Route path="users/*" element={<UserManagement />} />
      <Route path="design-system/*" element={<DesignSystem />} />
      <Route path="pages" element={<PageManagement />} />
      <Route path="pages/create" element={<CreatePage />} />
      <Route path="pages/edit/:id" element={<EditPage />} />
      <Route path="features" element={<Features />} />
      <Route path="settings" element={<Settings />} />
      <Route path="system-settings" element={<SystemSettings />} />
      <Route path="test-data" element={<TestDataManagement />} />
      <Route path="finances/*" element={<AdminFinances />} />
      <Route path="roadmap" element={<RoadmapManagerPage />} />
    </>
  );
};

export default AdminRoutes;
