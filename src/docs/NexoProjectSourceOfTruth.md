
# NEXO LEARNING PROJECT - SOURCE OF TRUTH (v1.7)

## PARTE I: GUÍA DE PROYECTO

### Visión General

Nexo Learning es una plataforma educativa en línea diseñada para facilitar el aprendizaje continuo y el desarrollo profesional. La plataforma permite a instructores crear y publicar cursos, y a estudiantes inscribirse y acceder a contenido educativo estructurado.

### Propósito y Objetivos

- **Accesibilidad**: Proporcionar educación de calidad accesible desde cualquier lugar y dispositivo.
- **Flexibilidad**: Ofrecer contenidos adaptados a diferentes ritmos y estilos de aprendizaje.
- **Comunidad**: Fomentar la interacción entre estudiantes e instructores para enriquecer la experiencia educativa.
- **Innovación**: Incorporar tecnologías emergentes para mejorar constantemente la experiencia de aprendizaje.

### Flujo de Trabajo Principal

1. **Registro e Inicio de Sesión**:
   - Los usuarios se registran especificando si son estudiantes o instructores.
   - Sistema de autenticación seguro con múltiples opciones de inicio de sesión.

2. **Creación de Cursos (Instructores)**:
   - Interfaz intuitiva para estructurar módulos y lecciones.
   - Opciones para incluir contenido multimedia, textos, evaluaciones y recursos descargables.
   - Herramientas de previsualización y publicación.

3. **Exploración y Matrícula (Estudiantes)**:
   - Catálogo navegable con filtros y búsqueda.
   - Páginas detalladas de cursos con información completa antes de la matrícula.
   - Proceso simplificado de inscripción con opciones para cursos gratuitos y de pago.

4. **Aprendizaje Activo**:
   - Interfaz de aprendizaje dedicada con seguimiento de progreso.
   - Sistema de comentarios y preguntas por lección.
   - Evaluaciones integradas con retroalimentación instantánea.

5. **Análisis y Mejora Continua**:
   - Estadísticas detalladas para instructores sobre el rendimiento de sus cursos.
   - Retroalimentación de los estudiantes para mejora continua.
   - Actualización de contenidos para mantener la relevancia.

### Instrucciones para el Desarrollo

- **Enfoque Mobile-First**: Garantizar una experiencia óptima en dispositivos móviles como prioridad.
- **Accesibilidad Web**: Cumplir con los estándares WCAG 2.1 AA para garantizar que la plataforma sea accesible para usuarios con discapacidades.
- **Internacionalización**: Preparar la arquitectura para soportar múltiples idiomas en futuras iteraciones.
- **Seguridad**: Implementar las mejores prácticas de seguridad en todos los aspectos de la plataforma.
- **Escalabilidad**: Diseñar la arquitectura para soportar crecimiento en usuarios y contenido.
- **Usabilidad**: Priorizar interfaces intuitivas con retroalimentación clara para todas las acciones.

## PARTE II: DOCUMENTACIÓN TÉCNICA

### Stack Tecnológico

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

### Arquitectura

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

### Estructura de Base de Datos

#### Tablas Principales

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
  - `content_type`: Enum ('text', 'video')
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

#### Funciones de Base de Datos

- **handle_new_user()**: Crea un perfil automáticamente cuando se registra un nuevo usuario.
- **calculate_course_progress()**: Calcula el porcentaje de progreso de un usuario en un curso.
- **get_user_role()**: Devuelve el rol de un usuario específico.
- **handle_updated_at()**: Actualiza el campo updated_at automáticamente.

### Navegación y Control de Acceso

La aplicación implementa diferentes rutas y niveles de acceso según el rol del usuario:

#### Rutas Públicas
- `/`: Página de inicio
- `/auth/login`: Inicio de sesión
- `/auth/register`: Registro
- `/courses`: Catálogo de cursos
- `/courses/:id`: Detalles de un curso específico
- `/about-us`: Acerca de nosotros
- `/scholarships`: Becas

