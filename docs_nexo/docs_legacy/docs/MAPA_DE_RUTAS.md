
# Mapa de Rutas del Sistema Nexo Learning

Este documento proporciona una visión general de todas las rutas en el sistema, su estado actual, y recomendaciones para su mantenimiento.

## Leyenda de Estado

- ✅ **Activa**: Ruta implementada y funcional
- 🚧 **En desarrollo**: Ruta parcialmente implementada, requiere trabajo adicional
- ❌ **No implementada**: Ruta definida pero sin implementación
- 🔄 **Duplicada**: Múltiples implementaciones para la misma ruta
- ⚠️ **Deprecada**: Ruta que será eliminada en futuras versiones

## Rutas Públicas

| Ruta | Componente | Estado | Importancia | Notas |
|------|------------|--------|-------------|-------|
| `/` | Index | ✅ | Alta | Redirecciona según el estado de autenticación |
| `/landing` | LandingPage | ✅ | Alta | Página principal para visitantes |
| `/auth/login` | Login | ✅ | Alta | Página de inicio de sesión |
| `/auth/register` | Register | ✅ | Alta | Página de registro |
| `/about-us` | AboutUs | ✅ | Media | Información sobre la plataforma |
| `/scholarships` | Scholarships | ✅ | Media | Información sobre becas |
| `/contact` | ContactPage | 🚧 | Media | Formulario de contacto incompleto |
| `/unauthorized` | Unauthorized | ✅ | Media | Página para accesos no autorizados |
| `/courses` | CoursesCatalog | 🔄 | Alta | Catálogo de cursos (versión pública) |
| `/courses/:courseId` | CourseDetailPage | ✅ | Alta | Detalles del curso |
| `/terms` | TermsPage | 🚧 | Baja | Términos y condiciones |
| `/privacy` | PrivacyPage | 🚧 | Baja | Política de privacidad |
| `/cookies` | CookiesPage | 🚧 | Baja | Política de cookies |
| `/accessibility` | AccessibilityPage | 🚧 | Baja | Información de accesibilidad |
| `/pages/:slug` | DynamicPage | 🚧 | Media | Sistema de páginas dinámicas |

## Rutas de Usuario Autenticado

| Ruta | Componente | Estado | Importancia | Notas |
|------|------------|--------|-------------|-------|
| `/home` o `/dashboard` | Dashboard | 🔄 | Alta | Panel principal del estudiante |
| `/profile` | Profile | ✅ | Alta | Perfil del usuario |
| `/profile/settings` | ProfileSettings | 🚧 | Media | Configuración del perfil |
| `/my-courses` | StudentCourses | ✅ | Alta | Cursos del estudiante |
| `/courses/:courseId/learn` | CourseLearn | ✅ | Alta | Página de aprendizaje |
| `/courses/:courseId/learn/:lessonId` | LessonView | ✅ | Alta | Vista de lección |
| `/courses/:courseId/notes` | CourseNotes | 🚧 | Media | Notas del estudiante |
| `/checkout/:courseId` | Checkout | 🚧 | Alta | Proceso de compra |
| `/payment/:status` | PaymentRoutes | 🚧 | Alta | Rutas de pago |
| `/invoices` | Invoices | 🚧 | Media | Facturas del usuario |
| `/calendar` | Calendar | 🚧 | Baja | Calendario del usuario |
| `/messages` | Messages | 🚧 | Media | Sistema de mensajería |
| `/notifications` | Notifications | 🚧 | Media | Notificaciones del usuario |
| `/community` | Community | 🚧 | Media | Sección de comunidad |
| `/settings` | Settings | 🚧 | Media | Configuración general |

## Rutas de Instructor

| Ruta | Componente | Estado | Importancia | Notas |
|------|------------|--------|-------------|-------|
| `/instructor/dashboard` | InstructorDashboard | 🚧 | Alta | Panel del instructor |
| `/instructor/courses` | CoursesList | 🚧 | Alta | Cursos del instructor |
| `/instructor/courses/create` | CreateCourse | 🚧 | Alta | Crear nuevo curso |
| `/instructor/courses/:id/edit` | EditCourseDetails | 🚧 | Alta | Editar detalles del curso |
| `/instructor/courses/:id/editor` | CourseEditor | 🚧 | Alta | Editor de contenido |
| `/instructor/courses/:id/structure` | EditCourseStructure | 🚧 | Alta | Estructura del curso |
| `/instructor/courses/:courseId/lessons/:lessonId/edit` | EditLesson | 🚧 | Alta | Editor de lecciones |
| `/instructor/students` | Students | 🚧 | Media | Estudiantes del instructor |

