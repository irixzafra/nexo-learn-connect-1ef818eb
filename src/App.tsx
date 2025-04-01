
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RouteRedirector from './components/RouteRedirector';
import { useTheme } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import './styles/edit-mode.css'; // Import the edit mode styles

// Define placeholders for pages that are referenced but don't exist yet
const Dashboard = () => <div>Dashboard</div>;
const ForoPage = () => <div>Foro Page</div>;
const BlogPage = () => <div>Blog Page</div>;
const CourseList = () => <div>Course List</div>;
const CourseDetail = () => <div>Course Detail</div>;
const LessonDetail = () => <div>Lesson Detail</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
const AdminUsers = () => <div>Admin Users</div>;
const AdminFeatures = () => <div>Admin Features</div>;
const AdminCourses = lazy(() => import('./pages/admin/courses/AdminCourses'));
const AdminTemplates = () => <div>Admin Templates</div>;
const AdminSettings = () => <div>Admin Settings</div>;
const ProfilePage = () => <div>Profile Page</div>;
const DynamicPage = () => <div>Dynamic Page</div>;
const TestDataGenerator = () => <div>Test Data Generator</div>;
const AdminContent = () => <div>Admin Content</div>;
const AdminHomePage = () => <div>Admin Home Page</div>;
const MyLearningPage = () => <div>My Learning Page</div>;
const AdminPages = () => <div>Admin Pages</div>;

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Routes>
        {/* Public routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Landing Page</div>} />
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
        <Route path="/redirect/:path" element={<RouteRedirector>
          <div>Redirecting...</div>
        </RouteRedirector>} />
      </Routes>
    </div>
  );
}

export default App;
