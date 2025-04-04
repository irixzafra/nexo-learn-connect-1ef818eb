
# Modelo de Datos de Nexo Learning

## Visión General del Esquema

La base de datos de Nexo Learning está estructurada en PostgreSQL y organizada en grupos lógicos según el dominio. A continuación se presenta el modelo de datos principal con las tablas más importantes y sus relaciones.

## Entidades Principales

### Usuarios y Autenticación

- **profiles**: Almacena información de perfil de usuarios
  - `id` (PK, UUID): ID del usuario (referencia a auth.users)
  - `full_name`: Nombre completo del usuario
  - `email`: Correo electrónico
  - `role`: Rol principal del usuario

  > **Nota sobre roles**: El campo `role` en `profiles` almacena el rol principal y activo del usuario (admin, instructor, participante). Aunque un usuario puede tener múltiples roles asignados en `user_roles`, este campo indica el rol por defecto o el último activamente seleccionado. Las comprobaciones de permisos específicos deben consultar `user_roles` para una verificación más granular.

- **user_roles**: Asignación de roles a usuarios (relación muchos a muchos)
  - `id` (PK, UUID): ID único de asignación
  - `user_id` (FK → profiles.id): Usuario
  - `role_id` (FK → roles.id): Rol asignado

- **roles**: Definición de roles en el sistema
  - `id` (PK, UUID): ID único del rol
  - `name`: Nombre del rol (admin, instructor, participante, etc.)
  - `description`: Descripción del rol

- **permissions**: Permisos individuales
  - `id` (PK, UUID): ID único del permiso
  - `name`: Nombre del permiso
  - `code`: Código único del permiso
  - `description`: Descripción

- **role_permissions**: Asignación de permisos a roles
  - `id` (PK, UUID): ID único de asignación
  - `role_id` (FK → roles.id): Rol
  - `permission_id` (FK → permissions.id): Permiso asignado

### Cursos y Contenido Educativo

- **courses**: Cursos disponibles en la plataforma
  - `id` (PK, UUID): ID único del curso
  - `title`: Título del curso
  - `description`: Descripción detallada
  - `instructor_id` (FK → profiles.id): Creador/profesor
  - `price`: Precio del curso
  - `is_published`: Estado de publicación
  - `cover_image_url`: URL de imagen de portada
  - `level`: Nivel de dificultad
  - `category`: Categoría principal
  - `tags`: Etiquetas (array)
  - `grants_certificate`: Si otorga certificado
  - `slug`: URL amigable para SEO

- **modules**: Módulos dentro de un curso
  - `id` (PK, UUID): ID único del módulo
  - `title`: Título del módulo
  - `course_id` (FK → courses.id): Curso al que pertenece
  - `module_order`: Orden del módulo en el curso

- **lessons**: Lecciones dentro de módulos
  - `id` (PK, UUID): ID único de la lección
  - `title`: Título de la lección
  - `module_id` (FK → modules.id): Módulo al que pertenece
  - `course_id` (FK → courses.id): Curso (para consultas directas)
  - `content_type`: Tipo de contenido (video, text, etc.)
  - `content_text`: Contenido en texto/HTML (JSONB)
  - `content_video_url`: URL del video si aplica
  - `lesson_order`: Orden dentro del módulo
  - `is_previewable`: Si es visible sin estar inscrito

- **enrollments**: Participaciones de usuarios a cursos
  - `id` (PK, UUID): ID único de participación
  - `user_id` (FK → profiles.id): Usuario participante
  - `course_id` (FK → courses.id): Curso
  - `enrolled_at`: Fecha de participación

- **lesson_progress**: Progreso de usuarios en lecciones
  - `id` (PK, UUID): ID único del registro
  - `user_id` (FK → profiles.id): Usuario
  - `lesson_id` (FK → lessons.id): Lección
  - `course_id` (FK → courses.id): Curso (para consultas directas)
  - `is_completed`: Si está completada
  - `completion_date`: Fecha de finalización
  - `last_position`: Posición del último acceso (para videos)

### Sistema de Evaluación

- **quizzes**: Valoraciones/retos
  - `id` (PK, UUID): ID único de la valoración
  - `title`: Título del quiz
  - `description`: Descripción
  - `course_id` (FK → courses.id): Curso relacionado
  - `module_id` (FK → modules.id): Módulo (opcional)
  - `passing_score`: Puntaje para aprobar
  - `is_published`: Estado de publicación

