
import { Routes, Route } from 'react-router-dom';
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
import PlaceholderPage from './pages/placeholder/PlaceholderPage';
import Home from './pages/Home';
import PublicRoutes from './routes/PublicRoutes';

// Lazy-loaded pages
const ProfilePage = lazy(() => import('./pages/Profile'));
const DynamicPage = lazy(() => import('./pages/DynamicPage'));

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Routes>
        {/* Public routes through PublicRoutes component */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Dashboard and protected routes */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </Suspense>
          } />
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
        
        {/* Fallback for any unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
