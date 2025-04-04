
# Estructura Completa del Proyecto Nexo Learning

Este documento proporciona un mapeo exhaustivo de la estructura de carpetas y archivos del proyecto Nexo Learning, describiendo qué contiene cada archivo y cómo se relaciona con otros componentes del sistema.

## Índice

1. [Visión General](#visión-general)
2. [Estructura de Directorios Raíz](#estructura-de-directorios-raíz)
3. [Directorio `/src`](#directorio-src)
   - [Componentes](#componentes)
   - [Configuración](#configuración)
   - [Contextos](#contextos)
   - [Features](#features)
   - [Hooks](#hooks)
   - [Layouts](#layouts)
   - [Lib](#lib)
   - [Pages](#pages)
   - [Routes](#routes)
   - [Types](#types)
4. [Directorio `/public`](#directorio-public)
5. [Directorio `/docs`](#directorio-docs)
6. [Principales Flujos de Datos](#principales-flujos-de-datos)
7. [Relaciones entre Componentes Clave](#relaciones-entre-componentes-clave)

## Visión General

Nexo Learning sigue una arquitectura modular basada en características (feature-based), con separación clara entre componentes de UI, lógica de negocio y gestión de estado. El proyecto utiliza React con TypeScript, Tailwind CSS para estilos, y Supabase como backend.

## Estructura de Directorios Raíz

```
/
├── docs/                 # Documentación del proyecto
├── public/               # Archivos estáticos
├── src/                  # Código fuente de la aplicación
├── components.json       # Configuración de componentes
├── eslint.config.js      # Configuración de ESLint
├── index.html            # Punto de entrada HTML
├── package.json          # Dependencias y scripts
├── postcss.config.js     # Configuración de PostCSS
└── README.md             # Información general del proyecto
```

## Directorio `/src`

### Componentes

El directorio `/src/components` contiene todos los componentes reutilizables de React organizados por funcionalidad.

#### `/src/components/ui`

Base de componentes de UI utilizando shadcn/ui.

| Archivo/Carpeta | Descripción | Relaciones |
|-----------------|-------------|------------|
| `accordion.tsx` | Componente de acordeón | Utilizado en múltiples vistas para contenido colapsable |
| `alert-dialog.tsx` | Diálogos de alerta | Utilizado para confirmaciones importantes |
| `button.tsx` | Componente base de botón | Utilizado en toda la aplicación |
| `sidebar/` | Componentes para barra lateral | Utilizados en AppLayout |
| `logo/` | Componentes de logo | Utilizados en header, sidebar y landing |

#### `/src/components/admin`

Componentes específicos para el panel de administración.

| Archivo/Carpeta | Descripción | Relaciones |
|-----------------|-------------|------------|
| `AdminNavigation.tsx` | Navegación del panel admin | Utilizado en AdminPageLayout |
| `AdminTabs.tsx` | Sistema de pestañas admin | Utilizado en páginas de administración |
| `FloatingEditModeToggle.tsx` | Botón para modo edición | Controlado por EditModeContext |
| `UserRoleEditor.tsx` | Editor de roles de usuario | Utilizado en gestión de usuarios |
| `courses/` | Componentes de gestión de cursos | Utilizados en /admin/courses |
| `pages/` | Componentes de gestión de páginas | Utilizados en /admin/pages |
| `test-data/` | Herramientas para datos de prueba | Utilizados en /admin/test-data |

#### `/src/components/layout`

Componentes estructurales para la interfaz de usuario.

| Archivo/Carpeta | Descripción | Relaciones |
|-----------------|-------------|------------|
| `AppHeader.tsx` | Encabezado principal | Parte de AppLayout |
| `AppSidebar.tsx` | Barra lateral de la aplicación | Parte de AppLayout |
| `HeaderContent.tsx` | Contenido del encabezado | Utilizado en AppHeader |
| `MobileSidebar.tsx` | Sidebar móvil adaptado | Utilizado en vistas móviles |
| `sidebar/` | Componentes de la barra lateral | Estructura completa del sidebar |
| `header/` | Componentes del encabezado | Estructura del header |
| `page/` | Componentes base de página | Utilizados para estructura de páginas |
| `admin/` | Layouts específicos de admin | Utilizado en rutas /admin/* |

### Configuración

El directorio `/src/config` contiene archivos de configuración centralizada.

| Archivo/Carpeta | Descripción | Relaciones |
|-----------------|-------------|------------|
| `menuConfig.ts` | Configuración centralizada de menús | Utilizado por componentes de navegación |
| `routeConfig.ts` | Configuración de rutas | Utilizado por AppRouter |
| `featureFlags.ts` | Flags de características | Controla funcionalidades disponibles |
| `constants.ts` | Constantes globales | Utilizado en toda la aplicación |

### Contextos

El directorio `/src/contexts` contiene los contextos de React para la gestión de estado global.

| Archivo | Descripción | Relaciones |
|---------|-------------|------------|
| `AuthContext.tsx` | Gestión de autenticación | Utilizado en toda la app para control de acceso |
| `EditModeContext.tsx` | Control de modo edición | Utilizado para edición in-situ |
| `OnboardingContext.tsx` | Estado del proceso de onboarding | Gestiona el tour de usuario |
| `ThemeContext.tsx` | Gestión del tema visual | Controla tema claro/oscuro |
| `test-data/` | Contextos para datos de prueba | Utilizados en herramientas admin |

### Features

El directorio `/src/features` contiene módulos funcionales organizados por dominio.

| Carpeta | Descripción | Relaciones |
|---------|-------------|------------|
| `admin/` | Funcionalidades de administración | Implementa panel administrativo |
| `auth/` | Autenticación y autorización | Gestiona login/registro/permisos |
| `courses/` | Sistema de cursos | Gestión completa de cursos |
| `users/` | Gestión de usuarios | CRUD de usuarios y perfiles |
| `pages/` | Sistema de páginas dinámicas | Gestión de contenido de páginas |

#### `/src/features/admin`

| Subcarpeta | Descripción | Relaciones |
|------------|-------------|------------|
| `components/` | Componentes específicos admin | Utilizados en páginas admin |
| `hooks/` | Hooks para lógica admin | Utilizados por componentes admin |
| `services/` | Servicios para operaciones admin | Utilizados para operaciones CRUD |

### Hooks

El directorio `/src/hooks` contiene hooks personalizados para lógica reutilizable.

| Archivo | Descripción | Relaciones |
|---------|-------------|------------|
| `useAuth.ts` | Hook para funciones de autenticación | Simplifica uso de AuthContext |
| `useNotifications.ts` | Hook para sistema de notificaciones | Gestiona notificaciones |
| `useSidebar.ts` | Hook para control de sidebar | Controla estado de barra lateral |
| `useOnboarding.ts` | Hook para proceso de onboarding | Utilizado en componentes de onboarding |
| `use-mobile.ts` | Hook para detectar dispositivo móvil | Utilizado en componentes responsivos |

### Layouts

El directorio `/src/layouts` contiene componentes de plantilla para páginas.

| Archivo | Descripción | Relaciones |
|---------|-------------|------------|
| `AppLayout.tsx` | Layout principal de la aplicación | Utilizado en la mayoría de rutas |
| `AdminPageLayout.tsx` | Layout para sección admin | Utilizado en rutas /admin/* |
| `PublicLayout.tsx` | Layout para páginas públicas | Utilizado en landing, login, etc. |

### Lib

El directorio `/src/lib` contiene utilidades y configuraciones.

| Archivo | Descripción | Relaciones |
|---------|-------------|------------|
| `supabase.ts` | Cliente de Supabase | Utilizado para conexión con backend |
| `utils.ts` | Funciones utilitarias | Utilizadas en toda la aplicación |

### Pages

El directorio `/src/pages` contiene componentes de página completa.

| Carpeta/Archivo | Descripción | Relaciones |
|-----------------|-------------|------------|
| `admin/` | Páginas del panel de administración | Utilizan AdminPageLayout |
| `auth/` | Páginas de autenticación | Login, registro, recuperación |
| `student/` | Páginas específicas para estudiantes | Visualización de cursos, etc. |
| `instructor/` | Páginas específicas para instructores | Creación de cursos, etc. |
| `LandingPage.tsx` | Página de inicio | Página principal para visitantes |
| `NotFound.tsx` | Página 404 | Mostrada para rutas inexistentes |
| `Profile.tsx` | Página de perfil | Muestra/edita perfil de usuario |

### Routes

El directorio `/src/routes` contiene la configuración de rutas.

| Archivo | Descripción | Relaciones |
|---------|-------------|------------|
| `AppRouter.tsx` | Router principal | Punto de entrada para todas las rutas |
| `AdminRoutes.tsx` | Rutas de administración | Define rutas /admin/* |
| `UserRoutes.tsx` | Rutas de usuario | Define rutas para estudiantes |
| `InstructorRoutes.tsx` | Rutas de instructor | Define rutas para instructores |
| `PublicRoutes.tsx` | Rutas públicas | Define rutas accesibles sin login |

### Types

El directorio `/src/types` contiene definiciones de tipos TypeScript.

| Archivo | Descripción | Relaciones |
|---------|-------------|------------|
| `auth.ts` | Tipos relacionados con autenticación | Utilizados en componentes de auth |
| `courses.ts` | Tipos para sistema de cursos | Utilizados en componentes de cursos |
| `user.ts` | Definiciones para usuarios | Utilizados para perfiles y roles |
| `navigation.ts` | Tipos para navegación | Utilizados en configuración de menús |

## Directorio `/public`

| Archivo/Carpeta | Descripción | Relaciones |
|-----------------|-------------|------------|
| `favicon.ico` | Icono de la aplicación | Mostrado en pestañas del navegador |
| `robots.txt` | Control para motores de búsqueda | Configuración SEO |
| `serviceWorker.js` | Script para funcionalidad offline | Soporte para PWA |
| `lovable-uploads/` | Imágenes y recursos subidos | Utilizados en contenido |

## Directorio `/docs`

| Archivo/Carpeta | Descripción | Relaciones |
|-----------------|-------------|------------|
| `01_getting_started.md` | Guía de inicio | Introducción al proyecto |
| `02_architecture.md` | Arquitectura técnica | Visión general técnica |
| `03_features/` | Documentación de características | Detalla cada módulo funcional |
| `estructura-completa-del-proyecto.md` | Estructura del proyecto | Este documento |
| `sistema-caracteristicas-modular.md` | Sistema modular | Detalla arquitectura modular |
| `modules/` | Documentación por módulos | Organizada por funcionalidades |
| `ESTRUCTURA_NAVEGACION_ACTUALIZADA.md` | Estructura de navegación | Documentación de rutas y menús |

## Principales Flujos de Datos

### Flujo de Autenticación

1. El usuario ingresa credenciales en `Login.tsx`
2. `AuthContext.tsx` procesa la solicitud y la envía a Supabase
3. Si es exitosa, se almacena el token JWT y se actualiza el estado de autenticación
4. El componente `ProtectedRoute` verifica el estado para permitir acceso
5. Si el rol es adecuado, se renderiza la ruta protegida, sino se redirige a `/unauthorized`

### Flujo de Navegación

1. `AppRouter.tsx` define todas las rutas disponibles
2. Según la ruta, se carga el layout correspondiente (`AppLayout` o `AdminPageLayout`)
3. `menuConfig.ts` proporciona la configuración centralizada de menús según el rol
4. Los componentes de navegación como `SidebarMainNavigation` y `AdministracionNavigation` consumen la configuración
5. La interfaz se adapta automáticamente a móvil o desktop según el dispositivo

### Flujo de Edición de Contenido

1. Usuario activa el modo edición con `FloatingEditModeToggle`
2. `EditModeContext` actualiza el estado global de edición
3. Componentes que implementan `InlineEdit` entran en modo editable
4. Cambios son enviados al backend mediante servicios apropiados
5. UI se actualiza para reflejar cambios

## Relaciones entre Componentes Clave

### Jerarquía de Layouts

```
AppRouter
├── PublicLayout          # Para usuarios no autenticados
│   ├── Header            # Barra de navegación pública
│   └── LandingFooter     # Pie de página para sección pública
│
├── AppLayout             # Layout principal para usuarios autenticados
│   ├── AppHeader         # Encabezado con navegación y acciones
│   │   ├── HeaderLogo     
│   │   ├── HeaderActions  
│   │   └── UserMenu      
│   │
│   ├── SidebarProvider   # Gestión de la barra lateral
│   │   ├── AppSidebar
│   │   └── RefactoredSidebarNavigation
│   │
│   └── MobileSidebar     # Navegación específica para móviles
│
└── AdminPageLayout       # Layout específico para administración
    ├── AppLayout         # Hereda del layout principal
    └── AdminNavigation   # Navegación específica de administración
```

### Estructura de Navegación Centralizada

```
menuConfig.ts            # Configuración centralizada
├── mainNavigation       # Menú principal para todos los roles
├── adminNavigation      # Menú administrativo para roles específicos
└── gamificationNavigation # Menú de gamificación
    
SidebarMainNavigation    # Componente consumidor
├── getNavigationByRole  # Filtrado de menús según rol
│   └── filterMenuItemsByRole # Función de filtrado
│
└── Secciones Renderizadas
    ├── Navegación Principal
    ├── Administración (si aplica)
    └── Gamificación (si aplica)
```

### Sistema de Navegación Móvil-Desktop

```
AppLayout
├── RefactoredSidebarNavigation  # Navegación desktop
│   └── menuConfig.ts            # Configuración común
│
└── MobileSidebar                # Navegación móvil adaptativa
    └── RefactoredSidebarNavigation  # Reutiliza mismo componente
        └── menuConfig.ts            # Misma configuración
```

---

Este documento proporciona una visión integral de la estructura del proyecto Nexo Learning, detallando los componentes, sus relaciones y los flujos de datos principales. Para información más detallada sobre módulos específicos, consulte la documentación correspondiente en la carpeta `/docs`.
