
# Estructura de Navegación

> Este documento proporciona una visión completa de todos los elementos de navegación en la plataforma Nexo Learning, incluyendo rutas, roles requeridos, descripciones y componentes relacionados.

## Introducción

La navegación en Nexo Learning está organizada por secciones según el rol del usuario y la funcionalidad. Este documento sirve como referencia centralizada para entender la estructura completa de navegación y cómo se relacionan las diferentes secciones del sistema.

## Mapa de Navegación por Rol

### Navegación para Estudiantes

| Etiqueta | Ruta | Descripción | Roles Permitidos | Componente |
|----------|------|-------------|------------------|------------|
| Inicio | `/home` | Panel principal del estudiante | `student` | `Dashboard` |
| Mis Cursos | `/my-courses` | Lista de cursos inscritos | `student` | `MyCourses` |
| Explorar Cursos | `/courses` | Catálogo de cursos disponibles | `student`, `guest` | `CourseExplorer` |
| Calendario | `/calendar` | Calendario de eventos y clases | `student` | `Calendar` |
| Comunidad | `/community` | Foros y discusiones | `student` | `Community` |
| Mensajes | `/messages` | Sistema de mensajería | `student` | `Messages` |
| Perfil | `/profile` | Gestión del perfil | `student` | `Profile` |
| Configuración | `/settings` | Configuración de la cuenta | `student` | `Settings` |

### Navegación para Instructores

| Etiqueta | Ruta | Descripción | Roles Permitidos | Componente |
|----------|------|-------------|------------------|------------|
| Dashboard | `/instructor/dashboard` | Panel principal del instructor | `instructor` | `InstructorDashboard` |
| Mis Cursos | `/instructor/courses` | Gestión de cursos | `instructor` | `InstructorCourses` |
| Crear Curso | `/instructor/courses/create` | Creación de nuevo curso | `instructor` | `CreateCourse` |
| Estudiantes | `/instructor/students` | Gestión de estudiantes | `instructor` | `InstructorStudents` |
| Analíticas | `/instructor/analytics` | Estadísticas de cursos | `instructor` | `InstructorAnalytics` |
| Evaluaciones | `/instructor/assessments` | Gestión de evaluaciones | `instructor` | `InstructorAssessments` |

### Navegación Administrativa

| Etiqueta | Ruta | Descripción | Roles Permitidos | Componente |
|----------|------|-------------|------------------|------------|
| Dashboard | `/admin/dashboard` | Panel administrativo | `admin` | `AdminDashboard` |
| Usuarios | `/admin/users` | Gestión de usuarios | `admin` | `AdminUsers` |
| Roles | `/admin/roles` | Gestión de roles y permisos | `admin` | `AdminRoles` |
| Cursos | `/admin/courses` | Administración de cursos | `admin` | `AdminCourses` |
| Categorías | `/admin/categories` | Gestión de categorías | `admin` | `AdminCategories` |
| Analytics | `/admin/analytics` | Analíticas de la plataforma | `admin` | `AdminAnalytics` |
| Usuarios Analytics | `/admin/analytics/users` | Analíticas de usuarios | `admin` | `UserAnalytics` |
| Certificados | `/admin/certificates` | Gestión de certificados | `admin` | `AdminCertificates` |
| Actividad | `/admin/activity` | Registro de actividad | `admin` | `AdminActivity` |
| Facturas | `/admin/invoices` | Gestión de facturas | `admin` | `AdminInvoices` |
| Suscripciones | `/admin/subscriptions` | Gestión de suscripciones | `admin` | `AdminSubscriptions` |
| Bancos | `/admin/banks` | Configuración de bancos | `admin` | `AdminBanks` |
| Flujo de Caja | `/admin/cashflow` | Gestión de flujo de caja | `admin` | `AdminCashflow` |
| Alertas | `/admin/alerts` | Administración de alertas | `admin` | `AdminAlerts` |
| Contenido | `/admin/content` | Gestión de contenido | `admin` | `ContentManagement` |
| Páginas | `/admin/pages` | Gestión de páginas | `admin` | `PageManagement` |
| Crear Página | `/admin/pages/create` | Creación de páginas | `admin` | `CreatePage` |
| Editar Página | `/admin/pages/:id` | Edición de páginas | `admin` | `EditPage` |
| Configuración | `/admin/settings` | Configuración del sistema | `admin` | `SystemSettings` |
| Características | `/admin/features` | Gestión de características | `admin` | `AdminFeatures` |
| Integraciones | `/admin/integrations` | Gestión de integraciones | `admin` | `AdminIntegrations` |
| Datos | `/admin/data` | Gestión de datos | `admin` | `AdminData` |
| Auditoría | `/admin/audit` | Registro de auditoría | `admin` | `AuditLog` |
| Acceso | `/admin/access` | Control de acceso | `admin` | `AccessControl` |
| IA | `/admin/ai` | Servicios de IA | `admin` | `AIServicesPage` |
| Diseño | `/admin/design` | Sistema de diseño | `admin` | `DesignSystem` |

