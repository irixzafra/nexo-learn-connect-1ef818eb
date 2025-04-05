
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from "@/pages/NotFound";
import AppLayout from "@/layouts/AppLayout";
import SafeRouteWrapper from '@/components/SafeRouteWrapper';

// Student pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentCourses from "@/pages/student/Courses";
import Invoices from "@/pages/student/Invoices";
import Settings from "@/pages/placeholder/Settings";
import Preferences from "@/pages/user/Preferences";
import StudentMyCourses from '@/pages/student/MyCourses';
import LessonView from '@/pages/student/LessonView';
import ProfileDashboard from '@/pages/profile/ProfileDashboard';
import ProfileEdit from '@/pages/profile/ProfileEdit';
import ProfileSecurity from '@/pages/profile/ProfileSecurity';
import ProfileNotifications from '@/pages/profile/ProfileNotifications';
import ProfileSubscriptions from '@/pages/profile/ProfileSubscriptions';
import PlaceholderPage from '@/components/PlaceholderPage';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <StudentDashboard />
        </AppLayout>
      } />
      <Route path="/dashboard" element={
        <AppLayout>
          <StudentDashboard />
        </AppLayout>
      } />
      <Route path="/my-courses" element={
        <AppLayout>
          <StudentMyCourses />
        </AppLayout>
      } />
      <Route path="/course/:courseId/lesson/:lessonId" element={
        <AppLayout>
          <LessonView />
        </AppLayout>
      } />
      <Route path="/invoices" element={
        <AppLayout>
          <Invoices />
        </AppLayout>
      } />
      <Route path="/settings" element={
        <AppLayout>
          <Settings />
        </AppLayout>
      } />
      <Route path="/preferences" element={
        <AppLayout>
          <Preferences />
        </AppLayout>
      } />
      <Route path="/profile" element={
        <AppLayout>
          <ProfileDashboard />
        </AppLayout>
      } />
      <Route path="/profile/edit" element={
        <AppLayout>
          <ProfileEdit />
        </AppLayout>
      } />
      <Route path="/profile/security" element={
        <AppLayout>
          <ProfileSecurity />
        </AppLayout>
      } />
      <Route path="/profile/notifications" element={
        <AppLayout>
          <ProfileNotifications />
        </AppLayout>
      } />
      <Route path="/profile/subscriptions" element={
        <AppLayout>
          <ProfileSubscriptions />
        </AppLayout>
      } />
      
      {/* Additional student routes */}
      <Route path="/learning-paths" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}>
            <PlaceholderPage title="Rutas de Aprendizaje" subtitle="Explora rutas de aprendizaje personalizadas" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/certificates" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}>
            <PlaceholderPage title="Certificados" subtitle="Gestiona tus certificados obtenidos" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/achievements" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'admin']}>
            <PlaceholderPage title="Logros" subtitle="Visualiza tus logros en la plataforma" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/calendar" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}>
            <PlaceholderPage title="Calendario" subtitle="Gestiona tus eventos y fechas importantes" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/help" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}>
            <PlaceholderPage title="Ayuda" subtitle="Centro de ayuda y soporte" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/messages" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}>
            <PlaceholderPage title="Mensajes" subtitle="Centro de mensajería interna" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/notifications" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}>
            <PlaceholderPage title="Notificaciones" subtitle="Gestiona tus notificaciones" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/community" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['student', 'instructor', 'admin']}>
            <PlaceholderPage title="Comunidad" subtitle="Conecta con otros estudiantes y profesores" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      
      {/* Catch-all route for user routes not found */}
      <Route path="*" element={
        <AppLayout>
          <NotFound />
        </AppLayout>
      } />
    </Routes>
  );
};

export default UserRoutes;
