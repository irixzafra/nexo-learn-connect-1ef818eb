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
import { DesignSystemProvider } from './contexts/DesignSystemContext';
import { FeaturesProvider } from './contexts/features/FeaturesContext';

// Importar estilos explícitamente
import './index.css';
import './App.css';

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

// Forzar la carga de estilos en caso de que no se haya aplicado correctamente
const forceStylesRefresh = () => {
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Asegurarse de que las clases de tema estén aplicadas
  html.classList.remove('light', 'dark', 'futuristic');
  html.classList.add(currentTheme);
  
  console.log('Styles refresh applied, current theme:', currentTheme);
};

// Ejecutar después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', forceStylesRefresh);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <DesignSystemProvider>
            <AuthProvider>
              <FeaturesProvider>
                <EditModeProvider>
                  <App />
                  <CacheManager />
                  <Toaster />
                  <SonnerToaster position="top-right" closeButton richColors />
                </EditModeProvider>
              </FeaturesProvider>
            </AuthProvider>
          </DesignSystemProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
