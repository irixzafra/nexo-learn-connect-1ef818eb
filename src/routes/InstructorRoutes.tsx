
import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
    <Routes>
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="instructor">
          <InstructorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/students" element={
        <ProtectedRoute requiredRole="instructor">
          <InstructorStudents />
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute requiredRole="instructor">
          <CoursesList />
        </ProtectedRoute>
      } />
      <Route path="/courses/new" element={
        <ProtectedRoute requiredRole="instructor">
          <CreateCourse />
        </ProtectedRoute>
      } />
      <Route path="/courses/:id/edit" element={
        <ProtectedRoute requiredRole="instructor">
          <EditCourseDetails />
        </ProtectedRoute>
      } />
      <Route path="/courses/:id/structure" element={
        <ProtectedRoute requiredRole="instructor">
          <EditCourseStructure />
        </ProtectedRoute>
      } />
      <Route path="/courses/:courseId/lessons/:lessonId/edit" element={
        <ProtectedRoute requiredRole="instructor">
          <EditLesson />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default InstructorRoutes;
