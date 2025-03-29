
# NEXO LEARNING - DOCUMENTACIÓN TÉCNICA

## Stack Tecnológico

- **Frontend**:
  - React con TypeScript para desarrollo de interfaces
  - Vite como herramienta de construcción
  - Tailwind CSS para estilos
  - shadcn/ui para componentes de interfaz de usuario
  - TanStack React Query para gestión de estado y peticiones

- **Backend**:
  - Supabase para autenticación, base de datos y almacenamiento
  - PostgreSQL como sistema de base de datos relacional
  - Row-Level Security (RLS) para seguridad de datos

## Arquitectura

La aplicación sigue una arquitectura basada en componentes con las siguientes capas:

1. **Capa de Presentación**:
   - Componentes React reutilizables
   - Páginas que integran múltiples componentes
   - Layouts que definen la estructura común

2. **Capa de Lógica de Negocio**:
   - Hooks personalizados para encapsular lógica
   - Contextos para estado global
   - Servicios para interactuar con APIs

3. **Capa de Datos**:
   - Supabase para persistencia y recuperación de datos
   - React Query para gestión de caché y estado del servidor

## Estructura de Carpetas

La aplicación está organizada en:

- `src/components/`: Componentes de UI reutilizables
- `src/layouts/`: Layouts/estructuras de página
- `src/pages/`: Páginas y rutas
- `src/hooks/`: Hooks personalizados
- `src/contexts/`: Contextos de React
- `src/lib/`: Utilidades y helpers
- `src/types/`: Definiciones de tipos TypeScript
- `src/features/`: Módulos funcionales de la aplicación
  - `src/features/auth/`: Autenticación
  - `src/features/users/`: Gestión de perfiles de usuario
  - `src/features/courses/`: Funcionalidad core de LMS
  - `src/features/lessons/`: Funcionalidad de lecciones
  - `src/features/progress/`: Seguimiento de progreso
  - `src/features/comments/`: Sistema de comentarios
  - `src/features/payments/`: Pagos y transacciones
  - `src/features/admin/`: Funcionalidades administrativas
  - `src/features/instructor/`: Dashboard y herramientas de instructor
  - `src/features/assignments/`: Sistema de tareas
  - `src/features/quizzes/`: Sistema de cuestionarios
  - `src/features/categories/`: Categorización de cursos
  - `src/features/notifications/`: Sistema de notificaciones
  - `src/features/messaging/`: Mensajería privada
  - `src/features/network/`: Conexiones sociales
  - `src/features/feed/`: Feed de actividad social
  - `src/features/groups/`: Grupos de estudio
  - `src/features/jobs/`: Tablón de empleos
  - `src/features/certificates/`: Certificaciones
  - `src/features/learning-paths/`: Rutas de aprendizaje
  - `src/features/gamification/`: Elementos de gamificación

## Esquema de Base de Datos

### Tipos ENUM

- `user_role`: 'student', 'instructor', 'admin'
- `lesson_content_type`: 'text', 'video'
- `payment_status`: 'pending', 'succeeded', 'failed'
- `currency_code`: 'eur', 'usd'
- `notification_type`: 'comment', 'reply', 'enrollment', 'assignment', 'grade', 'message', 'follow', 'mention', 'certificate', 'quiz', 'system'
- `message_status`: 'sent', 'delivered', 'read'
- `assignment_status`: 'pending', 'submitted', 'graded', 'late'
- `quiz_question_type`: 'multiple_choice', 'true_false', 'short_answer', 'essay'
- `job_type`: 'full_time', 'part_time', 'contract', 'internship', 'remote'
- `application_status`: 'pending', 'reviewing', 'accepted', 'rejected'
- `certificate_status`: 'pending', 'issued', 'revoked'
- `level_type`: 'beginner', 'intermediate', 'advanced', 'expert'
- `badge_type`: 'achievement', 'completion', 'participation', 'skill', 'social', 'special'

### Funciones de Base de Datos

- `handle_updated_at()`: Actualiza el campo updated_at automáticamente.
- `handle_new_user()`: Crea un perfil automáticamente cuando se registra un nuevo usuario.
- `get_table_columns(table_name)`: Devuelve información sobre las columnas de una tabla específica.
- `calculate_course_progress(course_id, user_id)`: Calcula el porcentaje de progreso de un usuario en un curso.
- `get_user_role(user_id)`: Devuelve el rol de un usuario específico.

### Tablas Principales

#### Fase 1: Core de la Plataforma

- **profiles**: Información de perfiles de usuario
  - `id`: UUID (referencia a auth.users)
  - `full_name`: Texto
  - `role`: Enum ('student', 'instructor', 'admin')
  - `created_at`, `updated_at`: Timestamps

- **courses**: Cursos disponibles en la plataforma
  - `id`: UUID
  - `instructor_id`: UUID (referencia a profiles)
  - `title`, `description`: Texto
  - `price`: Numeric
  - `currency`: Enum ('eur', 'usd')
  - `is_published`: Boolean
  - Campos adicionales para SEO y características

- **modules**: Módulos que componen un curso
  - `id`: UUID
  - `course_id`: UUID (referencia a courses)
  - `title`: Texto
  - `module_order`: Integer
  - `created_at`, `updated_at`: Timestamps

- **lessons**: Lecciones dentro de módulos
  - `id`: UUID
  - `module_id`: UUID (referencia a modules)
  - `course_id`: UUID (referencia a courses)
  - `title`: Texto
  - `content_type`: Texto ('text', 'video')
  - `content_text`: JSONB
  - `content_video_url`: Texto
  - `lesson_order`: Integer
  - `is_previewable`: Boolean
  - `created_at`, `updated_at`: Timestamps

- **enrollments**: Inscripciones de usuarios a cursos
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `course_id`: UUID (referencia a courses)
  - `enrolled_at`: Timestamp

