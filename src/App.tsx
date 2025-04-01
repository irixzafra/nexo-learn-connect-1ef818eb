
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';
import AccessibilityPage from './pages/accessibility/AccessibilityPage';
import NotFound from './pages/NotFound';
import RouteRedirector from './components/RouteRedirector';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
