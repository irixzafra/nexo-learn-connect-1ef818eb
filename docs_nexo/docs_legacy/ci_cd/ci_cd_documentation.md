
# Documentación de CI/CD - Nexo Learning Platform

## Visión General

La plataforma Nexo Learning implementa un proceso completo de Integración Continua y Despliegue Continuo (CI/CD) para garantizar calidad, consistencia y entregas rápidas.

```
┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│  Desarrollo │──►│   Build    │──►│   Test     │──►│   Deploy   │
└────────────┘   └────────────┘   └────────────┘   └────────────┘
       │                │                │                │
       ▼                ▼                ▼                ▼
┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│ Git/GitHub  │   │ TypeScript │   │ Unit Tests │   │   Preview  │
│  Actions   │   │    Vite    │   │ E2E Tests  │   │ Production │
└────────────┘   └────────────┘   └────────────┘   └────────────┘
```

### Objetivos Clave del Sistema CI/CD

1. **Garantizar Calidad de Código**
   - Ejecutar pruebas automáticas en cada cambio
   - Verificar estándares de código mediante linting
   - Validar tipos con TypeScript
   - Medir cobertura de pruebas

2. **Acelerar el Desarrollo**
   - Proporcionar feedback inmediato a desarrolladores
   - Automatizar tareas repetitivas
   - Facilitar despliegues frecuentes y pequeños

3. **Minimizar Riesgos**
   - Detectar problemas temprano en el ciclo
   - Aislar cambios problemáticos
   - Facilitar rollbacks si es necesario
   - Validar cambios en entornos de staging

4. **Mejorar Colaboración**
   - Visibilidad del estado de builds
   - Feedback automatizado en Pull Requests
   - Estándares consistentes para todo el equipo

## Pipeline de CI/CD

### Flujo de Trabajo General

```
┌───────┐     ┌───────┐     ┌───────┐     ┌────────┐     ┌────────┐
│Commit │────►│ Pull  │────►│ Build │────►│  Test  │────►│ Deploy │
│       │     │Request│     │       │     │        │     │        │
└───────┘     └───────┘     └───────┘     └────────┘     └────────┘
                  │
                  ▼
            ┌───────────┐
            │ Linting & │
            │TypeChecking│
            └───────────┘
```

### Etapas Detalladas

#### 1. Commit y Pull Request

- **Hooks de Pre-commit**: Verificación local antes del commit
  - Lint-staged para analizar solo archivos modificados
  - Formateo automático con Prettier
  - Verificación básica de tipos

- **Apertura de Pull Requests**
  - Template estructurado para PRs
  - Asignación automática de revisores
  - Verificación de tamaño y complejidad

#### 2. Linting y Verificación de Tipos

- **ESLint**: Análisis estático de código
  - Reglas personalizadas para React y TypeScript
  - Convenciones de código consistentes
  - Detección de problemas comunes

- **TypeScript**: Verificación de tipos estáticos
  - Modo estricto activado
  - Garantía de interfaces consistentes
  - Prevención de errores de tipo en runtime

#### 3. Build

- **Vite**: Compilación optimizada
  - Transformación de TypeScript a JavaScript
  - Bundling y tree-shaking
  - Optimización de assets
  - Generación de build para producción

- **Análisis de Bundle**
  - Tamaño de bundle y optimizaciones
  - Identificación de dependencias grandes
  - Verificación de código duplicado

#### 4. Testing

- **Pruebas Unitarias y de Integración**
  - Ejecución con Vitest
  - Verificación de funcionalidad aislada
  - Análisis de cobertura de código

- **Pruebas End-to-End**
  - Ejecución con Cypress
  - Validación de flujos completos de usuario
  - Screenshots automáticos en fallos

- **Pruebas de Accesibilidad**
  - Análisis con axe-core
  - Verificación de estándares WCAG
  - Reportes de problemas de accesibilidad

- **Pruebas de Rendimiento**
  - Lighthouse CI para métricas web vitals
  - Verificación de umbrales de rendimiento
  - Detección de regresiones de performance

#### 5. Despliegue

- **Despliegue a Entornos**
  - Preview automática para cada PR
  - Promoción a staging tras aprobación
  - Despliegue a producción con aprobación manual

- **Verificación Post-Despliegue**
  - Smoke tests en entorno desplegado
  - Monitoreo de errores iniciales
  - Alertas automáticas en caso de problemas

## Configuración GitHub Actions

