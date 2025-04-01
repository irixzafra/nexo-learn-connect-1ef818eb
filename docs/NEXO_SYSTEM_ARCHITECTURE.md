
# ARQUITECTURA DEL SISTEMA NEXO LEARNING

Este documento describe la arquitectura completa del sistema, incluyendo la estructura de navegación, slugs de páginas, y funcionalidades específicas de cada sección.

## ESTRUCTURA DE NAVEGACIÓN GENERAL

La navegación del sistema se divide en dos modos principales:
1. **Navegación de Usuario**: Disponible para todos los roles, con permisos específicos
2. **Navegación de Administración**: Accesible solo para roles administrativos

## ESTRUCTURA DE SLUGS Y FUNCIONALIDADES

### 1. DASHBOARD

- **Slug**: `/home` o `/dashboard`
- **Roles**: Todos
- **Funcionalidades**:
  - Resumen de cursos en progreso
  - Próximas actividades
  - Notificaciones recientes
  - Estadísticas de aprendizaje
  - Recomendaciones personalizadas
- **Componentes principales**:
  - `DashboardStats`
  - `CourseProgressCards`
  - `RecentlyViewedCourses`
  - `UpcomingEvents`
  - `LearningRecommendations`

### 2. MIS CURSOS

#### Mi Perfil
- **Slug**: `/profile`
- **Roles**: Todos (excepto invitado)
- **Funcionalidades**:
  - Visualización/edición de datos personales
  - Configuración de privacidad
  - Preferencias de aprendizaje
  - Conexión de redes sociales
- **Componentes principales**:
  - `ProfileForm`
  - `UserAvatar`
  - `PrivacySettings`
  - `SocialConnections`

#### Mis Cursos
- **Slug**: `/home/my-courses`
- **Roles**: Todos
- **Funcionalidades**:
  - Lista de cursos en progreso
  - Cursos completados
  - Filtros y búsqueda
  - Progreso de aprendizaje
- **Componentes principales**:
  - `CourseList`
  - `CourseCard`
  - `ProgressBar`
  - `CourseFilters`

#### Certificados
- **Slug**: `/certificates`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Certificados obtenidos
  - Descarga en PDF
  - Validación
  - Compartir en redes
- **Componentes principales**:
  - `CertificateList`
  - `CertificateCard`
  - `CertificateDownload`
  - `CertificateShare`

#### Recomendaciones
- **Slug**: `/recommendations`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Cursos recomendados
  - Rutas de aprendizaje sugeridas
  - Basado en actividad previa
- **Componentes principales**:
  - `RecommendationEngine`
  - `CourseRecommendations`
  - `LearningPathSuggestions`

#### Mensajes
- **Slug**: `/messages`
- **Roles**: Estudiante, Instructor, Admin, Moderador
- **Funcionalidades**:
  - Chat en tiempo real
  - Mensajes privados
  - Foros de discusión
  - Notificaciones
- **Componentes principales**:
  - `MessageList`
  - `ChatInterface`
  - `ForumDiscussions`
  - `MessageNotifications`

#### Calendario
- **Slug**: `/calendar`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Eventos programados
  - Vencimientos de tareas
  - Sincronización con calendario externo
  - Recordatorios
- **Componentes principales**:
  - `CalendarView`
  - `EventsList`
  - `CalendarSync`
  - `ReminderSettings`

#### Preferencias
- **Slug**: `/preferences`
- **Roles**: Todos (excepto invitado)
- **Funcionalidades**:
  - Configuración de notificaciones
  - Preferencias de visualización
  - Idioma y zona horaria
  - Accesibilidad
- **Componentes principales**:
  - `PreferencesForm`
  - `NotificationSettings`
  - `LanguageSelector`
  - `AccessibilityOptions`

#### Analíticas
- **Slug**: `/analytics/personal`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Tiempo de estudio
  - Progreso por habilidades
  - Comparativas
  - Metas de aprendizaje
- **Componentes principales**:
  - `PersonalAnalytics`
  - `StudyTimeChart`
  - `SkillsRadar`
  - `LearningGoals`

### 3. EXPLORAR

#### Explorar Catálogo
- **Slug**: `/courses`
- **Roles**: Todos
- **Funcionalidades**:
  - Catálogo completo de cursos
  - Filtros avanzados
  - Categorías
  - Valoraciones