- **lesson_progress**: Seguimiento del progreso de lecciones
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `lesson_id`: UUID (referencia a lessons)
  - `course_id`: UUID (referencia a courses)
  - `is_completed`: Boolean
  - `completion_date`: Timestamp
  - `last_position`: Numeric
  - `created_at`, `updated_at`: Timestamps

- **comments**: Comentarios en lecciones
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `lesson_id`: UUID (referencia a lessons)
  - `parent_comment_id`: UUID (opcional)
  - `content`: Texto
  - `created_at`, `updated_at`: Timestamps

- **payments**: Registro de pagos
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `course_id`: UUID (referencia a courses)
  - `stripe_charge_id`, `stripe_checkout_session_id`: Texto
  - `amount`: Numeric
  - `currency`: Enum ('eur', 'usd')
  - `status`: Enum ('pending', 'succeeded', 'failed')
  - `metadata`: JSONB
  - `created_at`: Timestamp

#### Fase 2-5: Expansión de Funcionalidades

- **categories**: Categorías para organizar cursos
  - `id`: UUID
  - `name`, `slug`: Texto
  - `description`: Texto
  - `parent_id`: UUID (referencia a categories, opcional)
  - `is_active`: Boolean
  - `display_order`: Integer
  - `created_at`, `updated_at`: Timestamps

- **course_categories**: Relación entre cursos y categorías
  - `id`: UUID
  - `course_id`: UUID (referencia a courses)
  - `category_id`: UUID (referencia a categories)
  - `created_at`: Timestamp

- **assignments**: Tareas asignadas a cursos
  - `id`: UUID
  - `course_id`: UUID (referencia a courses)
  - `module_id`: UUID (referencia a modules, opcional)
  - `title`, `description`: Texto
  - `instructions`: Texto
  - `due_date`: Timestamp
  - `max_points`: Numeric
  - `is_published`: Boolean
  - `assignment_order`: Integer
  - `created_at`, `updated_at`: Timestamps

- **assignment_submissions**: Entregas de tareas
  - `id`: UUID
  - `assignment_id`: UUID (referencia a assignments)
  - `user_id`: UUID (referencia a profiles)
  - `course_id`: UUID (referencia a courses)
  - `content`: Texto
  - `submission_files`: JSONB
  - `status`: Enum ('pending', 'submitted', 'graded', 'late')
  - `submitted_at`: Timestamp
  - `grade`: Numeric
  - `feedback`: Texto
  - `graded_by`: UUID (referencia a profiles)
  - `graded_at`: Timestamp
  - `created_at`, `updated_at`: Timestamps

- **quizzes**: Cuestionarios de evaluación
  - `id`: UUID
  - `course_id`: UUID (referencia a courses)
  - `module_id`: UUID (referencia a modules, opcional)
  - `title`: Texto
  - `description`, `instructions`: Texto
  - `time_limit`: Integer
  - `passing_score`: Numeric
  - `max_attempts`: Integer
  - `is_published`: Boolean
  - `quiz_order`: Integer
  - `created_at`, `updated_at`: Timestamps

- **quiz_questions**: Preguntas de cuestionarios
  - `id`: UUID
  - `quiz_id`: UUID (referencia a quizzes)
  - `question`: Texto
  - `question_type`: Enum
  - `points`: Numeric
  - `question_order`: Integer
  - `explanation`: Texto
  - `created_at`, `updated_at`: Timestamps

- **quiz_options**: Opciones para preguntas de cuestionarios
  - `id`: UUID
  - `question_id`: UUID (referencia a quiz_questions)
  - `option_text`: Texto
  - `is_correct`: Boolean
  - `option_order`: Integer
  - `created_at`: Timestamp

- **quiz_attempts**: Intentos de resolución de cuestionarios
  - `id`: UUID
  - `quiz_id`: UUID (referencia a quizzes)
  - `user_id`: UUID (referencia a profiles)
  - `course_id`: UUID (referencia a courses)
  - `score`, `max_score`, `percentage`: Numeric
  - `passed`: Boolean
  - `started_at`, `completed_at`: Timestamp
  - `created_at`, `updated_at`: Timestamps

- **quiz_answers**: Respuestas dadas en intentos de cuestionarios
  - `id`: UUID
  - `attempt_id`: UUID (referencia a quiz_attempts)
  - `question_id`: UUID (referencia a quiz_questions)
  - `selected_option_id`: UUID (referencia a quiz_options, opcional)
  - `text_answer`: Texto
  - `is_correct`: Boolean
  - `points_earned`: Numeric
  - `created_at`: Timestamp

- **notifications**: Notificaciones para usuarios
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `type`: Enum (notification_type)
  - `title`: Texto
  - `content`: Texto
  - `resource_type`: Texto
  - `resource_id`: UUID
  - `action_url`: Texto
  - `is_read`: Boolean
  - `created_at`: Timestamp

- **conversations**: Conversaciones entre usuarios
  - `id`: UUID
  - `title`: Texto
  - `is_group`: Boolean
  - `created_by`: UUID (referencia a profiles)
  - `created_at`, `updated_at`: Timestamps

- **conversation_participants**: Participantes en conversaciones
  - `id`: UUID
  - `conversation_id`: UUID (referencia a conversations)
  - `user_id`: UUID (referencia a profiles)
  - `joined_at`, `left_at`: Timestamp
  - `is_admin`: Boolean
  - `created_at`: Timestamp

- **messages**: Mensajes en conversaciones
  - `id`: UUID
  - `conversation_id`: UUID (referencia a conversations)
  - `sender_id`: UUID (referencia a profiles)
  - `content`: Texto
  - `status`: Enum (message_status)
  - `sent_at`: Timestamp
  - `created_at`: Timestamp

