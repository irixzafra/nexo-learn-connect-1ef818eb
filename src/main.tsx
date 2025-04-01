import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeaturesProvider } from './contexts/features/FeaturesContext.tsx';
import { EditModeProvider } from './contexts/EditModeContext.tsx';
import './styles/accessibility.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FeaturesProvider>
          <AuthProvider>
            <EditModeProvider>
              <App />
              <Toaster />
            </EditModeProvider>
          </AuthProvider>
        </FeaturesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