- **Componentes principales**:
  - `CourseCatalog`
  - `CourseFilters`
  - `CategoryList`
  - `RatingSystem`

#### Carreras
- **Slug**: `/careers`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Programas de carrera
  - Requisitos
  - Proyección profesional
  - Certificaciones asociadas
- **Componentes principales**:
  - `CareersList`
  - `CareerDetail`
  - `CareerRequirements`
  - `CareerPathVisualization`

#### Rutas de aprendizaje
- **Slug**: `/learning-paths`
- **Roles**: Estudiante, Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Rutas temáticas
  - Progresión de cursos
  - Requisitos previos
  - Habilidades adquiribles
- **Componentes principales**:
  - `LearningPathsList`
  - `PathDetail`
  - `PathProgressTracker`
  - `SkillsTree`

#### Empleo
- **Slug**: `/job-board`
- **Roles**: Estudiante, Instructor, Admin
- **Funcionalidades**:
  - Ofertas de empleo
  - Postulaciones
  - Perfiles de empresas
  - Recomendaciones laborales
- **Componentes principales**:
  - `JobBoard`
  - `JobFilters`
  - `ApplicationProcess`
  - `CompanyProfiles`

#### Leader Board
- **Slug**: `/leaderboard`
- **Roles**: Estudiante, Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Ranking de estudiantes
  - Logros y medallas
  - Competencias
  - Retos
- **Componentes principales**:
  - `LeaderboardTable`
  - `AchievementSystem`
  - `Competitions`
  - `Challenges`

#### Grupos
- **Slug**: `/groups`
- **Roles**: Estudiante, Instructor, Admin, Sistemas
- **Estado**: Próximamente
- **Funcionalidades**:
  - Creación de grupos de estudio
  - Foros grupales
  - Recursos compartidos
  - Proyectos colaborativos
- **Componentes principales**:
  - `GroupsList`
  - `GroupDetail`
  - `GroupForums`
  - `CollaborativeTools`

### 4. PROFESORES

#### Mis Cursos (Instructor)
- **Slug**: `/instructor/courses`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Cursos creados
  - Editor de contenidos
  - Estadísticas de participación
  - Configuración de cursos
- **Componentes principales**:
  - `InstructorCoursesList`
  - `CourseEditor`
  - `CourseStats`
  - `CourseSettings`

#### Notas y Tareas
- **Slug**: `/instructor/assignments`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Gestión de tareas
  - Calificaciones
  - Feedback a estudiantes
  - Sistema de evaluación
- **Componentes principales**:
  - `AssignmentManager`
  - `GradingSystem`
  - `FeedbackTools`
  - `EvaluationCriteria`

#### Mensajes (Instructor)
- **Slug**: `/instructor/messages`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Comunicación con estudiantes
  - Anuncios de cursos
  - Mensajes grupales
  - Plantillas de mensajes
- **Componentes principales**:
  - `InstructorMessages`
  - `CourseAnnouncements`
  - `GroupMessaging`
  - `MessageTemplates`

#### Analíticas (Instructor)
- **Slug**: `/instructor/analytics`
- **Roles**: Instructor, Admin, Sistemas
- **Funcionalidades**:
  - Rendimiento de estudiantes
  - Participación en cursos
  - Tasas de finalización
  - Métricas de contenido
- **Componentes principales**:
  - `InstructorAnalytics`
  - `StudentPerformanceMetrics`
  - `CourseCompletionRates`
  - `ContentEngagementStats`

### 5. GESTIÓN ACADÉMICA

#### Estudiantes
- **Slug**: `/admin/students`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Listado de estudiantes
  - Perfiles detallados
  - Historial académico
  - Gestión de inscripciones
- **Componentes principales**:
  - `StudentsList`
  - `StudentProfile`
  - `AcademicHistory`
  - `EnrollmentManager`

#### Profesores
- **Slug**: `/admin/instructors`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Listado de instructores
  - Evaluación de desempeño
  - Asignación de cursos
  - Permisos especiales
- **Componentes principales**:
  - `InstructorsList`
  - `InstructorEvaluation`
  - `CourseAssignment`
  - `InstructorPermissions`

#### Cursos (Tabla)
- **Slug**: `/admin/courses`
- **Roles**: Admin, Sistemas, Instructor
- **Funcionalidades**:
  - Catálogo completo
  - Gestión de contenidos
  - Aprobación de cursos
  - Estadísticas