- **connections**: Conexiones entre usuarios
  - `id`: UUID
  - `requester_id`: UUID (referencia a profiles)
  - `addressee_id`: UUID (referencia a profiles)
  - `status`: Texto ('pending', 'accepted', 'rejected', 'blocked')
  - `created_at`, `updated_at`: Timestamps

- **follows**: Seguimientos entre usuarios
  - `id`: UUID
  - `follower_id`: UUID (referencia a profiles)
  - `following_id`: UUID (referencia a profiles)
  - `created_at`: Timestamp

- **posts**: Publicaciones sociales
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `content`: Texto
  - `media_urls`: JSONB
  - `is_public`: Boolean
  - `created_at`, `updated_at`: Timestamps

- **post_likes**: Me gusta en publicaciones
  - `id`: UUID
  - `post_id`: UUID (referencia a posts)
  - `user_id`: UUID (referencia a profiles)
  - `created_at`: Timestamp

- **post_comments**: Comentarios en publicaciones
  - `id`: UUID
  - `post_id`: UUID (referencia a posts)
  - `user_id`: UUID (referencia a profiles)
  - `content`: Texto
  - `created_at`, `updated_at`: Timestamps

- **groups**: Grupos sociales/estudio
  - `id`: UUID
  - `name`: Texto
  - `description`: Texto
  - `cover_image_url`: Texto
  - `is_private`: Boolean
  - `created_by`: UUID (referencia a profiles)
  - `created_at`, `updated_at`: Timestamps

- **group_members**: Miembros de grupos
  - `id`: UUID
  - `group_id`: UUID (referencia a groups)
  - `user_id`: UUID (referencia a profiles)
  - `role`: Texto ('admin', 'moderator', 'member')
  - `joined_at`: Timestamp
  - `created_at`: Timestamp

- **group_posts**: Publicaciones en grupos
  - `id`: UUID
  - `group_id`: UUID (referencia a groups)
  - `user_id`: UUID (referencia a profiles)
  - `content`: Texto
  - `media_urls`: JSONB
  - `created_at`, `updated_at`: Timestamps

- **job_postings**: Ofertas de empleo
  - `id`: UUID
  - `title`: Texto
  - `company`: Texto
  - `location`: Texto
  - `description`: Texto
  - `requirements`: Texto
  - `salary_range`: JSONB
  - `job_type`: Enum (job_type)
  - `is_remote`: Boolean
  - `contact_email`: Texto
  - `application_url`: Texto
  - `posted_by`: UUID (referencia a profiles)
  - `expires_at`: Timestamp
  - `is_active`: Boolean
  - `created_at`, `updated_at`: Timestamps

- **job_applications**: Solicitudes de empleo
  - `id`: UUID
  - `job_id`: UUID (referencia a job_postings)
  - `user_id`: UUID (referencia a profiles)
  - `cover_letter`: Texto
  - `resume_url`: Texto
  - `status`: Enum (application_status)
  - `created_at`, `updated_at`: Timestamps

- **certificates**: Certificados de finalización
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `course_id`: UUID (referencia a courses)
  - `certificate_number`: Texto
  - `issue_date`: Timestamp
  - `expiry_date`: Timestamp
  - `status`: Enum (certificate_status)
  - `verification_url`: Texto
  - `created_at`, `updated_at`: Timestamps

- **learning_paths**: Rutas de aprendizaje
  - `id`: UUID
  - `title`: Texto
  - `description`: Texto
  - `cover_image_url`: Texto
  - `level`: Enum (level_type)
  - `estimated_hours`: Integer
  - `is_published`: Boolean
  - `created_by`: UUID (referencia a profiles)
  - `created_at`, `updated_at`: Timestamps

- **learning_path_courses**: Cursos en rutas de aprendizaje
  - `id`: UUID
  - `path_id`: UUID (referencia a learning_paths)
  - `course_id`: UUID (referencia a courses)
  - `course_order`: Integer
  - `is_required`: Boolean
  - `created_at`: Timestamp

- **learning_path_enrollments**: Inscripciones en rutas de aprendizaje
  - `id`: UUID
  - `path_id`: UUID (referencia a learning_paths)
  - `user_id`: UUID (referencia a profiles)
  - `progress`: Numeric
  - `enrolled_at`: Timestamp
  - `completed_at`: Timestamp
  - `created_at`, `updated_at`: Timestamps

- **badges**: Insignias de gamificación
  - `id`: UUID
  - `name`: Texto
  - `description`: Texto
  - `icon_url`: Texto
  - `badge_type`: Enum (badge_type)
  - `points`: Integer
  - `requirements`: JSONB
  - `created_at`, `updated_at`: Timestamps

- **user_badges**: Insignias obtenidas por usuarios
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `badge_id`: UUID (referencia a badges)
  - `awarded_at`: Timestamp
  - `created_at`: Timestamp

- **user_points**: Puntos de gamificación de usuarios
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `total_points`: Integer
  - `points_history`: JSONB
  - `created_at`, `updated_at`: Timestamps

- **audit_log**: Registro de auditoría
  - `id`: UUID
  - `user_id`: UUID (referencia a profiles)
  - `action`: Texto
  - `resource_type`: Texto
  - `resource_id`: UUID
  - `details`: JSONB
  - `ip_address`: Texto
  - `user_agent`: Texto
  - `created_at`: Timestamp

## Navegación y Control de Acceso

La aplicación implementa diferentes rutas y niveles de acceso según el rol del usuario:

### Rutas Públicas
- `/`: Página de inicio
- `/auth/login`: Inicio de sesión
- `/auth/register`: Registro
- `/courses`: Catálogo de cursos
- `/courses/:id`: Detalles de un curso específico
- `/about-us`: Acerca de nosotros
- `/scholarships`: Becas

