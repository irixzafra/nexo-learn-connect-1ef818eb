
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import AppLayout from '@/layouts/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Componente de carga para Suspense
const LoadingFallback = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// Lazy loading de rutas
const PublicRoutes = lazy(() => import('./PublicRoutes'));
const UserRoutes = lazy(() => import('./UserRoutes'));
const InstructorRoutes = lazy(() => import('./InstructorRoutes'));
const AdminRoutes = lazy(() => import('./AdminRoutes'));
const CoursesCatalog = lazy(() => import('@/pages/CoursesCatalog'));
const CourseDetail = lazy(() => import('@/pages/CourseDetail'));
const CourseLanding = lazy(() => import('@/pages/CourseLanding'));
const CourseLearn = lazy(() => import('@/pages/student/CourseLearn'));
const LessonView = lazy(() => import('@/pages/student/LessonView'));
const Notifications = lazy(() => import('@/pages/Notifications'));

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes are accessible without authentication */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Course public landing page */}
        <Route path="/courses/:id" element={<CourseLanding />} />
        
        {/* User routes for standard authenticated users */}
        <Route path="/home/*" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <UserRoutes />
            </Suspense>
          </ProtectedRoute>
        } />
        
        {/* Course learning routes (authenticated) */}
        <Route path="/courses/:courseId/learn" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <CourseLearn />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/courses/:courseId/learn/:lessonId" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <LessonView />
            </Suspense>
          </ProtectedRoute>
        } />
        
        {/* Página de notificaciones */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<LoadingFallback />}>
                <Notifications />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Role-specific routes */}
        <Route path="/instructor/*" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <InstructorRoutes />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<LoadingFallback />}>
                <AdminRoutes />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Course catalog */}
        <Route path="/courses" element={
          <AppLayout>
            <Suspense fallback={<LoadingFallback />}>
              <CoursesCatalog />
            </Suspense>
          </AppLayout>
        } />
        
        {/* My courses route with redirection to user routes */}
        <Route path="/my-courses" element={
          <ProtectedRoute>
            <Navigate to="/home/my-courses" replace />
          </ProtectedRoute>
        } />
        
        {/* Profile with layout */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout>
              <div className="container mx-auto px-4 py-6">
                <Profile />
              </div>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Index redirect to home or landing page */}
        <Route path="/index" element={<Navigate to="/" replace />} />
        
        {/* Catch-all route for not found pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
