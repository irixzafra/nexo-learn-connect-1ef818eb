
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';
import AccessibilityPage from './pages/accessibility/AccessibilityPage';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <KeyboardShortcuts />
        <Routes>
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