### Rutas Protegidas (requieren autenticación)
- `/home`: Dashboard general
- `/profile`: Perfil de usuario
- `/my-courses`: Cursos del estudiante
- `/courses/:courseId/learn`: Interfaz de aprendizaje
- `/courses/:courseId/learn/:lessonId`: Visualización de lección
- `/checkout/:courseId`: Proceso de pago para cursos de pago

### Rutas de Instructor (requieren rol 'instructor')
- `/instructor/dashboard`: Panel de control del instructor
- `/instructor/students`: Gestión de estudiantes
- `/instructor/courses`: Listado de cursos del instructor
- `/instructor/courses/new`: Creación de nuevo curso
- `/instructor/courses/:id/edit`: Edición de detalles del curso
- `/instructor/courses/:id/structure`: Edición de estructura del curso
- `/instructor/courses/:courseId/lessons/:lessonId/edit`: Edición de lección

### Rutas de Administrador (requieren rol 'admin')
- `/admin/dashboard`: Panel de administración
- `/admin/content`: Gestión de contenido
- `/admin/test-data`: Herramientas de gestión de datos de prueba

## Funcionalidades Implementadas

### CORE-UI-EDIT-01: Edición Inline y Reordenamiento de Contenido

#### Resumen
Sistema que permite a los administradores editar textos directamente en la página y reorganizar elementos de la interfaz. Proporciona feedback visual y notificaciones durante la edición.

#### Componentes Clave
- **EditModeContext**: Gestiona el estado global del modo de edición y proporciona funciones para actualizar textos y reordenar elementos.
- **InlineEdit**: Componente que convierte cualquier elemento en un campo editable cuando se activa el modo de edición.
- **DraggableContent**: Componente que permite reordenar elementos mediante arrastrar y soltar cuando el modo de edición está activo.

#### Base de Datos
- Utiliza tablas existentes con campos de texto editables.
- Para la reordenación, requiere campos de orden en las tablas correspondientes.

#### Puntos de Integración
- **EditModeToggle**: Botón en la barra de navegación para activar/desactivar el modo de edición.
- **Toasts**: Proporciona retroalimentación sobre las acciones de edición y reordenamiento.
- **Sonner**: Librería utilizada para las notificaciones toast.

#### Flujo de Uso
1. El administrador activa el modo de edición desde la barra de navegación.
2. Los textos editables muestran indicadores visuales al pasar el cursor.
3. Al hacer clic en un texto, aparece un campo de entrada con botones de guardar/cancelar.
4. Para reordenar elementos, el administrador arrastra los items usando los controladores visibles.
5. Al desactivar el modo de edición, todas las modificaciones quedan guardadas y se muestra una notificación.

#### Implementación de Seguridad
- Solo los usuarios con rol de administrador pueden ver y utilizar el toggle de edición.
- Las operaciones de actualización están protegidas mediante RLS a nivel de BD.
- Validaciones para evitar textos vacíos o incorrectos.

#### Uso del Sistema
```tsx
// Ejemplo de uso de InlineEdit
<InlineEdit 
  table="content" 
  id="page-title" 
  field="text" 
  value="Título de la página" 
  as="h1"
  className="text-3xl font-bold"
/>

// Ejemplo de uso de DraggableContent
<DraggableContent 
  items={itemsArray}
  table="content_items"
  className="grid grid-cols-3 gap-4"
/>
```

#### Limitaciones y Consideraciones
- La edición inline está diseñada principalmente para textos y no para contenido enriquecido.
- El reordenamiento funciona mejor con colecciones homogéneas de elementos.
- Requiere configuración de la base de datos con campos de orden apropiados.

### CORE-PROFILE-EDIT-01: Edición Básica de Perfil

#### Resumen
Funcionalidad que permite a los usuarios editar y actualizar su nombre completo en su perfil desde la interfaz de usuario. Proporciona validación de datos, retroalimentación visual y notificaciones sobre el resultado de la operación.

#### Componentes Clave
- **useProfileEdit**: Hook personalizado que utiliza React Query para manejar la mutación de actualización del perfil.
- **ProfileEditForm**: Componente de formulario que utiliza React Hook Form para la validación y gestión del estado del formulario.
- **Form**: Componentes de shadcn/ui utilizados para construir el formulario con un diseño consistente.

#### Base de Datos
- Actualiza el campo `full_name` en la tabla `profiles` para el usuario autenticado.
- Utiliza la función `update` de Supabase para modificar el registro correspondiente.

#### SQL
```sql
-- Esta funcionalidad utiliza la tabla profiles existente
-- Operación de actualización:
UPDATE profiles
SET full_name = 'Nuevo Nombre', updated_at = now()
WHERE id = 'user-id';
```

#### Puntos de Integración
- **AuthContext**: Obtiene información del usuario autenticado.
- **React Query**: Gestiona el estado de la mutación (loading, error, success).
- **Sonner Toast**: Proporciona notificaciones de éxito o error.

#### Flujo de Uso
1. El usuario navega a la página de perfil (`/profile`).
2. El usuario hace clic en el botón "Editar Perfil".
3. Se muestra un formulario con el nombre actual prellenado.
4. El usuario modifica su nombre y hace clic en "Guardar cambios".
5. Se valida el formulario (nombre no vacío y mínimo 2 caracteres).
6. Se envía la solicitud a Supabase para actualizar el perfil.
7. Se muestra una notificación de éxito o error según corresponda.
8. En caso de éxito, la interfaz se actualiza para mostrar el nuevo nombre.

#### Implementación de Seguridad
- La actualización está limitada al propio perfil del usuario autenticado.
- Validación en el cliente para garantizar datos correctos.
- El campo de rol está deshabilitado para evitar modificaciones no autorizadas.
- Las operaciones de actualización requieren autenticación válida en Supabase.

