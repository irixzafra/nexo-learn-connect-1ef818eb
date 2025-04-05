
import React from 'react';
import './App.css';
import { ThemeProvider } from './components/ThemeProvider';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="nexo-ui-theme">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
