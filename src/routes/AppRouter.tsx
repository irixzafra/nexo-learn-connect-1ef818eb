
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import GuestLayout from '@/layouts/GuestLayout';
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import LessonDetail from '@/pages/LessonDetail';
import Pricing from '@/pages/Pricing';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import AdminRoutes from './AdminRoutes';
import InstructorRoutes from './InstructorRoutes';
import AuthRoutes from './AuthRoutes';
import ProtectedRoute from '@/components/ProtectedRoute';
import GuestRoute from '@/components/GuestRoute';
import PaymentSuccess from '@/pages/payment/PaymentSuccess';
import PaymentCancel from '@/pages/payment/PaymentCancel';
import Community from '@/pages/Community';
import PostDetail from '@/pages/PostDetail';
import Messages from '@/pages/placeholder/Messages';
import NotificationCenter from "@/pages/NotificationCenter";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/courses" element={<AppLayout><Courses /></AppLayout>} />
      <Route path="/courses/:courseId" element={<AppLayout><CourseDetail /></AppLayout>} />
      <Route path="/lessons/:lessonId" element={<AppLayout><LessonDetail /></AppLayout>} />
      <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
      <Route path="/community" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/posts/:postId" element={<AppLayout><PostDetail /></AppLayout>} />

      {/* Auth Routes */}
      <Route path="/auth/*" element={<GuestRoute><GuestLayout><AuthRoutes /></GuestLayout></GuestRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<ProtectedRoute><AdminRoutes /></ProtectedRoute>} />

      {/* Instructor Routes */}
      <Route path="/instructor/*" element={<ProtectedRoute><InstructorRoutes /></ProtectedRoute>} />

      {/* User Routes */}
      <Route path="/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
      <Route path="/payment/success" element={<ProtectedRoute><AppLayout><PaymentSuccess /></AppLayout></ProtectedRoute>} />
      <Route path="/payment/cancel" element={<ProtectedRoute><AppLayout><PaymentCancel /></AppLayout></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><AppLayout><Messages /></AppLayout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><AppLayout><NotificationCenter /></AppLayout></ProtectedRoute>} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
