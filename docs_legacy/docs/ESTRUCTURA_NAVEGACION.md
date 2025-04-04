
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING

Este documento define la estructura de navegación del sistema, facilitando la toma de decisiones sobre dónde ubicar nuevos elementos o modificar los existentes.

## Principios de Navegación

1. **Simplicidad**: Máximo 2 niveles de navegación para evitar la complejidad
2. **Contextualidad**: Elementos de navegación específicos al contexto actual
3. **Consistencia**: Patrones de navegación similares en toda la aplicación
4. **Unificación**: Sistema de navegación único para todos los roles de usuario

## Estructura General

La navegación se compone de un sistema unificado que muestra diferentes elementos según:
1. **El rol del usuario** (estudiante, instructor, administrador, etc.)
2. **La ruta actual** (páginas normales vs. páginas administrativas)

### Flujo de Navegación

1. El componente `ConditionalSidebar` detecta la ruta actual y el rol del usuario
2. Se cargan los elementos de navegación adecuados del directorio `src/config/navigation/`
3. Se filtran los elementos según los permisos del usuario
4. Se muestra la navegación correspondiente manteniendo una experiencia coherente

## Componentes de Navegación

### Barra Lateral (Sidebar)
- **SidebarMainNavigation**: Componente principal que contiene grupos de navegación
- **SidebarNavGroup**: Grupos colapsables de elementos de navegación
- **SidebarNavItem**: Elementos individuales de navegación (enlaces)
- **SidebarNavSeparator**: Separadores visuales entre grupos

### Barra Superior (Topbar)
- **TopbarNavigation**: Barra superior con acciones contextuales
- **BreadcrumbNavigation**: Navegación de migas de pan
- **UserMenu**: Menú desplegable de acciones del usuario
- **NotificationsMenu**: Notificaciones y alertas

## Rutas Principales por Rol

### Estudiante
- `/app/dashboard` - Dashboard principal
- `/app/courses` - Catálogo de cursos
- `/app/my-courses` - Cursos del estudiante
- `/app/learning-paths` - Rutas de aprendizaje
- `/app/community` - Espacio de comunidad

### Instructor
- `/app/instructor` - Dashboard de instructor
- `/app/instructor/courses` - Gestión de cursos
- `/app/instructor/students` - Gestión de estudiantes
- `/app/instructor/analytics` - Analíticas de cursos
- `/app/instructor/resources` - Recursos educativos

### Administrador
- `/app/admin` - Dashboard administrativo
- `/app/admin/users` - Gestión de usuarios
- `/app/admin/courses` - Administración de cursos
- `/app/admin/settings` - Configuración del sistema
- `/app/admin/analytics` - Reportes y analíticas

## Consideraciones Técnicas

- La navegación se genera dinámicamente basada en la configuración en `src/config/navigation/`
- Los permisos se validan tanto en el cliente (UI) como en el servidor (rutas protegidas)
- El componente `AuthGuard` protege las rutas que requieren autenticación
- El componente `RoleGuard` protege las rutas que requieren roles específicos

## Referencias Relacionadas

- [Arquitectura del Sistema](./architecture/overview.md)
- [Módulo de Autenticación](./features/authentication/README.md)
- [Roles y Permisos](./tech/roles-permisos.md)
