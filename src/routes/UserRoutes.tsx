
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
import AppLayout from '@/layouts/AppLayout';

const UserRoutes: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/my-courses" element={<StudentCourses />} />
        <Route path="/courses/:courseId/learn" element={<CourseLearn />} />
        <Route path="/courses/:courseId/learn/:lessonId" element={<LessonView />} />
        <Route path="/checkout/:courseId" element={<Checkout />} />
      </Routes>
    </AppLayout>
  );
};

export default UserRoutes;
