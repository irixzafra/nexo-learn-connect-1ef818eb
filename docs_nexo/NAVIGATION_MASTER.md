
# Documentación Maestra de Navegación

## Introducción

Este documento sirve como la **Única Fuente de Verdad** para toda la estructura de navegación de Nexo Learning. Aquí se documenta detalladamente cada elemento de navegación, su visibilidad por rol, y su propósito dentro de la aplicación.

La navegación se divide en dos grandes categorías:
1. **Navegación para Usuarios Autenticados:** Implementada principalmente a través del Sidebar.
2. **Navegación Pública:** Visible para usuarios no autenticados a través del Header público.

Este documento debe ser consultado y actualizado cuando se realicen cambios en la estructura de navegación de la aplicación. Cualquier cambio en componentes de navegación debe reflejarse primero en este documento antes de implementarse en el código.

---

## Navegación para Usuarios Autenticados (Sidebar)

La navegación autenticada se presenta a través de un Sidebar lateral que adapta su contenido según el rol del usuario. Se implementa principalmente a través del componente `SidebarMainNavigation.tsx`.

### Elementos Comunes (Todos los Roles)

| Categoría/Grupo | Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|-----------------|------------------|-------|-------------|-------------------|
| Raíz | Inicio | Home | [Dinámico por rol] | Acceso a la página de inicio personalizada según el rol del usuario |
| Dashboard | Panel Principal | LayoutDashboard | /app/dashboard | Vista general del dashboard del usuario |
| Aprendizaje | Mis Cursos | BookOpen | /app/courses | Acceso a los cursos en los que está inscrito el usuario |
| Aprendizaje | Descubrir Cursos | Compass | /app/discover | Explora nuevos cursos disponibles |
| Aprendizaje | Rutas de Aprendizaje | Map | /app/learning-paths | Ver rutas de aprendizaje disponibles |
| Aprendizaje | Calendario | Calendar | /app/calendar | Calendario de eventos y actividades |
| Aprendizaje | Recursos | FolderOpen | /app/resources | Acceso a recursos educativos |
| Aprendizaje | Certificados | Award | /app/certificates | Ver certificados obtenidos |
| Comunidad | Mensajes | MessageSquare | /app/messages | Sistema de mensajería interna |
| Comunidad | Notificaciones | Bell | /app/notifications | Centro de notificaciones |
| Comunidad | Foro | Newspaper | /app/forum | Acceso al foro de la comunidad |
| Recursos | Documentación | BookMarked | /app/docs | Documentación oficial de la plataforma |
| Recursos | Ayuda | HelpCircle | /app/help | Centro de ayuda y soporte |
| Recursos | Verificar Certificados | Award | /certificates/verification-portal | Portal para verificar certificados |
| Raíz | Configuración | Settings | /app/settings | Configuración general de la cuenta |

### Rol: Administrador (admin)

Además de los elementos comunes, los administradores tienen acceso a:

| Categoría/Grupo | Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|-----------------|------------------|-------|-------------|-------------------|
| Dashboard | Analíticas | BarChart3 | /app/admin/analytics | Estadísticas y métricas globales de la plataforma |
| Enseñanza | Panel Instructor | LayoutDashboard | /app/instructor/dashboard | Acceso a funcionalidades de instructor |
| Enseñanza | Mis Cursos | BookOpen | /app/instructor/courses | Gestión de cursos creados |
| Enseñanza | Estudiantes | Users | /app/instructor/students | Gestión de estudiantes |
| Enseñanza | Contenido | Video | /app/instructor/content | Gestión de contenido multimedia |
| Administración | Panel Admin | Shield | /app/admin/dashboard | Panel principal de administración |
| Administración | Usuarios | Users | /app/admin/users | Gestión de usuarios de la plataforma |
| Administración | Gestión Cursos | BookOpen | /app/admin/courses | Administración global de cursos |
| Administración | Revisión Elementos | ClipboardEdit | /app/admin/review-elements | Revisión de elementos pendientes |
| Administración | Sistema de Diseño | PanelLeft | /app/admin/design-system | Documentación del sistema de diseño |
| Administración | Diagrama de Navegación | FileText | /app/admin/navigation-diagram | Visualización de la estructura de navegación |
| Administración | Pagos | CreditCard | /app/admin/payments | Gestión de pagos y facturación |

### Rol: Sistemas (sistemas)

Además de todos los elementos de Administrador, incluye:

| Categoría/Grupo | Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|-----------------|------------------|-------|-------------|-------------------|
| Administración | Configuración Sistema | Code | /app/admin/system | Configuración técnica del sistema |

### Rol: Instructor (instructor)

Además de los elementos comunes, los instructores tienen acceso a:

| Categoría/Grupo | Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|-----------------|------------------|-------|-------------|-------------------|
| Enseñanza | Panel Instructor | LayoutDashboard | /app/instructor/dashboard | Panel principal para instructores |
| Enseñanza | Mis Cursos | BookOpen | /app/instructor/courses | Gestión de cursos creados |
| Enseñanza | Estudiantes | Users | /app/instructor/students | Gestión de estudiantes |
| Enseñanza | Contenido | Video | /app/instructor/content | Gestión de contenido multimedia |

### Rol: Moderador (moderator)

Además de los elementos comunes, los moderadores tienen acceso a:

