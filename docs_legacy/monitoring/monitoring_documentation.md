
# Monitorización y Logging - Nexo Learning Platform

## Resumen Ejecutivo

Este documento detalla la estrategia de monitorización, alertas y logging implementada en la plataforma Nexo Learning para garantizar la disponibilidad, rendimiento y seguridad del sistema.

## Arquitectura de Monitorización

### Diagrama de Componentes

```
┌─────────────────────────────────────┐
│            Nexo Platform            │
└───────────────┬─────────────────────┘
                │
        ┌───────▼───────┐    
┌───────┴───────┐ ┌─────┴───────┐ ┌────────────┐
│  Application  │ │  Server     │ │  Database  │
│  Monitoring   │ │  Monitoring │ │  Monitoring│
└───────┬───────┘ └─────┬───────┘ └─────┬──────┘
        │               │               │
┌───────▼───────────────▼───────────────▼───────┐
│                  Data Collection               │
│  (Metrics, Logs, Traces, Synthetic Monitoring) │
└───────────────────────┬─────────────────────┘
                        │
┌───────────────────────▼─────────────────────┐
│           Monitoring Platform                │
│                                              │
│    ┌──────────┐ ┌─────────┐ ┌──────────┐    │
│    │ Dashboards│ │ Alerts  │ │ Reports  │    │
│    └──────────┘ └─────────┘ └──────────┘    │
└──────────────────────────────────────────────┘
```

### Componentes Clave

1. **Aplicación Frontend (React)**
   - Performance Monitoring
   - Error Tracking
   - User Analytics

2. **Servidor Backend (Supabase)**
   - API Performance
   - Function Executions 
   - Resource Utilization

3. **Base de Datos (PostgreSQL)**
   - Query Performance
   - Connection Pools
   - Storage Metrics

## Herramientas de Monitorización

### APM (Application Performance Monitoring)

**Sentry**
- Seguimiento de errores en tiempo real
- Monitoreo de rendimiento de transacciones
- Seguimiento del impacto en usuarios
- Integración con el ciclo de desarrollo

**Configuración Básica**
```typescript
// Configuración de Sentry en React
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay(),
  ],
  
  // Capture 100% of transactions for performance monitoring
  tracesSampleRate: 1.0,
  
  // Session replay for error reproduction
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Monitorización de Infraestructura

**Datadog / New Relic**
- Métricas de servidores
- Monitoreo de endpoints
- Visualización de infraestructura
- Detección de anomalías

### RUM (Real User Monitoring)

**Google Analytics 4 / Mixpanel**
- Patrones de uso
- Tiempos de carga de página
- Métricas de rendimiento real
- Segmentación de usuarios

### Synthetic Monitoring

**Checkly / Pingdom**
- Checks periódicos de disponibilidad
- Verificación de flujos críticos
- Monitoreo desde múltiples ubicaciones geográficas
- Alertas de tiempo de respuesta

## Estrategia de Logging

### Niveles de Log

| Nivel | Uso |
|-------|-----|
| ERROR | Errores críticos que requieren intervención inmediata |
| WARN  | Condiciones potencialmente problemáticas |
| INFO  | Eventos informativos del sistema |
| DEBUG | Información detallada para depuración |
| TRACE | Información muy detallada (solo en entornos de desarrollo) |

### Estructura de Logs

Formato estándar JSON para todos los logs:

```json
{
  "timestamp": "2023-06-12T15:43:12.391Z",
  "level": "ERROR",
  "message": "Failed to process user payment",
  "context": {
    "userId": "usr_123456",
    "transactionId": "tx_789012",
    "service": "payment-service"
  },
  "error": {
    "type": "ApiError",
    "message": "Gateway timeout",
    "stack": "...",
    "code": "GATEWAY_TIMEOUT"
  },
  "app": {
    "name": "nexo-learning",
    "version": "1.2.3",
    "environment": "production"
  }
}
```

### Implementación

**Winston / Pino**
- Transporte configurable (consola, archivos, servicios)
- Filtrado por nivel según entorno
- Formateo personalizado
- Rotación de logs (en producción)

**Ejemplo de Configuración**
```typescript
// Configuración de Winston
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'nexo-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

