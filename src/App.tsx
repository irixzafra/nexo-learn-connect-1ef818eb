
import React from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/auth';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