### Rutas Públicas

| Etiqueta | Ruta | Descripción | Roles Permitidos | Componente |
|----------|------|-------------|------------------|------------|
| Landing | `/landing` | Página principal | `guest`, `all` | `Landing` |
| Login | `/auth/login` | Inicio de sesión | `guest` | `Login` |
| Registro | `/auth/register` | Registro de usuario | `guest` | `Register` |
| Sobre Nosotros | `/about-us` | Información sobre la plataforma | `guest`, `all` | `AboutUs` |
| Becas | `/scholarships` | Información sobre becas | `guest`, `all` | `Scholarships` |
| Contacto | `/contact` | Formulario de contacto | `guest`, `all` | `Contact` |
| No Autorizado | `/unauthorized` | Acceso denegado | `all` | `Unauthorized` |

## Estructura de Ficheros de Navegación

Los componentes de navegación están organizados en los siguientes archivos:

- `src/config/navigation/index.ts`: Exportación centralizada de todos los menús
- `src/config/navigation/types.ts`: Definición de tipos para elementos de navegación
- `src/config/navigation/adminNavigation.ts`: Configuración del menú administrativo
- `src/config/navigation/mainNavigation.ts`: Configuración del menú principal
- `src/config/navigation/instructorNavigation.ts`: Configuración del menú de instructor
- `src/config/navigation/academicNavigation.ts`: Configuración del menú académico
- `src/config/navigation/exploreNavigation.ts`: Configuración del menú de exploración
- `src/config/navigation/financeNavigation.ts`: Configuración del menú financiero
- `src/config/navigation/gamificationNavigation.ts`: Configuración del menú de gamificación
- `src/config/navigation/settingsNavigation.ts`: Configuración del menú de configuración
- `src/config/navigation/utils.ts`: Utilidades para filtrado de navegación

## Mapa Central de Rutas

El sistema utiliza un mapa centralizado de rutas definido en `src/utils/routeUtils.ts` que mantiene todas las rutas disponibles en la aplicación, organizadas por secciones.

## Componentes de Navegación

### Componentes Principales

| Componente | Ruta | Descripción |
|------------|------|-------------|
| `SidebarNavigation` | `src/components/layout/SidebarNavigation.tsx` | Navegación lateral principal |
| `AdminNavigation` | `src/components/admin/AdminNavigation.tsx` | Navegación administrativa |
| `HeaderContent` | `src/components/layout/HeaderContent.tsx` | Contenido del encabezado |
| `MainNavigationMenu` | `src/components/layout/header/MainNavigationMenu.tsx` | Menú de navegación principal |
| `MobileNavMenu` | `src/components/layout/MobileNavMenu.tsx` | Menú de navegación móvil |

### Componentes de Soporte

| Componente | Ruta | Descripción |
|------------|------|-------------|
| `SidebarNavGroup` | `src/components/layout/sidebar/navigation/SidebarNavGroup.tsx` | Grupo de navegación lateral |
| `SidebarNavItem` | `src/components/layout/sidebar/navigation/SidebarNavItem.tsx` | Elemento de navegación lateral |
| `SidebarNavSection` | `src/components/layout/sidebar/navigation/SidebarNavSection.tsx` | Sección de navegación lateral |
| `MenuItem` | `src/components/layout/sidebar/navigation/common/MenuItem.tsx` | Elemento de menú genérico |

## Hooks de Navegación

| Hook | Ruta | Descripción |
|------|------|-------------|
| `useAppNavigation` | `src/utils/routeUtils.ts` | Hook para navegación con funciones auxiliares |
| `useSidebarNavigation` | `src/components/layout/sidebar/hooks/useSidebarNavigation.tsx` | Hook para navegación lateral |
| `useSidebarState` | `src/components/layout/sidebar/useSidebarState.tsx` | Hook para estado de barra lateral |

## Buenas Prácticas

1. Siempre utilizar el `routeMap` central para definir rutas en lugar de codificarlas directamente
2. Utilizar los componentes de navegación existentes para mantener consistencia
3. Verificar permisos de usuario antes de mostrar opciones de navegación
4. Mantener la estructura de navegación organizada por roles y secciones funcionales
5. Utilizar el hook `useAppNavigation` para manejar la navegación programática

## Documentación Relacionada

- [Mapa de Rutas](MAPA_DE_RUTAS.md)
- [Estándares de Documentación](DOCUMENTACION.md)
- [Arquitectura del Sistema](arquitectura-del-sistema.md)

---

Última actualización: 2024-07-31