- **Componentes principales**:
  - `AdminCoursesList`
  - `CourseApprovalSystem`
  - `ContentManagement`
  - `CourseStatistics`

#### Categorías
- **Slug**: `/admin/categories`
- **Roles**: Admin, Sistemas, Creador de contenido
- **Funcionalidades**:
  - Estructura de categorías
  - Asignación de cursos
  - Taxonomía
  - SEO
- **Componentes principales**:
  - `CategoryManager`
  - `CategoryAssignment`
  - `TaxonomySystem`
  - `CategorySEO`

#### Certificados
- **Slug**: `/admin/certificates`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Plantillas de certificados
  - Criterios de emisión
  - Validación
  - Histórico
- **Componentes principales**:
  - `CertificateTemplates`
  - `CertificateIssuance`
  - `ValidationSystem`
  - `CertificateHistory`

#### Rutas de aprendizaje (Admin)
- **Slug**: `/admin/learning-paths`
- **Roles**: Admin, Sistemas, Creador de contenido
- **Funcionalidades**:
  - Creación de rutas
  - Estructura curricular
  - Requisitos y dependencias
  - Publicación
- **Componentes principales**:
  - `LearningPathCreator`
  - `CurriculumDesigner`
  - `RequirementsManager`
  - `PathPublisher`

#### Actividad de Alumnos
- **Slug**: `/admin/student-activity`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Seguimiento en tiempo real
  - Reportes de actividad
  - Alertas de inactividad
  - Patrones de uso
- **Componentes principales**:
  - `ActivityTracker`
  - `ActivityReports`
  - `InactivityAlerts`
  - `UsagePatterns`

### 6. FINANZAS

#### Finanzas (Dashboard)
- **Slug**: `/admin/finance`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Resumen financiero
  - KPIs
  - Tendencias
  - Ingresos vs Gastos
- **Componentes principales**:
  - `FinanceDashboard`
  - `FinancialKPIs`
  - `TrendAnalysis`
  - `RevenueExpenseChart`

#### Facturas
- **Slug**: `/admin/finance/invoices`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Gestión de facturas
  - Generación automática
  - Plantillas
  - Envío por email
- **Componentes principales**:
  - `InvoiceManager`
  - `InvoiceGenerator`
  - `InvoiceTemplates`
  - `EmailSender`

#### Suscripciones
- **Slug**: `/admin/finance/subscriptions`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Planes de suscripción
  - Gestión de renovaciones
  - Análisis de retención
  - Descuentos
- **Componentes principales**:
  - `SubscriptionPlans`
  - `RenewalManager`
  - `RetentionAnalytics`
  - `DiscountSystem`

#### Bancos
- **Slug**: `/admin/finance/banks`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Conexiones bancarias
  - Conciliación
  - Transferencias
  - Reportes
- **Componentes principales**:
  - `BankConnections`
  - `ReconciliationTools`
  - `TransferSystem`
  - `BankReports`

#### Cash-flow
- **Slug**: `/admin/finance/cash-flow`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Proyecciones
  - Historial
  - Análisis
  - Exportación
- **Componentes principales**:
  - `CashFlowProjections`
  - `TransactionHistory`
  - `CashFlowAnalysis`
  - `DataExport`

#### Alertas
- **Slug**: `/admin/finance/alerts`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Umbrales de alertas
  - Notificaciones
  - Priorización
  - Reglas
- **Componentes principales**:
  - `AlertThresholds`
  - `NotificationSystem`
  - `AlertPriority`
  - `RuleEngine`

#### Analíticas (Finanzas)
- **Slug**: `/admin/finance/analytics`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Métricas financieras
  - Visualizaciones
  - Comparativas
  - Exportación
- **Componentes principales**:
  - `FinanceAnalytics`
  - `DataVisualizations`
  - `BenchmarkComparisons`
  - `AnalyticsExport`

### 7. CONFIGURACIÓN

#### Configuración General
- **Slug**: `/admin/settings`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Parámetros generales
  - Personalización
  - Integración de APIs
  - Mantenimiento
- **Componentes principales**:
  - `GeneralSettings`
  - `SiteCustomization`
  - `APIIntegration`
  - `MaintenanceTools`

#### Funcionalidades
- **Slug**: `/admin/settings/features`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Activación/desactivación
  - Features flags
  - Configuración por característica
  - Beta testing