## Rutas de Administración

| Ruta | Componente | Estado | Importancia | Notas |
|------|------------|--------|-------------|-------|
| `/admin/dashboard` | AdminDashboard | ✅ | Alta | Panel de administración |
| `/admin/users` | UserManagement | 🚧 | Alta | Gestión de usuarios |
| `/admin/roles` | RoleManagement | 🚧 | Alta | Gestión de roles |
| `/admin/courses` | AdminCourses | 🔄 | Alta | Gestión de cursos |
| `/admin/categories` | CategoryManagement | 🚧 | Media | Gestión de categorías |
| `/admin/learning` | AdminCourses | 🔄 | Media | Rutas de aprendizaje |
| `/admin/certificates` | CertificateManagement | ❌ | Baja | Gestión de certificados |
| `/admin/activity` | AnalyticsOverview | 🚧 | Media | Actividad de estudiantes |
| `/admin/finance` | AdminFinances | ⚠️ | Media | Deprecated, usar submódulos |
| `/admin/invoices` | InvoiceList | 🚧 | Media | Facturas del sistema |
| `/admin/subscriptions` | ManageSubscription | 🚧 | Media | Gestión de suscripciones |
| `/admin/banks` | BankTransactions | 🚧 | Baja | Transacciones bancarias |
| `/admin/cashflow` | CashFlow | 🚧 | Media | Flujo de caja |
| `/admin/alerts` | BillingAlerts | 🚧 | Baja | Alertas de facturación |
| `/admin/analytics` | AnalyticsOverview | 🔄 | Media | Analíticas del sistema |
| `/admin/content` | ContentManagement | 🚧 | Media | Gestión de contenido |
| `/admin/pages` | PageManagement | 🚧 | Media | Gestión de páginas |
| `/admin/pages/create` | CreatePage | 🚧 | Media | Crear página |
| `/admin/pages/:id` | EditPage | 🚧 | Media | Editar página |
| `/admin/settings` | SystemSettings | 🚧 | Media | Configuración del sistema |
| `/admin/features` | FeatureManagement | 🚧 | Media | Gestión de características |
| `/admin/integrations` | IntegrationsManagement | 🚧 | Baja | Integraciones del sistema |
| `/admin/data` | DataManagement | 🚧 | Baja | Gestión de datos |
| `/admin/audit` | AuditLog | 🚧 | Baja | Registro de auditoría |
| `/admin/access` | AccessControl | 🚧 | Media | Control de acceso |
| `/admin/ai` | AIServicesPage | 🚧 | Baja | Servicios de IA |
| `/admin/design` | DesignSystem | 🚧 | Baja | Sistema de diseño |

## Plan de Limpieza y Consolidación

### Fase 1: Documentación y Evaluación (Actual)
- ✅ Crear este documento de mapeo
- Revisar cada ruta y evaluar su estado real
- Identificar duplicidades y inconsistencias

### Fase 2: Consolidación (Próxima)
- Resolver duplicidades de rutas
- Unificar componentes similares
- Eliminar rutas deprecadas
- Implementar redireccionamientos para mantener compatibilidad

### Fase 3: Reestructuración (Futura)
- Reorganizar la estructura de navegación
- Implementar un sistema de rutas más coherente
- Crear una documentación clara para desarrolladores

## Estrategia para nuevas rutas

Para evitar la proliferación de rutas innecesarias o duplicadas en el futuro, seguiremos estas pautas:

1. **Documentar primero**: Cualquier nueva ruta debe ser documentada en este archivo antes de ser implementada
2. **Validar necesidad**: Confirmar que no existe una ruta similar o que cumpla la misma función
3. **Seguir convenciones**: Mantener coherencia en la estructura de rutas según el rol de usuario
4. **Actualizar mapas**: Mantener actualizado este documento

---

Última actualización: Abril 2025
