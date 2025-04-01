
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

// Lazy-loaded pages - Using placeholder pages until real ones are developed
const ProfilePage = lazy(() => import('./pages/Profile'));
const DynamicPage = lazy(() => import('./pages/DynamicPage'));

// Temporary placeholder components for missing pages
const PlaceholderPage = lazy(() => import('./pages/placeholder/PlaceholderPage'));

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
              <PlaceholderPage title="Foro" />
            </Suspense>
          } />
          
          <Route path="/blog" element={
            <Suspense fallback={<LoadingScreen />}>
              <PlaceholderPage title="Blog" />
            </Suspense>
          } />
          
          <Route path="/cursos" element={
            <Suspense fallback={<LoadingScreen />}>
              <PlaceholderPage title="Cursos" />
            </Suspense>
          } />
          
          <Route path="/cursos/:id" element={
            <Suspense fallback={<LoadingScreen />}>
              <PlaceholderPage title="Detalle de Curso" />
            </Suspense>
          } />
          
          <Route path="/leccion/:id" element={
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <PlaceholderPage title="Lección" />
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
                <PlaceholderPage title="Mi Aprendizaje" />
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
