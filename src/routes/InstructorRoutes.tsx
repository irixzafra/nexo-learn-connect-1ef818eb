
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";

// Instructor pages
import InstructorDashboard from "@/pages/instructor/Dashboard";
import InstructorStudents from "@/pages/instructor/Students";
import CoursesList from "@/pages/instructor/CoursesList";
import CreateCourse from "@/pages/instructor/CreateCourse";
import EditCourseDetails from "@/pages/instructor/EditCourseDetails";
import EditCourseStructure from "@/pages/instructor/EditCourseStructure";
import EditLesson from "@/pages/instructor/EditLesson";

const InstructorRoutes = () => {
  return (
    <>
      <Route path="/instructor/dashboard" element={
        <ProtectedRoute requiredRole="instructor">
          <InstructorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/instructor/students" element={
        <ProtectedRoute requiredRole="instructor">
          <InstructorStudents />
        </ProtectedRoute>
      } />
      <Route path="/instructor/courses" element={
        <ProtectedRoute requiredRole="instructor">
          <CoursesList />
        </ProtectedRoute>
      } />
      <Route path="/instructor/courses/new" element={
        <ProtectedRoute requiredRole="instructor">
          <CreateCourse />
        </ProtectedRoute>
      } />
      <Route path="/instructor/courses/:id/edit" element={
        <ProtectedRoute requiredRole="instructor">
          <EditCourseDetails />
        </ProtectedRoute>
      } />
      <Route path="/instructor/courses/:id/structure" element={
        <ProtectedRoute requiredRole="instructor">
          <EditCourseStructure />
        </ProtectedRoute>
      } />
      <Route path="/instructor/courses/:courseId/lessons/:lessonId/edit" element={
        <ProtectedRoute requiredRole="instructor">
          <EditLesson />
        </ProtectedRoute>
      } />
    </>
  );
};

export default InstructorRoutes;
