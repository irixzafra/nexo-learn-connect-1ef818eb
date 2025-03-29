
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as Sentry from "@sentry/react";

// Inicializa Sentry - Solo se activa en producción
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "",
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
      }),
      Sentry.replayIntegration(),
    ],
    // Configura el muestreo de rendimiento
    tracesSampleRate: 0.2,
    // Muestreo de sesiones para la funcionalidad de reproducción
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  });
}

createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={<p>Ha ocurrido un error inesperado.</p>}>
    <App />
  </Sentry.ErrorBoundary>
);
