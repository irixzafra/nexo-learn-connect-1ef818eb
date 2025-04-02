
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SystemPagesNavigation } from '@/features/admin/components/settings/SystemPagesNavigation';
import DesignSystemPage from '@/pages/design-system/DesignSystemPage';
import ButtonPage from '@/pages/design-system/components/ButtonPage';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<div>Admin Dashboard</div>} />
      <Route path="users" element={<div>User Management</div>} />
      <Route path="courses" element={<div>Course Management</div>} />
      <Route path="system-pages" element={<SystemPagesNavigation />} />
      <Route path="design-system" element={<DesignSystemPage />} />
      <Route path="design-system/components/button" element={<ButtonPage />} />
      <Route path="*" element={<div>Admin Not Found</div>} />
    </Routes>
  );
};

export default AdminRoutes;
