
# Módulo de Cursos

## Visión General

El módulo de cursos gestiona la creación, publicación, visualización y consumo de contenido educativo. Es uno de los módulos centrales de la plataforma, permitiendo a instructores crear cursos estructurados y a estudiantes consumirlos.

## Componentes Principales

### Páginas

- **CoursesList**: Catálogo de cursos disponibles
- **CourseDetail**: Vista detallada de un curso
- **CourseLanding**: Página de presentación/ventas de un curso
- **CourseLesson**: Visualizador de lecciones
- **CourseEditor**: Editor para creación/modificación de cursos (instructores)

### Componentes UI

- **CourseCard**: Tarjeta para visualización en listados
- **CourseSidebar**: Navegación lateral de módulos/lecciones
- **LessonContent**: Visualizador de contenido de lección
- **ModuleAccordion**: Acordeón expandible de módulos
- **LessonPlayer**: Reproductor multimedia para lecciones

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/app/courses` | CoursesList | Catálogo de cursos |
| `/app/courses/:slug` | CourseDetail | Detalles del curso |
| `/app/courses/:courseId/learn` | CourseLearn | Vista de aprendizaje |
| `/app/courses/:courseId/lesson/:lessonId` | LessonView | Visualización de lección |
| `/app/instructor/courses` | InstructorCourses | Cursos del instructor |
| `/app/instructor/courses/create` | CreateCourse | Creación de curso |
| `/app/instructor/courses/:id/edit` | EditCourse | Edición de curso |
| `/app/admin/courses` | AdminCourses | Gestión administrativa de cursos |

## Hooks Personalizados

- **useCourses**: Obtención y filtrado de cursos
- **useCourseDetail**: Detalles completos de un curso
- **useLesson**: Gestión de lección actual
- **useEnrollment**: Manejo de inscripciones
- **useProgress**: Seguimiento de progreso del estudiante
- **useCourseEditor**: Lógica para creación/edición de cursos

## Modelo de Datos

El módulo trabaja principalmente con estas tablas:

- `courses`: Información general del curso
- `modules`: Módulos dentro de un curso
- `lessons`: Lecciones dentro de módulos
- `enrollments`: Registro de inscripciones
- `lesson_progress`: Seguimiento de progreso
- `comments`: Comentarios en lecciones
- `categories`: Categorización de cursos
- `course_categories`: Relación curso-categoría

## Flujos de Trabajo Principales

### Estudiante - Visualización de Curso

1. Navegación por catálogo de cursos
2. Visualización de página de detalle
3. Inscripción en curso
4. Navegación por contenido (módulos/lecciones)
5. Consumo de lecciones
6. Seguimiento automático de progreso

### Instructor - Creación de Curso

1. Creación de curso con información básica
2. Configuración de precios y disponibilidad
3. Creación de módulos
4. Creación de lecciones dentro de módulos
5. Carga de contenido (texto, video, etc.)
6. Publicación del curso

## Estado Actual

- ✅ Listado de cursos implementado
- ✅ Página de detalle de curso funcional
- ✅ Visualizador de lecciones básico implementado
- ✅ Inscripción en cursos funcional
- 🔄 Seguimiento de progreso en desarrollo
- 🔄 Editor de cursos en desarrollo
- ⏱️ Sistema de comentarios pendiente
- ⏱️ Cuestionarios y certificados pendientes

## API y Funciones

### Consultas Principales

- **getCourses**: Obtiene listado de cursos con filtros
- **getCourseDetail**: Obtiene curso con módulos y lecciones
- **getLessonContent**: Obtiene contenido específico de lección
- **trackProgress**: Registra progreso en lección

### Mutaciones

- **enrollInCourse**: Inscribe usuario en curso
- **createCourse**: Crea nuevo curso
- **updateCourse**: Actualiza información de curso
- **createModule**: Crea nuevo módulo
- **createLesson**: Crea nueva lección

## Consideraciones de Rendimiento

- Carga progresiva de módulos y lecciones para cursos grandes
- Pre-fetching del siguiente contenido para transición fluida
- Caché local de progreso para reducir peticiones al servidor
- Optimización de imágenes de portadas de cursos

## Próximas Mejoras

- Sistema avanzado de filtrado y búsqueda
- Soporte para múltiples formatos de contenido
- Cuestionarios interactivos
- Certificados descargables
- Sistema de calificaciones y revisión de tareas
- Estadísticas detalladas para instructores
