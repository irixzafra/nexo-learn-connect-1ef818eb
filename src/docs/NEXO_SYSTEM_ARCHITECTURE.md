
# NEXO LEARNING - ARQUITECTURA DEL SISTEMA

## Introducción

Este documento sirve como la referencia maestra para la arquitectura, navegación y funcionalidades de Nexo Learning. El objetivo es proporcionar una visión clara de la estructura de la aplicación, rutas, jerarquía de navegación y mapeo de funcionalidades.

## Estructura General de la Aplicación

Nexo Learning está organizado en módulos funcionales, cada uno con su propia área de responsabilidad:

### Roles de Usuario

| Rol | Descripción | Acceso |
|-----|-------------|--------|
| `guest` | Usuario no autenticado | Páginas públicas y landing |
| `student` | Estudiante registrado | Dashboard personal, cursos, comunidad |
| `instructor` | Profesor | Todo lo de estudiante + herramientas de instructor |
| `moderator` | Moderador de contenido | Todo lo de estudiante + moderación |
| `admin` | Administrador | Acceso completo al sistema |
| `sistemas` | Administrador técnico | Configuración técnica y monitoreo |
| `content_creator` | Creador de contenido | Herramientas de creación de contenido |
| `beta_tester` | Probador de nuevas funciones | Acceso a características en beta |

## Mapa de Navegación Principal

### Estructura General

La navegación en Nexo Learning se divide en dos modos principales:

1. **Navegación de Usuario**: Accesible para todos los roles, adaptada según permisos
2. **Navegación Administrativa**: Accesible solo para roles admin y sistemas

### Enrutamiento y Slugs

| Área | Ruta Base | Descripción |
|------|-----------|-------------|
| **Público** | `/` | Páginas de acceso público |
| **Autenticación** | `/auth/*` | Login, registro, recuperación |
| **Dashboard** | `/home` | Panel principal del usuario |
| **Cursos** | `/courses/*` | Catálogo y gestión de cursos |
| **Estudiante** | `/student/*` | Funcionalidades de estudiante |
| **Instructor** | `/instructor/*` | Panel y herramientas de instructor |
| **Comunidad** | `/community/*` | Foros, mensajes, grupos |
| **Admin** | `/admin/*` | Panel de administración |

## Mapa de Rutas Detallado

### 1. Navegación del Usuario

#### 1.1 Dashboard (`/home`)
- **Dashboard Principal**: `/home`
- **Mi Perfil**: `/home/profile`
- **Configuración**: `/home/settings`
- **Notificaciones**: `/notifications`

#### 1.2 Mis Cursos
- **Cursos en Progreso**: `/home/my-courses`
- **Cursos Completados**: `/home/my-courses/completed`
- **Certificados**: `/home/certificates`
- **Recomendaciones**: `/home/recommendations`

#### 1.3 Calendario y Planificación
- **Mi Calendario**: `/calendar`
- **Eventos**: `/calendar/events`
- **Recordatorios**: `/calendar/reminders`

#### 1.4 Explorar
- **Catálogo de Cursos**: `/courses`
- **Carreras**: `/careers`
- **Rutas de Aprendizaje**: `/learning-paths`
- **Empleo**: `/jobs`
- **Leaderboard**: `/leaderboard`
- **Grupos**: `/groups`

#### 1.5 Comunidad
- **Feed Principal**: `/community`
- **Mensajes**: `/messages`
- **Foros**: `/community/forums`
- **Grupos de Estudio**: `/community/study-groups`

### 2. Navegación del Instructor

#### 2.1 Dashboard de Instructor
- **Panel Principal**: `/instructor/dashboard`
- **Mis Ingresos**: `/instructor/earnings`
- **Estadísticas**: `/instructor/analytics`

#### 2.2 Gestión de Cursos
- **Mis Cursos**: `/instructor/courses`
- **Crear Curso**: `/instructor/courses/create`
- **Editar Curso**: `/instructor/courses/:id/edit`
- **Contenido del Curso**: `/instructor/courses/:id/content`

#### 2.3 Gestión de Estudiantes
- **Mis Estudiantes**: `/instructor/students`
- **Notas y Tareas**: `/instructor/assignments`
- **Calificaciones**: `/instructor/grades`
- **Mensajes a Estudiantes**: `/instructor/messages`

