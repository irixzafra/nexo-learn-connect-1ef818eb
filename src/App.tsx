
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/auth';
import { DesignSystemProvider } from '@/contexts/DesignSystemContext';
import { FeaturesProvider } from './contexts/features';
import { TestDataProvider } from './contexts/test-data';
import { Toaster } from 'sonner';

// Import page components
import MaterialDesign from './pages/MaterialDesign';
import ComponentsShowcase from './pages/ComponentsShowcase';
import MaterialDesignDemo from './pages/MaterialDesignDemo';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/material-design" element={<MaterialDesign />} />
      <Route path="/components-showcase" element={<ComponentsShowcase />} />

      {/* Material Design Demo */}
      <Route path="/material-design-demo" element={<MaterialDesignDemo />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <FeaturesProvider>
        <ThemeProvider>
          <DesignSystemProvider>
            <TestDataProvider>
              <Router>
                <AppRoutes />
              </Router>
              <Toaster position="top-right" richColors />
            </TestDataProvider>
          </DesignSystemProvider>
        </ThemeProvider>
      </FeaturesProvider>
    </AuthProvider>
  );
}

export default App;