#### Rutas Protegidas (requieren autenticación)
- `/home`: Dashboard general
- `/profile`: Perfil de usuario
- `/my-courses`: Cursos del estudiante
- `/courses/:courseId/learn`: Interfaz de aprendizaje
- `/courses/:courseId/learn/:lessonId`: Visualización de lección
- `/checkout/:courseId`: Proceso de pago para cursos de pago

#### Rutas de Instructor (requieren rol 'instructor')
- `/instructor/dashboard`: Panel de control del instructor
- `/instructor/students`: Gestión de estudiantes
- `/instructor/courses`: Listado de cursos del instructor
- `/instructor/courses/new`: Creación de nuevo curso
- `/instructor/courses/:id/edit`: Edición de detalles del curso
- `/instructor/courses/:id/structure`: Edición de estructura del curso
- `/instructor/courses/:courseId/lessons/:lessonId/edit`: Edición de lección

#### Rutas de Administrador (requieren rol 'admin')
- `/admin/dashboard`: Panel de administración
- `/admin/content`: Gestión de contenido
- `/admin/test-data`: Herramientas de gestión de datos de prueba

### Funcionalidades Implementadas

## CORE-UI-EDIT-01: Edición Inline y Reordenamiento de Contenido

### Resumen
Sistema que permite a los administradores editar textos directamente en la página y reorganizar elementos de la interfaz. Proporciona feedback visual y notificaciones durante la edición.

### Componentes Clave
- **EditModeContext**: Gestiona el estado global del modo de edición y proporciona funciones para actualizar textos y reordenar elementos.
- **InlineEdit**: Componente que convierte cualquier elemento en un campo editable cuando se activa el modo de edición.
- **DraggableContent**: Componente que permite reordenar elementos mediante arrastrar y soltar cuando el modo de edición está activo.

### Base de Datos
- Utiliza tablas existentes con campos de texto editables.
- Para la reordenación, requiere campos de orden en las tablas correspondientes.

### Puntos de Integración
- **EditModeToggle**: Botón en la barra de navegación para activar/desactivar el modo de edición.
- **Toasts**: Proporciona retroalimentación sobre las acciones de edición y reordenamiento.
- **Sonner**: Librería utilizada para las notificaciones toast.

### Flujo de Uso
1. El administrador activa el modo de edición desde la barra de navegación.
2. Los textos editables muestran indicadores visuales al pasar el cursor.
3. Al hacer clic en un texto, aparece un campo de entrada con botones de guardar/cancelar.
4. Para reordenar elementos, el administrador arrastra los items usando los controladores visibles.
5. Al desactivar el modo de edición, todas las modificaciones quedan guardadas y se muestra una notificación.

### Implementación de Seguridad
- Solo los usuarios con rol de administrador pueden ver y utilizar el toggle de edición.
- Las operaciones de actualización están protegidas mediante RLS a nivel de BD.
- Validaciones para evitar textos vacíos o incorrectos.

### Uso del Sistema
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

### Limitaciones y Consideraciones
- La edición inline está diseñada principalmente para textos y no para contenido enriquecido.
- El reordenamiento funciona mejor con colecciones homogéneas de elementos.
- Requiere configuración de la base de datos con campos de orden apropiados.

## CORE-PROFILE-EDIT-01: Edición Básica de Perfil

### Resumen
Funcionalidad que permite a los usuarios editar y actualizar su nombre completo en su perfil desde la interfaz de usuario. Proporciona validación de datos, retroalimentación visual y notificaciones sobre el resultado de la operación.

### Componentes Clave
- **useProfileEdit**: Hook personalizado que utiliza React Query para manejar la mutación de actualización del perfil.
- **ProfileEditForm**: Componente de formulario que utiliza React Hook Form para la validación y gestión del estado del formulario.
- **Form**: Componentes de shadcn/ui utilizados para construir el formulario con un diseño consistente.

### Base de Datos
- Actualiza el campo `full_name` en la tabla `profiles` para el usuario autenticado.
- Utiliza la función `update` de Supabase para modificar el registro correspondiente.

