
# Documentación de Monitorización y Logging - Nexo Learning Platform

## Visión General

El sistema de monitorización y logging de Nexo Learning está diseñado para proporcionar visibilidad completa sobre el estado, rendimiento y comportamiento de la plataforma. Esta infraestructura permite identificar proactivamente problemas, optimizar el rendimiento y mejorar la experiencia del usuario.

```
┌───────────────────────────────────────────────────────────┐
│                  Sistema de Monitorización                │
├───────────┬───────────────┬────────────────┬─────────────┤
│           │               │                │             │
│ Frontend  │   Backend     │ Infraestructura│   Negocio   │
│Monitoring │  Monitoring   │   Monitoring   │  Monitoring │
│           │               │                │             │
└───────────┴───────────────┴────────────────┴─────────────┘
```

## Arquitectura de Monitorización

### Componentes Principales

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Recolección │────►│Procesamiento│────►│Visualización│
│   de Datos  │     │   y Análisis│     │   y Alertas │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                   ▲                   ▲
       │                   │                   │
┌──────┴──────┐     ┌──────┴──────┐     ┌──────┴──────┐
│   Sentry    │     │   Supabase  │     │  Dashboards │
│  Browser SDK│     │   Logs      │     │  & Alertas  │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Flujo de Datos

1. **Recolección**: Captura de eventos, errores, métricas y logs desde diferentes fuentes
2. **Procesamiento**: Agregación, normalización y enriquecimiento de datos
3. **Análisis**: Detección de patrones, anomalías y tendencias
4. **Visualización**: Dashboards para interpretación humana
5. **Alertas**: Notificación automática basada en reglas predefinidas

## Monitorización Frontend

### Implementación de Sentry

La monitorización de errores y rendimiento del frontend se realiza con Sentry:

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(router),
      }),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance monitoring
    tracesSampleRate: 0.2,
    // Session replay for error reproduction
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    // Release & environment info
    release: import.meta.env.VITE_APP_VERSION,
    environment: import.meta.env.VITE_APP_ENVIRONMENT,
  });
}
```

### Error Boundaries

Implementamos Error Boundaries estratégicamente colocados para capturar y reportar errores mientras mantenemos la experiencia de usuario:

```tsx
// src/components/ErrorBoundary.tsx
import React from 'react';
import * as Sentry from '@sentry/react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => (
  <div className="error-fallback">
    <h2>Algo salió mal</h2>
    <p>Estamos trabajando para solucionarlo. Por favor, intenta nuevamente.</p>
    <button onClick={() => window.location.reload()}>Recargar página</button>
  </div>
);

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Capturar error en Sentry
    Sentry.captureException(error, { 
      contexts: { 
        react: { errorInfo } 
      } 
    });
    console.error('Error capturado:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultFallback />;
    }

    return this.props.children;
  }
}

// HOC para compactar la implementación
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `WithErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};
```

### Web Vitals y Performance Monitoring

Registramos y monitorizamos Web Vitals para seguir la experiencia real de los usuarios:

```typescript
// src/lib/monitoring/webVitals.ts
import { ReportHandler } from 'web-vitals';
import * as Sentry from '@sentry/react';

export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(metric => {
        Sentry.captureMessage('Web Vital: CLS', {
          level: 'info',
          contexts: { metric: { value: metric.value, rating: metric.rating } }
        });
        onPerfEntry(metric);
      });
      getFID(metric => {
        Sentry.captureMessage('Web Vital: FID', {
          level: 'info',
          contexts: { metric: { value: metric.value, rating: metric.rating } }
        });
        onPerfEntry(metric);
      });
      getFCP(metric => {
        Sentry.captureMessage('Web Vital: FCP', {
          level: 'info',
          contexts: { metric: { value: metric.value, rating: metric.rating } }
        });
        onPerfEntry(metric);
      });
      getLCP(metric => {
        Sentry.captureMessage('Web Vital: LCP', {
          level: 'info',
          contexts: { metric: { value: metric.value, rating: metric.rating } }
        });
        onPerfEntry(metric);
      });
      getTTFB(metric => {
        Sentry.captureMessage('Web Vital: TTFB', {
          level: 'info',
          contexts: { metric: { value: metric.value, rating: metric.rating } }
        });
        onPerfEntry(metric);
      });
    });
  }
};
```

