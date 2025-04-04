
# Documentación Técnica Completa - Nexo Learning

## Índice
1. [Introducción](#introducción)
2. [Estructura de Carpetas](#estructura-de-carpetas)
   - [Carpeta `/docs`](#carpeta-docs)
   - [Carpeta `/public`](#carpeta-public)
   - [Carpeta `/src`](#carpeta-src)
3. [Sistema de Características Modular](#sistema-de-características-modular)
   - [Principios de Diseño](#principios-de-diseño)
   - [Implementación Técnica](#implementación-técnica)
   - [Ciclo de Vida de las Características](#ciclo-de-vida-de-las-características)
4. [Relaciones entre Componentes](#relaciones-entre-componentes)
5. [Flujos de Datos](#flujos-de-datos)

## Introducción

Nexo Learning es una plataforma educativa en línea diseñada para facilitar el aprendizaje continuo y el desarrollo profesional. El proyecto sigue una arquitectura modular basada en características (feature-based), lo que facilita el desarrollo, mantenimiento y escalabilidad del código. Este documento proporciona una visión detallada de la estructura del proyecto, sus componentes principales y cómo estos se relacionan entre sí.

## Estructura de Carpetas

### Carpeta `/docs`

La carpeta `/docs` contiene toda la documentación del proyecto, organizada por temáticas y módulos específicos.

| Carpeta/Archivo | Propósito | Relaciones |
|-----------------|-----------|------------|
| `/docs/index.md` | Punto de entrada principal a la documentación con enlaces a las secciones principales | Sirve como índice para todos los demás documentos |
| `/docs/01_getting_started.md` | Documentación de inicio rápido con visión general del producto y configuración | Referenciado desde `index.md` |
| `/docs/02_architecture.md` | Descripción de la arquitectura técnica y convenciones de código | Relacionado con la carpeta `/architecture` para detalles específicos |
| `/docs/03_features/` | Documentación detallada de las características funcionales del sistema | Cada documento corresponde a un módulo en `/src/features/` |
| `/docs/03_features/README.md` | Índice de las características documentadas | Organiza el acceso a la documentación de características |
| `/docs/03_features/authentication.md` | Documentación del sistema de autenticación | Relacionado con `/src/features/auth/` |
| `/docs/03_features/admin_users.md` | Documentación de la gestión de usuarios | Relacionado con `/src/features/users/` |
| `/docs/03_features/community.md` | Documentación de las funcionalidades sociales | Relacionado con `/src/features/social/` |
| `/docs/03_features/courses.md` | Documentación del sistema de cursos | Relacionado con `/src/features/courses/` |
| `/docs/04_ui_kit.md` | Información sobre los componentes de UI disponibles | Relacionado con `/src/components/ui/` |
| `/docs/05_integrations.md` | Guías para trabajar con integraciones externas | Relacionado con configuraciones en `/src/lib/` |
| `/docs/architecture/` | Documentación detallada de la arquitectura del sistema | Expande lo presentado en `02_architecture.md` |
| `/docs/ci_cd/` | Documentación sobre integración y despliegue continuo | Relacionado con configuraciones en la raíz del proyecto |
| `/docs/coding/` | Estándares y prácticas de codificación | Guía para desarrolladores que contribuyen al proyecto |
| `/docs/database/` | Documentación sobre la estructura y acceso a la base de datos | Relacionado con `/src/lib/supabase.ts` |
| `/docs/monitoring/` | Documentación sobre el sistema de monitoreo | Relacionado con `/src/lib/monitoring/` |
| `/docs/security/` | Documentación sobre las medidas de seguridad | Abarca múltiples aspectos del proyecto |
| `/docs/testing/` | Documentación sobre estrategias y procedimientos de prueba | Relacionado con archivos de prueba en todo el proyecto |
| `/docs/project-structure.md` | Visión general de la estructura del proyecto | El documento actual que estás leyendo |
| `/docs/Nexo_Documentacion_Tecnica.md` | Documentación técnica principal | Resumen de aspectos técnicos clave |
| `/docs/Nexo_Documentacion_Tecnica_Completa.md` | Documentación técnica extendida | Versión detallada de la documentación técnica |
| `/docs/Nexo_Guia_y_Workflow.md` | Guía de flujo de trabajo para el desarrollo | Establece procesos para contribuir al proyecto |
| `/docs/modules/` | Documentación específica de módulos | Organizado por funcionalidades específicas |
| `/docs/modules/changelog.md` | Registro de cambios y actualizaciones | Historial de versiones y cambios |
| `/docs/modules/core-features.md` | Documentación de características principales | Relacionado con funcionalidades en `/src/features/` |
| `/docs/modules/fixes-solutions.md` | Registro de problemas y soluciones | Útil para debugging y mantenimiento |
| `/docs/modules/pages-templates.md` | Documentación de páginas y plantillas | Relacionado con componentes en `/src/pages/` |
| `/docs/modules/ui-features.md` | Documentación de características de UI/UX | Relacionado con componentes en `/src/components/` |

### Carpeta `/public`

La carpeta `/public` contiene archivos estáticos accesibles públicamente.

| Carpeta/Archivo | Propósito | Relaciones |
|-----------------|-----------|------------|
| `/public/favicon.ico` | Icono de la aplicación mostrado en pestañas del navegador | Referenciado en `index.html` |
| `/public/placeholder.svg` | Imagen de marcador de posición utilizada en toda la aplicación | Utilizado por múltiples componentes |
| `/public/robots.txt` | Archivo de configuración para motores de búsqueda | Importante para SEO |
| `/public/serviceWorker.js` | Script para funcionalidad offline y caché | Registrado en el cliente para PWA |
| `/public/lovable-uploads/` | Carpeta para imágenes subidas a través de la interfaz de Lovable | Utilizada en componentes y documentación |

### Carpeta `/src`

La carpeta `/src` contiene todo el código fuente de la aplicación.

| Carpeta/Archivo | Propósito | Relaciones |
|-----------------|-----------|------------|
| `/src/components/` | Componentes de React reutilizables | Utilizados por páginas y otros componentes |
| `/src/components/ui/` | Componentes básicos de interfaz de usuario | Base para componentes más complejos |
| `/src/components/ui/sidebar/` | Componentes para la barra lateral | Utilizados por layouts y navegación |
| `/src/components/admin/` | Componentes específicos para administración | Utilizados en páginas de admin |
| `/src/components/layout/` | Componentes de estructura de página | Definen la arquitectura visual |
| `/src/components/layout/sidebar/` | Componentes específicos para la barra lateral | Implementan la navegación principal |
| `/src/components/layout/header/` | Componentes para el encabezado | Parte superior de la interfaz |
| `/src/components/shared/` | Componentes compartidos entre secciones | Utilizados en múltiples contextos |
| `/src/contexts/` | Contextos de React para estado global | Compartidos por múltiples componentes |
| `/src/contexts/AuthContext.tsx` | Gestión del estado de autenticación | Utilizado en toda la aplicación |
| `/src/contexts/EditModeContext.tsx` | Control del modo de edición universal | Utilizado por componentes admin |
| `/src/contexts/OnboardingContext.tsx` | Gestión del proceso de onboarding | Utilizado por componentes de onboarding |
| `/src/features/` | Funcionalidades específicas organizadas por dominio | Implementación de características principales |
| `/src/features/admin/` | Funcionalidades del panel de administración | Implementa gestión administrativa |
| `/src/features/users/` | Gestión de usuarios | Implementa operaciones CRUD de usuarios |
| `/src/features/courses/` | Gestión de cursos | Implementa operaciones de cursos |
| `/src/hooks/` | Hooks personalizados de React | Lógica reutilizable |
| `/src/layouts/` | Plantillas de página | Estructuras de página reutilizables |
| `/src/layouts/AppLayout.tsx` | Layout principal de la aplicación | Utilizado por la mayoría de las páginas |
| `/src/layouts/AdminPageLayout.tsx` | Layout para páginas administrativas | Extiende AppLayout con componentes admin |
| `/src/lib/` | Utilidades y configuraciones | Código auxiliar para toda la aplicación |
| `/src/lib/supabase.ts` | Cliente de Supabase | Conexión con el backend |
| `/src/lib/utils.ts` | Funciones utilitarias generales | Utilizadas en toda la aplicación |
| `/src/pages/` | Componentes de página completa | Puntos de entrada para rutas |
| `/src/pages/admin/` | Páginas del panel de administración | Utilizan AdminPageLayout |
| `/src/pages/auth/` | Páginas de autenticación | Login, registro, recuperación de contraseña |
| `/src/routes/` | Configuración de rutas | Define la estructura de navegación |
| `/src/types/` | Definiciones de tipos TypeScript | Utilizados en toda la aplicación |
| `/src/docs/` | Documentación técnica interna (formato Markdown) | Referencia para desarrolladores |
| `/src/App.tsx` | Componente raíz de la aplicación | Punto de entrada principal |
| `/src/App.css` | Estilos globales de la aplicación | Afecta a toda la aplicación |

## Sistema de Características Modular

Nexo Learning implementa un sistema de características modular que permite desarrollar, probar y desplegar funcionalidades de manera independiente. Este enfoque facilita el mantenimiento, la escalabilidad y la colaboración entre equipos.

### Principios de Diseño

1. **Separación por Dominio**: Cada característica funcional se agrupa en su propio dominio, con todos los componentes, hooks, contextos y utilidades relacionados.

2. **Aislamiento**: Las características deben poder desarrollarse, probarse y desplegarse con mínimas dependencias entre ellas.

3. **Extensibilidad**: El sistema está diseñado para facilitar la adición de nuevas características sin modificar el código existente.

4. **Configurabilidad**: Las características pueden habilitarse o deshabilitarse mediante configuración, sin necesidad de cambios en el código.

5. **Reutilización**: Se promueve la creación de componentes y hooks reutilizables que pueden compartirse entre características.

### Implementación Técnica

El sistema de características modulares se implementa a través de:

#### 1. Estructura de Carpetas Basada en Características

```
/src/features/
  /auth/             # Autenticación y autorización
    /components/     # Componentes específicos de autenticación
    /hooks/          # Hooks relacionados con autenticación
    /contexts/       # Contextos para estado de autenticación
    /utils/          # Utilidades específicas de autenticación
    /types/          # Tipos específicos de autenticación
    index.ts         # Exportaciones públicas del módulo
  
  /courses/          # Gestión de cursos
    /components/     # ...
    /hooks/          # ...
    ...
  
  /admin/            # Panel de administración
    /components/     # ...
    /hooks/          # ...
    ...
```

#### 2. Contexto de Características

El sistema utiliza un contexto central (`EditModeContext` y otros) para gestionar qué características están habilitadas y accesibles según:

- El rol del usuario actual
- Configuraciones de la plataforma
- Estado de desarrollo/producción

#### 3. Inyección de Dependencias

Se utiliza un patrón de inyección de dependencias para:

- Desacoplar la implementación de características
- Facilitar el intercambio de implementaciones alternativas
- Simplificar las pruebas unitarias

#### 4. Lazy Loading

Las características se cargan perezosamente (lazy loading) para:

- Mejorar el rendimiento inicial
- Cargar código solo cuando es necesario
- Reducir el tamaño del bundle principal

### Ciclo de Vida de las Características

El ciclo de vida de una característica en Nexo Learning sigue estos pasos:

1. **Ideación**: Definición de requisitos y diseño inicial.
2. **Prototipado**: Implementación básica en una rama de características.
3. **Desarrollo**: Implementación completa con pruebas.
4. **Control de Calidad**: Verificación de funcionamiento y rendimiento.
5. **Lanzamiento Controlado**: Habilitación gradual para subconjuntos de usuarios.
6. **Disponibilidad General**: Habilitación para todos los usuarios.
7. **Mantenimiento**: Actualizaciones y mejoras continuas.
8. **Deprecación**: Cuando sea necesario, con migración a nuevas características.

## Relaciones entre Componentes

### Layout y Navegación

El sistema de layout y navegación sigue una estructura jerárquica:

```
AppLayout                      # Layout principal
├── SidebarProvider            # Gestiona el estado de la barra lateral
│   ├── Sidebar                # Contenedor de la barra lateral
│   │   ├── SidebarContent     # Contenido interno de la barra lateral
│   │   │   └── RefactoredSidebarNavigation  # Navegación principal
│   │   │       ├── SidebarLogoSection       # Logo y título
│   │   │       ├── SidebarMainNavigation    # Enlaces de navegación
│   │   │       └── SidebarFooterSection     # Pie de barra lateral
│   │
│   └── MobileSidebar          # Versión móvil de la barra lateral
│
├── HeaderContent              # Contenido del encabezado
│   ├── HeaderLogo             # Logo en el encabezado
│   └── HeaderActions          # Acciones del encabezado (notificaciones, perfil)
│
└── FloatingEditModeToggle     # Botón flotante para modo de edición
```

### Sistema de Administración

El panel de administración sigue esta estructura:

```
AdminPageLayout                # Layout específico para admin
├── AppLayout                  # Hereda del layout principal
├── AdminNavigation            # Navegación específica de admin
└── AdminTabs                  # Sistema de pestañas para secciones admin
    ├── UserManagementTabs     # Pestañas de gestión de usuarios
    ├── CourseManagementTabs   # Pestañas de gestión de cursos
    └── SystemSettingsTabs     # Pestañas de configuración
```

### Contextos Globales

Los contextos principales y sus relaciones:

```
AuthContext                    # Gestión de autenticación
├── useAuth                    # Hook para acceder a funciones de autenticación
└── ProtectedRoute             # Componente para proteger rutas
    └── requiredRole           # Verificación de roles

EditModeContext                # Modo de edición universal
├── useEditMode                # Hook para acceder al modo de edición
├── FloatingEditModeToggle     # Activación/desactivación del modo
└── InlineEdit                 # Componente para edición in-situ

OnboardingContext              # Sistema de onboarding
├── useOnboarding              # Hook para gestionar el estado de onboarding
└── OnboardingModal            # Modal para pasos de onboarding
```

## Flujos de Datos

### Autenticación

1. Usuario introduce credenciales en `Login.tsx`
2. `AuthContext.tsx` gestiona la solicitud a Supabase
3. Token JWT almacenado en localStorage
4. Estado de autenticación actualizado en contexto
5. Componentes se renderan según estado de autenticación

### Edición Universal

1. Usuario activa modo edición mediante `FloatingEditModeToggle.tsx`
2. `EditModeContext.tsx` actualiza el estado global
3. Componentes susceptibles de edición (`InlineEdit.tsx`) entran en modo edición
4. Usuario realiza cambios directamente en la página
5. Cambios se envían a Supabase mediante cliente configurado

### Navegación Adaptativa

1. `SidebarProvider.tsx` inicializa estado de navegación
2. `useSidebarNavigation.tsx` determina ítems de navegación según rol
3. `RefactoredSidebarNavigation.tsx` renderiza menú adaptado
4. Usuario puede cambiar de rol mediante `RoleSwitcher.tsx`
5. Navegación se actualiza dinámicamente según rol seleccionado
