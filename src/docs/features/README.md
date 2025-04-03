
# Módulos Funcionales

Esta sección documenta los principales módulos funcionales de Nexo Learning Platform. Cada módulo representa un área de funcionalidad específica del sistema, con su propia arquitectura, componentes, modelos de datos y lógica de negocio.

## Módulos Principales

- [Autenticación y Roles](authentication/README.md): Sistema de autenticación, gestión de sesiones, roles de usuario y control de acceso basado en roles.

- [Módulo de Cursos](courses.md): Creación, edición, visualización y gestión de cursos educativos, incluyendo estructura de contenido y seguimiento de progreso.

- [Módulo de Comunidad](community/README.md): Funcionalidades sociales como feed de actividad, posts, comentarios, likes y sistema de gamificación.

- [Gestión de Usuarios (Admin)](admin/administracion.md): Herramientas administrativas para la gestión de usuarios, asignación de roles y monitoreo de actividad.

## Integración entre Módulos

Los módulos de Nexo Learning están diseñados para operar de manera independiente pero integrada. La comunicación entre módulos se realiza principalmente a través de:

1. **Base de datos compartida**: Relaciones entre tablas que conectan entidades de diferentes módulos.

2. **Contextos de React**: Proveedores de contexto que comparten estado relevante para múltiples módulos.

3. **Hooks personalizados**: Encapsulación de lógica reutilizable que puede ser compartida entre módulos.

4. **Eventos del sistema**: Sistema de notificaciones y eventos que permite la comunicación entre componentes desacoplados.

## Extensibilidad

La arquitectura modular de Nexo Learning permite la adición de nuevos módulos funcionales con un impacto mínimo en el código existente. Para añadir un nuevo módulo, se recomienda seguir la estructura de carpetas y convenciones documentadas en [Arquitectura y Convenciones](../architecture/overview.md).

## Política de Cambios

Cualquier modificación a los módulos existentes debe mantener la compatibilidad hacia atrás y seguir los principios de diseño definidos en [Getting Started](../guides/getting_started.md#principios-de-diseño).
