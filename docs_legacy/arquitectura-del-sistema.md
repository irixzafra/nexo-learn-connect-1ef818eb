
# ARQUITECTURA DEL SISTEMA NEXO LEARNING

## Introducción

Este documento sirve como la referencia maestra para la arquitectura, navegación y funcionalidades de Nexo Learning. Proporciona una visión clara de la estructura de la aplicación, rutas, componentes y mapeo de funcionalidades.

## Roles de Usuario

La plataforma implementa un sistema de roles que determina el acceso y las capacidades de cada usuario:

| Rol | Descripción | Acceso Principal |
|-----|-------------|------------------|
| `admin` | Administrador del sistema | Acceso completo a todas las funcionalidades |
| `instructor` | Profesor o formador | Creación y gestión de cursos, estudiantes |
| `student` | Estudiante registrado | Cursos, comunidad, perfil personal |
| `sistemas` | Administrador técnico | Configuración técnica y monitoreo |
| `moderator` | Moderador de contenido | Moderación de foros y contenido |
| `content_creator` | Creador de contenido | Herramientas de creación |
| `guest` | Usuario no autenticado | Contenido público y registro |
| `beta_tester` | Probador de nuevas funciones | Acceso a características en beta |
| `anonimo` | Usuario sin identificación | Contenido público mínimo |

> **Nota importante**: Todos los roles están definidos en el tipo `UserRoleType` en `src/types/auth.ts` y deben mantenerse sincronizados con esta documentación.

## Principios de Navegación

La navegación del sistema se basa en cuatro principios fundamentales:

1. **Simplicidad**: Máximo 2 niveles de navegación para evitar la complejidad
2. **Contextualidad**: Elementos de navegación específicos al contexto del usuario
3. **Consistencia**: Patrones de navegación similares en toda la aplicación
4. **Adaptabilidad**: Sistema de navegación único que se adapta a cada rol

## Estructura de Navegación

### Componentes Clave de Navegación

- **ConditionalSidebar**: Determina qué navegación mostrar basado en la ruta y el rol
- **SidebarMainNavigation**: Navegación principal para usuarios regulares
- **AdminNavigation**: Navegación especializada para secciones administrativas
- **SidebarFooterSection**: Controles comunes en la parte inferior (tema, idioma, etc.)

### Flujo de Navegación Dinámico

1. El componente `ConditionalSidebar` detecta la ruta actual y el rol del usuario
2. Se cargan los elementos de navegación adecuados del directorio `src/config/navigation/`
3. Se filtran los elementos según los permisos del usuario actual
4. Se muestra la navegación correspondiente manteniendo una experiencia coherente

## Mapa de Rutas Principal

La aplicación utiliza un sistema de rutas organizado por contextos funcionales:

### Rutas Públicas
- **Página principal**: `/`
- **Autenticación**: `/auth/*` (login, registro, recuperación)
- **Políticas**: `/policies/*` (privacidad, términos, cookies)

### Dashboard y Perfil
- **Dashboard**: `/home`
- **Perfil**: `/profile`
- **Preferencias**: `/preferences`
- **Notificaciones**: `/notifications`

### Cursos y Aprendizaje
- **Mis Cursos**: `/my-courses`
- **Explorar Cursos**: `/courses`
- **Curso Específico**: `/courses/:id`
- **Lección**: `/courses/:id/lessons/:lessonId`
- **Certificados**: `/certificates`

### Comunidad
- **Foros**: `/forums`
- **Mensajes**: `/messages`
- **Grupos**: `/groups`
- **Leaderboard**: `/leaderboard`

### Instructor
- **Dashboard**: `/instructor/dashboard`
- **Mis Cursos**: `/instructor/courses`
- **Estudiantes**: `/instructor/students`
- **Analíticas**: `/instructor/analytics`

### Administración
- **Dashboard Admin**: `/admin/dashboard`
- **Usuarios**: `/admin/users`
- **Roles**: `/admin/roles`
- **Cursos**: `/admin/courses`
- **Configuración**: `/admin/settings`
- **Características**: `/admin/features`

## Estructura de Navegación por Rol

### Navegación para Estudiantes
- **Principal**
  - Dashboard
  - Mis Cursos
  - Notificaciones
  - Preferencias
- **Cursos**
  - En Progreso
  - Completados
  - Certificados