- **Componentes principales**:
  - `FeatureFlags`
  - `FeatureConfiguration`
  - `BetaTestManagement`
  - `FeatureRollout`

#### Diseño
- **Slug**: `/admin/design`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Temas visuales
  - Editor de componentes
  - Personalización
  - Previsualizaciones
- **Componentes principales**:
  - `ThemeManager`
  - `ComponentEditor`
  - `DesignCustomization`
  - `DesignPreview`

#### Conexiones
- **Slug**: `/admin/settings/integrations`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Integraciones externas
  - APIs
  - Webhooks
  - Autenticación
- **Componentes principales**:
  - `IntegrationManager`
  - `APISettings`
  - `WebhookConfigurator`
  - `OAuthSettings`

#### Datos
- **Slug**: `/admin/settings/data`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Importación/exportación
  - Backups
  - Limpieza
  - Migraciones
- **Componentes principales**:
  - `DataImportExport`
  - `BackupSystem`
  - `DataCleanup`
  - `MigrationTools`

#### Páginas
- **Slug**: `/admin/pages`
- **Roles**: Admin, Sistemas, Creador de contenido
- **Funcionalidades**:
  - Gestión de páginas estáticas
  - Editor visual
  - SEO
  - Publicación
- **Componentes principales**:
  - `PageManager`
  - `VisualEditor`
  - `PageSEO`
  - `PublicationSystem`

#### Analíticas (Sistema)
- **Slug**: `/admin/analytics`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Rendimiento del sistema
  - Uso
  - Usuarios
  - Errores
- **Componentes principales**:
  - `SystemAnalytics`
  - `UsageMetrics`
  - `UserAnalytics`
  - `ErrorTracking`

#### Roles y Permisos
- **Slug**: `/admin/roles`
- **Roles**: Admin, Sistemas
- **Funcionalidades**:
  - Gestión de roles
  - Asignación de permisos
  - Políticas de acceso
  - Auditoría
- **Componentes principales**:
  - `RoleManager`
  - `PermissionAssignment`
  - `AccessPolicies`
  - `AccessAudit`

## MODO ADMINISTRACIÓN

La navegación del panel de administración (`/admin`) tiene una estructura específica:

### Dashboard de Administración
- **Slug**: `/admin/dashboard`
- **Componentes principales**: `AdminDashboard`, `AdminKPIs`, `SystemStatus`

### Usuarios
- **Slug**: `/admin/users`
- **Subpáginas**:
  - Lista de Usuarios: `/admin/users`
  - Roles y Permisos: `/admin/roles`

### Cursos (Admin)
- **Slug**: `/admin/courses`
- **Subpáginas**:
  - Todos los Cursos: `/admin/courses`
  - Categorías: `/admin/courses/categories`
  - Rutas de Aprendizaje: `/admin/courses/learning-paths`
  - Certificados: `/admin/courses/certificates`

### Finanzas (Admin)
- **Slug**: `/admin/billing`
- **Subpáginas**:
  - Resumen: `/admin/billing`
  - Facturas: `/admin/billing/invoices`
  - Suscripciones: `/admin/billing/subscriptions`
  - Movimientos Bancarios: `/admin/billing/bank`
  - Alertas: `/admin/billing/alerts`

### Diseño
- **Slug**: `/admin/design`
- **Subpáginas**:
  - Componentes: `/admin/design`
  - Temas: `/admin/design/themes`
  - Plantillas: `/admin/design/templates`

### Páginas (Admin)
- **Slug**: `/admin/pages`
- **Subpáginas**:
  - Todas las Páginas: `/admin/pages`
  - Crear Página: `/admin/pages/create`
  - Plantillas: `/admin/pages/templates`

### Analíticas (Admin)
- **Slug**: `/admin/analytics`
- **Subpáginas**:
  - Visión General: `/admin/analytics`
  - Usuarios: `/admin/analytics/users`
  - Cursos: `/admin/analytics/courses`
  - Ingresos: `/admin/analytics/revenue`
  - Rendimiento: `/admin/analytics/performance`
  - Engagement: `/admin/analytics/engagement`

### Configuración (Admin)
- **Slug**: `/admin/settings`
- **Subpáginas**:
  - General: `/admin/settings`
  - Seguridad: `/admin/settings/security`
  - Integraciones: `/admin/settings/integrations`
  - Base de Datos: `/admin/settings/database`

---

Documento actualizado: [Fecha actual]
