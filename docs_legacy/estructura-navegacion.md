
# Estructura de Navegación de Nexo Learning

> Documento centralizado de navegación que muestra todas las páginas del sistema con sus detalles.

## Componentes de Navegación

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| **Sidebar** | Lateral izquierdo | Menú principal de navegación con grupos colapsables |
| **Header** | Superior | Barra superior con logo, búsqueda y acciones rápidas |
| **Footer** | Inferior | Enlaces legales, información y copyright |
| **Breadcrumbs** | Superior, debajo del header | Ruta de navegación actual |
| **Quick Actions** | Superior derecha | Acciones rápidas (notificaciones, mensajes, etc.) |
| **Mobile Menu** | Inferior en móviles | Menú de navegación para dispositivos móviles |

## Páginas Públicas

| Página | Ruta | Funcionalidad | Roles | Categoría | Ubicación |
|--------|------|---------------|-------|-----------|----------|
| Landing | `/landing` | Página principal para visitantes | Todos | Marketing | Header |
| Login | `/auth/login` | Inicio de sesión | Guest | Autenticación | Header |
| Registro | `/auth/register` | Registro de usuario | Guest | Autenticación | Header |
| Sobre Nosotros | `/about-us` | Información institucional | Todos | Marketing | Footer |
| Becas | `/scholarships` | Información sobre becas | Todos | Marketing | Header |
| Contacto | `/contact` | Formulario de contacto | Todos | Marketing | Footer |
| Explorar Cursos | `/courses` | Catálogo de cursos disponibles | Todos | Cursos | Sidebar |
| Detalle de Curso | `/courses/:id` | Vista detallada de un curso | Todos | Cursos | - |
| Términos y Condiciones | `/terms` | Términos legales | Todos | Legal | Footer |
| Política de Privacidad | `/privacy` | Políticas de privacidad | Todos | Legal | Footer |

## Páginas de Estudiante

| Página | Ruta | Funcionalidad | Roles | Categoría | Ubicación |
|--------|------|---------------|-------|-----------|----------|
| Dashboard | `/home` | Panel principal del estudiante | Student | Dashboard | Sidebar |
| Mis Cursos | `/my-courses` | Lista de cursos inscritos | Student | Cursos | Sidebar |
| Aprendizaje | `/courses/:id/learn` | Interfaz de aprendizaje | Student | Cursos | - |
| Lección | `/courses/:id/learn/:lessonId` | Vista de lección específica | Student | Cursos | - |
| Notas | `/courses/:id/notes` | Notas del estudiante | Student | Cursos | - |
| Calendario | `/calendar` | Calendario de eventos y clases | Student | Organización | Sidebar |
| Mensajes | `/messages` | Sistema de mensajería | Student | Comunicación | Sidebar, Header |
| Perfil | `/profile` | Gestión del perfil | Student | Usuario | Sidebar, Header |
| Certificados | `/certificates` | Certificados obtenidos | Student | Logros | Sidebar |
| Comunidad | `/community` | Foros y discusiones | Student | Comunicación | Sidebar |
| Checkout | `/checkout/:id` | Proceso de compra | Student | Pagos | - |
| Facturas | `/invoices` | Historial de facturas | Student | Pagos | Sidebar |
| Preferencias | `/preferences` | Preferencias del usuario | Student | Usuario | Sidebar |
| Notificaciones | `/notifications` | Centro de notificaciones | Student | Comunicación | Header, Sidebar |

## Páginas de Instructor

| Página | Ruta | Funcionalidad | Roles | Categoría | Ubicación |
|--------|------|---------------|-------|-----------|----------|
| Dashboard | `/instructor/dashboard` | Panel principal del instructor | Instructor | Dashboard | Sidebar |
| Mis Cursos | `/instructor/courses` | Gestión de cursos | Instructor | Cursos | Sidebar |
| Crear Curso | `/instructor/courses/create` | Creación de nuevo curso | Instructor | Cursos | - |
| Editar Curso | `/instructor/courses/:id/edit` | Edición de detalles del curso | Instructor | Cursos | - |
| Editor de Curso | `/instructor/courses/:id/editor` | Editor de contenido del curso | Instructor | Cursos | - |
| Estructura del Curso | `/instructor/courses/:id/structure` | Organización del curso | Instructor | Cursos | - |
| Editor de Lección | `/instructor/courses/:id/lessons/:lessonId/edit` | Editor de lecciones | Instructor | Cursos | - |
| Estudiantes | `/instructor/students` | Gestión de estudiantes | Instructor | Usuarios | Sidebar |
| Analíticas | `/instructor/analytics` | Estadísticas de cursos | Instructor | Reportes | Sidebar |
| Mensajes | `/instructor/messages` | Mensajería con estudiantes | Instructor | Comunicación | Sidebar, Header |
| Notas y Tareas | `/instructor/assignments` | Gestión de tareas | Instructor | Cursos | Sidebar |

## Páginas de Administración

