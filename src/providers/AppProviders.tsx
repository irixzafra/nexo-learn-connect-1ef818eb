
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
