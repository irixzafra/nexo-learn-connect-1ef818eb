
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";

// Dashboard and core user pages
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Users from "@/pages/Users";

// Student pages
import StudentCourses from "@/pages/student/Courses";
import CourseLearn from "@/pages/student/CourseLearn";
import LessonView from "@/pages/student/LessonView";
import Checkout from "@/pages/student/Checkout";

const UserRoutes = () => {
  return (
    <Routes>
      {/* Main dashboard */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
      {/* Profile page (duplicated for convenience) */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      {/* Course management for students */}
      <Route path="/my-courses" element={
        <ProtectedRoute>
          <StudentCourses />
        </ProtectedRoute>
      } />
      
      {/* Admin-only section */}
      <Route path="/users" element={
        <ProtectedRoute requiredRole="admin">
          <Users />
        </ProtectedRoute>
      } />
      
      {/* Course learning paths */}
      <Route path="/courses/:courseId/learn" element={
        <ProtectedRoute>
          <CourseLearn />
        </ProtectedRoute>
      } />
      <Route path="/courses/:courseId/learn/:lessonId" element={
        <ProtectedRoute>
          <LessonView />
        </ProtectedRoute>
      } />
      
      {/* Checkout process */}
      <Route path="/checkout/:courseId" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route for this section */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
