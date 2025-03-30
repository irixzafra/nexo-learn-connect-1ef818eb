
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { TestDataProvider } from '@/contexts/TestDataContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <EditModeProvider>
              <TestDataProvider>
                <OnboardingProvider>
                  {children}
                  <Toaster position="top-right" />
                </OnboardingProvider>
              </TestDataProvider>
            </EditModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
