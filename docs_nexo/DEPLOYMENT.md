
# Guía de Despliegue - Nexo Learning

## Entornos

Nexo Learning utiliza una estrategia de múltiples entornos:

| Entorno | Propósito | Rama | URL |
|---------|-----------|------|-----|
| Desarrollo | Desarrollo local | Cualquiera | localhost |
| Staging | Pruebas de integración | develop | staging.nexo-learning.com |
| QA | Pruebas de calidad | qa | qa.nexo-learning.com |
| Producción | Entorno de usuario final | main | nexo-learning.com |

## Infraestructura

### Frontend

- **Hosting**: Vercel
- **CDN**: Cloudflare
- **Monitoreo**: Sentry

### Backend

- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Storage**: Supabase Storage
- **APIs**: Supabase APIs + Edge Functions

## Despliegue Automatizado

### CI/CD Pipeline

Utilizamos GitHub Actions para nuestra integración continua y despliegue continuo:

1. **Push a una rama de característica**:
   - Ejecuta pruebas
   - Genera build de verificación
   - Genera preview deployment

2. **Merge a `develop`**:
   - Ejecuta pruebas
   - Genera build para staging
   - Despliega a entorno de staging
   - Ejecuta pruebas E2E en staging

3. **Merge a `main` (después de aprobación)**:
   - Ejecuta pruebas
   - Genera build para producción
   - Despliega a producción

## Despliegue Manual

### Requisitos Previos

- Node.js v18+
- pnpm
- Acceso a consolas de Vercel y Supabase
- Claves de API configuradas

### Paso 1: Preparación

```bash
# Asegúrate de tener la última versión
git checkout main
git pull origin main

# Instala dependencias
pnpm install
```

### Paso 2: Build

```bash
# Variables de entorno de producción
cp .env.production.local.example .env.production.local
# Editar .env.production.local con valores correctos

# Generar build
pnpm build
```

### Paso 3: Despliegue

```bash
# Usando Vercel CLI
vercel --prod

# O si prefieres desplegar manualmente
# Subir los archivos de la carpeta /dist a tu servidor
```

## Configuración de Supabase

### Migraciones de Base de Datos

Utilizamos el sistema de migraciones de Supabase:

```bash
# Generar migración (tras cambios locales)
supabase db diff -f nombre_cambio

# Aplicar migraciones
supabase db push
```

### Políticas RLS

Las políticas RLS deben ser revisadas y aplicadas manualmente en producción a través de la consola de Supabase o mediante scripts:

```bash
# Aplicar políticas RLS
supabase db push --include-rls
```

## Variables de Entorno

### Variables Críticas

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| SUPABASE_URL | URL del proyecto Supabase | Sí |
| SUPABASE_ANON_KEY | Clave anónima de Supabase | Sí |
| SUPABASE_SERVICE_ROLE | Clave de servicio (solo backend) | Sí |
| STRIPE_SECRET_KEY | Clave secreta de Stripe | Producción |
| STRIPE_WEBHOOK_SECRET | Secreto para webhooks de Stripe | Producción |

### Gestión de Secretos

- **Desarrollo**: Archivo `.env.local` (gitignored)
- **Staging/Producción**: Secretos almacenados en Vercel/Supabase

## Monitoreo y Logs

### Herramientas de Monitoreo

- **Rendimiento Frontend**: Vercel Analytics
- **Errores**: Sentry
- **Logs Backend**: Supabase Logs
- **Uptime**: UptimeRobot

### Alertas

Configuramos alertas para:
- Errores críticos (notificación inmediata)
- Alto tiempo de respuesta (>2s)
- Fallos de autenticación repetidos
- Uso excesivo de recursos

## Respaldos y Recuperación

### Respaldos

- Base de datos: Respaldos diarios automáticos con retención de 7 días
- Archivos: Respaldos incrementales

### Recuperación ante Desastres

1. **Incidente Menor**:
   - Rollback a versión anterior (Vercel)
   - Restauración de DB puntual (Supabase)

2. **Incidente Mayor**:
   - Activación de entorno alternativo
   - Restauración desde respaldo completo
   - Comunicación a usuarios

## Procedimientos de Despliegue

### Lista de Verificación Pre-Despliegue

- [ ] Pruebas pasadas al 100%
- [ ] Revisión de código completada
- [ ] Migraciones de DB probadas en staging
- [ ] Rendimiento validado
- [ ] Changelog actualizado

### Ventanas de Despliegue

- Despliegues programados: Martes y Jueves, 9-11 AM (GMT)
- Hotfixes: Cuando sea necesario, con aprobación

### Rollback

En caso de problemas:

```bash
# Revertir al despliegue anterior en Vercel
vercel rollback

# Revertir migraciones de DB (si es posible)
supabase db reset --db-url=PREVIOUS_BACKUP_URL
```

## Optimizaciones

### Rendimiento

- Asegúrate de que todas las imágenes estén optimizadas
- Habilita la compresión Brotli/Gzip
- Configura correctamente la caché de Cloudflare

### Seguridad

- Configura los encabezados CSP apropiados
- Habilita HSTS
- Configura CORS correctamente

## Solución de Problemas Comunes

### Error en Despliegue

**Causa Posible**: Falta de dependencias o configuración incorrecta.
**Solución**: Verifica los logs de build en Vercel.

### Problemas con Políticas RLS

**Causa Posible**: Faltan políticas o están mal configuradas.
**Solución**: Revisa las políticas en la consola de Supabase.

### Problemas con Stripe

**Causa Posible**: Webhooks mal configurados.
**Solución**: Verifica las URLs de webhook en el dashboard de Stripe.

---

Para soporte adicional, contacta al equipo de DevOps en devops@nexo-learning.com.