### SQL
```sql
-- Esta funcionalidad utiliza la tabla profiles existente
-- Operación de actualización:
UPDATE profiles
SET full_name = 'Nuevo Nombre', updated_at = now()
WHERE id = 'user-id';
```

### Puntos de Integración
- **AuthContext**: Obtiene información del usuario autenticado.
- **React Query**: Gestiona el estado de la mutación (loading, error, success).
- **Sonner Toast**: Proporciona notificaciones de éxito o error.

### Flujo de Uso
1. El usuario navega a la página de perfil (`/profile`).
2. El usuario hace clic en el botón "Editar Perfil".
3. Se muestra un formulario con el nombre actual prellenado.
4. El usuario modifica su nombre y hace clic en "Guardar cambios".
5. Se valida el formulario (nombre no vacío y mínimo 2 caracteres).
6. Se envía la solicitud a Supabase para actualizar el perfil.
7. Se muestra una notificación de éxito o error según corresponda.
8. En caso de éxito, la interfaz se actualiza para mostrar el nuevo nombre.

### Implementación de Seguridad
- La actualización está limitada al propio perfil del usuario autenticado.
- Validación en el cliente para garantizar datos correctos.
- El campo de rol está deshabilitado para evitar modificaciones no autorizadas.
- Las operaciones de actualización requieren autenticación válida en Supabase.

### Uso del Sistema
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

### Limitaciones y Consideraciones
- Solo permite editar el nombre completo, no otros campos del perfil.
- El campo de rol se muestra pero está deshabilitado (solo administradores pueden cambiar roles).
- Se requiere un mínimo de 2 caracteres para el nombre para asegurar datos válidos.

## CORE-INSTRUCTOR-STATS-01: Panel de Estadísticas para Instructores

### Resumen
Panel de control que proporciona a los instructores información estadística sobre sus cursos, incluyendo conteo de cursos, inscripciones y datos de popularidad. Diseñado para facilitar el seguimiento y la toma de decisiones.

### Componentes Clave
- **useDashboardStats**: Hook personalizado que centraliza todas las consultas a la base de datos para obtener estadísticas relevantes.
- **DashboardStatCard**: Componente visual para mostrar estadísticas individuales con iconos y formateo apropiado.
- **PopularCoursesCard**: Tarjeta que muestra los cursos más populares del instructor basado en inscripciones.
- **RecentEnrollmentsCard**: Listado de las inscripciones más recientes con información del estudiante y curso.

### Base de Datos
- Utiliza consultas a múltiples tablas relacionadas: `courses`, `enrollments`, y `profiles`.
- Emplea joins y agregaciones para calcular estadísticas relevantes.
- Maneja estructuras de datos anidadas resultantes de consultas de join en Supabase.

### Puntos de Integración
- **AuthContext**: Identifica al instructor actual para filtrar estadísticas relevantes.
- **React Query**: Gestiona el estado de las consultas y su actualización.
- **Recharts**: Biblioteca utilizada para visualización de datos estadísticos.

### Flujo de Datos
1. El hook `useDashboardStats` realiza múltiples consultas a Supabase:
   - Cuenta de cursos totales del instructor
   - Cuenta de cursos publicados
   - Total de inscripciones en todos sus cursos
   - Listado de inscripciones recientes
   - Cursos más populares por número de inscripciones

2. Los datos se transforman para manejar correctamente las estructuras de datos anidadas que provienen de los joins en Supabase, especialmente para las relaciones entre tablas.

3. Los componentes visuales consumen estos datos para presentarlos en formato amigable.

### Implementación Técnica
- Manejo cuidadoso de arrays de resultados en joins de Supabase, asegurando acceso seguro a propiedades anidadas.
- Gestión de estados de carga y error para cada consulta.
- Transformación de datos para facilitar su uso en componentes.

### Uso del Sistema
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

