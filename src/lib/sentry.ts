
import * as Sentry from "@sentry/react";

/**
 * Captura errores con contexto adicional para Sentry
 */
export const captureError = (
  error: Error | unknown, 
  context?: Record<string, any>
) => {
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
};

/**
 * Registra una acción importante del usuario con Sentry
 */
export const trackUserAction = (
  action: string, 
  data?: Record<string, any>
) => {
  Sentry.addBreadcrumb({
    category: 'user-action',
    message: action,
    data,
    level: 'info',
  });
};

/**
 * Establece el contexto del usuario para los errores
 */
export const setUserContext = (
  user: { id: string; email?: string; role?: string; viewingAs?: string } | null
) => {
  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      role: user.role,
      // Añadimos el contexto de visualización para ayudar en la depuración
      ...(user.viewingAs && { viewingAs: user.viewingAs }),
    });
  } else {
    Sentry.setUser(null);
  }
};

/**
 * Registra eventos de cambio de rol para análisis
 */
export const trackRoleSwitch = (
  originalRole: string,
  newViewRole: string
) => {
  Sentry.addBreadcrumb({
    category: 'role-switch',
    message: `Cambio de vista de rol: ${originalRole} → ${newViewRole}`,
    level: 'info',
    data: {
      originalRole,
      newViewRole,
      timestamp: new Date().toISOString()
    }
  });
};
