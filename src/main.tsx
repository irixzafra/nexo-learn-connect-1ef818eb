
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditModeProvider } from './contexts/EditModeContext';
import CacheManager from './components/CacheManager';
import { registerServiceWorker } from './lib/cache/serviceWorkerRegistration';

// Registrar el Service Worker
registerServiceWorker().catch(console.error);

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <EditModeProvider>
              <App />
              <CacheManager />
              <Toaster />
              <SonnerToaster position="top-right" closeButton richColors />
            </EditModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