### Workflow Principal

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
        
      - name: Check for formatting issues
        run: npm run format:check
  
  build:
    name: Build
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist
          retention-days: 1
  
  test:
    name: Test
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit and integration tests
        run: npm run test:coverage
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist
      
      - name: Start preview server
        run: npm run preview &
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Run Lighthouse CI
        run: npx lhci autorun
  
  deploy-preview:
    name: Deploy Preview
    if: github.event_name == 'pull_request'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist
      
      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
  
  deploy-production:
    name: Deploy Production
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist
      
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
```

### Workflow para Base de Datos

```yaml
# .github/workflows/database-migrations.yml
name: Database Migrations

on:
  push:
    branches: [main]
    paths:
      - 'supabase/migrations/**'
  workflow_dispatch:

jobs:
  migrate:
    name: Apply Migrations
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest
      
      - name: Run Migrations
        run: supabase db push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
          SUPABASE_PROJECT_ID: ${{ secrets.SUPABASE_PROJECT_ID }}
```

### Workflow para Pruebas Programadas

```yaml
# .github/workflows/scheduled-tests.yml
name: Scheduled Tests

on:
  schedule:
    - cron: '0 0 * * *'  # Ejecutar a medianoche todos los días
  workflow_dispatch:

jobs:
  e2e-tests:
    name: Run E2E Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run E2E tests against production
        run: npm run test:e2e:prod
        env:
          CYPRESS_BASE_URL: https://nexo-learning.com
      
      - name: Upload test artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-results
          path: |
            cypress/screenshots
            cypress/videos
      
      - name: Notify on failure
        if: failure()
        uses: rtCamp/action-slack-notify@v2
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          SLACK_COLOR: danger
          SLACK_USERNAME: E2E Test Bot
          SLACK_TITLE: ❌ Scheduled E2E Tests Failed
          SLACK_MESSAGE: 'Production E2E tests failed. Check the logs for details.'
```

## Entornos de Despliegue

### Entorno de Desarrollo

- **Propósito**: Desarrollo local y testeo inicial
- **URL**: N/A (Local)
- **Configuración**:
  - Variables de entorno de desarrollo
  - Datos de prueba y mocks
  - Hot Module Replacement (HMR)
  - Supabase local (opcional)

### Entorno de Preview

- **Propósito**: Revisar cambios en PRs
- **URL**: `https://pr-[PR_NUMBER].nexo-learning.vercel.app`
- **Configuración**:
  - Generado automáticamente para cada PR
  - Base de datos de staging
  - Datos de prueba controlados
  - Expiración automática

### Entorno de Staging

- **Propósito**: Pruebas integradas antes de producción
- **URL**: `https://staging.nexo-learning.com`
- **Configuración**:
  - Refleja configuración de producción
  - Datos de prueba persistentes
  - Integración con servicios de prueba
  - Acceso restringido

### Entorno de Producción

- **Propósito**: Servicio para usuarios finales
- **URL**: `https://nexo-learning.com`
- **Configuración**:
  - Optimización máxima
  - Base de datos de producción
  - Monitoreo completo
  - Políticas de seguridad estrictas

## Gestión de Secretos y Configuración

### Variables de Entorno

- **GitHub Secrets**: Almacenamiento seguro para CI/CD
  - Claves de API
  - Tokens de despliegue
  - Credenciales de servicios

- **Vercel Environment Variables**:
  - Configuración por entorno
  - Encriptación automática
  - Interfaz de gestión en dashboard

- **Supabase ENV**:
  - Variables seguras para Edge Functions
  - Acceso controlado por roles

### Convenciones de Nomenclatura

- Formato: `SERVICIO_PROPÓSITO_DETALLE`
- Ejemplos:
  - `SUPABASE_URL`
  - `STRIPE_SECRET_KEY_TEST`
  - `SMTP_PASSWORD_PROD`

### Rotación de Secretos

- Políticas de rotación periódica
- Proceso de actualización sin downtime
- Auditoría de acceso y uso

## Estrategia de Branching

### Modelo de Branches

```
main            ●──────●─────────●───────●
                │      │         │       │
develop         ●──●───●─────●───●───●───●
                │  │   │     │   │   │   │
feature/xyz     │  │   ●─────●   │   │   │
                │  │             │   │   │
feature/abc     │  ●─────────────●   │   │
                │                    │   │
hotfix/bug      │                    ●───●
```

### Types de Branches

- **main**: Código en producción
  - Protegida, requiere PR y aprobaciones
  - Solo merges desde develop o hotfixes
  - Tags para releases

- **develop**: Rama de integración
  - Código estable pero prerelease
  - Base para nuevas features
  - CI completo antes de merge a main