### 3. Navegación de Administración

#### 3.1 Dashboard de Administración
- **Panel Principal**: `/admin/dashboard`
- **Actividad del Sistema**: `/admin/activity`
- **Informes**: `/admin/reports`

#### 3.2 Gestión de Usuarios
- **Todos los Usuarios**: `/admin/users`
- **Roles y Permisos**: `/admin/roles`
- **Gestión de Instructores**: `/admin/instructors`
- **Gestión de Estudiantes**: `/admin/students`

#### 3.3 Gestión Académica
- **Todos los Cursos**: `/admin/courses`
- **Categorías**: `/admin/categories`
- **Rutas de Aprendizaje**: `/admin/learning-paths`
- **Certificados**: `/admin/certificates`
- **Actividad de Alumnos**: `/admin/student-activity`

#### 3.4 Finanzas
- **Resumen Financiero**: `/admin/billing`
- **Facturas**: `/admin/billing/invoices`
- **Suscripciones**: `/admin/billing/subscriptions`
- **Bancos**: `/admin/billing/banks`
- **Cash-flow**: `/admin/billing/cash-flow`
- **Alertas Financieras**: `/admin/billing/alerts`

#### 3.5 Configuración del Sistema
- **Configuración General**: `/admin/settings`
- **Funcionalidades**: `/admin/settings/features`
- **Diseño**: `/admin/settings/design`
- **Conexiones**: `/admin/settings/connections`
- **Datos del Sistema**: `/admin/settings/data`
- **Páginas**: `/admin/pages`

## Mapa de Funcionalidades

### 1. Funcionalidades de Usuario

| Categoría | Funcionalidad | ID de Característica | Roles con Acceso |
|-----------|---------------|----------------------|------------------|
| **Perfil** | Editar Perfil | `enableProfileEditing` | Todos |
| **Perfil** | Subir Avatar | `enableAvatarUpload` | Todos |
| **Perfil** | Preferencias | `enableUserPreferences` | Todos |
| **Cursos** | Ver Cursos | `enableCoursesView` | Todos |
| **Cursos** | Inscribirse | `enableCourseEnrollment` | student+ |
| **Cursos** | Calificar Cursos | `enableCourseRating` | student+ |
| **Cursos** | Descargar Contenido | `enableContentDownload` | student+ |
| **Comunidad** | Mensajes | `enableMessaging` | student+ |
| **Comunidad** | Foros | `enableForums` | student+ |
| **Comunidad** | Grupos | `enableGroups` | student+ |
| **Gamificación** | Puntos y Medallas | `enableGamification` | student+ |
| **Gamificación** | Leaderboard | `enableLeaderboard` | student+ |
| **Calendario** | Eventos | `enableCalendar` | student+ |
| **Notificaciones** | Sistema de Notificaciones | `enableNotifications` | Todos |
| **Notificaciones** | Notificaciones Push | `enablePushNotifications` | student+ |
| **Onboarding** | Tutorial Inicial | `enableOnboardingSystem` | Todos |

### 2. Funcionalidades de Instructor

| Categoría | Funcionalidad | ID de Característica | Roles con Acceso |
|-----------|---------------|----------------------|------------------|
| **Cursos** | Crear Cursos | `enableCourseCreation` | instructor+ |
| **Cursos** | Editor de Contenido | `enableContentEditor` | instructor+ |
| **Cursos** | Subir Material | `enableMaterialUpload` | instructor+ |
| **Cursos** | Crear Exámenes | `enableExamCreation` | instructor+ |
| **Estudiantes** | Ver Estudiantes | `enableStudentManagement` | instructor+ |
| **Estudiantes** | Calificaciones | `enableGradingSystem` | instructor+ |
| **Estudiantes** | Comunicación | `enableInstructorMessaging` | instructor+ |
| **Analíticas** | Estadísticas de Curso | `enableCourseAnalytics` | instructor+ |
| **Finanzas** | Ver Ingresos | `enableInstructorEarnings` | instructor+ |

### 3. Funcionalidades de Administración

