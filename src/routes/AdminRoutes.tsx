
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Lazy loaded components
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('@/pages/admin/AdminUsers'));
const AdminCourses = lazy(() => import('@/pages/admin/courses/AdminCourses'));
const AdminCourseDetail = lazy(() => import('@/pages/admin/courses/AdminCourseDetail'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));
const FinanceManagement = lazy(() => import('@/pages/admin/FinanceManagement'));
// Learning paths page
const LearningPaths = lazy(() => import('@/pages/admin/learning-paths/LearningPaths'));
// Test data management page
const TestDataManagement = lazy(() => import('@/pages/admin/TestDataManagement'));
// Notification Management
const NotificationManagement = lazy(() => import('@/pages/admin/notifications/NotificationManagement'));

// Loading component for Suspense
const AdminLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const AdminRoutes = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<AdminLoading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/courses" element={<AdminCourses />} />
          <Route path="/courses/:courseId" element={<AdminCourseDetail />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/finanzas" element={<FinanceManagement />} />
          <Route path="/learning-paths/*" element={<LearningPaths />} />
          <Route path="/test-data" element={<TestDataManagement />} />
          <Route path="/notifications" element={<NotificationManagement />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