#### Uso del Sistema
```tsx
// Ejemplo de uso del hook useProfileEdit
const profileMutation = useProfileEdit(userId);
profileMutation.mutate({ full_name: "Nuevo Nombre" });

// Ejemplo de uso del formulario
<ProfileEditForm
  profile={userProfile}
  user_id={userId}
  onSuccess={handleEditSuccess}
/>
```

#### Limitaciones y Consideraciones
- Solo permite editar el nombre completo, no otros campos del perfil.
- El campo de rol se muestra pero está deshabilitado (solo administradores pueden cambiar roles).
- Se requiere un mínimo de 2 caracteres para el nombre para asegurar datos válidos.

### CORE-INSTRUCTOR-STATS-01: Panel de Estadísticas para Instructores

#### Resumen
Panel de control que proporciona a los instructores información estadística sobre sus cursos, incluyendo conteo de cursos, inscripciones y datos de popularidad. Diseñado para facilitar el seguimiento y la toma de decisiones.

#### Componentes Clave
- **useDashboardStats**: Hook personalizado que centraliza todas las consultas a la base de datos para obtener estadísticas relevantes.
- **DashboardStatCard**: Componente visual para mostrar estadísticas individuales con iconos y formateo apropiado.
- **PopularCoursesCard**: Tarjeta que muestra los cursos más populares del instructor basado en inscripciones.
- **RecentEnrollmentsCard**: Listado de las inscripciones más recientes con información del estudiante y curso.

#### Base de Datos
- Utiliza consultas a múltiples tablas relacionadas: `courses`, `enrollments`, y `profiles`.
- Emplea joins y agregaciones para calcular estadísticas relevantes.
- Maneja estructuras de datos anidadas resultantes de consultas de join en Supabase.

#### Puntos de Integración
- **AuthContext**: Identifica al instructor actual para filtrar estadísticas relevantes.
- **React Query**: Gestiona el estado de las consultas y su actualización.
- **Recharts**: Biblioteca utilizada para visualización de datos estadísticos.

#### Flujo de Datos
1. El hook `useDashboardStats` realiza múltiples consultas a Supabase:
   - Cuenta de cursos totales del instructor
   - Cuenta de cursos publicados
   - Total de inscripciones en todos sus cursos
   - Listado de inscripciones recientes
   - Cursos más populares por número de inscripciones

2. Los datos se transforman para manejar correctamente las estructuras de datos anidadas que provienen de los joins en Supabase, especialmente para las relaciones entre tablas.

3. Los componentes visuales consumen estos datos para presentarlos en formato amigable.

#### Implementación Técnica
- Manejo cuidadoso de arrays de resultados en joins de Supabase, asegurando acceso seguro a propiedades anidadas.
- Gestión de estados de carga y error para cada consulta.
- Transformación de datos para facilitar su uso en componentes.

#### Uso del Sistema
```tsx
// Ejemplo de uso del hook de estadísticas
const { 
  coursesCount, 
  publishedCoursesCount, 
  totalEnrollments,
  recentEnrollments,
  popularCourses,
  isLoading 
} = useDashboardStats();

// Ejemplo de uso de tarjeta de estadística
<DashboardStatCard
  title="Cursos Totales"
  value={coursesCount}
  icon={Book}
  description="Cursos creados"
  loading={isLoading}
/>
```

#### Limitaciones y Consideraciones
- El rendimiento puede verse afectado con un gran volumen de datos.
- Para instructores con muchos cursos, se recomienda implementar paginación adicional.
- La estructura de datos requiere validación cuidadosa debido a los joins anidados de Supabase.

### CORE-ENROLL-01: Sistema de Inscripción a Cursos

#### Resumen
Funcionalidad que permite a los estudiantes inscribirse en cursos, gestionando de forma diferenciada los cursos gratuitos y de pago, con validaciones de autenticación y retroalimentación en cada paso del proceso.

#### Componentes Clave
- **useEnrollment**: Hook personalizado que maneja la lógica de inscripción y verifica el estado actual.
- **CourseEnrollCard**: Componente que muestra información del curso y botón de inscripción adaptado según estado.

#### Base de Datos
- Crea registros en la tabla `enrollments` relacionando usuarios con cursos.
- Verifica estado de inscripción consultando registros existentes.

#### SQL
```sql
-- Operación de inserción en tabla enrollments
INSERT INTO enrollments (user_id, course_id)
VALUES ('user-id', 'course-id');
```

#### Puntos de Integración
- **AuthContext**: Verifica si el usuario está autenticado antes de procesar la inscripción.
- **React Router**: Redirige al login si es necesario, o a la página de pago para cursos premium.
- **Sonner Toast**: Proporciona notificaciones sobre el resultado de la operación.

#### Flujo de Uso
1. El usuario visualiza un curso en la página de detalles.
2. Sistema verifica automáticamente si el usuario ya está inscrito.
3. Usuario hace clic en "Inscribirse" o "Inscribirse por X€".
4. Si no está autenticado, se le redirige a la página de login.
5. Si el curso es gratuito, se procesa la inscripción inmediatamente.
6. Si el curso es de pago, se redirige al proceso de checkout.
7. Tras completar la inscripción, se muestra una notificación y se redirige al contenido del curso.

#### Implementación de Seguridad
- Verifica autenticación antes de permitir inscripción.
- Valida que no exista una inscripción previa del mismo usuario al curso.
- Implementa diferentes flujos para cursos gratuitos vs. pagos.

