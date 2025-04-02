
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AccessibilityPage from './pages/accessibility/AccessibilityPage';
import NotFound from './pages/NotFound';
import RouteRedirector from './components/RouteRedirector';
import { Toaster } from './components/ui/toaster';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';
import BrokenLinkMonitor from './components/BrokenLinkMonitor';
import SkipLinks from './components/accessibility/SkipLinks';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Create lazy loaded components
const LazyRouteValidator = React.lazy(() => import('./pages/admin/RouteValidator'));
const LazyNavigationDiagram = React.lazy(() => import('./pages/admin/NavigationDiagram'));

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="app">
            <SkipLinks />
            <KeyboardShortcuts />
            <BrokenLinkMonitor enabled={false} showNotifications={false} />
            
            <main id="main-content">
              <Routes>
                {/* Routes without language prefix */}
                <Route path="*" element={<AppRoutes />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />
                <Route path="/r/:path" element={<RouteRedirector />} />
                <Route path="/redirect/:path" element={<RouteRedirector />} />
                <Route path="/admin/route-validator" element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyRouteValidator />
                  </Suspense>
                } />
                <Route path="/admin/navigation-diagram" element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyNavigationDiagram />
                  </Suspense>
                } />
              </Routes>
            </main>
            
            <Toaster />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
