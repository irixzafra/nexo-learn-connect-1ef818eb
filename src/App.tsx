import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';
import AccessibilityPage from './pages/accessibility/AccessibilityPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <KeyboardShortcuts />
        <AppRoutes />
        <Route path="/accessibility" element={<AccessibilityPage />} />
      </div>
    </Router>
  );
};

export default App;