### Monitorización de Rutas y Navegación

Realizamos seguimiento de navegación para entender patrones de uso y detectar problemas:

```typescript
// src/lib/monitoring/routeMonitoring.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';

export const useRouteMonitoring = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Start transaction for route change
    const transaction = Sentry.startTransaction({
      name: `navigation to ${location.pathname}`,
      op: 'navigation',
    });
    
    // Log route change
    console.info(`Navigation to: ${location.pathname}`);
    
    // Log to monitoring
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Navigated to ${location.pathname}`,
      level: 'info',
      data: {
        from: document.referrer,
        to: location.pathname,
        search: location.search,
        hash: location.hash,
      },
    });
    
    return () => {
      // Finish transaction when component unmounts
      transaction.finish();
    };
  }, [location]);
};
```

## Monitorización Backend

### Logging en Edge Functions

Configuración de logging para Edge Functions de Supabase:

```typescript
// supabase/functions/_shared/logger.ts
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  service: string;
  request_id?: string;
}

export class Logger {
  private service: string;
  
  constructor(service: string) {
    this.service = service;
  }
  
  private log(level: LogLevel, message: string, context?: Record<string, any>, request_id?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      service: this.service,
      request_id,
    };
    
    // En producción, solo formato JSON
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(entry));
      return;
    }
    
    // En desarrollo, formato legible
    const colorize = (text: string, code: number) => `\x1b[${code}m${text}\x1b[0m`;
    const colors = {
      [LogLevel.DEBUG]: 34, // Azul
      [LogLevel.INFO]: 32,  // Verde
      [LogLevel.WARN]: 33,  // Amarillo
      [LogLevel.ERROR]: 31, // Rojo
    };
    
    const colorLevel = colorize(entry.level, colors[level]);
    const formattedMessage = `[${entry.timestamp}] ${colorLevel} [${entry.service}]: ${entry.message}`;
    
    if (level === LogLevel.ERROR) {
      console.error(formattedMessage, context ? context : '');
    } else if (level === LogLevel.WARN) {
      console.warn(formattedMessage, context ? context : '');
    } else {
      console.log(formattedMessage, context ? context : '');
    }
  }
  
  debug(message: string, context?: Record<string, any>, request_id?: string) {
    this.log(LogLevel.DEBUG, message, context, request_id);
  }
  
  info(message: string, context?: Record<string, any>, request_id?: string) {
    this.log(LogLevel.INFO, message, context, request_id);
  }
  
  warn(message: string, context?: Record<string, any>, request_id?: string) {
    this.log(LogLevel.WARN, message, context, request_id);
  }
  
  error(message: string, context?: Record<string, any>, request_id?: string) {
    this.log(LogLevel.ERROR, message, context, request_id);
  }
}
```

### Ejemplo de Uso en Edge Function

```typescript
// supabase/functions/process-payment/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Logger } from '../_shared/logger.ts';

