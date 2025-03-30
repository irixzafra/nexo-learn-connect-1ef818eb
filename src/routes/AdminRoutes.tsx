
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
import ContentManagement from '@/pages/admin/content/ContentManagement';
import AdminPageLayout from '@/layouts/AdminPageLayout';

// Create a wrapper component for Admin content that includes the navigation
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppLayout>
      <AdminNavigation />
      {children}
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
      
      {/* Rutas de Usuarios */}
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
      
      {/* Rutas de Educación */}
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
      <Route path="instructors" element={
        <AdminLayout>
          <AdminInstructors />
        </AdminLayout>
      } />
      <Route path="learning-paths" element={
        <AdminLayout>
          <Navigate to="/admin/courses" replace />
        </AdminLayout>
      } />
      
      {/* Rutas de Contenido */}
      <Route path="content" element={
        <AdminLayout>
          <ContentManagement />
        </AdminLayout>
      } />
      <Route path="content/categories" element={
        <AdminLayout>
          <CategoryManagement />
        </AdminLayout>
      } />
      
      {/* Rutas de Facturación */}
      <Route path="billing" element={
        <AdminLayout>
          <Navigate to="/admin/dashboard" replace />
        </AdminLayout>
      } />
      <Route path="billing/payments" element={
        <AdminLayout>
          <Navigate to="/admin/dashboard" replace />
        </AdminLayout>
      } />
      <Route path="billing/subscriptions" element={
        <AdminLayout>
          <Navigate to="/admin/dashboard" replace />
        </AdminLayout>
      } />
      <Route path="billing/analytics" element={
        <AdminLayout>
          <Navigate to="/admin/dashboard" replace />
        </AdminLayout>
      } />
      
      {/* Rutas de Datos */}
      <Route path="test-data" element={
        <AdminLayout>
          <TestDataManagement />
        </AdminLayout>
      } />
      <Route path="audit-log" element={
        <AdminLayout>
          <AuditLog />
        </AdminLayout>
      } />
      <Route path="data-analytics" element={
        <AdminLayout>
          <Navigate to="/admin/dashboard" replace />
        </AdminLayout>
      } />
      
      {/* Rutas de Configuración */}
      <Route path="settings" element={
        <AdminLayout>
          <SystemSettings />
        </AdminLayout>
      } />
      <Route path="settings/security" element={
        <AdminLayout>
          <Navigate to="/admin/settings" replace />
        </AdminLayout>
      } />
      <Route path="settings/appearance" element={
        <AdminLayout>
          <Navigate to="/admin/settings" replace />
        </AdminLayout>
      } />
      <Route path="settings/content" element={
        <AdminLayout>
          <Navigate to="/admin/settings" replace />
        </AdminLayout>
      } />
      <Route path="settings/analytics" element={
        <AdminLayout>
          <Navigate to="/admin/settings" replace />
        </AdminLayout>
      } />
      
      {/* Otras rutas */}
      <Route path="access" element={
        <AdminLayout>
          <AccessControl />
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
