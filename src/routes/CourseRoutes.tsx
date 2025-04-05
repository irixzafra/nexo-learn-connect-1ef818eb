
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

// Course pages
import CourseCatalog from '@/pages/courses/CourseCatalog';
import CourseDetail from '@/pages/courses/CourseDetail';
import CourseEnrollment from '@/pages/courses/CourseEnrollment';

const CourseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseCatalog />} />
      <Route path="/:courseId" element={<CourseDetail />} />
      <Route path="/:courseId/enroll" element={<CourseEnrollment />} />
      
      {/* Catch-all route for course routes not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CourseRoutes;