- **Comunidad**
  - Foros
  - Mensajes
  - Grupos

### Navegación para Instructores
- Todo lo de estudiantes, más:
- **Instructor**
  - Dashboard de Instructor
  - Mis Cursos (creación)
  - Mis Estudiantes
  - Calificaciones
  - Analíticas

### Navegación para Administradores
- Todo lo anterior, más:
- **Administración**
  - Dashboard Admin
  - Gestión de Usuarios
  - Roles y Permisos
  - Gestión de Cursos
  - Configuración
  - Características
- **Finanzas**
  - Facturación
  - Suscripciones
  - Reportes

## Componentes de Interfaz

Los componentes principales del sistema de navegación están definidos en:

```
/src
  /components
    /layout
      /header        # Componentes de la cabecera
      /sidebar       # Navegación lateral
        /navigation  # Estructura de navegación por contexto
    /ui
      /sidebar       # Componentes UI de barra lateral
  /config
    /navigation      # Configuración de menús por rol
```

## Mapa de Funcionalidades

### Funcionalidades Principales

| Característica | ID | Roles de Acceso | Dependencias |
|----------------|----|--------------------|--------------|
| Autenticación | `enableUserAuth` | Todos | - |
| Registro de usuarios | `enableUserRegistration` | Todos | `enableUserAuth` |
| Navegación adaptable | `enableAdaptiveNavigation` | Todos | - |
| Tema oscuro | `enableDarkMode` | Todos | - |
| Notificaciones | `enableNotifications` | Autenticados | - |
| Editor de cursos | `enableCourseEditor` | instructor+ | - |
| Foros | `enableForums` | student+ | - |
| Mensajería | `enableMessaging` | student+ | - |
| Analíticas | `enableAnalytics` | instructor+ | - |
| Gamificación | `enableGameElements` | student+ | - |
| Gestión de usuarios | `enableUserManagement` | admin, sistemas | - |
| Gestión de roles | `enableRoleManagement` | admin, sistemas | - |

### Dependencias entre Funcionalidades

Las funcionalidades tienen dependencias jerárquicas que deben respetarse:

```
enableUserRegistration → enableUserAuth
enableCourseCreation → enableCourseEditor
enableStudentManagement → enableCourseCreation
enableForums → enableMessaging
```

## Adaptación Móvil

En dispositivos móviles la interfaz se adapta automáticamente:

- Barra lateral que se colapsa en un menú deslizable
- Cabecera simplificada con acciones prioritarias
- Navegación inferior para acciones principales
- Contenido optimizado para pantallas pequeñas

## Arquitectura de Archivos y Componentes

### Estructura de Directorios Principal

```
/src
  /components      # Componentes reutilizables
  /contexts        # Contextos de React 
  /features        # Características agrupadas por dominio
  /hooks           # Hooks personalizados
  /layouts         # Layouts de página
  /lib             # Utilidades y configuración
  /pages           # Componentes de página
  /types           # Definiciones de TypeScript
  /utils           # Funciones de utilidad
```

### Estructura de Navegación

La navegación se gestiona principalmente a través de los siguientes archivos:

```
/src/config/navigation/index.ts            # Punto de entrada
/src/config/navigation/types.ts            # Tipos de navegación
/src/config/navigation/mainNavigation.ts   # Navegación principal
/src/config/navigation/adminNavigation.ts  # Navegación de admin
/src/config/navigation/utils.ts            # Utilidades de navegación
```

## Convenciones de Desarrollo

### Convenciones de Nomenclatura

- **Componentes**: PascalCase (ej. `UserProfile`)
- **Hooks**: camelCase con prefijo "use" (ej. `useNavigation`)
- **Contextos**: PascalCase con sufijo "Context" (ej. `AuthContext`)
- **Archivos de configuración**: camelCase (ej. `navigationConfig.ts`)
- **Rutas/URLs**: kebab-case (ej. `/user-settings`)

### Mejores Prácticas

1. Usar los componentes de navegación existentes
2. Respetar las dependencias entre funcionalidades
3. Mantener la estructura de navegación de máximo 2 niveles
4. Documentar cambios significativos en este documento
5. Asegurarse de filtrar elementos de navegación por rol

---

Última actualización: Julio 2024

_Este documento debe ser actualizado cuando se realicen cambios significativos en la estructura de navegación o se añadan nuevas funcionalidades._
