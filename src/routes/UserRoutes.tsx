
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";

// Dashboard and shared pages
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Users from "@/pages/Users";
import Messages from "@/pages/placeholder/Messages";
import Calendar from "@/pages/placeholder/Calendar";
import Billing from "@/pages/placeholder/Billing";
import Settings from "@/pages/placeholder/Settings";

// Student pages
import StudentCourses from "@/pages/student/Courses";
import CourseLearn from "@/pages/student/CourseLearn";
import LessonView from "@/pages/student/LessonView";
import Checkout from "@/pages/student/Checkout";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/my-courses" element={
        <ProtectedRoute>
          <StudentCourses />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute requiredRole="admin">
          <Users />
        </ProtectedRoute>
      } />
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
      <Route path="/checkout/:courseId" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      } />
      <Route path="/calendar" element={
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
      } />
      <Route path="/billing" element={
        <ProtectedRoute>
          <Billing />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default UserRoutes;
