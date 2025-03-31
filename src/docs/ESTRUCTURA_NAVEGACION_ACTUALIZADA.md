
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING (ACTUALIZADO)

Este documento mantiene un registro actualizado de la estructura de navegación del sistema, para facilitar decisiones sobre dónde ubicar nuevos elementos o modificar los existentes.

## Estructura General

La navegación se compone de los siguientes elementos principales:

1. **Sidebar Principal** - Menú lateral que varía según el rol del usuario
2. **Barra Superior** - Con acciones rápidas y perfil de usuario
3. **Breadcrumbs** - En páginas internas para facilitar la navegación
4. **Footer** - Con enlaces complementarios y legales

## Estado de Implementación

Para mantener claridad sobre el estado de desarrollo:
- ✅ **Implementado y funcional**
- 🔄 **En desarrollo** - Estructura creada pero funcionalidad incompleta
- 🔜 **Planificado** - No implementado aún

## Menús por Rol de Usuario

### Estudiante
- **Principal** ✅
  - Dashboard / Inicio
  - Explorar Cursos
  - Mis Cursos
  - Calendario 🔄
  - Logros y Gamificación 🔄
- **Comunidad** 🔄
  - Feed
  - Mensajes
  - Grupos
  - Foros
- **Perfil** ✅
  - Mi Perfil
  - Configuración
  - Certificados 🔄
  - Facturas 🔄

### Instructor
- **Principal** ✅
  - Dashboard del Instructor
  - Mis Cursos Creados
- **Gestión de Contenido** 🔄
  - Crear Curso
  - Editar Contenido
  - Recursos Multimedia
  - Evaluaciones
- **Estudiantes** 🔄
  - Lista de Inscritos
  - Calificaciones
  - Estadísticas
- **Finanzas** 🔄
  - Ingresos
  - Pagos
  - Informes Fiscales

### Administrador
- **Dashboard** ✅
  - Visión General
  - Métricas Clave
  - Actividad Reciente
- **Usuarios** ✅
  - Gestión de Usuarios
  - Roles y Permisos
- **Contenido** 🔄
  - Cursos
  - Categorías
  - Rutas de Aprendizaje
  - Páginas
- **Gamificación** 🔄
  - Insignias
  - Puntos
  - Niveles
  - Desafíos
- **Configuración** ✅
  - General
  - Apariencia
  - Contenido
  - Seguridad
  - Notificaciones
  - Características
  - Desarrollador
- **Datos** ✅
  - Importar/Exportar
  - Auditoría
  - Respaldos

## Estructura Detallada de Menús

### MENÚ LATERAL (Sidebar)

#### Navegación General
- **Inicio** ✅ - `/home` o `/dashboard` según rol
- **Explorar Cursos** ✅ - `/courses`
- **Mis Cursos** ✅ - `/home/my-courses` (estudiante)
- **Comunidad** 🔄 - `/community`
- **Mensajes** 🔄 - `/messages` (con contador de no leídos)
- **Administración** ✅ - `/admin/dashboard` (admin/instructor)
- **Perfil** ✅ - `/profile`
- **Contacto** 🔄 - `/contact`
- **Landing Page** ✅ - `/landing`

#### Configuración (Desplegable)
- **Configuración** ✅ - `/settings`
- **Ayuda / Soporte** 🔄 - `/help`
- **Acerca de Nosotros** 🔄 - `/about-us`

#### Administración (Estudiante) - Solo visible para estudiantes ✅
- **Mi Dashboard** - `/home`
- **Mis Cursos** - `/home/my-courses`
- **Mis Certificados** - `/home/certificates`
- **Mis Favoritos** - `/home/favorites`

#### Administración (Instructor) ✅
- **Dashboard** - `/instructor/dashboard`
- **Mis Cursos** - `/instructor/courses`
- **Estudiantes** - `/instructor/students`
- **Ingresos** - `/instructor/earnings`
- **Estadísticas** - `/instructor/stats`

#### Administración (Admin) ✅
- **Dashboard** - `/admin/dashboard`
- **Usuarios** - `/admin/users`
- **Roles y Permisos** - `/admin/roles`
- **Cursos** - `/admin/courses`
- **Rutas de Aprendizaje** - `/admin/learning-paths`
- **Páginas** - `/admin/pages`
- **Diseño** - `/admin/design`
- **Facturación** - `/admin/billing`
- **Datos de Prueba** - `/admin/test-data`
- **Auditoría** - `/admin/audit-log`
- **Analíticas** - `/admin/analytics`
- **Configuración** - `/admin/settings`

### ADMIN DASHBOARD

#### Menu Principal - (Nivel 1) ✅
- **Dashboard** - `/admin/dashboard`
- **Usuarios** - `/admin/users`
- **Cursos** - `/admin/courses`
- **Contenido** - `/admin/content`
- **Finanzas** - `/admin/finances` o `/admin/billing`
- **Configuración** - `/admin/settings`

#### Usuarios (Nivel 2) ✅
- **Listado de Usuarios** - Tab en `/admin/users`
- **Roles y Permisos** - Tab en `/admin/users`

#### Cursos (Nivel 2) ✅
- **Todos los Cursos** - Tab en `/admin/courses` 
- **Categorías** - Tab en `/admin/courses`
- **Rutas de Aprendizaje** - Tab en `/admin/courses`

#### Configuración (Nivel 2) ✅
- **General** - Tab en `/admin/settings`
- **Apariencia** - Tab en `/admin/settings`
- **Contenido** - Tab en `/admin/settings`
- **Seguridad** - Tab en `/admin/settings`
- **Notificaciones** - Tab en `/admin/settings`
- **Características** - Tab en `/admin/settings`
- **Desarrollador** - Tab en `/admin/settings`

#### Datos (Nivel 2) ✅
- **Datos de Prueba** - `/admin/test-data`
- **Auditoría** - `/admin/audit-log`
- **Analíticas** - `/admin/analytics`

## Funcionalidades por Estado de Desarrollo

### Funcionalidades Implementadas (✅)
- Navegación principal del sidebar
- Panel de administración básico
- Gestión de usuarios y roles
- Visualización de cursos
- Configuración del sistema

### Funcionalidades en Desarrollo (🔄)
- Sistema de mensajería
- Comunidad y foros
- Gamificación (insignias, puntos, clasificaciones)
- Selector de temas claro/oscuro
- Soporte multilenguaje
- Contenidos interactivos
- Modo oscuro automático
- Gestión de categorías

### Funcionalidades Planificadas (🔜)
- Integraciones de terceros
- Exportación avanzada de datos
- Sistema de tickets de soporte
- APIs públicas
- Pagos y suscripciones

---

Este documento se actualizará regularmente para reflejar cambios en la estructura de navegación.

