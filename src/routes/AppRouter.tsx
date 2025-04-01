import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import AppLayout from '@/layouts/AppLayout';
import PageRenderer from '@/features/pages/PageRenderer';
import RouteRedirector from '@/components/RouteRedirector';
import { FeaturesProvider } from '@/contexts/features/FeaturesContext';

// Lazy loading of route groups
const PublicRoutes = React.lazy(() => import('./PublicRoutes'));
const UserRoutes = React.lazy(() => import('./UserRoutes'));
const InstructorRoutes = React.lazy(() => import('./InstructorRoutes'));
const AdminRoutes = React.lazy(() => import('./AdminRoutes'));
const PaymentRoutes = React.lazy(() => import('./PaymentRoutes'));

// Lazy loading of standalone pages
const Dashboard = React.lazy(() => import('@/pages/student/Dashboard'));
const CoursesCatalog = React.lazy(() => import('@/pages/CoursesCatalog'));
const CourseLanding = React.lazy(() => import('@/pages/CourseLanding'));
const Community = React.lazy(() => import('@/pages/Community'));
const CourseLearn = React.lazy(() => import('@/pages/student/CourseLearn'));
const LessonView = React.lazy(() => import('@/pages/student/LessonView'));
const CourseNotes = React.lazy(() => import('@/pages/student/CourseNotes'));
const Checkout = React.lazy(() => import('@/pages/student/Checkout'));
const Notifications = React.lazy(() => import('@/pages/Notifications'));
const Messages = React.lazy(() => import('@/pages/placeholder/Messages'));
const Billing = React.lazy(() => import('@/pages/placeholder/Billing'));
const Features = React.lazy(() => import('@/pages/admin/Features'));
const MyCourses = React.lazy(() => import('@/pages/student/MyCourses'));
const Calendar = React.lazy(() => import('@/pages/placeholder/Calendar'));
const Invoices = React.lazy(() => import('@/pages/student/Invoices'));
const Certificates = React.lazy(() => import('@/pages/user/Certificates'));
const CertificateDetail = React.lazy(() => import('@/pages/user/CertificateDetail'));
const CertificateVerify = React.lazy(() => import('@/pages/CertificateVerify'));
const Recommendations = React.lazy(() => import('@/pages/Recommendations'));
const Preferences = React.lazy(() => import('@/pages/user/Preferences'));
const UserAnalytics = React.lazy(() => import('@/pages/admin/UserAnalytics'));

// Loading component for suspense
const LoadingFallback = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const AppRouter: React.FC = () => {
  return (
    <RouteRedirector>
      <Routes>
        {/* Public routes */}
        <Route path="/*" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <PublicRoutes />
          </React.Suspense>
        } />
        
        {/* User routes */}
        <Route path="/user/*" element={
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingFallback />}>
              <UserRoutes />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={<Navigate to="/home" replace />} />
        
        {/* Profile route */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Preferences route */}
        <Route path="/preferences" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Preferences />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Recommendations route */}
        <Route path="/recommendations" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Recommendations />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* My courses route */}
        <Route path="/my-courses" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <MyCourses />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Calendar route */}
        <Route path="/calendar" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Calendar />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Invoices route */}
        <Route path="/invoices" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Invoices />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Certificates routes */}
        <Route path="/certificates" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Certificates />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/certificates/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <CertificateDetail />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/certificates/verify" element={
          <AppLayout>
            <React.Suspense fallback={<LoadingFallback />}>
              <CertificateVerify />
            </React.Suspense>
          </AppLayout>
        } />
        
        {/* Instructor routes */}
        <Route path="/instructor/*" element={
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingFallback />}>
              <InstructorRoutes />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingFallback />}>
              <FeaturesProvider>
                <AdminRoutes />
              </FeaturesProvider>
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        {/* Analytics routes */}
        <Route path="/admin/analytics/users" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <UserAnalytics />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Features page */}
        <Route path="/features" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Features />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Payment routes */}
        <Route path="/payment/:status" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <PaymentRoutes />
          </React.Suspense>
        } />
        
        {/* Course related routes */}
        <Route path="/courses/:id" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <CourseLanding />
          </React.Suspense>
        } />
        
        <Route path="/courses" element={
          <AppLayout>
            <React.Suspense fallback={<LoadingFallback />}>
              <CoursesCatalog />
            </React.Suspense>
          </AppLayout>
        } />
        
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
        
        <Route path="/courses/:courseId/notes" element={
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingFallback />}>
              <CourseNotes />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/checkout/:courseId" element={
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingFallback />}>
              <Checkout />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        {/* Community route */}
        <Route path="/community" element={
          <AppLayout>
            <React.Suspense fallback={<LoadingFallback />}>
              <Community />
            </React.Suspense>
          </AppLayout>
        } />
        
        {/* Misc protected routes */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Notifications />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/messages" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Messages />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/billing" element={
          <ProtectedRoute>
            <AppLayout>
              <React.Suspense fallback={<LoadingFallback />}>
                <Billing />
              </React.Suspense>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Redirects */}
        <Route path="/index" element={<Navigate to="/" replace />} />
        
        {/* Dynamic page route - must be after all specific routes and before the catch-all */}
        <Route path="/:slug" element={<PageRenderer />} />
        
        {/* Catch-all for routes not found - must be the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RouteRedirector>
  );
};

export default AppRouter;
