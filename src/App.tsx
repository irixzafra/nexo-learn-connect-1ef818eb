
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AccessibilityPage from './pages/accessibility/AccessibilityPage';
import NotFound from './pages/NotFound';
import RouteRedirector from './components/RouteRedirector';
import { Toaster } from './components/ui/toaster';
import { LanguageProvider } from './contexts/LanguageContext';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';
import BrokenLinkMonitor from './components/BrokenLinkMonitor';
import SkipLinks from './components/accessibility/SkipLinks';
import { LanguageWrapper } from '@/components/LanguageWrapper';

// Create lazy loaded components
const LazyRouteValidator = React.lazy(() => import('./pages/admin/RouteValidator'));
const LazyNavigationDiagram = React.lazy(() => import('./pages/admin/NavigationDiagram'));

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <div className="app">
          <SkipLinks />
          <KeyboardShortcuts />
          <BrokenLinkMonitor enabled={false} showNotifications={false} />
          
          <main id="main-content">
            <Routes>
              {/* Language-specific routes */}
              <Route path=":language/*" element={<LanguageWrapper />}>
                <Route path="*" element={<AppRoutes />} />
              </Route>
              
              {/* Routes without language prefix */}
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
              
              {/* Default redirect to preferred language */}
              <Route path="*" element={<AppRoutes />} />
            </Routes>
          </main>
          
          <Toaster />
        </div>
      </LanguageProvider>
    </Router>
  );
};

export default App;
