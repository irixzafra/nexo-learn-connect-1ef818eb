
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import UsersPage from '@/pages/admin/UsersPage';
import PagesManagement from '@/pages/admin/settings/pages';
import ReviewElementsPage from '@/pages/admin/ReviewElementsPage';
import OrphanReviewPage from '@/pages/admin/OrphanReviewPage';
import ComponentsManagerPage from '@/pages/admin/ComponentsManagerPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings/pages" element={<PagesManagement />} />
        <Route path="review-elements" element={<ReviewElementsPage />} />
        <Route path="orphan-review" element={<OrphanReviewPage />} />
        <Route path="components" element={<ComponentsManagerPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
