
# Módulo de Usuarios

## Visión General

El módulo de usuarios gestiona los perfiles de usuario, preferencias, roles y todo lo relacionado con la información personal de los participantes de la plataforma. Es transversal a toda la aplicación y fundamental para la personalización de la experiencia.

## Componentes Principales

### Páginas

- **Profile**: Visualización y edición del perfil propio
- **UserDetail**: Vista de perfil público (para otros usuarios)
- **UserSettings**: Configuración y preferencias personales
- **AdminUserList**: Listado administrativo de usuarios
- **AdminUserDetail**: Gestión administrativa de un usuario

### Componentes UI

- **UserAvatar**: Avatar de usuario con gestión de carga
- **ProfileForm**: Formulario de edición de perfil
- **UserBadges**: Visualización de insignias y logros
- **UserStats**: Estadísticas de actividad
- **RoleBadge**: Indicador visual del rol de usuario
- **UserCard**: Tarjeta con información resumida de usuario

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/app/profile` | Profile | Perfil propio |
| `/app/profile/settings` | UserSettings | Configuración personal |
| `/app/admin/users` | AdminUserList | Gestión de usuarios (admin) |
| `/app/admin/users/:id` | AdminUserDetail | Gestión de usuario específico |
| `/app/user/:id` | UserDetail | Perfil público de usuario |

## Hooks Personalizados

- **useProfile**: Obtención y actualización de perfil propio
- **useUserDetail**: Información de otro usuario
- **useUserSettings**: Gestión de preferencias
- **useUserStats**: Estadísticas de usuario
- **useUserRoles**: Gestión de roles de usuario

## Modelo de Datos

El módulo trabaja principalmente con estas tablas:

- `profiles`: Información básica del usuario
- `user_roles`: Roles asignados al usuario
- `user_preferences`: Preferencias personalizadas
- `user_badges`: Insignias y logros obtenidos
- `user_points`: Sistema de puntos y gamificación
- `design_system_settings`: Preferencias de interfaz

## Flujos de Trabajo Principales

### Gestión de Perfil

1. Visualización de información actual
2. Edición de campos básicos (nombre, bio, avatar)
3. Actualización en base de datos
4. Actualización de caché local

### Gestión de Preferencias

1. Configuración de notificaciones
2. Ajustes de privacidad
3. Preferencias de interfaz (tema, idioma)
4. Configuración de emails

### Administración de Usuarios (Admin)

1. Listado de usuarios con filtros
2. Búsqueda por diversos criterios
3. Edición de información de usuario
4. Gestión de roles y permisos
5. Desactivación/activación de cuentas

## Estado Actual

- ✅ Perfil básico implementado
- ✅ Avatar y campos esenciales funcionales
- ✅ Listado administrativo implementado
- 🔄 Preferencias en desarrollo
- 🔄 Integración con sistema de roles en progreso
- ⏱️ Sistema de gamificación pendiente
- ⏱️ Estadísticas avanzadas pendientes

## API y Funciones

### Consultas Principales

- **getProfile**: Obtiene perfil completo del usuario actual
- **getUserDetail**: Obtiene información pública de otro usuario
- **getUserPreferences**: Recupera preferencias personalizadas
- **getUserStats**: Obtiene estadísticas de actividad

### Mutaciones

- **updateProfile**: Actualiza información de perfil
- **updateUserPreferences**: Modifica preferencias
- **updateUserAvatar**: Cambia imagen de perfil
- **updateUserRoles**: Modifica roles (admin)

## Consideraciones de Seguridad

- Políticas RLS que restringen acceso a información sensible
- Solo administradores pueden modificar roles
- Usuarios solo pueden editar su propio perfil
- Campos sensibles ocultos en vistas públicas

## Próximas Mejoras

- Perfil público mejorado con portfolio
- Sistema de valoraciones entre usuarios
- Integración avanzada con módulo de gamificación
- Estadísticas detalladas de actividad
- Personalización avanzada de interfaz
- Gestión de privacidad granular
