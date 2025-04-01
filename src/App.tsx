
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RouteRedirector from './components/RouteRedirector';
import LandingPage from './pages/LandingPage';
import { useTheme } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import AdminRoutes from './routes/AdminRoutes';
import './styles/edit-mode.css'; // Import the edit mode styles

// Lazy-loaded pages
const ForoPage = lazy(() => import('./pages/ForoPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const CourseList = lazy(() => import('./pages/courses/CourseList'));
const CourseDetail = lazy(() => import('./pages/courses/CourseDetail'));
const LessonDetail = lazy(() => import('./pages/courses/LessonDetail'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DynamicPage = lazy(() => import('./pages/DynamicPage'));
const MyLearningPage = lazy(() => import('./pages/MyLearningPage'));

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
        
        {/* Admin routes - Usando AdminRoutes componente */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Route Redirector - for handling legacy URLs */}
        <Route path="/redirect/:path" element={<RouteRedirector>
          <div>Redirecting...</div>
        </RouteRedirector>} />
      </Routes>
    </div>
  );
}

export default App;
