import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import AppLayout from '@/layouts/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import AdminRoutes from './AdminRoutes';
import PageRenderer from '@/features/pages/PageRenderer';
import PublicRoutes from './PublicRoutes';

// Lazy loading of non-critical routes
const CoursesCatalog = React.lazy(() => import('@/pages/CoursesCatalog'));
const CourseDetail = React.lazy(() => import('@/pages/CourseDetail'));
const CourseLanding = React.lazy(() => import('@/pages/CourseLanding'));
const CourseLearn = React.lazy(() => import('@/pages/student/CourseLearn'));
const LessonView = React.lazy(() => import('@/pages/student/LessonView'));
const Notifications = React.lazy(() => import('@/pages/Notifications'));
const Messages = React.lazy(() => import('@/pages/placeholder/Messages'));
const Billing = React.lazy(() => import('@/pages/placeholder/Billing'));
const Community = React.lazy(() => import('@/pages/Community'));
const PaymentSuccess = React.lazy(() => import('@/pages/payment/PaymentSuccess'));
const PaymentCancel = React.lazy(() => import('@/pages/payment/PaymentCancel'));
const UserRoutes = React.lazy(() => import('./UserRoutes'));
const InstructorRoutes = React.lazy(() => import('./InstructorRoutes'));
const PaymentRoutes = React.lazy(() => import('./PaymentRoutes'));

// Componente de carga para Suspense
const LoadingFallback = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes are accessible without authentication */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Course public landing page */}
      <Route path="/courses/:id" element={
        <React.Suspense fallback={<LoadingFallback />}>
          <CourseLanding />
        </React.Suspense>
      } />
      
      {/* User routes for standard authenticated users */}
      <Route path="/home/*" element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingFallback />}>
            <UserRoutes />
          </React.Suspense>
        </ProtectedRoute>
      } />
      
      {/* Course learning routes (authenticated) */}
      <Route path="/courses/:courseId/learn" element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingFallback />}>
            <CourseLearn />
          </React.Suspense>
        </ProtectedRoute>
      } />
      
      <Route path="/courses/:courseId/learn/:lessonId" element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingFallback />}>
            <LessonView />
          </React.Suspense>
        </ProtectedRoute>
      } />
      
      {/* Community route */}
      <Route path="/community" element={
        <React.Suspense fallback={<LoadingFallback />}>
          <Community />
        </React.Suspense>
      } />
      
      {/* Página de notificaciones */}
      <Route path="/notifications" element={
        <ProtectedRoute>
          <AppLayout>
            <React.Suspense fallback={<LoadingFallback />}>
              <Notifications />
            </React.Suspense>
          </AppLayout>
        </ProtectedRoute>
      } />
      
      {/* Página de mensajes */}
      <Route path="/messages" element={
        <ProtectedRoute>
          <AppLayout>
            <React.Suspense fallback={<LoadingFallback />}>
              <Messages />
            </React.Suspense>
          </AppLayout>
        </ProtectedRoute>
      } />
      
      {/* Payment routes */}
      <Route path="/payment/*" element={
        <React.Suspense fallback={<LoadingFallback />}>
          <PaymentRoutes />
        </React.Suspense>
      } />
      
      {/* Success and cancel pages for payments */}
      <Route path="/payment/success" element={
        <React.Suspense fallback={<LoadingFallback />}>
          <PaymentSuccess />
        </React.Suspense>
      } />
      
      <Route path="/payment/cancel" element={
        <React.Suspense fallback={<LoadingFallback />}>
          <PaymentCancel />
        </React.Suspense>
      } />
      
      {/* Billing page */}
      <Route path="/billing" element={
        <ProtectedRoute>
          <AppLayout>
            <React.Suspense fallback={<LoadingFallback />}>
              <Billing />
            </React.Suspense>
          </AppLayout>
        </ProtectedRoute>
      } />
      
      {/* Role-specific routes */}
      <Route path="/instructor/*" element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingFallback />}>
            <InstructorRoutes />
          </React.Suspense>
        </ProtectedRoute>
      } />
      
      {/* Admin routes - Import directly instead of using lazy loading */}
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminRoutes />
        </ProtectedRoute>
      } />
      
      {/* Course catalog */}
      <Route path="/courses" element={
        <AppLayout>
          <React.Suspense fallback={<LoadingFallback />}>
            <CoursesCatalog />
          </React.Suspense>
        </AppLayout>
      } />
      
      {/* Dynamic page route - must be after all specific routes */}
      <Route path="/:slug" element={<PageRenderer />} />
      
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
  );
};

export default AppRouter;
