
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from "@/pages/NotFound";
import AppLayout from "@/layouts/AppLayout";
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import PlaceholderPage from '@/components/PlaceholderPage';

// Instructor pages
import InstructorDashboard from '@/pages/instructor/Dashboard';
import InstructorCoursesList from '@/pages/instructor/CoursesList';
import InstructorStudents from '@/pages/instructor/Students';
import InstructorCourseEditor from '@/pages/instructor/CourseEditor';
import InstructorEditCourseStructure from '@/pages/instructor/EditCourseStructure';
import InstructorEditLesson from '@/pages/instructor/EditLesson';
import CreateCourse from '@/pages/instructor/CreateCourse';
import EditCourseDetails from '@/pages/instructor/EditCourseDetails';

const InstructorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <InstructorDashboard />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/dashboard" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <InstructorDashboard />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <InstructorCoursesList />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/students" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <InstructorStudents />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses/create" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <CreateCourse />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses/:id/edit" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <EditCourseDetails />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses/:id/analytics" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <PlaceholderPage title="Analíticas del Curso (Instructor)" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses/:id/editor" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <InstructorCourseEditor />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses/:id/structure" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <InstructorEditCourseStructure />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/courses/:courseId/lessons/:lessonId/edit" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <InstructorEditLesson />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      
      {/* Additional instructor routes */}
      <Route path="/assignments" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <PlaceholderPage title="Notas y Tareas" subtitle="Sistema de gestión de tareas en desarrollo" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/messages" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <PlaceholderPage title="Mensajes de Instructor" subtitle="Sistema de mensajería en desarrollo" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      <Route path="/analytics" element={
        <AppLayout>
          <SafeRouteWrapper requiredRole={['instructor', 'admin']}>
            <PlaceholderPage title="Analíticas de Instructor" subtitle="Dashboard de analíticas en desarrollo" />
          </SafeRouteWrapper>
        </AppLayout>
      } />
      
      {/* Catch-all route for instructor routes not found */}
      <Route path="*" element={
        <AppLayout>
          <NotFound />
        </AppLayout>
      } />
    </Routes>
  );
};

export default InstructorRoutes;
