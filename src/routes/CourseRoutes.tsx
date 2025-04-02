
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import CourseCatalog from '@/pages/courses/CourseCatalog';
import CourseDetail from '@/pages/courses/CourseDetail';
import CourseEnrollment from '@/pages/courses/CourseEnrollment';
import LessonView from '@/pages/student/LessonView';
import NotFound from '@/pages/NotFound';

const CourseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <CourseCatalog />
        </AppLayout>
      } />
      <Route path="/:courseId" element={
        <AppLayout>
          <CourseDetail />
        </AppLayout>
      } />
      <Route path="/:courseId/enroll" element={
        <AppLayout>
          <CourseEnrollment />
        </AppLayout>
      } />
      <Route path="/:courseId/learn/:lessonId" element={
        <AppLayout>
          <LessonView />
        </AppLayout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CourseRoutes;
