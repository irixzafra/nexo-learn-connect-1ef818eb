
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from "@/pages/NotFound";
import AppLayout from "@/layouts/AppLayout";

// Student pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentMyCourses from '@/pages/student/MyCourses';
import LessonView from '@/pages/student/LessonView';
import ProfileDashboard from '@/pages/profile/ProfileDashboard';
import ProfileEdit from '@/pages/profile/ProfileEdit';
import ProfileSecurity from '@/pages/profile/ProfileSecurity';
import ProfileNotifications from '@/pages/profile/ProfileNotifications';
import ProfileSubscriptions from '@/pages/profile/ProfileSubscriptions';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <StudentDashboard />
        </AppLayout>
      } />
      <Route path="/dashboard" element={
        <AppLayout>
          <StudentDashboard />
        </AppLayout>
      } />
      <Route path="/my-courses" element={
        <AppLayout>
          <StudentMyCourses />
        </AppLayout>
      } />
      <Route path="/course/:courseId/lesson/:lessonId" element={
        <AppLayout>
          <LessonView />
        </AppLayout>
      } />
      <Route path="/profile" element={
        <AppLayout>
          <ProfileDashboard />
        </AppLayout>
      } />
      <Route path="/profile/edit" element={
        <AppLayout>
          <ProfileEdit />
        </AppLayout>
      } />
      <Route path="/profile/security" element={
        <AppLayout>
          <ProfileSecurity />
        </AppLayout>
      } />
      <Route path="/profile/notifications" element={
        <AppLayout>
          <ProfileNotifications />
        </AppLayout>
      } />
      <Route path="/profile/subscriptions" element={
        <AppLayout>
          <ProfileSubscriptions />
        </AppLayout>
      } />
      
      {/* Catch-all route for user routes not found */}
      <Route path="*" element={
        <AppLayout>
          <NotFound />
        </AppLayout>
      } />
    </Routes>
  );
};

export default UserRoutes;
