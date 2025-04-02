
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/toaster';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';
import SkipLinks from './components/accessibility/SkipLinks';
import { AuthProvider } from './contexts/auth';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <LanguageProvider>
          <div className="app">
            <SkipLinks />
            <KeyboardShortcuts />
            
            <AppRoutes />
            
            <Toaster />
          </div>
        </LanguageProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