| Categoría | Funcionalidad | ID de Característica | Roles con Acceso |
|-----------|---------------|----------------------|------------------|
| **Usuarios** | Gestión de Usuarios | `enableUserManagement` | admin, sistemas |
| **Usuarios** | Roles y Permisos | `enableRoleManagement` | admin, sistemas |
| **Contenido** | Gestión de Cursos | `enableCourseManagement` | admin, sistemas |
| **Contenido** | Categorías | `enableCategoryManagement` | admin, sistemas |
| **Contenido** | Rutas de Aprendizaje | `enableLearningPathManagement` | admin, sistemas |
| **Contenido** | Certificados | `enableCertificateManagement` | admin, sistemas |
| **Finanzas** | Facturas | `enableInvoiceManagement` | admin, sistemas |
| **Finanzas** | Suscripciones | `enableSubscriptionManagement` | admin, sistemas |
| **Finanzas** | Bancos | `enableBankManagement` | admin, sistemas |
| **Finanzas** | Reportes Financieros | `enableFinancialReporting` | admin, sistemas |
| **Sistema** | Configuración General | `enableGeneralSettings` | admin, sistemas |
| **Sistema** | Funcionalidades | `enableFeatureManagement` | sistemas |
| **Sistema** | Diseño | `enableDesignCustomization` | admin, sistemas |
| **Sistema** | SEO | `enableSEOManagement` | admin, sistemas |
| **Sistema** | Respaldos | `enableBackups` | sistemas |
| **Sistema** | Logs y Auditoría | `enableSystemLogs` | sistemas |

## Dependencias de Funcionalidades

Muchas funcionalidades tienen dependencias entre sí. Esta sección define esas relaciones:

```json
{
  "enableMessaging": ["enableNotifications"],
  "enableForums": ["enableMessaging"],
  "enableGroups": ["enableForums"],
  "enableCourseRating": ["enableCoursesView"],
  "enableContentDownload": ["enableCoursesView"],
  "enableCourseCreation": ["enableContentEditor"],
  "enableExamCreation": ["enableCourseCreation"],
  "enableStudentManagement": ["enableCourseCreation"],
  "enableGradingSystem": ["enableStudentManagement"],
  "enableInstructorMessaging": ["enableMessaging", "enableStudentManagement"],
  "enableCourseAnalytics": ["enableCourseCreation"],
  "enableInstructorEarnings": ["enableCourseCreation"],
  "enableLearningPathManagement": ["enableCourseManagement"],
  "enableCertificateManagement": ["enableCourseManagement"],
  "enableFinancialReporting": ["enableInvoiceManagement", "enableSubscriptionManagement"]
}
```

## Componentes de Interfaz

Los componentes principales que conforman la navegación y disposición de la aplicación son:

1. **AppLayout**: Componente raíz para la estructura de la aplicación
2. **AdminPageLayout**: Layout especializado para páginas de administración
3. **ConditionalSidebar**: Determina qué barra lateral mostrar según la ruta
4. **SidebarMainNavigation**: Navegación principal para usuarios
5. **AdminNavigation**: Navegación específica para administradores
6. **HeaderActions**: Acciones en la cabecera (notificaciones, perfil, etc.)

## Convenciones de Desarrollo

### 1. Organización de Archivos

- **Componentes**: `/src/components/[modulo]/[Componente].tsx`
- **Layouts**: `/src/layouts/[Layout].tsx`
- **Páginas**: `/src/pages/[rol]/[Pagina].tsx`
- **Contextos**: `/src/contexts/[Contexto].tsx`
- **Hooks**: `/src/hooks/use[Nombre].ts`
- **Utilidades**: `/src/lib/[modulo]/[utilidad].ts`
- **Configuración**: `/src/config/[categoria].ts`

### 2. Convenciones de Nombres

- **Componentes**: PascalCase
- **Funciones/Hooks**: camelCase con prefijo "use" para hooks
- **Constantes**: UPPER_SNAKE_CASE
- **Tipos/Interfaces**: PascalCase con prefijo "I" para interfaces opcionales
- **Contextos**: [Nombre]Context y [Nombre]Provider
- **Rutas/Slugs**: kebab-case

### 3. Implementación de Nuevas Funcionalidades

1. Definir ID de característica en `types/features.ts`
2. Implementar lógica en módulos correspondientes
3. Actualizar dependencias en `features/dependencies.ts`
4. Documentar en este archivo si implica nuevas rutas

---

Documento actualizado: [FECHA]

_Este documento debe ser actualizado cada vez que se realicen cambios significativos en la estructura de navegación o se añadan nuevas funcionalidades._
