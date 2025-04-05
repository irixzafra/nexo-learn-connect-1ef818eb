
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from "@/layouts/AppLayout";
import NotFound from '@/pages/NotFound';

// Course pages
import CourseCatalog from '@/pages/courses/CourseCatalog';
import CourseDetail from '@/pages/courses/CourseDetail';
import CourseEnrollment from '@/pages/courses/CourseEnrollment';

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
      
      {/* Catch-all route for course routes not found */}
      <Route path="*" element={
        <AppLayout>
          <NotFound />
        </AppLayout>
      } />
    </Routes>
  );
};

export default CourseRoutes;
