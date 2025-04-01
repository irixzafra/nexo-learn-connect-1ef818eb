
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { TestDataProvider } from '@/contexts/test-data';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { KeyboardShortcuts } from '@/components/accessibility/KeyboardShortcuts';
import { TooltipProvider } from '@/components/ui/tooltip';
import { FeaturesProvider } from '@/contexts/features/FeaturesContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';

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
        <HelmetProvider>
          <ThemeProvider>
            <TooltipProvider delayDuration={300}>
              <AuthProvider>
                <FeaturesProvider>
                  <LanguageProvider>
                    <EditModeProvider>
                      <TestDataProvider>
                        <OnboardingProvider>
                          <KeyboardShortcuts />
                          {children}
                          <Toaster position="top-right" />
                        </OnboardingProvider>
                      </TestDataProvider>
                    </EditModeProvider>
                  </LanguageProvider>
                </FeaturesProvider>
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