### Limitaciones y Consideraciones
- El rendimiento puede verse afectado con un gran volumen de datos.
- Para instructores con muchos cursos, se recomienda implementar paginación adicional.
- La estructura de datos requiere validación cuidadosa debido a los joins anidados de Supabase.

## CORE-ENROLL-01: Sistema de Inscripción a Cursos

### Resumen
Funcionalidad que permite a los estudiantes inscribirse en cursos, gestionando de forma diferenciada los cursos gratuitos y de pago, con validaciones de autenticación y retroalimentación en cada paso del proceso.

### Componentes Clave
- **useEnrollment**: Hook personalizado que maneja la lógica de inscripción y verifica el estado actual.
- **CourseEnrollCard**: Componente que muestra información del curso y botón de inscripción adaptado según estado.

### Base de Datos
- Crea registros en la tabla `enrollments` relacionando usuarios con cursos.
- Verifica estado de inscripción consultando registros existentes.

### SQL
```sql
-- Operación de inserción en tabla enrollments
INSERT INTO enrollments (user_id, course_id)
VALUES ('user-id', 'course-id');
```

### Puntos de Integración
- **AuthContext**: Verifica si el usuario está autenticado antes de procesar la inscripción.
- **React Router**: Redirige al login si es necesario, o a la página de pago para cursos premium.
- **Sonner Toast**: Proporciona notificaciones sobre el resultado de la operación.

### Flujo de Uso
1. El usuario visualiza un curso en la página de detalles.
2. Sistema verifica automáticamente si el usuario ya está inscrito.
3. Usuario hace clic en "Inscribirse" o "Inscribirse por X€".
4. Si no está autenticado, se le redirige a la página de login.
5. Si el curso es gratuito, se procesa la inscripción inmediatamente.
6. Si el curso es de pago, se redirige al proceso de checkout.
7. Tras completar la inscripción, se muestra una notificación y se redirige al contenido del curso.

### Implementación de Seguridad
- Verifica autenticación antes de permitir inscripción.
- Valida que no exista una inscripción previa del mismo usuario al curso.
- Implementa diferentes flujos para cursos gratuitos vs. pagos.

### Uso del Sistema
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

### Limitaciones y Consideraciones
- Para cursos de pago, la inscripción depende de la integración con el sistema de pagos.
- La verificación de inscripción se realiza solo del lado del cliente inicialmente.
- Se requiere verificación adicional en el servidor antes de permitir acceso a contenido restringido.

## CORE-COURSE-PROGRESS-01: Seguimiento de Progreso de Cursos

### Resumen
Sistema que rastrea y visualiza el progreso de los estudiantes en los cursos, permitiendo marcar lecciones como completadas y mostrar el progreso general a través de indicadores visuales.

### Componentes Clave
- **useLessonProgress**: Hook central que gestiona todas las operaciones relacionadas con el progreso.
- **CourseProgressBar**: Componente visual que muestra el porcentaje de progreso general.
- **LessonProgressControls**: Controles para marcar lecciones como completadas y navegar entre ellas.

### Base de Datos
- Almacena registros de progreso en la tabla `lesson_progress`.
- Utiliza función SQL personalizada para calcular el porcentaje general de progreso.

### Función SQL
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

### Puntos de Integración
- **React Query**: Gestiona estados de carga y caché de datos de progreso.
- **AuthContext**: Identifica al usuario actual para filtrar datos de progreso.
- **UX Components**: Barras de progreso visuales con diferentes estilos según contexto.

### Flujo de Uso
1. Al acceder a un curso, el sistema carga automáticamente datos de progreso existentes.
2. El usuario visualiza barras de progreso en distintos contextos (lista de cursos, página de curso).
3. Al completar una lección, el usuario puede marcarla como completada.
4. El sistema actualiza la base de datos y recalcula el progreso general.
5. Las interfaces se actualizan en tiempo real para reflejar el nuevo porcentaje de progreso.
6. En lecciones de video, el sistema también registra la última posición visualizada.