- **feature/**: Desarrollo de funcionalidades
  - Nombradas como `feature/nombre-descriptivo`
  - Creadas desde y mergeadas a develop
  - Scope limitado y enfocado

- **bugfix/**: Correcciones normales
  - Nombradas como `bugfix/descripcion-breve`
  - Correcciones para la próxima release

- **hotfix/**: Correcciones urgentes
  - Nombradas como `hotfix/descripcion-breve`
  - Creadas desde main
  - Mergeadas a main y develop
  - Desplegadas inmediatamente

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/) para mensajes de commit estructurados:

```
<tipo>(<ámbito>): <descripción>

[cuerpo opcional]

[footer opcional]
```

Ejemplos:
- `feat(courses): add enrollment progress tracking`
- `fix(auth): resolve token refresh loop on expired JWT`
- `docs(readme): update deployment instructions`
- `chore(deps): update dependencies to latest versions`

## Automatización de Releases

### Versionado Semántico

Seguimos SemVer (X.Y.Z):
- **X**: Major (cambios incompatibles)
- **Y**: Minor (nuevas funcionalidades compatibles)
- **Z**: Patch (correcciones de bugs)

### Generación Automática de Changelog

```yaml
# .github/workflows/release.yml
name: Create Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Generate changelog
        id: changelog
        uses: metcalfc/changelog-generator@v4.2.0
        with:
          myToken: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            ## Changes in this Release
            ${{ steps.changelog.outputs.changelog }}
          draft: false
          prerelease: false
```

### Proceso de Release

1. **Preparación**:
   - Merge de features planeadas a develop
   - Verificación de CI/CD completo
   - Pruebas finales en staging

2. **Creación de Release Branch**:
   - Rama desde develop: `release/vX.Y.Z`
   - Ajustes finales y correcciones

3. **Finalización**:
   - Merge a main con tag de versión
   - Merge a develop para sincronización
   - Despliegue automático a producción

## Monitoreo y Observabilidad

### Integración con Sentry

```typescript
// src/main.tsx - Configuración de Sentry
import * as Sentry from '@sentry/react';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.VITE_ENVIRONMENT,
    release: import.meta.env.VITE_APP_VERSION,
  });
}
```

### Monitoreo de Despliegues

- **Status de Rollouts**:
  - Versión desplegada
  - Tiempo desde despliegue
  - Métricas post-despliegue

- **Integración con Slack**:
  - Notificaciones de inicio/fin de despliegue
  - Alertas en caso de fallos
  - Dashboard de status

### Logs y Métricas

- **Logs Centralizados**:
  - Nivel aplicación (frontend/edge functions)
  - Nivel infraestructura (Vercel/Supabase)
  - Retención y búsqueda

- **Dashboards Operacionales**:
  - Latencia y disponibilidad
  - Tasas de error
  - Utilización de recursos

## Recuperación y Rollbacks

### Estrategia de Rollback

1. **Detección de Problemas**:
   - Monitoreo automático post-despliegue
   - Alertas basadas en umbrales
   - Reportes de usuarios

2. **Decisión de Rollback**:
   - Criterios definidos (tasa de error, impacto)
   - Proceso de escalamiento
   - Autorización necesaria

3. **Proceso de Rollback**:
   - Redesplegue de versión anterior
   - Verificación de estado posterior
   - Comunicación a stakeholders

### Manejo de Base de Datos

- **Migraciones Reversibles**:
  - Funciones up/down para cada migración
  - Scripts de rollback automatizados
  - Testing de procedimientos de rollback

- **Respaldos Automáticos**:
  - Backups previos a migraciones
  - Point-in-time recovery (PITR)
  - Procedimientos de restauración documentados

## Procesos de Desarrollo

### Flujo de Pull Requests

1. **Crear Branch**:
   - Desde develop o issue específica
   - Naming convention estricta

2. **Desarrollo y Commits**:
   - Commits convencionales
   - Pruebas locales

3. **Abrir PR**:
   - Descripción completa
   - Vinculación a issues
   - Solicitud de reviewers

4. **Revisión de Código**:
   - Al menos 1 aprobación requerida
   - CI/CD exitoso
   - Resolución de comentarios

5. **Merge**:
   - Squash o Rebase según complejidad
   - Eliminación de branch source

### Reglas de Protección de Branches

- **main**:
  - Requiere PR aprobado
  - CI/CD exitoso
  - Requiere 2 aprobaciones
  - No permite force push

- **develop**:
  - Requiere PR aprobado
  - CI/CD exitoso
  - Requiere 1 aprobación
  - No permite force push

### Templates

- **PR Template**:
  ```markdown
  ## Descripción
  [Descripción concisa de los cambios]

  ## Tipo de Cambio
  - [ ] Nueva funcionalidad (non-breaking)
  - [ ] Corrección de bug (non-breaking)
  - [ ] Cambio disruptivo (breaking change)
  - [ ] Mejora de documentación
  - [ ] Refactorización de código

  ## ¿Cómo ha sido probado?
  [Descripción de pruebas realizadas]

  ## Capturas de pantalla (si aplica)
  [Capturas de pantalla]

  ## Checklist
  - [ ] Mi código sigue los estándares del proyecto
  - [ ] He realizado una auto-revisión de mi código
  - [ ] He añadido tests que prueban mis cambios
  - [ ] La documentación ha sido actualizada
  ```

- **Issue Template**:
  ```markdown
  ## Descripción
  [Descripción clara y concisa]

  ## Comportamiento Esperado
  [Descripción del comportamiento esperado]

  ## Comportamiento Actual
  [Descripción del comportamiento actual]

  ## Pasos para Reproducir
  1. [Primer paso]
  2. [Segundo paso]
  3. [Y así sucesivamente...]

  ## Contexto Adicional
  [Cualquier otra información relevante]
  ```

## Integración con Supabase

### Despliegue de Edge Functions

```yaml
# .github/workflows/edge-functions.yml
name: Deploy Edge Functions

on:
  push:
    branches: [main]
    paths:
      - 'supabase/functions/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest
      
      - name: Deploy Edge Functions
        run: |
          supabase functions deploy --project-ref $PROJECT_REF
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          PROJECT_REF: ${{ secrets.SUPABASE_PROJECT_ID }}
```

### Migración de Base de Datos

- **Pull Request para Esquema**:
  - Archivos SQL en carpeta `supabase/migrations`
  - Revisión específica por DBA
  - Aplicación automática al mergear a main

- **Gestión de Tipos**:
  - Generación automática de types para Typescript
  - Sincronización post-migración
  - Verificación en PR build

## Optimización del Pipeline

### Estrategias de Cache

- **Dependencias**:
  - Cache de `node_modules`
  - Cache de build de Vite
  - Invalidación basada en hash de lockfile

- **Test Results**:
  - Cache de resultados de test
  - Re-ejecución solo en archivos modificados

### Paralelización

- **Ejecución Paralela**:
  - Tests por características
  - Separación de frontend/backend
  - Matriz de entornos/navegadores

- **Reducción de Tiempos**:
  - Monitoreo de métricas de CI/CD
  - Optimización continua
  - Inversión en recursos de computación

## Métricas y KPIs

### Métricas de CI/CD

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Tiempo medio de build | < 5 min | 4m 32s |
| Tasa de éxito de CI | > 95% | 97.3% |
| Tiempo de despliegue | < 10 min | 8m 15s |
| Frecuencia de despliegue | > 2/semana | 3.5/semana |
| MTTR (Mean Time To Recovery) | < 1 hora | 45 min |

### Mejora Continua

- **Revisiones Periódicas**:
  - Análisis mensual de métricas
  - Identificación de cuellos de botella
  - Propuestas de optimización

- **Experimentos**:
  - Pruebas A/B de configuraciones
  - Evaluación de nuevas herramientas
  - Implementación gradual de mejoras

## Documentación y Onboarding

### Documentación para Desarrolladores

- **Guía de CI/CD**:
  - Configuración local
  - Flujo de trabajo esperado
  - Resolución de problemas comunes

- **Runbooks**:
  - Procedimientos para situaciones específicas
  - Pasos para rollbacks manuales
  - Contactos y escalamiento

### Proceso de Onboarding

1. **Acceso a Herramientas**:
   - GitHub con permisos adecuados
   - Vercel con rol de desarrollador
   - Supabase con permisos limitados

2. **Primera Contribución**:
   - PR guiado de complejidad baja
   - Mentor asignado
   - Feedback detallado

3. **Documentación**:
   - Wiki técnica
   - Guías de arquitectura
   - FAQ y troubleshooting

## Prácticas DevSecOps

### Seguridad en el Pipeline

- **Análisis Estático**:
  - ESLint con reglas de seguridad
  - Escáner de vulnerabilidades en código

- **Verificación de Dependencias**:
  - npm audit / Snyk
  - Políticas de versionado
  - Alertas automáticas

- **Seguridad en Infraestructura**:
  - Escaneo de configuración
  - Verificación de permisos
  - Manejo seguro de secretos

### Cumplimiento y Auditoría

- **Logs de Auditoría**:
  - Registro de despliegues
  - Cambios en configuración
  - Acceso a recursos críticos

- **Informes de Cumplimiento**:
  - Generación automática
  - Evidencia para auditorías
  - Retención según políticas
