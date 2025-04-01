
# Estructura de Navegación de Nexo Learning

> Documento centralizado de navegación que muestra todas las páginas del sistema con sus detalles.

## Páginas Públicas

| Página | Ruta | Funcionalidad | Roles | Categoría |
|--------|------|---------------|-------|-----------|
| Landing | `/landing` | Página principal para visitantes | Todos | Marketing |
| Login | `/auth/login` | Inicio de sesión | Guest | Autenticación |
| Registro | `/auth/register` | Registro de usuario | Guest | Autenticación |
| Sobre Nosotros | `/about-us` | Información institucional | Todos | Marketing |
| Becas | `/scholarships` | Información sobre becas | Todos | Marketing |
| Contacto | `/contact` | Formulario de contacto | Todos | Marketing |
| Explorar Cursos | `/courses` | Catálogo de cursos disponibles | Todos | Cursos |
| Detalle de Curso | `/courses/:id` | Vista detallada de un curso | Todos | Cursos |
| Términos y Condiciones | `/terms` | Términos legales | Todos | Legal |
| Política de Privacidad | `/privacy` | Políticas de privacidad | Todos | Legal |

## Páginas de Estudiante

| Página | Ruta | Funcionalidad | Roles | Categoría |
|--------|------|---------------|-------|-----------|
| Dashboard | `/home` | Panel principal del estudiante | Student | Dashboard |
| Mis Cursos | `/my-courses` | Lista de cursos inscritos | Student | Cursos |
| Aprendizaje | `/courses/:id/learn` | Interfaz de aprendizaje | Student | Cursos |
| Lección | `/courses/:id/learn/:lessonId` | Vista de lección específica | Student | Cursos |
| Notas | `/courses/:id/notes` | Notas del estudiante | Student | Cursos |
| Calendario | `/calendar` | Calendario de eventos y clases | Student | Organización |
| Mensajes | `/messages` | Sistema de mensajería | Student | Comunicación |
| Perfil | `/profile` | Gestión del perfil | Student | Usuario |
| Certificados | `/certificates` | Certificados obtenidos | Student | Logros |
| Comunidad | `/community` | Foros y discusiones | Student | Comunicación |
| Checkout | `/checkout/:id` | Proceso de compra | Student | Pagos |
| Facturas | `/invoices` | Historial de facturas | Student | Pagos |
| Preferencias | `/preferences` | Preferencias del usuario | Student | Usuario |
| Notificaciones | `/notifications` | Centro de notificaciones | Student | Comunicación |

## Páginas de Instructor

| Página | Ruta | Funcionalidad | Roles | Categoría |
|--------|------|---------------|-------|-----------|
| Dashboard | `/instructor/dashboard` | Panel principal del instructor | Instructor | Dashboard |
| Mis Cursos | `/instructor/courses` | Gestión de cursos | Instructor | Cursos |
| Crear Curso | `/instructor/courses/create` | Creación de nuevo curso | Instructor | Cursos |
| Editar Curso | `/instructor/courses/:id/edit` | Edición de detalles del curso | Instructor | Cursos |
| Editor de Curso | `/instructor/courses/:id/editor` | Editor de contenido del curso | Instructor | Cursos |
| Estructura del Curso | `/instructor/courses/:id/structure` | Organización del curso | Instructor | Cursos |
| Editor de Lección | `/instructor/courses/:id/lessons/:lessonId/edit` | Editor de lecciones | Instructor | Cursos |
| Estudiantes | `/instructor/students` | Gestión de estudiantes | Instructor | Usuarios |
| Analíticas | `/instructor/analytics` | Estadísticas de cursos | Instructor | Reportes |
| Mensajes | `/instructor/messages` | Mensajería con estudiantes | Instructor | Comunicación |
| Notas y Tareas | `/instructor/assignments` | Gestión de tareas | Instructor | Cursos |

## Páginas de Administración

