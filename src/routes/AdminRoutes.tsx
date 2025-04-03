
import React from 'react';
import { Route } from 'react-router-dom';
import { SafeRouteWrapper } from '@/components/SafeRouteWrapper';

// Admin Pages
import AdminDashboard from '@/pages/admin/dashboard';
import UserManagement from '@/pages/admin/users/UserManagement';
import CourseManagement from '@/pages/admin/courses/CourseManagement';
import OrphanReviewPage from '@/pages/admin/OrphanReviewPage';
import ReviewElementsPage from '@/pages/admin/ReviewElementsPage';
import PlaceholderPage from '@/components/PlaceholderPage';

const AdminRoutes = () => {
  return (
    <>
      {/* Admin routes */}
      <Route path="admin" element={<SafeRouteWrapper requiredRole={['admin']}><AdminDashboard /></SafeRouteWrapper>} />
      <Route path="admin/dashboard" element={<SafeRouteWrapper requiredRole={['admin']}><AdminDashboard /></SafeRouteWrapper>} />
      <Route path="admin/users" element={<SafeRouteWrapper requiredRole={['admin']}><UserManagement /></SafeRouteWrapper>} />
      <Route path="admin/courses" element={<SafeRouteWrapper requiredRole={['admin']}><CourseManagement /></SafeRouteWrapper>} />
      <Route path="admin/orphan-review" element={<SafeRouteWrapper requiredRole={['admin']}><OrphanReviewPage /></SafeRouteWrapper>} />
      <Route path="admin/design-system" element={<SafeRouteWrapper requiredRole={['admin']}><PlaceholderPage title="Design System" /></SafeRouteWrapper>} />
      
      {/* Revisión de elementos */}
      <Route path="admin/review-elements" element={<SafeRouteWrapper requiredRole={['admin']}><ReviewElementsPage /></SafeRouteWrapper>} />
    </>
  );
};

export default AdminRoutes;
