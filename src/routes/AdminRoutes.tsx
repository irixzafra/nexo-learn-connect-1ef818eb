
import React from 'react';
import { Route } from 'react-router-dom';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';

// Admin Pages
import AdminDashboard from '@/pages/admin/dashboard';
import UserManagement from '@/pages/admin/UserManagement';
import CourseManagement from '@/pages/admin/AdminCourses';
import OrphanReviewPage from '@/pages/admin/OrphanReviewPage';
import ReviewElementsPage from '@/pages/admin/ReviewElementsPage';
import BrokenLinksPage from '@/pages/admin/BrokenLinksPage';
import PlaceholderPage from '@/components/PlaceholderPage';
import LinkDashboard from '@/pages/admin/LinkDashboard';
import RouteValidatorPage from '@/pages/admin/RouteValidatorPage';
import NavigationDiagramPage from '@/pages/admin/NavigationDiagramPage';

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
      
      {/* Monitor de enlaces */}
      <Route path="admin/broken-links" element={<SafeRouteWrapper requiredRole={['admin']}><BrokenLinksPage /></SafeRouteWrapper>} />
      <Route path="admin/link-dashboard" element={<SafeRouteWrapper requiredRole={['admin']}><LinkDashboard /></SafeRouteWrapper>} />
      
      {/* Validador de rutas */}
      <Route path="admin/route-validator" element={<SafeRouteWrapper requiredRole={['admin']}><RouteValidatorPage /></SafeRouteWrapper>} />
      
      {/* Diagrama de navegación */}
      <Route path="admin/navigation-diagram" element={<SafeRouteWrapper requiredRole={['admin']}><NavigationDiagramPage /></SafeRouteWrapper>} />
    </>
  );
};

export default AdminRoutes;
