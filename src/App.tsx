
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RouteRedirector from './components/RouteRedirector';
import LandingPage from './pages/LandingPage';
import { useTheme } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import './styles/edit-mode.css'; // Import the edit mode styles

// Lazy-loaded pages
const ForoPage = lazy(() => import('./pages/ForoPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const CourseList = lazy(() => import('./pages/courses/CourseList'));
const CourseDetail = lazy(() => import('./pages/courses/CourseDetail'));
const LessonDetail = lazy(() => import('./pages/courses/LessonDetail'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminFeatures = lazy(() => import('./pages/admin/AdminFeatures'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminTemplates = lazy(() => import('./pages/admin/AdminTemplates'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DynamicPage = lazy(() => import('./pages/DynamicPage'));
const TestDataGenerator = lazy(() => import('./pages/admin/TestDataGenerator'));
const AdminContent = lazy(() => import('./pages/admin/AdminContent'));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));
const MyLearningPage = lazy(() => import('./pages/MyLearningPage'));
const AdminPages = lazy(() => import('./pages/admin/AdminPages'));

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Routes>
        {/* Public routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/foro" element={
            <Suspense fallback={<LoadingScreen />}>
              <ForoPage />
            </Suspense>
          } />
          
          <Route path="/blog" element={
            <Suspense fallback={<LoadingScreen />}>
              <BlogPage />
            </Suspense>
          } />
          
          <Route path="/cursos" element={
            <Suspense fallback={<LoadingScreen />}>
              <CourseList />
            </Suspense>
          } />
          
          <Route path="/cursos/:id" element={
            <Suspense fallback={<LoadingScreen />}>
              <CourseDetail />
            </Suspense>
          } />
          
          <Route path="/leccion/:id" element={
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <LessonDetail />
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/perfil" element={
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/mi-aprendizaje" element={
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <MyLearningPage />
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/pagina/:slug" element={
            <Suspense fallback={<LoadingScreen />}>
              <DynamicPage />
            </Suspense>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin routes */}
        <Route element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminDashboard />
            </Suspense>
          } />
          
          <Route path="/admin/users" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminUsers />
            </Suspense>
          } />
          
          <Route path="/admin/features" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminFeatures />
            </Suspense>
          } />
          
          <Route path="/admin/courses" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminCourses />
            </Suspense>
          } />
          
          <Route path="/admin/templates" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminTemplates />
            </Suspense>
          } />
          
          <Route path="/admin/settings" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminSettings />
            </Suspense>
          } />
          
          <Route path="/admin/test-data" element={
            <Suspense fallback={<LoadingScreen />}>
              <TestDataGenerator />
            </Suspense>
          } />
          
          <Route path="/admin/content" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminContent />
            </Suspense>
          } />
          
          <Route path="/admin/home" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminHomePage />
            </Suspense>
          } />
          
          <Route path="/admin/pages" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminPages />
            </Suspense>
          } />
        </Route>
        
        {/* Route Redirector - for handling legacy URLs */}
        <Route path="/redirect/:path" element={<RouteRedirector />} />
      </Routes>
    </div>
  );
}

export default App;