#### Uso del Sistema
```tsx
// Ejemplo de uso del hook de inscripción
const { 
  isEnrolled, 
  isEnrolling, 
  handleEnroll, 
  checkEnrollmentStatus 
} = useEnrollment(courseId);

// Ejemplo de uso en un componente
<Button 
  onClick={handleEnroll} 
  disabled={isEnrolled || isEnrolling}
>
  {isEnrolled ? "Ya inscrito" : isEnrolling ? "Procesando..." : "Inscribirse"}
</Button>
```

#### Limitaciones y Consideraciones
- Para cursos de pago, la inscripción depende de la integración con el sistema de pagos.
- La verificación de inscripción se realiza solo del lado del cliente inicialmente.
- Se requiere verificación adicional en el servidor antes de permitir acceso a contenido restringido.

### CORE-COURSE-PROGRESS-01: Seguimiento de Progreso de Cursos

#### Resumen
Sistema que rastrea y visualiza el progreso de los estudiantes en los cursos, permitiendo marcar lecciones como completadas y mostrar el progreso general a través de indicadores visuales.

#### Componentes Clave
- **useLessonProgress**: Hook central que gestiona todas las operaciones relacionadas con el progreso.
- **CourseProgressBar**: Componente visual que muestra el porcentaje de progreso general.
- **LessonProgressControls**: Controles para marcar lecciones como completadas y navegar entre ellas.

#### Base de Datos
- Almacena registros de progreso en la tabla `lesson_progress`.
- Utiliza función SQL personalizada para calcular el porcentaje general de progreso.

#### Función SQL
```sql
CREATE OR REPLACE FUNCTION public.calculate_course_progress(
  course_id_param uuid, 
  user_id_param uuid
)
RETURNS numeric AS $$
DECLARE
  total_lessons INT;
  completed_lessons INT;
  progress NUMERIC;
BEGIN
  -- Get total number of lessons in the course
  SELECT COUNT(*) INTO total_lessons 
  FROM public.lessons 
  WHERE course_id = course_id_param;
  
  -- Get number of completed lessons by the user
  SELECT COUNT(*) INTO completed_lessons 
  FROM public.lesson_progress 
  WHERE course_id = course_id_param 
    AND user_id = user_id_param 
    AND is_completed = true;
  
  -- Calculate progress percentage (0-100)
  IF total_lessons > 0 THEN
    progress := (completed_lessons::NUMERIC / total_lessons::NUMERIC) * 100;
  ELSE
    progress := 0;
  END IF;
  
  RETURN progress;
END;
$$ LANGUAGE plpgsql;
```

#### Puntos de Integración
- **React Query**: Gestiona estados de carga y caché de datos de progreso.
- **AuthContext**: Identifica al usuario actual para filtrar datos de progreso.
- **UX Components**: Barras de progreso visuales con diferentes estilos según contexto.

#### Flujo de Uso
1. Al acceder a un curso, el sistema carga automáticamente datos de progreso existentes.
2. El usuario visualiza barras de progreso en distintos contextos (lista de cursos, página de curso).
3. Al completar una lección, el usuario puede marcarla como completada.
4. El sistema actualiza la base de datos y recalcula el progreso general.
5. Las interfaces se actualizan en tiempo real para reflejar el nuevo porcentaje de progreso.
6. En lecciones de video, el sistema también registra la última posición visualizada.

#### Implementación Técnica
- Tracking de estado `is_completed` para cada lección.
- Para videos, seguimiento adicional de `last_position` (tiempo en segundos).
- Cálculo de porcentajes en el servidor para mantener consistencia.
- Optimistic updates para mejorar la experiencia de usuario.

#### Uso del Sistema
```tsx
// Ejemplo de uso del hook de progreso
const {
  isCompleted,
  markLessonCompleted,
  updateLastPosition,
  courseProgressPercentage
} = useLessonProgress(userId, courseId, lessonId);

// Ejemplo de uso de componente de progreso
<CourseProgressBar
  progress={courseProgressPercentage}
  size="md"
  showPercentage={true}
/>
```

#### Limitaciones y Consideraciones
- El rendimiento puede verse afectado en cursos con muchas lecciones.
- El almacenamiento de posición de video solo funciona para reproductores compatibles.
- La función SQL de cálculo debe optimizarse para grandes volúmenes de datos.

### OPS-SEED-DATA-MVP-01: Datos de Prueba Iniciales

#### Resumen
Script para la creación de datos de prueba esenciales para el funcionamiento y testeo de la plataforma en sus fases iniciales. Incluye usuarios con diferentes roles, cursos con contenido variado, módulos, lecciones e inscripciones.

#### SQL Ejecutado

