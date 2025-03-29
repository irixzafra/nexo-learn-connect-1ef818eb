
import * as Sentry from "npm:@sentry/deno";

/**
 * Inicializa Sentry para Edge Functions
 */
export function initSentry(functionName: string) {
  const dsn = Deno.env.get("SENTRY_DSN");
  
  if (!dsn) {
    console.warn("Sentry DSN no configurado en las variables de entorno.");
    return false;
  }

  Sentry.init({
    dsn,
    environment: Deno.env.get("ENVIRONMENT") || "production",
    release: "1.0.0", // Incrementar en cada despliegue
    integrations: [
      new Sentry.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
    beforeSend(event) {
      // Puedes modificar o filtrar eventos aquí si es necesario
      return event;
    },
  });

  Sentry.setTag("function", functionName);
  return true;
}

/**
 * Captura y registra errores en Sentry para Edge Functions
 */
export function captureException(error: Error | unknown, context?: Record<string, any>) {
  if (error instanceof Error) {
    Sentry.captureException(error, {
      extra: context
    });
  } else {
    Sentry.captureMessage(`Error no manejado: ${String(error)}`, {
      level: "error",
      extra: context
    });
  }
  
  // Asegúrate de que Sentry ha enviado todos los eventos antes de terminar
  Sentry.flush(2000).catch(e => console.error("Error al enviar eventos a Sentry:", e));
}

/**
 * Envuelve un manejador de Edge Function con monitoreo de Sentry
 */
export function withSentry(functionName: string, handler: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    const sentryInitialized = initSentry(functionName);
    
    try {
      // Si tienes información de autenticación, la puedes establecer aquí
      // Sentry.setUser({ id: userId });
      
      return await handler(req);
    } catch (error) {
      if (sentryInitialized) {
        captureException(error, {
          url: req.url,
          method: req.method,
        });
      }
      
      console.error(`Error en ${functionName}:`, error);
      
      return new Response(
        JSON.stringify({ 
          error: "Ha ocurrido un error interno del servidor", 
          id: Sentry.lastEventId() 
        }), 
        { 
          status: 500, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
  };
}
