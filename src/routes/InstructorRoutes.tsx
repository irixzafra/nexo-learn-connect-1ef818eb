
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import AppLayout from "@/layouts/AppLayout";

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
          <AppLayout>
            <InstructorDashboard />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/students" element={
        <ProtectedRoute requiredRole="instructor">
          <AppLayout>
            <InstructorStudents />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute requiredRole="instructor">
          <AppLayout>
            <CoursesList />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/courses/new" element={
        <ProtectedRoute requiredRole="instructor">
          <AppLayout>
            <CreateCourse />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/courses/:id/edit" element={
        <ProtectedRoute requiredRole="instructor">
          <AppLayout>
            <EditCourseDetails />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/courses/:id/structure" element={
        <ProtectedRoute requiredRole="instructor">
          <AppLayout>
            <EditCourseStructure />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/courses/:courseId/lessons/:lessonId/edit" element={
        <ProtectedRoute requiredRole="instructor">
          <AppLayout>
            <EditLesson />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={
        <ProtectedRoute requiredRole="instructor">
          <AppLayout>
            <NotFound />
          </AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default InstructorRoutes;