| Categoría/Grupo | Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|-----------------|------------------|-------|-------------|-------------------|
| Comunidad | Revisión de Contenido | ClipboardEdit | /app/moderator/content-review | Moderación de contenido generado por usuarios |

### Rol: Estudiante (student)

Los estudiantes tienen acceso a los elementos comunes listados anteriormente.

---

## Navegación Pública (Header)

La navegación pública se implementa principalmente a través del componente `PublicNavigation.tsx` y `LandingNav.tsx`.

### Elementos de Navegación Pública

| Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|------------------|-------|-------------|-------------------|
| Inicio | Home | / | Página de inicio pública |
| Cursos | BookOpen | /courses | Catálogo de cursos disponibles |
| Rutas de Aprendizaje | Map | /learning-paths | Rutas formativas disponibles |
| Sobre Nosotros | Users | /about-us | Información institucional |
| Verificar Certificados | Award | /certificates/verification-portal | Portal de verificación de certificados |
| Becas | Sparkles | /scholarships | Información sobre becas y ayudas |
| Ayuda | HelpCircle | /help | Centro de ayuda público |
| Contacto | FileText | /contact | Formulario de contacto |

### Elementos de Autenticación (No logueados)

| Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|------------------|-------|-------------|-------------------|
| Iniciar Sesión | LogIn | /auth/login | Acceso al formulario de login |
| Registrarse | UserPlus | /auth/register | Acceso al formulario de registro |

### Elementos en LandingNav (Header Landing)

| Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|------------------|-------|-------------|-------------------|
| Inicio | - | / | Página de inicio pública |
| Cursos | - | /courses | Catálogo de cursos disponibles |
| Becas y Ayudas | - | /scholarships | Información sobre becas y ayudas |
| Nosotros | - | /about-us | Información institucional |
| Iniciar sesión | - | /auth/login | Acceso al formulario de login |
| Registrarse | - | /auth/register | Acceso al formulario de registro |

### Menú de Usuario (Logueados en vista pública)

| Elemento (Title) | Icono | Ruta (href) | Función/Propósito |
|------------------|-------|-------------|-------------------|
| Perfil | User | /profile | Acceso al perfil de usuario |
| Panel de control | LayoutDashboard | /home | Acceso al dashboard |
| Mis cursos (solo instructor) | BookOpen | /instructor/courses | Gestión de cursos (solo para instructores) |
| Cerrar sesión | LogOut | - | Cierra la sesión actual |

---

## Mapeo de Rutas Principales

Referencia de las rutas claves definidas en `routeMap` (`src/utils/routeUtils.ts`):

### Rutas Públicas
- `home: '/'` - Página principal
- `landing: '/landing'` - Landing page alternativa
- `login: '/auth/login'` - Inicio de sesión
- `register: '/auth/register'` - Registro de usuarios
- `resetPassword: '/auth/reset-password'` - Restablecimiento de contraseña
- `terms: '/terms'` - Términos y condiciones
- `privacy: '/privacy'` - Política de privacidad
- `contact: '/contact'` - Contacto
- `aboutUs: '/about-us'` - Sobre nosotros
- `courses: '/courses'` - Listado de cursos

### Rutas Autenticadas
- `app: '/app'` - Base para aplicación autenticada
- `dashboard: '/app/dashboard'` - Panel principal
- `myCourses: '/app/my-courses'` - Mis cursos
- `dashboardStats: '/app/dashboard/stats'` - Estadísticas
- `dashboardActivity: '/app/dashboard/activity'` - Actividad reciente
- `dashboardHistory: '/app/dashboard/history'` - Historial

### Rutas de Administración
- `admin: '/app/admin'` - Base para administración
- `adminDashboard: '/app/admin/dashboard'` - Panel de administración
- `adminUsers: '/app/admin/users'` - Gestión de usuarios
- `adminCourses: '/app/admin/courses'` - Gestión de cursos
- `adminSystemPages: '/app/admin/system-pages'` - Páginas del sistema
- `adminDesignSystem: '/app/admin/design-system'` - Sistema de diseño

### Rutas de Instructor
- `profesor: '/app/profesor'` - Base para instructores
- `profesorDashboard: '/app/profesor/dashboard'` - Panel de instructores
- `profesorCourses: '/app/profesor/courses'` - Cursos del instructor
- `profesorStudents: '/app/profesor/students'` - Estudiantes del instructor

### Certificados
- `certificates: '/app/certificates'` - Certificados del usuario
- `certificateDetail: (id) => '/app/certificate/${id}'` - Detalle de certificado
- `certificateVerificationPortal: '/app/certificates/verify'` - Portal de verificación

---

## Notas de Implementación

1. **Consistencia de Iconos:** Todos los iconos provienen de la biblioteca `lucide-react`.
2. **Rutas Dinámicas:** Algunas rutas como la página de inicio se generan dinámicamente según el rol del usuario.
3. **Mantenimiento:** Este documento debe actualizarse cada vez que se modifique la estructura de navegación.
4. **Visibilidad por Rol:** La visibilidad de los elementos se controla principalmente a través de validaciones de rol en los componentes.

---

## Referencias a Componentes Principales

- `src/components/layout/sidebar/navigation/SidebarMainNavigation.tsx` - Navegación principal del sidebar
- `src/components/navigation/PublicNavigation.tsx` - Navegación pública
- `src/components/LandingNav.tsx` - Navegación de la landing page
- `src/utils/routeUtils.ts` - Definiciones centralizadas de rutas
