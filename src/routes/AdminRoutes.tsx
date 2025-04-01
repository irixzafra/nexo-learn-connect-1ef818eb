
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Courses from '@/pages/admin/Courses';
import CourseDetail from '@/pages/admin/CourseDetail';
import UserManagement from '@/pages/admin/UserManagement';
import NotFound from '@/pages/NotFound';
import Page404 from '@/pages/NotFound';
import Features from '@/pages/admin/Features';
import SystemSettings from '@/pages/admin/Settings';
import Analytics from '@/pages/admin/analytics';
import NavigationExplorer from '@/pages/admin/navigation/NavigationExplorer';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <AdminPageLayout>
            <Dashboard />
          </AdminPageLayout>
        }
      />
      <Route
        path="/users"
        element={
          <AdminPageLayout>
            <UserManagement />
          </AdminPageLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <AdminPageLayout>
            <Courses />
          </AdminPageLayout>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <AdminPageLayout>
            <CourseDetail />
          </AdminPageLayout>
        }
      />
      <Route
        path="/features"
        element={
          <AdminPageLayout>
            <Features />
          </AdminPageLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <AdminPageLayout>
            <SystemSettings />
          </AdminPageLayout>
        }
      />
      <Route
        path="/analytics/*"
        element={
          <AdminPageLayout>
            <Analytics />
          </AdminPageLayout>
        }
      />
      <Route
        path="/navigation"
        element={
          <AdminPageLayout>
            <NavigationExplorer />
          </AdminPageLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AdminRoutes;