### Implementación Técnica
- Tracking de estado `is_completed` para cada lección.
- Para videos, seguimiento adicional de `last_position` (tiempo en segundos).
- Cálculo de porcentajes en el servidor para mantener consistencia.
- Optimistic updates para mejorar la experiencia de usuario.

### Uso del Sistema
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

### Limitaciones y Consideraciones
- El rendimiento puede verse afectado en cursos con muchas lecciones.
- El almacenamiento de posición de video solo funciona para reproductores compatibles.
- La función SQL de cálculo debe optimizarse para grandes volúmenes de datos.

## PARTE III: ROADMAP FUNCIONAL

### Resumen de Fases

#### Fase 1: Estructura Base y Funcionalidades Core
- [x] Configuración inicial del proyecto
- [x] Sistema de autenticación y gestión de usuarios
- [x] Creación y visualización de cursos
- [x] Funcionalidades esenciales de aprendizaje

#### Fase 2: Mejora de Experiencia de Usuario y Monetización
- [🧪] Mejoras de UX para instructores y estudiantes
- [🧪] Sistema de pagos y suscripciones
- [ ] Gamificación inicial y recompensas

#### Fase 3: Interacción Social y Personalización
- [ ] Comunidad y características sociales
- [ ] Recomendaciones personalizadas
- [ ] Sistema avanzado de evaluación y certificación

#### Fase 4: Expansión e Integración
- [ ] Marketplace de instructores
- [ ] Integraciones con herramientas de terceros
- [ ] Características para empresas y equipos

### Funcionalidades Planificadas por Fase

#### Fase 1: Estructura Base y Funcionalidades Core

##### CORE-AUTH-01: Sistema Base de Autenticación
- [x] Implementación del sistema de registro, inicio de sesión y gestión de perfiles básicos.
- Incluye páginas de registro y login, verificación de correo, y recuperación de contraseña.

##### CORE-ROLES-01: Sistema de Roles y Permisos
- [x] Establecimiento de roles (estudiante, instructor, admin) con sus respectivos permisos y vistas.
- Incluye navegación adaptada según rol y protección de rutas.

##### CORE-COURSE-CREATE-01: Creación Básica de Cursos
- [x] Funcionalidad para que instructores creen cursos con información básica y estructura modular.
- Incluye formularios de creación, edición y gestión de estructura de módulos/lecciones.

##### CORE-COURSE-VIEW-01: Visualización de Cursos
- [x] Interfaces para explorar el catálogo de cursos, ver detalles y previsualizar contenido.
- Incluye listado, filtrado y páginas detalladas de cursos.

##### CORE-LEARN-01: Interfaz de Aprendizaje
- [x] Sistema para que estudiantes accedan a las lecciones de cursos a los que están inscritos.
- Incluye reproductor de contenido, navegación entre lecciones y seguimiento básico.

##### CORE-ENROLL-01: Sistema de Inscripción a Cursos
- [x] Funcionalidad para que estudiantes se inscriban en cursos gratuitos o de pago.
- Incluye verificación de inscripción y acceso diferenciado para usuarios inscritos.

##### CORE-COURSE-PROGRESS-01: Seguimiento de Progreso de Cursos
- [x] Sistema para rastrear y visualizar el progreso de los estudiantes en los cursos.
- Incluye marcado de lecciones completadas y barras de progreso.

##### CORE-UI-EDIT-01: Edición Inline y Reordenamiento de Contenido
- [x] Sistema para edición in-situ de contenido para administradores.
- Incluye edición de textos y reordenamiento de elementos vía drag-and-drop.

##### CORE-PROFILE-EDIT-01: Edición Básica de Perfil
- [x] Funcionalidad para que usuarios editen su información personal básica.
- Incluye formulario de edición con validación y feedback.

##### CORE-INSTRUCTOR-STATS-01: Panel de Estadísticas para Instructores
- [x] Dashboard con métricas relevantes para instructores sobre sus cursos.
- Incluye contador de inscripciones, popularidad de cursos y tendencias.

