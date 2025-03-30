
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';

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
          <Route path="/" element={<AppLayout><Navigate to="/admin/dashboard" replace /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><AdminDashboard /></AppLayout>} />
          <Route path="/users" element={<AppLayout><AdminUsers /></AppLayout>} />
          <Route path="/courses" element={<AppLayout><AdminCourses /></AppLayout>} />
          <Route path="/courses/:courseId" element={<AppLayout><AdminCourseDetail /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><AdminSettings /></AppLayout>} />
          <Route path="/finanzas" element={<AppLayout><FinanceManagement /></AppLayout>} />
          <Route path="/learning-paths/*" element={<AppLayout><LearningPaths /></AppLayout>} />
          <Route path="/test-data" element={<AppLayout><TestDataManagement /></AppLayout>} />
          <Route path="/notifications" element={<AppLayout><NotificationManagement /></AppLayout>} />
          <Route path="*" element={<AppLayout><Navigate to="/admin/dashboard" replace /></AppLayout>} />
        </Routes>
      </Suspense>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
