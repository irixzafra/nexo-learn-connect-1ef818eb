
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
import Community from '@/pages/Community';
import PostDetail from '@/pages/PostDetail';
import Messages from '@/pages/placeholder/Messages';
import NotificationCenter from "@/pages/NotificationCenter";
import NotFound from '@/pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas principales */}
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/courses" element={<AppLayout><Courses /></AppLayout>} />
      <Route path="/courses/:courseId" element={<AppLayout><CourseDetail /></AppLayout>} />
      <Route path="/lessons/:lessonId" element={<AppLayout><LessonDetail /></AppLayout>} />
      <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
      
      {/* Rutas de comunidad */}
      <Route path="/community" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/comunidad/foros" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/comunidad/grupos" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/comunidad/mensajes" element={<AppLayout><Messages /></AppLayout>} />
      <Route path="/comunidad/eventos" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/comunidad/empleos" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/comunidad/anuncios" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/posts/:postId" element={<AppLayout><PostDetail /></AppLayout>} />

      {/* Rutas de autenticación */}
      <Route path="/auth/*" element={<GuestRoute><GuestLayout><AuthRoutes /></GuestLayout></GuestRoute>} />

      {/* Rutas protegidas de administración */}
      <Route path="/admin/*" element={<ProtectedRoute><AdminRoutes /></ProtectedRoute>} />

      {/* Rutas protegidas de instructor */}
      <Route path="/instructor/*" element={<ProtectedRoute><InstructorRoutes /></ProtectedRoute>} />

      {/* Rutas protegidas de usuario */}
      <Route path="/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><AppLayout><Messages /></AppLayout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><AppLayout><NotificationCenter /></AppLayout></ProtectedRoute>} />

      {/* Catch-all para 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