```sql
-- Script de creación de datos de prueba básicos para Nexo Learning
-- Creamos un administrador, un instructor y dos estudiantes para pruebas iniciales

-- Variables temporales para IDs
DO $$
DECLARE
  admin_id uuid;
  instructor_id uuid;
  student1_id uuid;
  student2_id uuid;
  course1_id uuid := gen_random_uuid();
  course2_id uuid := gen_random_uuid();
  course3_id uuid := gen_random_uuid();
  module1_id uuid := gen_random_uuid();
  module2_id uuid := gen_random_uuid();
  module3_id uuid := gen_random_uuid();
  module4_id uuid := gen_random_uuid();
  module5_id uuid := gen_random_uuid();
  lesson1_id uuid := gen_random_uuid();
  lesson2_id uuid := gen_random_uuid();
  lesson3_id uuid := gen_random_uuid();
  lesson4_id uuid := gen_random_uuid();
  lesson5_id uuid := gen_random_uuid();
  lesson6_id uuid := gen_random_uuid();
  lesson7_id uuid := gen_random_uuid();
  lesson8_id uuid := gen_random_uuid();
BEGIN
  -- Crear usuarios si no existen ya en la tabla auth.users
  -- Como no podemos crear directamente en auth.users en este contexto, creamos solo en profiles
  -- En un entorno real, estos usuarios deberían crearse primero en auth.users
  
  -- Para propósitos de prueba, verificamos si hay perfiles existentes
  SELECT id INTO admin_id FROM profiles WHERE role = 'admin' LIMIT 1;
  SELECT id INTO instructor_id FROM profiles WHERE role = 'instructor' LIMIT 1;
  
  -- Si no hay admin, usamos uno existente o generamos ID
  IF admin_id IS NULL THEN
    SELECT id INTO admin_id FROM profiles LIMIT 1;
    IF admin_id IS NULL THEN
      admin_id := gen_random_uuid();
      INSERT INTO profiles (id, full_name, role)
      VALUES (admin_id, 'Administrador Test', 'admin');
    ELSE
      -- Actualizamos rol a admin si había un usuario pero no era admin
      UPDATE profiles SET role = 'admin' WHERE id = admin_id;
    END IF;
  END IF;
  
  -- Si no hay instructor, usamos otro perfil existente o generamos ID
  IF instructor_id IS NULL THEN
    SELECT id INTO instructor_id FROM profiles WHERE id != admin_id LIMIT 1;
    IF instructor_id IS NULL THEN
      instructor_id := gen_random_uuid();
      INSERT INTO profiles (id, full_name, role)
      VALUES (instructor_id, 'Instructor Test', 'instructor');
    ELSE
      -- Actualizamos rol a instructor
      UPDATE profiles SET role = 'instructor' WHERE id = instructor_id;
    END IF;
  END IF;
  
  -- Obtener o crear estudiantes
  SELECT id INTO student1_id FROM profiles WHERE role = 'student' AND id NOT IN (admin_id, instructor_id) LIMIT 1;
  IF student1_id IS NULL THEN
    student1_id := gen_random_uuid();
    INSERT INTO profiles (id, full_name, role)
    VALUES (student1_id, 'Estudiante Uno', 'student');
  END IF;
  
  SELECT id INTO student2_id FROM profiles WHERE role = 'student' AND id NOT IN (admin_id, instructor_id, student1_id) LIMIT 1;
  IF student2_id IS NULL THEN
    student2_id := gen_random_uuid();
    INSERT INTO profiles (id, full_name, role)
    VALUES (student2_id, 'Estudiante Dos', 'student');
  END IF;
  
  -- Crear cursos (2 publicados, 1 borrador)
  INSERT INTO courses (id, instructor_id, title, description, price, currency, is_published, cover_image_url, is_featured_on_landing)
  VALUES 
    (course1_id, instructor_id, 'Desarrollo Web Frontend', 'Aprende a crear interfaces web modernas con HTML, CSS y JavaScript.', 0.00, 'eur', true, 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop', true),
    (course2_id, instructor_id, 'Python para Ciencia de Datos', 'Domina el análisis de datos con Python y sus librerías principales.', 49.99, 'eur', true, 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop', false),
    (course3_id, instructor_id, 'Introducción a DevOps', 'Aprende las metodologías y herramientas para integración y despliegue continuo.', 29.99, 'eur', false, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop', false);
  
  -- Crear módulos para el curso 1
  INSERT INTO modules (id, course_id, title, module_order)
  VALUES 
    (module1_id, course1_id, 'Fundamentos de HTML', 1),
    (module2_id, course1_id, 'Estilos con CSS', 2),
    (module3_id, course1_id, 'Interactividad con JavaScript', 3);
  
  -- Crear módulos para el curso 2
  INSERT INTO modules (id, course_id, title, module_order)
  VALUES 
    (module4_id, course2_id, 'Introducción a Python', 1),
    (module5_id, course2_id, 'Pandas y NumPy', 2);
  
  -- Crear lecciones para el curso 1, módulo 1
  INSERT INTO lessons (id, module_id, course_id, title, content_type, content_text, lesson_order, is_previewable)
  VALUES 
    (lesson1_id, module1_id, course1_id, 'Estructura básica HTML', 'text', 
     '{"content": "<h2>Estructura básica de un documento HTML</h2><p>Todo documento HTML debe comenzar con la declaración del tipo de documento:</p><pre><code>&lt;!DOCTYPE html&gt;</code></pre><p>A continuación, el documento se estructura en dos secciones principales:</p><ul><li>La cabecera (head): contiene metadatos y enlaces a recursos externos</li><li>El cuerpo (body): contiene el contenido visible del documento</li></ul>"}', 
     1, true),
    (lesson2_id, module1_id, course1_id, 'Elementos semánticos', 'text', 
     '{"content": "<h2>Elementos semánticos en HTML5</h2><p>HTML5 introdujo varios elementos semánticos que dan significado a las partes de una página web:</p><ul><li><strong>header</strong>: encabezado de la página o sección</li><li><strong>nav</strong>: navegación principal</li><li><strong>main</strong>: contenido principal</li><li><strong>article</strong>: contenido independiente</li><li><strong>section</strong>: sección temática</li><li><strong>footer</strong>: pie de página</li></ul>"}', 
     2, false);
  
  -- Crear lecciones para el curso 1, módulo 2
  INSERT INTO lessons (id, module_id, course_id, title, content_type, content_text, lesson_order, is_previewable)
  VALUES 
    (lesson3_id, module2_id, course1_id, 'Selectores CSS', 'text', 
     '{"content": "<h2>Selectores CSS</h2><p>Los selectores determinan a qué elementos se aplican los estilos CSS:</p><ul><li><strong>Selector de elemento</strong>: selecciona todos los elementos de un tipo (ej: <code>p</code>)</li><li><strong>Selector de clase</strong>: selecciona elementos con una clase específica (ej: <code>.miClase</code>)</li><li><strong>Selector de ID</strong>: selecciona un elemento por su ID (ej: <code>#miID</code>)</li><li><strong>Selector descendiente</strong>: selecciona elementos anidados (ej: <code>div p</code>)</li></ul>"}', 
     1, false),
    (lesson4_id, module2_id, course1_id, 'Flexbox y Grid', 'video', 
     null, 
     2, true);
  
  -- Añadir URL de video a la lección de tipo video
  UPDATE lessons SET content_video_url = 'https://www.youtube.com/embed/JJSoEo8JSnc' WHERE id = lesson4_id;
  
  -- Crear lecciones para el curso 1, módulo 3
  INSERT INTO lessons (id, module_id, course_id, title, content_type, content_text, lesson_order, is_previewable)
  VALUES 
    (lesson5_id, module3_id, course1_id, 'Introducción a JavaScript', 'text', 
     '{"content": "<h2>Introducción a JavaScript</h2><p>JavaScript es un lenguaje de programación que permite crear interactividad en las páginas web. Algunas características básicas:</p><ul><li>Variables y tipos de datos</li><li>Operadores</li><li>Estructuras de control</li><li>Funciones</li></ul><p>JavaScript se puede incluir directamente en el HTML o en archivos externos con extensión .js</p>"}', 
     1, false);
  
  -- Crear lecciones para el curso 2, módulo 1
  INSERT INTO lessons (id, module_id, course_id, title, content_type, content_text, lesson_order, is_previewable)
  VALUES 
    (lesson6_id, module4_id, course2_id, 'Sintaxis básica de Python', 'text', 
     '{"content": "<h2>Sintaxis básica de Python</h2><p>Python es conocido por su sintaxis limpia y legible:</p><pre><code># Este es un comentario\nprint(\"Hola mundo\")  # Imprime texto en consola\n\n# Variables\nnombre = \"Python\"\nversion = 3.9\n\n# Estructuras de control\nif version > 3:\n    print(f\"{nombre} versión {version} es moderna\")\nelse:\n    print(\"Versión antigua\")</code></pre>"}', 
     1, true),
    (lesson7_id, module4_id, course2_id, 'Estructuras de datos', 'text', 
     '{"content": "<h2>Estructuras de datos en Python</h2><p>Python ofrece varias estructuras de datos incorporadas:</p><ul><li><strong>Listas</strong>: colecciones ordenadas y mutables</li><li><strong>Tuplas</strong>: colecciones ordenadas e inmutables</li><li><strong>Diccionarios</strong>: colecciones no ordenadas de pares clave-valor</li><li><strong>Conjuntos</strong>: colecciones no ordenadas de elementos únicos</li></ul>"}', 
     2, false);
  
  -- Crear lecciones para el curso 2, módulo 2
  INSERT INTO lessons (id, module_id, course_id, title, content_type, content_video_url, lesson_order, is_previewable)
  VALUES 
    (lesson8_id, module5_id, course2_id, 'Introducción a Pandas', 'video', 
     'https://www.youtube.com/embed/vmEHCJofslg', 
     1, false);
  
  -- Inscribir estudiantes en cursos
  INSERT INTO enrollments (user_id, course_id)
  VALUES 
    (student1_id, course1_id),
    (student1_id, course2_id),
    (student2_id, course1_id);
  
  -- Añadir progreso de lecciones para el estudiante 1
  INSERT INTO lesson_progress (user_id, lesson_id, course_id, is_completed, completion_date)
  VALUES 
    (student1_id, lesson1_id, course1_id, true, now()),
    (student1_id, lesson2_id, course1_id, true, now()),
    (student1_id, lesson3_id, course1_id, false, null);
  
  -- Añadir algunos comentarios en lecciones
  INSERT INTO comments (user_id, lesson_id, content)
  VALUES 
    (student1_id, lesson1_id, 'Excelente explicación de la estructura HTML. Muy claro y conciso.'),
    (instructor_id, lesson1_id, '¡Gracias por tu comentario! Recuerda que puedes practicar estos conceptos en los ejercicios de la siguiente unidad.'),
    (student2_id, lesson6_id, 'Me encanta la sintaxis de Python. Es mucho más legible que otros lenguajes que he probado antes.');

END $$;

-- Mensaje de finalización
DO $$
BEGIN
  RAISE NOTICE 'Datos de prueba creados con éxito para Nexo Learning MVP.';
END $$;
```

