
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from '@/pages/student/Dashboard';
import AppLayout from '@/layouts/AppLayout';
import CourseDetail from '@/pages/CourseDetail';
import Courses from '@/pages/Courses';
import ProtectedRouteWrapper from '@/components/ProtectedRouteWrapper';
import NotFound from '@/pages/NotFound';
import StudentInbox from '@/pages/student/Inbox';
import MyCourses from '@/pages/student/MyCourses';
import LessonView from '@/pages/student/LessonView';
import CourseLearn from '@/pages/student/CourseLearn';
import Preferences from '@/pages/user/Preferences';
import Profile from '@/pages/Profile';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRouteWrapper>
              <UserDashboard />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="courses"
          element={
            <ProtectedRouteWrapper>
              <Courses />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="courses/:courseId"
          element={
            <ProtectedRouteWrapper>
              <CourseDetail />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="inbox"
          element={
            <ProtectedRouteWrapper>
              <StudentInbox />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="my-courses"
          element={
            <ProtectedRouteWrapper>
              <MyCourses />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="preferences"
          element={
            <ProtectedRouteWrapper>
              <Preferences />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRouteWrapper>
              <Profile />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="course/:courseId/learn"
          element={
            <ProtectedRouteWrapper>
              <CourseLearn />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="course/:courseId/lesson/:lessonId"
          element={
            <ProtectedRouteWrapper>
              <LessonView />
            </ProtectedRouteWrapper>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