const logger = new Logger('process-payment');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  const requestId = crypto.randomUUID();
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    logger.debug('CORS preflight request', { requestId });
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    logger.info('Payment processing started', { requestId });
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const { data: payload, error } = await req.json();
    
    if (error) {
      logger.error('Invalid payload', { error, requestId });
      return new Response(
        JSON.stringify({ error: 'Invalid payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Process payment logic here
    logger.info('Payment processed successfully', { 
      userId: payload.userId, 
      amount: payload.amount,
      requestId 
    });
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logger.error('Payment processing failed', { 
      error: error.message, 
      stack: error.stack,
      requestId 
    });
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### Auditoría y Seguimiento

Utilizamos una tabla de auditoría para registrar acciones críticas del sistema:

```sql
-- SQL para insertar un registro de auditoría
CREATE OR REPLACE FUNCTION public.add_audit_log(
  action_name TEXT,
  resource_type TEXT,
  resource_id UUID,
  details JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.audit_log (
    action,
    user_id,
    resource_type,
    resource_id,
    details,
    ip_address
  ) VALUES (
    action_name,
    auth.uid(),
    resource_type,
    resource_id,
    details,
    request.header('CF-Connecting-IP')
  )
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;
```

## Dashboard y Visualización

### Paneles Principales

1. **Dashboard Operacional**
   - Disponibilidad del sistema
   - Latencia por región
   - Errores por minuto
   - Uso de recursos

2. **Dashboard de Experiencia de Usuario**
   - Web Vitals en percentiles
   - Tasa de errores frontend
   - Tiempo medio de carga de página
   - Conversiones y abandonos

3. **Dashboard de Negocio**
   - Usuarios activos
   - Inscripciones a cursos
   - Finalización de lecciones
   - Ingresos diarios/semanales

### Alertas y Notificaciones

#### Configuración de Alertas

| Métrica | Umbral | Severidad | Canales |
|---------|--------|-----------|---------|
| Tasa de error API | >1% | P1 | Slack, SMS |
| Latencia p95 | >500ms | P2 | Slack |
| Fallos de autenticación | >10/min | P2 | Slack |
| Web Vital CLS | >0.25 | P3 | Slack |
| CPU Usage | >80% | P2 | Slack |

#### Flujo de Incidentes

```
Alerta Activada → Notificación → Asignación → Investigación → Resolución → Post-mortem
```

#### Niveles de Severidad

- **P1**: Impacto crítico, respuesta inmediata (<15 min)
- **P2**: Impacto alto, respuesta rápida (<1 hora)
- **P3**: Impacto medio, respuesta programada (<24 horas)
- **P4**: Impacto bajo, incluir en backlog

## Logs y Trazabilidad

### Estructura de Logs

Seguimos un formato estándar para logs en toda la plataforma:

```json
{
  "timestamp": "2023-05-15T18:30:45.123Z",
  "level": "INFO",
  "service": "auth-service",
  "message": "Usuario autenticado con éxito",
  "request_id": "f8e7d6c5-b4a3-2c1d-0b9a-8f7e6d5c4b3a",
  "user_id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
  "context": {
    "method": "password",
    "ip": "203.0.113.42",
    "user_agent": "Mozilla/5.0...",
    "duration_ms": 126
  }
}
```

### Campos Clave en Logs

- **timestamp**: Marca temporal en formato ISO 8601
- **level**: Nivel del log (DEBUG, INFO, WARN, ERROR)
- **service**: Componente que genera el log
- **message**: Descripción concisa del evento
- **request_id**: Identificador único para seguimiento de solicitudes
- **user_id**: ID del usuario (si aplica)
- **context**: Datos adicionales relevantes para el evento

### Retención de Logs

| Tipo de Log | Período de Retención | Ubicación |
|-------------|---------------------|-----------|
| Access Logs | 90 días | Supabase Storage |
| Error Logs | 180 días | Supabase Storage |
| Audit Logs | 1 año | Base de datos |
| Security Logs | 2 años | Bucket seguro |

## Monitoreo de UX y Comportamiento

### Tracking de Interacciones Clave

Realizamos seguimiento de interacciones críticas para entender el uso real:

```typescript
// src/lib/analytics/trackUserAction.ts
import * as Sentry from '@sentry/react';

type ActionCategory = 
  | 'enrollment'
  | 'learning'
  | 'content'
  | 'navigation'
  | 'authentication'
  | 'payment';

interface ActionProps {
  category: ActionCategory;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

export const trackUserAction = ({
  category,
  action,
  label,
  value,
  properties
}: ActionProps) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${category}:${action}`, { label, value, properties });
  }
  
  // Add breadcrumb to Sentry
  Sentry.addBreadcrumb({
    category,
    message: action,
    data: {
      label,
      value,
      ...properties
    },
    level: 'info'
  });
  
  // Enviar a sistema de analytics (ejemplo)
  try {
    // Llamada a servicio de analytics
    // analytics.track(category, action, label, value, properties);
  } catch (error) {
    console.error('Error tracking action', error);
  }
};
```

### Mapas de Calor y Grabaciones de Sesión

Utilizamos la funcionalidad de Session Replay de Sentry para:

- Reproducir sesiones con errores
- Entender el contexto de los problemas
- Identificar problemas de UX

```typescript
// Configuración en src/main.tsx
Sentry.init({
  // ... otras configuraciones
  replaysSessionSampleRate: 0.1, // Grabar 10% de sesiones
  replaysOnErrorSampleRate: 1.0, // Grabar todas las sesiones con errores
  
  // Privacidad
  replaysPrivacy: {
    maskAllText: true,
    blockAllMedia: true,
    maskInputs: true,
  },
});
```

## Alertas y Respuesta a Incidentes

### Sistema de Alertas

Definimos reglas de alerta basadas en umbrales y condiciones:

| Alerta | Condición | Acción |
|--------|-----------|--------|
| Alta Latencia API | p95 > 500ms por 5 min | Notificar equipo técnico |
| Spike de Errores | Tasa error >2% por 2 min | Ejecutar runbook y notificar |
| Uso de CPU | >85% durante 10 min | Escalar automáticamente |
| Errores de Pago | >5 fallos en 15 min | Notificar a equipo de producto |
| Fallos de Login | >10 intentos fallidos/min | Verificar posible ataque |

### Proceso de Respuesta a Incidentes

1. **Detección**
   - Alerta automática o reporte manual
   - Clasificación inicial por severidad

2. **Triage**
   - Asignación al equipo responsable
   - Comunicación inicial a stakeholders

3. **Investigación**
   - Análisis de logs y métricas
   - Identificación de causa raíz

4. **Mitigación**
   - Implementación de solución temporal
   - Verificación de recuperación

5. **Resolución**
   - Corrección definitiva
   - Verificación completa
   - Actualización de documentación

6. **Post-mortem**
   - Análisis de causa raíz
   - Lecciones aprendidas
   - Medidas preventivas

### Plantilla de Post-mortem

```markdown
# Post-mortem: [Título del Incidente]

## Resumen
[Descripción breve del incidente, impacto y duración]

## Cronología
- **[Fecha y hora]**: [Evento]
- **[Fecha y hora]**: [Evento]
- **[Fecha y hora]**: [Evento]

## Impacto
- Usuarios afectados: [número/porcentaje]
- Funcionalidades afectadas: [lista]
- Duración total: [tiempo]

## Causa Raíz
[Explicación detallada de la causa raíz]

## Factores Contribuyentes
- [Factor 1]
- [Factor 2]

## Cómo se Detectó
[Explicación de cómo se identificó el problema]

## Cómo se Solucionó
[Acciones tomadas para resolver el incidente]

## Prevención Futura
- [Acción 1]
- [Acción 2]

## Lecciones Aprendidas
- [Lección 1]
- [Lección 2]
```

## Monitoreo de Disponibilidad

### Healthchecks

Implementamos endpoints de healthcheck para verificar el estado del sistema:

```typescript
// supabase/functions/health/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const startTime = performance.now();
    
    // Check database connectivity
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase.from('health_checks').select('id').limit(1);
    
    if (error) {
      throw new Error(`Database check failed: ${error.message}`);
    }
    
    // Check external services if needed
    // const stripeStatus = await checkStripeStatus();
    
    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);
    
    return new Response(
      JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: Deno.env.get('APP_VERSION') || 'unknown',
        checks: {
          database: { status: 'healthy' },
          // stripe: stripeStatus,
        },
        responseTime: `${responseTime}ms`,
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        } 
      }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    return new Response(
      JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
      }),
      { 
        status: 503, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        } 
      }
    );
  }
});
```

### Monitoreo Externo

Utilizamos servicios externos para monitoreo de disponibilidad desde múltiples ubicaciones:

- **Uptime Robot**: Verificación básica de disponibilidad
- **Checkly**: Verificaciones funcionales (E2E sintéticos)
- **StatusPage**: Comunicación de estado a usuarios

## Métricas de Negocio

### KPIs Principales

| Métrica | Descripción | Objetivo |
|---------|-------------|----------|
| MAU | Usuarios activos mensuales | >10,000 |
| Conversion Rate | % visitantes que se inscriben | >5% |
| Completion Rate | % de cursos completados | >40% |
| NPS | Net Promoter Score | >50 |
| Churn | Tasa de cancelación mensual | <3% |

### Implementación de Seguimiento

```typescript
// src/lib/analytics/businessMetrics.ts
import { supabase } from '@/lib/supabase';