| Página | Ruta | Funcionalidad | Roles | Categoría |
|--------|------|---------------|-------|-----------|
| Dashboard | `/admin/dashboard` | Panel administrativo | Admin, Sistemas | Dashboard |
| Usuarios | `/admin/users` | Gestión de usuarios | Admin, Sistemas | Usuarios |
| Roles | `/admin/roles` | Gestión de roles y permisos | Admin, Sistemas | Seguridad |
| Cursos | `/admin/courses` | Administración de cursos | Admin, Sistemas | Cursos |
| Categorías | `/admin/categories` | Gestión de categorías | Admin, Sistemas | Contenido |
| Rutas de Aprendizaje | `/admin/learning-paths` | Gestión de rutas | Admin, Sistemas | Contenido |
| Certificados | `/admin/certificates` | Gestión de certificados | Admin, Sistemas | Contenido |
| Actividad | `/admin/activity` | Registro de actividad | Admin, Sistemas | Monitoreo |
| Facturación | `/admin/billing` | Sistema de facturación | Admin, Sistemas | Finanzas |
| Facturas | `/admin/invoices` | Gestión de facturas | Admin, Sistemas | Finanzas |
| Suscripciones | `/admin/subscriptions` | Gestión de suscripciones | Admin, Sistemas | Finanzas |
| Bancos | `/admin/banks` | Configuración de bancos | Admin, Sistemas | Finanzas |
| Flujo de Caja | `/admin/cashflow` | Gestión de flujo de caja | Admin, Sistemas | Finanzas |
| Alertas | `/admin/alerts` | Administración de alertas | Admin, Sistemas | Monitoreo |
| Analíticas | `/admin/analytics` | Analíticas del sistema | Admin, Sistemas | Reportes |
| Analíticas de Usuarios | `/admin/analytics/users` | Analíticas de usuarios | Admin, Sistemas | Reportes |
| Contenido | `/admin/content` | Gestión de contenido | Admin, Sistemas | Contenido |
| Páginas | `/admin/pages` | Gestión de páginas | Admin, Sistemas | Contenido |
| Crear Página | `/admin/pages/create` | Creación de páginas | Admin, Sistemas | Contenido |
| Editar Página | `/admin/pages/:id` | Edición de páginas | Admin, Sistemas | Contenido |
| Configuración | `/admin/settings` | Configuración del sistema | Admin, Sistemas | Sistema |
| Funcionalidades | `/admin/features` | Gestión de características | Admin, Sistemas | Sistema |
| Integraciones | `/admin/integrations` | Gestión de integraciones | Admin, Sistemas | Sistema |
| Datos | `/admin/data` | Gestión de datos | Admin, Sistemas | Sistema |
| Datos de Prueba | `/admin/test-data` | Herramientas para desarrollo | Admin, Sistemas | Desarrollo |
| Auditoría | `/admin/audit` | Registro de auditoría | Admin, Sistemas | Seguridad |
| Acceso | `/admin/access` | Control de acceso | Admin, Sistemas | Seguridad |
| IA | `/admin/ai` | Servicios de IA | Admin, Sistemas | Innovación |
| Diseño | `/admin/design` | Sistema de diseño | Admin, Sistemas | Diseño |
| Navegación | `/admin/navigation` | Explorador de navegación | Admin, Sistemas | Sistema |

## Páginas de Gamificación

| Página | Ruta | Funcionalidad | Roles | Categoría |
|--------|------|---------------|-------|-----------|
| Logros | `/gamification/achievements` | Sistema de logros | Student, Instructor | Gamificación |
| Ranking | `/gamification/ranking` | Clasificación de usuarios | Student, Instructor | Gamificación |
| Objetivos | `/gamification/goals` | Metas personales | Student | Gamificación |
| Puntos | `/gamification/points` | Sistema de puntos | Student | Gamificación |
| Recompensas | `/gamification/rewards` | Recompensas por actividad | Student | Gamificación |

## Páginas de Exploración

| Página | Ruta | Funcionalidad | Roles | Categoría |
|--------|------|---------------|-------|-----------|
| Explorar | `/courses` | Catálogo completo de cursos | Todos | Exploración |
| Carreras | `/careers` | Programas de carrera | Student, Instructor | Exploración |
| Rutas de Aprendizaje | `/learning-paths` | Rutas temáticas | Student, Instructor | Exploración |
| Tablero de Líderes | `/leaderboard` | Clasificación de estudiantes | Student, Instructor | Gamificación |
| Empleo | `/job-board` | Bolsa de trabajo | Student, Instructor | Carrera |
| Grupos | `/groups` | Grupos de estudio | Student, Instructor | Comunidad |

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
| Móvil | ❌ | Adaptación responsiva pendiente |

## Próximas Funcionalidades

1. Sistema de recomendaciones basado en IA
2. Integración con videoconferencia para clases en vivo
3. App móvil nativa
4. Sistema avanzado de gamificación
5. Marketplace para instructores

## Notas de Implementación

- Todas las rutas utilizan React Router v6
- La navegación está configurada de forma dinámica según el rol del usuario
- Las rutas administrativas requieren verificación de permisos adicional
- El sistema de navegación lateral se adapta automáticamente al rol activo
- Las rutas públicas están optimizadas para SEO
