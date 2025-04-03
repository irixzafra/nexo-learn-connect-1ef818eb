
# Módulo de Administración

## Visión General

El módulo de administración proporciona una interfaz centralizada para la gestión de todos los aspectos de la plataforma. Está diseñado exclusivamente para usuarios con rol de administrador.

## Componentes Principales

### Páginas

- **AdminDashboard**: Panel principal con resumen de métricas
- **UserManagement**: Gestión de usuarios y roles
- **CourseManagement**: Administración de cursos
- **SystemSettings**: Configuración global del sistema
- **ContentManagement**: Gestión de páginas y contenido estático
- **AnalyticsOverview**: Análisis y reportes

### Componentes UI

- **AdminTabs**: Navegación por pestañas para secciones administrativas
- **AdminNavigation**: Menú de navegación administrativa
- **AdminDataTable**: Tabla avanzada para datos administrativos
- **RoleSwitcher**: Selector de rol para cambiar la perspectiva
- **EntityDrawer**: Panel lateral para edición de entidades

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/app/admin` | AdminDashboard | Panel principal de administración |
| `/app/admin/users` | UserManagement | Gestión de usuarios |
| `/app/admin/roles` | RoleManagement | Gestión de roles y permisos |
| `/app/admin/courses` | CourseManagement | Gestión de cursos |
| `/app/admin/categories` | CategoryManagement | Gestión de categorías |
| `/app/admin/pages` | PageManagement | Gestión de páginas |
| `/app/admin/content` | ContentManagement | Gestión de contenido |
| `/app/admin/analytics` | AnalyticsOverview | Análisis y reportes |
| `/app/admin/settings` | SystemSettings | Configuración del sistema |
| `/app/admin/design-system` | DesignSystem | Documentación del sistema de diseño |

## Hooks Personalizados

- **useAdminNavigation**: Gestiona la navegación administrativa
- **useRoleManagement**: Manipulación de roles y permisos
- **useUserManagement**: CRUD de usuarios
- **useAdminData**: Recuperación y manipulación de datos administrativos

## Flujos de Trabajo Principales

### Gestión de Usuarios

1. Listado de usuarios con filtros y búsqueda
2. Visualización de detalles de usuario
3. Edición de información de usuario
4. Asignación/revocación de roles
5. Desactivación/activación de cuentas

### Gestión de Contenido

1. Creación y edición de páginas estáticas
2. Organización de categorías de contenido
3. Gestión de metadatos SEO
4. Publicación/despublicación de contenido

### Configuración del Sistema

1. Configuración de parámetros globales
2. Activación/desactivación de características
3. Personalización de correos y notificaciones
4. Monitoreo de rendimiento del sistema

## Estado Actual

- ✅ Estructura base del panel implementada
- ✅ Navegación administrativa funcional
- ✅ Gestión básica de usuarios implementada
- 🔄 Gestión de roles en desarrollo
- 🔄 Analíticas en desarrollo
- ⏱️ Configuración avanzada pendiente
- ⏱️ Personalización de emails pendiente

## API y Endpoints

El módulo interactúa principalmente con estas tablas:

- `profiles`: Información de usuarios
- `roles`: Definición de roles
- `user_roles`: Asignación de roles a usuarios
- `permissions`: Permisos individuales
- `role_permissions`: Asignación de permisos a roles
- `site_pages`: Páginas del sitio
- `feature_flags`: Características activables

## Consideraciones de Seguridad

- Este módulo solo es accesible para usuarios con rol `admin`
- Todas las acciones administrativas se registran en la tabla `audit_log`
- Existen políticas RLS específicas para proteger los datos administrativos
- Algunas acciones requieren confirmación adicional (ej. eliminación de usuario)

## Próximas Mejoras

- Sistema de auditoría mejorado
- Exportación de datos en múltiples formatos
- Personalización avanzada del panel
- Informes programados automatizados
- Visualización gráfica de métricas y KPIs