interface EnrollmentMetric {
  courseId: string;
  userId: string;
  paidAmount?: number;
}

export const trackEnrollment = async ({
  courseId, 
  userId,
  paidAmount = 0
}: EnrollmentMetric) => {
  try {
    // Registrar en tabla de analytics
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: 'enrollment',
        user_id: userId,
        properties: {
          course_id: courseId,
          paid_amount: paidAmount,
          is_paid: paidAmount > 0
        }
      });
      
    if (error) throw error;
    
    // Actualizar contador en tiempo real si es necesario
    await supabase.rpc('increment_enrollment_count', { course_id: courseId });
    
    return { success: true };
  } catch (error) {
    console.error('Failed to track enrollment', error);
    return { success: false, error };
  }
};

export const trackCourseCompletion = async ({
  courseId,
  userId,
  durationDays
}: {
  courseId: string;
  userId: string;
  durationDays: number;
}) => {
  try {
    // Similar implementación...
    return { success: true };
  } catch (error) {
    console.error('Failed to track course completion', error);
    return { success: false, error };
  }
};
```

## Optimización de Rendimiento

### Monitoreo de Rendimiento Frontend

Utilizamos React Profiler para identificar problemas de rendimiento:

```tsx
// src/components/PerformanceMonitor.tsx
import React, { Profiler, ProfilerOnRenderCallback } from 'react';
import * as Sentry from '@sentry/react';