// Para entornos de producción, añadir integración con servicios externos
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.Http({
    host: 'logging-service.example.com',
    path: '/logs',
    ssl: true
  }));
}
```

## Sistema de Alertas

### Tipos de Alertas

1. **Alertas de Disponibilidad**
   - Caída de servicio
   - Latencia elevada
   - Errores HTTP 5xx sostenidos

2. **Alertas de Rendimiento**
   - Uso de CPU/Memoria superior al 85%
   - Tiempos de respuesta de API > 1000ms
   - Carga de página frontend > 3s

3. **Alertas de Seguridad**
   - Intentos de autenticación fallidos múltiples
   - Patrones de tráfico anómalos
   - Vulnerabilidades detectadas

4. **Alertas de Negocio**
   - Caída en tasa de conversión > 20%
   - Abandonos en flujo de pago > 50%
   - Registros diarios < umbral histórico

### Canales de Notificación

- **Email**: Para notificaciones no urgentes
- **Slack/Teams**: Para notificaciones de equipo
- **SMS/Push**: Para alertas críticas
- **PagerDuty/OpsGenie**: Para gestión de incidentes y on-call

### Política de Alertas

- **Priorización**: Clasificación por severidad e impacto
- **Escalamiento**: Políticas de escalamiento automático
- **Agrupación**: Correlación de alertas relacionadas
- **Silenciamiento**: Periodo de gracia para evitar alertas repetidas

## Dashboard y Visualización

### Dashboards Operativos

1. **Dashboard de Estado del Sistema**
   - Disponibilidad por componente
   - SLAs/SLOs actuales
   - Alertas activas
   - Incidencias recientes

2. **Dashboard de Rendimiento**
   - Tiempos de respuesta de APIs
   - Rendimiento de consultas DB
   - Uso de recursos
   - Tiempo de carga de página

3. **Dashboard de Experiencia de Usuario**
   - Core Web Vitals
   - Tasa de error de cliente
   - APDEX (Application Performance Index)
   - Funnel de conversión

### Dashboards de Negocio

1. **Dashboard de Adquisición**
   - Registros por canal
   - Conversión de visitantes a registrados
   - Costo de adquisición

2. **Dashboard de Engagement**
   - Usuarios activos (DAU/MAU)
   - Tiempo en plataforma
   - Retención por cohorte
   - NPS/CSAT

## Herramientas de Análisis y Depuración

### Análisis de Logs

**Elasticsearch/Kibana**
- Búsqueda y filtrado avanzado
- Visualización de tendencias
- Alertas basadas en patrones

### Trazabilidad Distribuida

**OpenTelemetry/Jaeger**
- Seguimiento de transacciones entre servicios
- Análisis de cuellos de botella
- Correlación de logs, métricas y trazas

## Plan de Respuesta a Incidentes

### Niveles de Severidad

1. **SEV1**: Interrupción total del servicio
2. **SEV2**: Funcionalidad crítica degradada o interrumpida
3. **SEV3**: Funcionalidad no crítica degradada
4. **SEV4**: Problema menor sin impacto en usuario

### Proceso de Respuesta

1. **Detección**: Alerta automática o reporte manual
2. **Triaje**: Evaluación inicial y asignación de severidad
3. **Mitigación**: Acciones inmediatas para restaurar servicio
4. **Resolución**: Solución permanente del problema
5. **Postmortem**: Análisis de causa raíz y mejoras

### Runbooks

Documentación paso a paso para responder a escenarios comunes:
- Caída de base de datos
- Sobrecarga de servidor
- Problemas de conexión
- Ataques de seguridad

## Mantenimiento y Retención

### Política de Retención de Logs

- **Logs de Error**: 90 días
- **Logs de Acceso**: 30 días
- **Logs de Auditoría**: 1 año
- **Logs de Depuración**: 7 días

### Mantenimiento de Métricas

- **Métricas de Alta Resolución**: 7 días
- **Métricas Agregadas Horarias**: 30 días
- **Métricas Agregadas Diarias**: 1 año
- **Métricas Históricas (Agregación)**: 5 años

## Cumplimiento y Seguridad

### Protección de Datos Sensibles

- Enmascaramiento de PII en logs
- Cifrado de datos en tránsito y en reposo
- Control de acceso basado en roles para herramientas de monitoreo

### Auditoría y Cumplimiento

- Logs específicos para auditoría
- Reporting para cumplimiento regulatorio
- Integridad y no repudio de logs

## Anexos

- Diagramas detallados de arquitectura
- Configuraciones técnicas específicas
- Plantillas de alertas y procedimientos
