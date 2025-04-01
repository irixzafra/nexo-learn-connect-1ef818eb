
import React from 'react';
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

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <div className="app">
          <SkipLinks />
          <KeyboardShortcuts />
          <BrokenLinkMonitor enabled={true} showNotifications={true} />
          
          <main id="main-content">
            <Routes>
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/r/:path" element={<RouteRedirector />} />
              <Route path="/redirect/:path" element={<RouteRedirector />} />
              <Route path="/admin/route-validator" element={<React.lazy(() => import('./pages/admin/RouteValidator'))} />
              <Route path="/admin/navigation-diagram" element={<React.lazy(() => import('./pages/admin/NavigationDiagram'))} />
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </main>
          
          <Toaster />
        </div>
      </LanguageProvider>
    </Router>
  );
};

export default App;
