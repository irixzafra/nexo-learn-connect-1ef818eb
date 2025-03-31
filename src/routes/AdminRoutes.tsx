import React, { useState, useEffect } from 'react';
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

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabNavigationEnabled, setTabNavigationEnabled] = useState(true);
  
  useEffect(() => {
    const checkLocalStorage = () => {
      const storedValue = localStorage.getItem('tabNavigationEnabled');
      if (storedValue !== null) {
        setTabNavigationEnabled(storedValue === 'true');
      }
    };
    
    checkLocalStorage();
    
    window.addEventListener('storage', checkLocalStorage);
    
    return () => {
      window.removeEventListener('storage', checkLocalStorage);
    };
  }, []);
  
  return (
    <AppLayout>
      <AdminNavigation enabled={tabNavigationEnabled} />
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
