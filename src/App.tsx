
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AccessibilityPage from './pages/accessibility/AccessibilityPage';
import NotFound from './pages/NotFound';
import RouteRedirector from './components/RouteRedirector';
import { Toaster } from './components/ui/toaster';
import { LanguageProvider } from './contexts/LanguageContext';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <div className="app">
          <KeyboardShortcuts />
          <Routes>
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/r/:path" element={<RouteRedirector />} />
            <Route path="/redirect/:path" element={<RouteRedirector />} />
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
          <Toaster />
        </div>
      </LanguageProvider>
    </Router>
  );
};

export default App;
