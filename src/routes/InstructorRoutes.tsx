
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import Dashboard from '@/pages/instructor/Dashboard';
import CoursesList from '@/pages/instructor/CoursesList';
import CreateCourse from '@/pages/instructor/CreateCourse';
import EditCourseDetails from '@/pages/instructor/EditCourseDetails';
import EditCourseStructure from '@/pages/instructor/EditCourseStructure';
import Students from '@/pages/instructor/Students';
import EditLesson from '@/pages/instructor/EditLesson';
import CourseEditor from '@/pages/instructor/CourseEditor';
import NotFound from '@/pages/NotFound';

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <Dashboard />
        </AppLayout>
      } />
      <Route path="/dashboard" element={
        <AppLayout>
          <Dashboard />
        </AppLayout>
      } />
      <Route path="/courses" element={
        <AppLayout>
          <CoursesList />
        </AppLayout>
      } />
      <Route path="/courses/create" element={
        <AppLayout>
          <CreateCourse />
        </AppLayout>
      } />
      <Route path="/courses/:id/edit" element={
        <AppLayout>
          <EditCourseDetails />
        </AppLayout>
      } />
      <Route path="/courses/:id/editor" element={
        <AppLayout>
          <CourseEditor />
        </AppLayout>
      } />
      <Route path="/courses/:id/structure" element={
        <AppLayout>
          <EditCourseStructure />
        </AppLayout>
      } />
      <Route path="/courses/:courseId/lessons/:lessonId/edit" element={
        <AppLayout>
          <EditLesson />
        </AppLayout>
      } />
      <Route path="/students" element={
        <AppLayout>
          <Students />
        </AppLayout>
      } />
      <Route path="*" element={
        <AppLayout>
          <NotFound />
        </AppLayout>
      } />
    </Routes>
  );
};

export default InstructorRoutes;
