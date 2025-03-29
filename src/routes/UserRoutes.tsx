
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Courses from '@/pages/CoursesCatalog';
import CourseDetail from '@/pages/CourseDetail';
import StudentCourses from '@/pages/student/Courses';
import CourseLearn from '@/pages/student/CourseLearn';
import LessonView from '@/pages/student/LessonView';
import Checkout from '@/pages/student/Checkout';
import Profile from '@/pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';
import Settings from '@/pages/placeholder/Settings';
import Messages from '@/pages/placeholder/Messages';
import Calendar from '@/pages/placeholder/Calendar';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <StudentCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId/learn"
        element={
          <ProtectedRoute>
            <CourseLearn />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId/learn/:lessonId"
        element={
          <ProtectedRoute>
            <LessonView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout/:courseId"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
    </Routes>
  );
};

export default UserRoutes;