const RENDER_THRESHOLD_MS = 16; // 60fps benchmark

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) => {
  // Log slow renders
  if (actualDuration > RENDER_THRESHOLD_MS) {
    console.warn(`[Performance] Slow render detected in ${id}: ${actualDuration.toFixed(2)}ms`);
    
    // Report to monitoring
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `Slow render in ${id}`,
      data: {
        component: id,
        actualDuration,
        baseDuration,
        phase,
        interactions: Array.from(interactions).map(i => i.name)
      },
      level: 'warning'
    });
  }
};

interface PerformanceMonitorProps {
  id: string;
  children: React.ReactNode;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  id,
  children
}) => {
  // Solo activar en entorno de desarrollo o para un % pequeño en producción
  if (
    import.meta.env.DEV || 
    (import.meta.env.PROD && Math.random() < 0.05) // 5% de usuarios en prod
  ) {
    return (
      <Profiler id={id} onRender={onRenderCallback}>
        {children}
      </Profiler>
    );
  }
  
  // En otros casos, renderizar directamente sin overhead
  return <>{children}</>;
};
```

### Mecanismo de Feedback de Usuarios

```tsx
// src/components/FeedbackWidget.tsx
import React, { useState } from 'react';
import * as Sentry from '@sentry/react';

export const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('suggestion');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // Capturar feedback como evento en Sentry
      Sentry.captureMessage('User Feedback', {
        level: category === 'bug' ? 'error' : 'info',
        contexts: {
          feedback: {
            message: feedback,
            email,
            category,
            url: window.location.href,
            userAgent: navigator.userAgent
          }
        }
      });
      
      // También enviar a backend si es necesario
      
      setSent(true);
      setFeedback('');
    } catch (error) {
      console.error('Error sending feedback', error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="feedback-widget">
      <button 
        className="feedback-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : 'Feedback'}
      </button>
      
      {isOpen && (
        <div className="feedback-panel">
          {sent ? (
            <div className="feedback-success">
              <h3>¡Gracias por tu feedback!</h3>
              <p>Lo revisaremos pronto.</p>
              <button onClick={() => {
                setSent(false);
                setIsOpen(false);
              }}>Cerrar</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Envíanos tu feedback</h3>
              
              <div className="form-group">
                <label>Categoría:</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="suggestion">Sugerencia</option>
                  <option value="bug">Problema</option>
                  <option value="question">Pregunta</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Tu mensaje:</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Describe tu feedback..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email (opcional):</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Para poder contactarte"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSending || !feedback.trim()}
              >
                {isSending ? 'Enviando...' : 'Enviar Feedback'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
```

## Plan de Escalabilidad y Resiliencia

### Umbrales de Escalamiento

| Métrica | Umbral | Acción |
|---------|--------|--------|
| Promedio CPU | >70% por 10 min | Escalado horizontal |
| Memoria | >80% por 5 min | Alerta y revisión |
| Tasa de fallos | >1% por 5 min | Alerta y rollback |
| Latencia | >500ms p95 | Revisar optimizaciones |

### Estrategias de Degradación Elegante

1. **Funcionalidades Críticas vs. No Críticas**
   - Identificación de componentes esenciales
   - Degradación por fases según carga

2. **Circuit Breakers**
   - Detección de fallos en cascada
   - Aislamiento de componentes problemáticos

3. **Caching Agresivo**
   - Activación de modo "high-load" en picos
   - Extensión de TTL en caché

### Respuesta a Limitaciones de Recursos

```typescript
// src/lib/features/degradation.ts
enum SystemStatus {
  NORMAL = 'normal',
  HIGH_LOAD = 'high_load',
  CRITICAL = 'critical',
  MAINTENANCE = 'maintenance'
}

interface DegradationConfig {
  disableHeavyFeatures: boolean;
  extendCacheTTL: boolean;
  readOnlyMode: boolean;
  showUserNotice: boolean;
  disableRealtime: boolean;
}

const getSystemDegradationConfig = (status: SystemStatus): DegradationConfig => {
  switch (status) {
    case SystemStatus.HIGH_LOAD:
      return {
        disableHeavyFeatures: true,
        extendCacheTTL: true,
        readOnlyMode: false,
        showUserNotice: false,
        disableRealtime: true
      };
    case SystemStatus.CRITICAL:
      return {
        disableHeavyFeatures: true,
        extendCacheTTL: true,
        readOnlyMode: true,
        showUserNotice: true,
        disableRealtime: true
      };
    case SystemStatus.MAINTENANCE:
      return {
        disableHeavyFeatures: true,
        extendCacheTTL: true,
        readOnlyMode: true,
        showUserNotice: true,
        disableRealtime: true
      };
    default:
      return {
        disableHeavyFeatures: false,
        extendCacheTTL: false,
        readOnlyMode: false,
        showUserNotice: false,
        disableRealtime: false
      };
  }
};

// Sistema para verificar estado actual
export const useSystemStatus = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.NORMAL);
  const config = useMemo(() => getSystemDegradationConfig(status), [status]);
  
  // Lógica para obtener status actual desde API/flag system
  
  return {
    status,
    config,
    isNormal: status === SystemStatus.NORMAL,
    isHighLoad: status === SystemStatus.HIGH_LOAD,
    isCritical: status === SystemStatus.CRITICAL,
    isMaintenance: status === SystemStatus.MAINTENANCE
  };
};
```

## Documentación y Referencia

### Runbooks Operacionales

Ejemplos de runbooks para situaciones comunes:

1. **Respuesta a Alta Latencia**
   - Verificar métricas de uso de recursos
   - Revisar logs de errores recientes
   - Verificar cambios recientes desplegados
   - Escalar recursos si es necesario
   - Activar degradación elegante si persiste

2. **Respuesta a Spike de Errores**
   - Identificar componentes afectados
   - Revisar errores específicos en logs
   - Correlacionar con despliegues recientes
   - Rollback si es necesario
   - Mitigar con workarounds

### Métricas de SLA/SLO

| Servicio | Métrica | SLO | Método de Medición |
|----------|---------|-----|-------------------|
| Frontend | Disponibilidad | 99.9% | Uptime Robot |
| API | Disponibilidad | 99.95% | Healthchecks |
| API | Latencia p95 | <300ms | APM interno |
| Sistema Global | Error rate | <0.1% | Logs agregados |
| Pagos | Tasa de éxito | >99.9% | Transacciones exitosas/total |

### Herramientas y Dashboard

- **Sentry**: Monitoreo de errores frontend y backend
- **Supabase Dashboard**: Métricas de base de datos y funciones
- **Vercel Analytics**: Métricas de rendimiento de despliegue
- **Uptime Robot**: Monitoreo de disponibilidad
- **Custom Dashboard**: KPIs de negocio específicos

### Capacitación del Equipo

Recursos para onboarding de nuevos miembros:

1. **Guía de Monitoreo**:
   - Acceso a dashboards
   - Interpretación de métricas clave
   - Procedimientos de escalamiento

2. **Respuesta a Incidentes**:
   - Protocolo de comunicación
   - Roles y responsabilidades
   - Plantillas de comunicación

3. **Post-mortems y Mejora**:
   - Proceso de análisis
   - Implementación de lecciones aprendidas
   - Ciclo de mejora continua
