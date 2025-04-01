
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
import Dashboard from './pages/student/Dashboard';
import PublicRoutes from './routes/PublicRoutes';
import AppRouter from './routes/AppRouter';
import Index from './pages/Index';

// Lazy-loaded pages
const ProfilePage = lazy(() => import('./pages/Profile'));
const DynamicPage = lazy(() => import('./pages/DynamicPage'));

function App() {
  const { theme } = useTheme();

  // Use the AppRouter component that has all our routes
  return (
    <div className={`app ${theme}`}>
      <AppRouter />
    </div>
  );
}

export default App;
