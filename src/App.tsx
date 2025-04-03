
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/auth';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { FeaturesProvider } from './contexts/features';
import { TestDataProvider } from './contexts/test-data';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider>
          <LanguageProvider>
            <FeaturesProvider>
              <TestDataProvider>
                <AppRoutes />
                <Toaster />
              </TestDataProvider>
            </FeaturesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
