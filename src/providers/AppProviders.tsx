
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/auth';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { FeaturesProvider } from '@/contexts/features/FeaturesContext';
import { TestDataProvider } from '@/contexts/test-data/TestDataProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>
            <TooltipProvider>
              <AuthProvider>
                <LanguageProvider>
                  <FeaturesProvider>
                    <TestDataProvider>
                      {children}
                      <Toaster />
                    </TestDataProvider>
                  </FeaturesProvider>
                </LanguageProvider>
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
