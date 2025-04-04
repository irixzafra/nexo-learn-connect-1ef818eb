
# Gestión de Usuarios (Admin)

Este módulo proporciona herramientas administrativas para gestionar usuarios en la plataforma Nexo Learning, permitiendo a los administradores visualizar, editar, y asignar roles a los usuarios del sistema.

## Listado y Filtro

### Panel Principal
- Vista tabular de usuarios con paginación
- Información básica visible: nombre, email, rol, fecha de registro
- Estadísticas agregadas: total usuarios, distribución por roles
- Exportación de datos a CSV/Excel

### Capacidades de Filtrado
- Búsqueda por nombre, email o ID
- Filtro por rol (estudiante, instructor, admin)
- Filtro por estado (activo, inactivo, pendiente)
- Filtro por fecha de registro
- Filtros combinados con operadores lógicos

### Implementación Técnica
- Componente `UserManagementTabs` para navegación entre vistas
- Sistema de filtros reactivos con `useUserStatistics` para métricas
- Optimización de consultas con limitación de columnas seleccionadas
- Caché inteligente para reducir consultas repetitivas

## Creación/Edición

### Formulario de Usuario
- Campos para información personal (nombre, email, teléfono)
- Selector de rol con descripciones
- Opciones de estado de cuenta
- Validación en tiempo real de entradas

### Seguridad
- Validación de formato de email
- Verificación de unicidad de email
- Control de acceso basado en rol de administrador
- Registro de auditoría para cambios sensibles

### Gestión de Contraseñas
- Generación automática de contraseñas seguras
- Envío por email de credenciales iniciales
- Funcionalidad de reseteo de contraseña
- Políticas de seguridad configurables

## Asignación de Roles

### Sistema de Roles
- Estudiante: acceso básico a la plataforma
- Instructor: capacidades para crear y gestionar cursos
- Administrador: acceso completo al sistema
- Roles personalizados (extensible)

### Interfaz de Asignación
- `UserRoleEditor` para modificar roles individuales
- `UserRoleSwitcher` para cambiar entre roles (modo de prueba)
- Verificación de permisos antes de cambios
- Feedback visual de cambios aplicados

### Propagación de Cambios
- Actualización inmediata de permisos tras cambio de rol
- Invalidación de sesiones activas si es necesario
- Notificación al usuario afectado
- Actualización de políticas RLS relevantes

## Componentes Principales

### Componentes de UI
- `UserAdminStats`: Dashboard con estadísticas de usuarios
- `UserManagementTabs`: Navegación entre vistas administrativas
- `UserRoleType`: Visualización y edición de roles
- `UserRoleEditor`: Interfaz para modificar roles
- `UserRoleSearch`: Búsqueda avanzada de usuarios

### Visualizaciones
- `UserActivityChart`: Gráfico de actividad temporal
- `UserRoleDistribution`: Gráfico de distribución de roles

## Hooks y Utilidades

### Hooks Personalizados
- `useUserStatistics`: Acceso a estadísticas de usuarios
- `useRoleManagement`: Lógica para gestión de roles
- `useUserSearch`: Búsqueda avanzada de usuarios

### Funciones Auxiliares
- `validateUserData`: Validación de datos de usuario
- `formatUserDetails`: Formateo consistente de información
- `exportUserData`: Exportación de datos en varios formatos

## Políticas de Seguridad

### Control de Acceso
- Verificación de rol administrativo para todas las operaciones
- Registro detallado de acciones administrativas
- Limitación de operaciones basadas en jerarquía de roles
- Bloqueo temporal tras intentos fallidos

### Auditoría
- Registro de creación de usuarios
- Registro de modificaciones de información sensible
- Registro de cambios de rol
- Registro de acciones administrativas

## Integraciones

### Supabase Auth
- Sincronización con sistema de autenticación
- Gestión de sesiones y tokens
- Integración con políticas RLS

### Sistema de Notificaciones
- Alertas de seguridad para acciones sensibles
- Notificaciones a usuarios sobre cambios en su cuenta
- Informes periódicos de actividad administrativa