- **quiz_questions**: Preguntas de valoraciones
  - `id` (PK, UUID): ID único de la pregunta
  - `quiz_id` (FK → quizzes.id): Valoración a la que pertenece
  - `question`: Texto de la pregunta
  - `question_type`: Tipo (multiple_choice, text, etc.)
  - `points`: Puntos asignados

- **quiz_options**: Opciones para preguntas de selección
  - `id` (PK, UUID): ID único de la opción
  - `question_id` (FK → quiz_questions.id): Pregunta
  - `option_text`: Texto de la opción
  - `is_correct`: Si es la respuesta correcta
  - `option_order`: Orden de presentación

- **quiz_attempts**: Intentos de usuarios en valoraciones
  - `id` (PK, UUID): ID único del intento
  - `user_id` (FK → profiles.id): Usuario
  - `quiz_id` (FK → quizzes.id): Valoración
  - `score`: Puntaje obtenido
  - `passed`: Si aprobó
  - `started_at`: Inicio del intento
  - `completed_at`: Finalización del intento

### Certificados

- **certificates**: Certificados emitidos
  - `id` (PK, UUID): ID único del certificado
  - `user_id` (FK → profiles.id): Usuario
  - `course_id` (FK → courses.id): Curso completado
  - `issue_date`: Fecha de emisión
  - `certificate_number`: Número único para verificación
  - `verification_url`: URL para verificación
  - `status`: Estado (issued, revoked, etc.)

### Categorización y Metadata

- **categories**: Categorías para organizar cursos
  - `id` (PK, UUID): ID único de la categoría
  - `name`: Nombre de la categoría
  - `slug`: URL amigable
  - `description`: Descripción
  - `parent_id` (FK → categories.id): Categoría padre (si es subcategoría)

- **course_categories**: Relación entre cursos y categorías
  - `id` (PK, UUID): ID único de asignación
  - `course_id` (FK → courses.id): Curso
  - `category_id` (FK → categories.id): Categoría asignada

### Sistema de Comunidad

- **comments**: Comentarios en lecciones
  - `id` (PK, UUID): ID único del comentario
  - `user_id` (FK → profiles.id): Usuario que comenta
  - `lesson_id` (FK → lessons.id): Lección comentada
  - `content`: Contenido del comentario
  - `parent_comment_id` (FK → comments.id): Comentario padre (si es respuesta)

- **conversations**: Conversaciones entre usuarios
  - `id` (PK, UUID): ID único de la conversación
  - `title`: Título (para chats grupales)
  - `is_group`: Si es grupal
  - `created_by` (FK → profiles.id): Creador

- **conversation_participants**: Participantes en conversaciones
  - `id` (PK, UUID): ID único de asignación
  - `conversation_id` (FK → conversations.id): Conversación
  - `user_id` (FK → profiles.id): Usuario participante
  - `is_admin`: Si es administrador (en chats grupales)

- **messages**: Mensajes en conversaciones
  - `id` (PK, UUID): ID único del mensaje
  - `conversation_id` (FK → conversations.id): Conversación
  - `sender_id` (FK → profiles.id): Emisor
  - `content`: Contenido del mensaje
  - `sent_at`: Fecha de envío
  - `status`: Estado (sent, delivered, read)

## Diagrama de Relaciones Simplificado

```
profiles ---< user_roles >--- roles ---< role_permissions >--- permissions
   |
   |---< enrollments >--- courses ---< course_categories >--- categories
   |                        |
   |                        |---< modules ---< lessons
   |                        |
   |                        |---< quizzes ---< quiz_questions ---< quiz_options
   |
   |---< lesson_progress
   |
   |---< quiz_attempts ---< quiz_answers
   |
   |---< certificates
   |
   |---< comments
   |
   |---< conversations >--- conversation_participants
   |                              |
   |------------------------------|
   |
   |---< messages
```

## Tipos Enumerados Principales

- **UserRoleType**: `admin`, `instructor`, `participante`, `guest`, `anonimo`
- **CourseLevel**: `principiante`, `intermedio`, `avanzado`
- **ContentType**: `text`, `video`, `quiz`, `assignment`
- **CertificateStatus**: `issued`, `revoked`, `expired`
- **MessageStatus**: `sent`, `delivered`, `read`
- **QuestionType**: `multiple_choice`, `true_false`, `text`, `matching`

## Políticas de Seguridad (RLS)

Las tablas principales implementan políticas RLS (Row Level Security) para proteger los datos:

- Usuarios solo pueden ver sus propios datos de progreso
- Instructores solo pueden modificar sus propios cursos
- Administradores tienen acceso completo a toda la información
- El contenido público de cursos es visible para todos
- El contenido premium solo es visible para usuarios participantes
