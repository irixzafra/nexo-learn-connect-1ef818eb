
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Courses from '@/pages/courses';
import CourseDetail from '@/pages/courses/CourseDetail';
import CourseContent from '@/pages/courses/CourseContent';
import LessonView from '@/pages/courses/LessonView';
import NotFound from '@/pages/NotFound';
import PrivateRoute from './PrivateRoute';
import InstructorRoutes from './InstructorRoutes';
import AdminRoutes from './AdminRoutes';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ProfileSettings from '@/pages/profile/settings';
import LearningDashboard from '@/pages/student/LearningDashboard';
import QuizAttempt from '@/pages/courses/quiz/QuizAttempt';
import QuizResults from '@/pages/courses/quiz/QuizResults';
import PageRenderer from '@/features/pages/PageRenderer';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      
      <Route
        path="/courses/:courseId/content"
        element={
          <PrivateRoute>
            <CourseContent />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/courses/:courseId/lessons/:lessonId"
        element={
          <PrivateRoute>
            <LessonView />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/courses/:courseId/quizzes/:quizId"
        element={
          <PrivateRoute>
            <QuizAttempt />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/courses/:courseId/quizzes/:quizId/results/:attemptId"
        element={
          <PrivateRoute>
            <QuizResults />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <LearningDashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/profile/settings"
        element={
          <PrivateRoute>
            <ProfileSettings />
          </PrivateRoute>
        }
      />
      
      <Route path="/instructor/*" element={<InstructorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Dynamic page route - must be after all specific routes */}
      <Route path="/:slug" element={<PageRenderer />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
