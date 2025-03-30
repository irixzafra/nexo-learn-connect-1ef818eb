
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
// Add learning paths page if it exists
const LearningPaths = lazy(() => import('@/pages/admin/learning-paths/LearningPaths'));

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
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
