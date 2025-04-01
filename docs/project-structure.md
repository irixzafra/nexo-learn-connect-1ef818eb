
# Estructura del Proyecto Nexo Learning

Este documento proporciona una visión general de la estructura de carpetas, archivos importantes, y cómo se relacionan los componentes del proyecto Nexo Learning.

## Índice
1. [Visión General](#visión-general)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Componentes Principales](#componentes-principales)
4. [Flujos de Trabajo](#flujos-de-trabajo)
5. [Estado Actual y Pendientes](#estado-actual-y-pendientes)

## Visión General

Nexo Learning es una plataforma educativa en línea diseñada para facilitar el aprendizaje continuo y el desarrollo profesional. La aplicación utiliza React con TypeScript, estilizado con Tailwind CSS y componentes de shadcn/ui, y se conecta a un backend de Supabase.

### Stack Tecnológico

- **Frontend**: React con TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Gestión de Estado**: React Context, TanStack Query
- **Backend**: Supabase (autenticación, base de datos, almacenamiento)
- **Enrutamiento**: React Router
- **Animaciones**: Framer Motion

## Estructura de Carpetas

```
src/
├── components/         # Componentes de UI reutilizables
│   ├── ui/             # Componentes base de shadcn/ui
│   ├── admin/          # Componentes específicos para el panel admin
│   ├── layout/         # Componentes de estructura de página
│   ├── shared/         # Componentes compartidos entre secciones
│
├── contexts/           # Contextos de React para estado global
│   ├── AuthContext.tsx         # Gestión de autenticación
│   ├── EditModeContext.tsx     # Modo de edición universal
│
├── features/           # Funcionalidades específicas organizadas por dominio
│   ├── users/          # Gestión de usuarios
│   ├── courses/        # Gestión de cursos
│
├── hooks/              # Hooks personalizados
│
├── layouts/            # Plantillas de página
│   ├── AppLayout.tsx           # Layout principal
│   ├── AdminPageLayout.tsx     # Layout para páginas admin
│
├── lib/                # Utilidades y configuraciones
│   ├── supabase.ts     # Cliente de Supabase
│   ├── utils.ts        # Funciones utilitarias
│
├── pages/              # Componentes de página
│   ├── admin/          # Páginas del panel de administración
│   ├── auth/           # Páginas de autenticación
│
├── routes/             # Configuración de rutas
│
├── types/              # Definiciones de tipos TypeScript
│
└── docs/               # Documentación del proyecto
```

## Componentes Principales

### Sistema de Layouts

El proyecto utiliza un sistema de layouts anidados para mantener la coherencia visual y reutilizar componentes de UI comunes.

#### AppLayout (`src/layouts/AppLayout.tsx`)

**Propósito**: Layout principal que contiene elementos comunes a todas las páginas (sidebar, header, sistema de notificaciones).

**Estado**: Implementado y funcional. Recientes mejoras incluyen el posicionamiento del toggle de sidebar a la izquierda.

**Relaciones**:
- Utiliza `SidebarProvider` para gestionar el estado de la barra lateral
- Incluye `HeaderContent` para la navegación superior
- Integra `RefactoredSidebarNavigation` para el menú lateral
- Implementa `MobileSidebar` para navegación en dispositivos móviles

#### AdminPageLayout (`src/layouts/AdminPageLayout.tsx`)

**Propósito**: Layout específico para páginas de administración con sistema de pestañas.

**Estado**: Funcional pero con recientes ajustes para mejorar la visibilidad de la barra lateral en páginas admin.

**Relaciones**:
- Extiende el `AppLayout` con componentes específicos de administración
- Integra `AdminNavigation` para el menú de administración
- Utiliza sistema de pestañas para organizar secciones

### Sistema de Navegación

#### Sidebar (`src/components/ui/sidebar/`)

**Propósito**: Implementa la barra lateral principal con opciones de navegación.

**Estado**: Funcional con capacidad de colapsar/expandir y adaptación a dispositivos móviles.

**Componentes clave**:
- `SidebarProvider.tsx`: Gestiona el estado global de la barra lateral
- `SidebarTrigger.tsx`: Botón para colapsar/expandir la barra lateral
- `SidebarContent.tsx`: Contenido interno de la barra lateral

#### RefactoredSidebarNavigation (`src/components/layout/sidebar/RefactoredSidebarNavigation.tsx`)

**Propósito**: Gestiona la navegación lateral, incluyendo cambio de roles y selección de idioma.

**Estado**: Implementado y funcional. Versión mejorada del componente original.

**Sub-componentes**:
- `SidebarLogoSection.tsx`: Logo y título en la barra lateral
- `SidebarMainNavigation.tsx`: Navegación principal
- `SidebarFooterSection.tsx`: Pie de la barra lateral con opciones de usuario

### Panel de Administración

#### AdminRoutes (`src/routes/AdminRoutes.tsx`)

**Propósito**: Define todas las rutas administrativas disponibles en la aplicación.

**Estado**: Funcional, con rutas para usuarios, cursos, finanzas, etc.

**Páginas principales**:
- `UserManagement`: Gestión de usuarios
- `CourseManagement`: Gestión de cursos
- `SystemSettings`: Configuración del sistema

#### Gestión de Usuarios (`src/features/users/`)

**Propósito**: Implementa la funcionalidad de administración de usuarios.

**Estado**: Implementado parcialmente, con listado de usuarios y asignación de roles.

**Componentes clave**:
- `UserManagementTabs.tsx`: Pestañas para las diferentes vistas de gestión de usuarios
- `UsersListTab.tsx`: Listado y filtrado de usuarios
- `RolesManagementTab.tsx`: Gestión de roles y permisos

### Sistema de Edición Universal

#### EditModeContext (`src/contexts/EditModeContext.tsx`)

**Propósito**: Proporciona un contexto global para el modo de edición universal.

**Estado**: Implementado, permite editar textos y elementos directamente en la página.

**Componentes relacionados**:
- `FloatingEditModeToggle.tsx`: Botón flotante para activar/desactivar el modo de edición
- Actualmente posicionado en la parte inferior derecha de la pantalla

## Flujos de Trabajo

### Autenticación

**Componentes involucrados**:
- `AuthContext.tsx`: Gestiona el estado de autenticación
- `useAuth.tsx`: Hook para acceder a funcionalidades de autenticación
- `Login.tsx`/`Register.tsx`: Páginas de login y registro

**Estado**: Implementado y funcional, integrado con Supabase Auth.

### Navegación Adaptativa

**Descripción**: El sistema adapta la navegación según el rol del usuario (estudiante, instructor, admin).

**Componentes clave**:
- `useSidebarNavigation.tsx`: Hook para gestionar la navegación adaptativa
- `RoleSwitcher.tsx`: Permite cambiar entre roles para usuarios con permisos

**Estado**: Implementado y funcional.

### Gestión de Cursos

**Componentes involucrados**:
- `CourseManagement.tsx`: Página principal de gestión de cursos
- `AllCoursesTab.tsx`: Listado de todos los cursos

**Estado**: Parcialmente implementado.

## Estado Actual y Pendientes

### Implementado y Funcional

- Sistema de layouts anidados (AppLayout, AdminPageLayout)
- Navegación principal y barra lateral adaptativa
- Panel de administración con múltiples secciones
- Sistema de autenticación y gestión de roles
- Modo de edición universal

### En Desarrollo / Parcial

- Gestión completa de usuarios (falta implementar algunas vistas)
- Gestión de cursos (implementación parcial)
- Analíticas y reportes

### Pendiente

- Sistema completo de notificaciones en tiempo real
- Integración de pagos
- Sistema de mensajería interna
- Generación de certificados

## Resumen

El proyecto Nexo Learning sigue una arquitectura modular basada en características, con separación clara de componentes de UI, lógica de negocio y gestión de estado. La estructura actual facilita la escalabilidad y mantenimiento del código, permitiendo agregar nuevas funcionalidades de manera organizada.

La plataforma utiliza Supabase como backend, aprovechando sus capacidades de autenticación, base de datos y almacenamiento, lo que simplifica la implementación de características complejas como gestión de usuarios y contenido.
