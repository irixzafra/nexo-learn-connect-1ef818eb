
# Nexo Learning - Documentación Técnica

> Este documento contiene la documentación técnica principal de Nexo Learning, diseñado para proporcionar una visión general del sistema y sus componentes principales.

## Estructura de Documentación

La documentación técnica completa se divide en los siguientes módulos especializados:

1. [Arquitectura y Componentes](./modules/architecture.md) - Diseño del sistema, patrones utilizados y relaciones entre componentes
2. [Sistema de Autenticación](./modules/authentication.md) - Flujos de autenticación, gestión de sesiones y control de acceso basado en roles
3. [Gestión de Contenidos](./modules/content-management.md) - Estructuración, almacenamiento y distribución de contenidos educativos
4. [Registro de Cambios](./modules/changelog.md) - Historial detallado de actualizaciones y mejoras por versión
5. [Guías de Desarrollo](./modules/development-guides.md) - Pautas y mejores prácticas para contribuir al código base

## Principios de Desarrollo

### Modularidad
El sistema implementa una arquitectura modular basada en features que facilita:
- Desarrollo paralelo por equipos independientes
- Pruebas aisladas de componentes funcionales
- Reutilización de código entre módulos
- Mantenimiento simplificado de áreas específicas
- Escalabilidad horizontal de funcionalidades

### Seguridad
La plataforma prioriza la seguridad mediante:
- Implementación rigurosa de Row Level Security (RLS) en todas las tablas críticas
- Autenticación mediante JWT con rotación periódica de tokens
- Validación de datos en cliente y servidor
- Encriptación de información sensible
- Protección contra ataques CSRF, XSS e inyección SQL
- Auditoría completa de acciones críticas

### Rendimiento
Optimización continua para garantizar tiempos de respuesta mínimos:
- Implementación de lazy loading en componentes y rutas
- Estrategias de caching para contenidos estáticos y respuestas de API
- Indexación adecuada de tablas de base de datos
- Compresión y optimización de assets
- Monitoreo constante de métricas de rendimiento
- Soporte para funcionamiento offline de componentes críticos

### Mantenibilidad
Código estructurado para facilitar su evolución:
- Documentación exhaustiva a nivel de código
- Estándares de codificación uniformes
- Pruebas automatizadas con alta cobertura
- Revisión de código obligatoria
- Refactorización continua de áreas problemáticas
- Separación clara entre lógica de negocio y presentación

## Sistemas Administrativos

### Gestión de Cursos
La plataforma ofrece un sistema integral para administrar cursos con las siguientes capacidades:

#### Panel de Administración de Cursos
- Visualización completa del catálogo de cursos con información detallada
- Filtros por estado (todos, publicados, borradores)
- Búsqueda inteligente por título e instructor
- Métricas de desempeño y analíticas

#### Operaciones Administrativas
- Creación y edición completa de información de cursos
- Gestión de metadatos (SEO, imágenes, slugs)
- Control de publicación y visibilidad
- Asignación y cambio de instructores
- Matriculación manual de estudiantes

#### Seguridad y Auditoría
- Control de acceso basado en rol de administrador
- RLS específicas para operaciones administrativas
- Registro automático de cambios y acciones
- Estadísticas en tiempo real de matriculaciones

#### Componentes Principales
- `AdminCourses`: Panel principal de gestión de cursos
- `AdminCourseDetail`: Vista detallada y edición de un curso específico
- `ManualEnrollmentDialog`: Interfaz para matricular usuarios manualmente

## Auditoría y Cumplimiento

La plataforma mantiene registros detallados de auditoría para las siguientes categorías de acciones:

### Acciones de Usuario
- Cambios en privilegios y roles de usuario
- Modificaciones en datos personales sensibles
- Acciones administrativas sobre cuentas

### Acciones de Contenido
- Creación y publicación de cursos y módulos
- Modificaciones en material educativo
- Eliminación de contenido o recursos

### Acciones Financieras
- Transacciones de pago procesadas
- Cambios en precios o condiciones de cursos
- Reembolsos o ajustes de facturación

### Acciones de Sistema
- Cambios en configuración global
- Inicios y cierres de sesión
- Intentos de acceso no autorizados

Cada registro de auditoría incluye:
- Identificador único de la acción
- Usuario responsable de la acción
- Timestamp preciso
- Dirección IP de origen
- Detalles específicos de la acción
- Estado resultante (éxito/error)

## Métricas y Monitoreo

El sistema proporciona monitoreo en tiempo real de los siguientes aspectos:

### Rendimiento de la Aplicación
- Tiempos de carga de página
- Latencia de respuestas API
- Consumo de recursos del servidor
- Errores y excepciones

### Patrones de Uso
- Rutas más visitadas
- Funcionalidades más utilizadas
- Distribución geográfica de usuarios
- Dispositivos y navegadores predominantes

### Disponibilidad de Servicios
- Estado de componentes críticos
- Tiempos de actividad/inactividad
- Degradación gradual bajo carga
- Alertas automáticas ante incidentes

### Métricas de Negocio
- Inscripciones por curso
- Tasas de finalización
- Valoraciones y feedback
- Conversión de visitantes a estudiantes

## Estructura de la Base de Datos

### Principales Entidades

#### Cursos (`courses`)
Almacena la información principal de los cursos ofrecidos:
- Metadatos básicos (título, descripción, precio)
- Estado de publicación y visibilidad
- Referencias al instructor
- Configuración SEO y marketing
- Estadísticas de matriculación
- Campos de categorización y organización

#### Políticas RLS para Cursos
- Los administradores pueden ver, crear, editar y eliminar todos los cursos
- Los instructores pueden gestionar sólo sus propios cursos
- Los usuarios pueden ver únicamente cursos publicados
- Los sistemas automatizados pueden actualizar métricas y estadísticas

#### Funciones Auxiliares
- `calculate_course_students_count`: Calcula el número de estudiantes matriculados en un curso

Para obtener información más detallada sobre cada aspecto específico, consulte la documentación técnica completa o la sección correspondiente de los módulos especializados.
