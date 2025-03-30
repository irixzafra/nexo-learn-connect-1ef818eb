
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';

// Lazy loaded components
const InstructorDashboard = lazy(() => import('@/pages/instructor/InstructorDashboard'));
const InstructorCourses = lazy(() => import('@/pages/instructor/InstructorCourses'));
const CreateCourse = lazy(() => import('@/pages/instructor/CreateCourse'));
const EditCourse = lazy(() => import('@/pages/instructor/EditCourse'));
const InstructorSettings = lazy(() => import('@/pages/instructor/InstructorSettings'));
const InstructorAnalytics = lazy(() => import('@/pages/instructor/InstructorAnalytics'));
const InstructorStudents = lazy(() => import('@/pages/instructor/InstructorStudents'));

// Loading component for Suspense
const InstructorLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const InstructorRoutes = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<InstructorLoading />}>
        <Routes>
          <Route path="/" element={<AppLayout><Navigate to="/instructor/dashboard" replace /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><InstructorDashboard /></AppLayout>} />
          <Route path="/courses" element={<AppLayout><InstructorCourses /></AppLayout>} />
          <Route path="/courses/create" element={<AppLayout><CreateCourse /></AppLayout>} />
          <Route path="/courses/:courseId/edit" element={<AppLayout><EditCourse /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><InstructorSettings /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout><InstructorAnalytics /></AppLayout>} />
          <Route path="/students" element={<AppLayout><InstructorStudents /></AppLayout>} />
          <Route path="*" element={<AppLayout><Navigate to="/instructor/dashboard" replace /></AppLayout>} />
        </Routes>
      </Suspense>
    </ProtectedRoute>
  );
};

export default InstructorRoutes;