#### Fase 2: Mejora de Experiencia de Usuario y Monetización

##### UX-COMMENTS-01: Sistema de Comentarios en Lecciones
- [🧪] Funcionalidad para que estudiantes comenten lecciones y respondan a otros comentarios.
- Incluye hilo de discusión, notificaciones y moderación básica.

##### PAY-STRIPE-01: Integración de Pagos con Stripe
- [ ] Sistema para procesar pagos de cursos mediante la plataforma Stripe.
- Incluye checkout, confirmación de pago y gestión de transacciones.

##### UX-LESSON-NOTES-01: Notas Personales en Lecciones
- [ ] Funcionalidad para que estudiantes tomen notas privadas durante las lecciones.
- Incluye editor de texto, guardado automático y exportación.

##### UX-COURSE-REVIEWS-01: Sistema de Reseñas y Valoraciones
- [ ] Sistema para que estudiantes califiquen y escriban reseñas sobre los cursos completados.
- Incluye promedio de valoraciones, filtrado por estrellas y respuestas de instructores.

##### UX-DASHBOARD-01: Dashboard Personalizado para Estudiantes
- [ ] Página de inicio personalizada con resumen de actividad, cursos en progreso y recomendaciones.
- Incluye widgets configurables y accesos rápidos.

##### GAM-BADGES-01: Sistema Básico de Insignias y Logros
- [ ] Mecanismo de recompensas virtuales por completar cursos y alcanzar hitos de aprendizaje.
- Incluye visualización de insignias en perfil y notificaciones de logros.

#### Fase 3: Interacción Social y Personalización

##### SOCIAL-CONNECT-01: Conexiones entre Estudiantes
- [ ] Funcionalidad para que estudiantes se conecten, sigan perfiles y compartan actividad.
- Incluye búsqueda de usuarios, perfiles públicos y feed de actividad.

##### SOCIAL-GROUPS-01: Grupos de Estudio
- [ ] Sistema para crear y unirse a grupos relacionados con cursos o temas específicos.
- Incluye foros grupales, recursos compartidos y eventos.

##### PERSONALIZE-RECOMMEND-01: Motor de Recomendaciones
- [ ] Algoritmo para sugerir cursos relevantes basados en intereses y comportamiento previo.
- Incluye secciones "Cursos recomendados para ti" y emails personalizados.

##### CERT-ADVANCED-01: Certificaciones Avanzadas
- [ ] Sistema completo de evaluación y certificación oficial para cursos completados.
- Incluye exámenes cronometrados, verificación de identidad y certificados descargables/compartibles.

#### Fase 4: Expansión e Integración

##### MARKET-AFFILIATE-01: Programa de Afiliados
- [ ] Sistema para que usuarios promocionen cursos y ganen comisiones por inscripciones.
- Incluye enlaces de afiliado, tracking y dashboard de ganancias.

##### MARKET-SUBSCRIPTIONS-01: Modelo de Suscripción
- [ ] Opción para ofrecer acceso a múltiples cursos mediante suscripciones recurrentes.
- Incluye planes mensuales/anuales, beneficios por nivel y gestión de suscripciones.

##### INTEGRATE-CALENDAR-01: Integración con Calendarios
- [ ] Sincronización con Google Calendar, Outlook y otras herramientas de calendario.
- Incluye programación de sesiones de estudio y recordatorios personalizables.

##### TEAMS-CORPORATE-01: Funcionalidades para Equipos
- [ ] Herramientas para empresas que quieran ofrecer formación a sus empleados.
- Incluye administración de grupos, informes de progreso y facturación corporativa.

##### AI-ASSIST-01: Asistente de Aprendizaje con IA
- [ ] Asistente inteligente que responde preguntas y proporciona recursos adicionales.
- Incluye respuestas contextuales según el contenido de la lección y tracking de conceptos difíciles.

**Leyenda:**
- [ ] = Pendiente de implementación
- [🧪] = En fase de pruebas/verificación
- [x] = Implementado y verificado
