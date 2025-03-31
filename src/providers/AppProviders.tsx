
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FeatureFlagsProvider } from '@/contexts/features/FeatureFlagsContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FeatureFlagsProvider>
          {children}
        </FeatureFlagsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