#### Datos Generados

- **Usuarios**:
  - 1 Administrador: "Administrador Test"
  - 1 Instructor: "Instructor Test"
  - 2 Estudiantes: "Estudiante Uno" y "Estudiante Dos"

- **Cursos**:
  - "Desarrollo Web Frontend" (Publicado, Destacado, Gratuito)
  - "Python para Ciencia de Datos" (Publicado, De pago: 49.99€)
  - "Introducción a DevOps" (Borrador, De pago: 29.99€)

- **Módulos**:
  - 3 módulos para "Desarrollo Web Frontend"
  - 2 módulos para "Python para Ciencia de Datos"

- **Lecciones**:
  - 5 lecciones para "Desarrollo Web Frontend" (2 previewables, 1 video)
  - 3 lecciones para "Python para Ciencia de Datos" (1 previewable, 1 video)

- **Inscripciones**:
  - Estudiante Uno: inscrito en ambos cursos publicados
  - Estudiante Dos: inscrito en "Desarrollo Web Frontend"

- **Progreso**:
  - Estudiante Uno: 2 lecciones completadas en "Desarrollo Web Frontend"

- **Comentarios**:
  - 3 comentarios distribuidos en distintas lecciones, incluyendo respuestas del instructor

#### Consideraciones
- Este seed proporciona datos mínimos pero suficientes para probar las funcionalidades de Fase 1 y 2.
- No se han generado datos para funcionalidades avanzadas aún no implementadas.
- En un entorno de producción, se recomienda usar datos más realistas y diversos.
