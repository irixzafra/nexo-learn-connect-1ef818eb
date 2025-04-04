
import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy loaded pages
const Dashboard = lazy(() => import('@/pages/student/Dashboard'));
const MyCoursesPage = lazy(() => import('@/pages/student/MyCoursesPage'));
const ExploreCoursesPage = lazy(() => import('@/pages/student/ExploreCoursesPage'));
const CourseDetailPage = lazy(() => import('@/pages/student/CourseDetailPage'));
const ProfilePage = lazy(() => import('@/pages/student/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/student/SettingsPage'));
const ComingSoonPage = lazy(() => import('@/pages/common/ComingSoonPage'));

// Routes that are part of the student module
const StudentRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-courses" element={<MyCoursesPage />} />
        <Route path="courses" element={<ExploreCoursesPage />} />
        <Route path="course/:courseId" element={<CourseDetailPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Páginas anteriormente huérfanas */}
        <Route path="learning-paths" element={<ComingSoonPage />} />
        <Route path="certificates" element={<ComingSoonPage />} />
        <Route path="calendar" element={<ComingSoonPage />} />
        <Route path="help" element={<ComingSoonPage />} />
        <Route path="messages" element={<ComingSoonPage />} />
        <Route path="support" element={<ComingSoonPage />} />
        <Route path="community" element={<ComingSoonPage />} />
        <Route path="notifications" element={<ComingSoonPage />} />
        
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default StudentRoutes;