| Página | Ruta | Funcionalidad | Roles | Categoría | Ubicación |
|--------|------|---------------|-------|-----------|----------|
| Dashboard | `/admin/dashboard` | Panel administrativo | Admin, Sistemas | Dashboard | Sidebar |
| Usuarios | `/admin/users` | Gestión de usuarios | Admin, Sistemas | Usuarios | Sidebar |
| Roles | `/admin/roles` | Gestión de roles y permisos | Admin, Sistemas | Seguridad | Sidebar |
| Cursos | `/admin/courses` | Administración de cursos | Admin, Sistemas | Cursos | Sidebar |
| Categorías | `/admin/categories` | Gestión de categorías | Admin, Sistemas | Contenido | Sidebar |
| Rutas de Aprendizaje | `/admin/learning-paths` | Gestión de rutas | Admin, Sistemas | Contenido | Sidebar |
| Certificados | `/admin/certificates` | Gestión de certificados | Admin, Sistemas | Contenido | Sidebar |
| Actividad | `/admin/activity` | Registro de actividad | Admin, Sistemas | Monitoreo | Sidebar |
| Facturación | `/admin/billing` | Sistema de facturación | Admin, Sistemas | Finanzas | Sidebar |
| Facturas | `/admin/invoices` | Gestión de facturas | Admin, Sistemas | Finanzas | Sidebar |
| Suscripciones | `/admin/subscriptions` | Gestión de suscripciones | Admin, Sistemas | Finanzas | Sidebar |
| Bancos | `/admin/banks` | Configuración de bancos | Admin, Sistemas | Finanzas | Sidebar |
| Flujo de Caja | `/admin/cashflow` | Gestión de flujo de caja | Admin, Sistemas | Finanzas | Sidebar |
| Alertas | `/admin/alerts` | Administración de alertas | Admin, Sistemas | Monitoreo | Sidebar |
| Analíticas | `/admin/analytics` | Analíticas del sistema | Admin, Sistemas | Reportes | Sidebar |
| Analíticas de Usuarios | `/admin/analytics/users` | Analíticas de usuarios | Admin, Sistemas | Reportes | Sidebar |
| Contenido | `/admin/content` | Gestión de contenido | Admin, Sistemas | Contenido | Sidebar |
| Páginas | `/admin/pages` | Gestión de páginas | Admin, Sistemas | Contenido | Sidebar |
| Crear Página | `/admin/pages/create` | Creación de páginas | Admin, Sistemas | Contenido | - |
| Editar Página | `/admin/pages/:id` | Edición de páginas | Admin, Sistemas | Contenido | - |
| Configuración | `/admin/settings` | Configuración del sistema | Admin, Sistemas | Sistema | Sidebar |
| Funcionalidades | `/admin/features` | Gestión de características | Admin, Sistemas | Sistema | Sidebar |
| Integraciones | `/admin/integrations` | Gestión de integraciones | Admin, Sistemas | Sistema | Sidebar |
| Datos | `/admin/data` | Gestión de datos | Admin, Sistemas | Sistema | Sidebar |
| Datos de Prueba | `/admin/test-data` | Herramientas para desarrollo | Admin, Sistemas | Desarrollo | Sidebar |
| Auditoría | `/admin/audit` | Registro de auditoría | Admin, Sistemas | Seguridad | Sidebar |
| Acceso | `/admin/access` | Control de acceso | Admin, Sistemas | Seguridad | Sidebar |
| IA | `/admin/ai` | Servicios de IA | Admin, Sistemas | Innovación | Sidebar |
| Diseño | `/admin/design` | Sistema de diseño | Admin, Sistemas | Diseño | Sidebar |
| Navegación | `/admin/navigation` | Explorador de navegación | Admin, Sistemas | Sistema | Sidebar |
| Diagrama de Navegación | `/admin/navigation-diagram` | Diagrama visual de navegación | Admin, Sistemas | Sistema | Sidebar |

## Estados de Implementación

**Leyenda:**
- ✅ Implementado
- 🚧 En desarrollo
- ❌ Pendiente
- ⚠️ Con problemas

| Categoría | Estado | Observaciones |
|-----------|--------|---------------|
| Autenticación | ✅ | Funcional con Supabase Auth |
| Cursos | 🚧 | Faltan algunas funcionalidades avanzadas |
| Pagos | 🚧 | Integración con Stripe en progreso |
| Gamificación | ❌ | Pendiente de implementación |
| Comunidad | 🚧 | Foros básicos implementados |
| Analíticas | 🚧 | Paneles básicos funcionando |
| Sistema de IA | ❌ | Planificado para próxima fase |
| Notificaciones | 🚧 | Sistema básico implementado |
| Móvil | 🚧 | Adaptación responsiva en progreso |
| Navegación | ✅ | Sistema completo con diagrama y documentación |

## Próximas Mejoras (Roadmap)

### Fase 1: Finalizar Implementación Base ✅
- Sistema completo de autenticación y roles
- Navegación adaptada por rol
- Cursos y lecciones básicas
- Estructura administrativa

### Fase 2: Mejorar UX/UI 🚧
- Diseño responsivo avanzado
- Tema oscuro/claro
- Animaciones y transiciones
- Accesibilidad (WCAG 2.1)

### Fase 3: Funcionalidades Avanzadas ❌
- Sistema de gamificación
- Comunidad y foros mejorados
- IA para recomendaciones
- Analíticas avanzadas

### Fase 4: Móvil y Expansión ❌
- Aplicación móvil progresiva
- Soporte offline
- Internacionalización
- Marketplace de cursos

### Fase 5: Integración Empresarial ❌
- SSO corporativo
- Gestión avanzada de equipos
- API pública
- Sistemas de reportes empresariales

## Notas de Implementación

- Todas las rutas utilizan React Router v6
- La navegación está configurada de forma dinámica según el rol del usuario
- Las rutas administrativas requieren verificación de permisos adicional
- El sistema de navegación lateral se adapta automáticamente al rol activo
- Las rutas públicas están optimizadas para SEO

