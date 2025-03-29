
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { TestDataProvider } from "@/contexts/TestDataContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorBoundaryFallback from "@/components/ErrorBoundaryFallback";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <TestDataProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <EditModeProvider>
                <TooltipProvider>
                  {children}
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </EditModeProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </TestDataProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
