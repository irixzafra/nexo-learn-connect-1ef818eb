
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import CourseCatalogPage from './pages/CourseCatalogPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonView from './pages/student/LessonView';
import CheckoutPage from './pages/CheckoutPage';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CreateCoursePage from './pages/instructor/CreateCoursePage';
import EditCoursePage from './pages/instructor/EditCoursePage';
import CourseStructurePage from './pages/instructor/CourseStructurePage';
import EditLesson from './pages/instructor/EditLesson';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseDetail from './pages/admin/courses/AdminCourseDetail';
import AdminCategories from './pages/admin/AdminCategories';
import AdminNavigation from './pages/admin/AdminNavigation';
import AdminNavigationDiagram from './pages/admin/AdminNavigationDiagram';
import AdminSettings from './pages/admin/AdminSettings';
import NotFoundPage from './pages/NotFoundPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HelpCenterPage from './pages/HelpCenterPage';
import CareersPage from './pages/CareersPage';
import SitemapPage from './pages/SitemapPage';
import OfflineCoursesPage from './pages/OfflineCoursesPage';
import InstructorRoute from './components/routes/InstructorRoute';
import AdminRoute from './components/routes/AdminRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicHomePage from './pages/PublicHomePage';
import AdminLessonEdit from "./pages/admin/courses/AdminLessonEdit";

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: React.FC = () => {
  const { user, loading, refreshAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Refresh authentication on app start
    refreshAuth();
  }, [refreshAuth]);

  // Show loading indicator while authentication state is being determined
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicHomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/sitemap" element={<SitemapPage />} />
      <Route path="/courses" element={<CourseCatalogPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/offline-courses" element={<OfflineCoursesPage />} />

      {/* Student Routes */}
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/profile/edit" element={
        <ProtectedRoute>
          <EditProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/profile/change-password" element={
        <ProtectedRoute>
          <ChangePasswordPage />
        </ProtectedRoute>
      } />
      <Route path="/courses/:courseId/learn/:lessonId" element={
        <ProtectedRoute>
          <LessonView />
        </ProtectedRoute>
      } />
      <Route path="/checkout/:courseId" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />

      {/* Instructor Routes */}
      <Route path="/instructor/dashboard" element={
        <InstructorRoute>
          <InstructorDashboard />
        </InstructorRoute>
      } />
      <Route path="/instructor/courses/create" element={
        <InstructorRoute>
          <CreateCoursePage />
        </InstructorRoute>
      } />
      <Route path="/instructor/courses/:courseId/edit" element={
        <InstructorRoute>
          <EditCoursePage />
        </InstructorRoute>
      } />
      <Route path="/instructor/courses/:courseId/structure" element={
        <InstructorRoute>
          <CourseStructurePage />
        </InstructorRoute>
      } />
      <Route path="/instructor/courses/:courseId/lessons/:lessonId/edit" element={
        <InstructorRoute>
          <EditLesson />
        </InstructorRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="/admin/users" element={
        <AdminRoute>
          <AdminUsers />
        </AdminRoute>
      } />
      <Route path="/admin/courses" element={
        <AdminRoute>
          <AdminCourses />
        </AdminRoute>
      } />
      <Route path="/admin/courses/:courseId" element={
        <AdminRoute>
          <AdminCourseDetail />
        </AdminRoute>
      } />
      <Route path="/admin/courses/:courseId/lessons/:lessonId/edit" element={
        <ProtectedRoute allowedRoles={["admin", "sistemas"]}>
          <AdminLessonEdit />
        </ProtectedRoute>
      } />
      <Route path="/admin/categories" element={
        <AdminRoute>
          <AdminCategories />
        </AdminRoute>
      } />
      <Route path="/admin/navigation" element={
        <AdminRoute>
          <AdminNavigation />
        </AdminRoute>
      } />
      <Route path="/admin/navigation-diagram" element={
        <AdminRoute>
          <AdminNavigationDiagram />
        </AdminRoute>
      } />
      <Route path="/admin/settings" element={
        <AdminRoute>
          <AdminSettings />
        </AdminRoute>
      } />

      {/* Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
