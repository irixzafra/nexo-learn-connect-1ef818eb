
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/toaster';
import { KeyboardShortcuts } from './components/accessibility/KeyboardShortcuts';
import SkipLinks from './components/accessibility/SkipLinks';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="app">
            <SkipLinks />
            <KeyboardShortcuts />
            
            <main id="main-content">
              <AppRoutes />
            </main>
            
            <Toaster />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
