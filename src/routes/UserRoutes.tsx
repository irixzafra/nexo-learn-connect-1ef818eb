
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import AppLayout from "@/layouts/AppLayout";

// Student pages
import Home from "@/pages/Home";
import StudentDashboard from "@/pages/student/Dashboard";
import StudentCourses from "@/pages/student/Courses";
import CourseLearn from "@/pages/student/CourseLearn";
import LessonView from "@/pages/student/LessonView";
import Checkout from "@/pages/student/Checkout";
import Messages from "@/pages/placeholder/Messages";
import Settings from "@/pages/placeholder/Settings";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout>
            <StudentDashboard />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppLayout>
            <StudentDashboard />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/my-courses" element={
        <ProtectedRoute>
          <AppLayout>
            <StudentCourses />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/learn/:courseId" element={
        <ProtectedRoute>
          <AppLayout>
            <CourseLearn />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/learn/:courseId/lesson/:lessonId" element={
        <ProtectedRoute>
          <AppLayout>
            <LessonView />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/checkout/:courseId" element={
        <ProtectedRoute>
          <AppLayout>
            <Checkout />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <AppLayout>
            <Messages />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <AppLayout>
            <Settings />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={
        <ProtectedRoute>
          <AppLayout>
            <NotFound />
          </AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default UserRoutes;
