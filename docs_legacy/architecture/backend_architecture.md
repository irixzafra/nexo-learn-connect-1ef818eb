
# Arquitectura Backend - Nexo Learning Platform

## Visión General de Supabase

Nexo Learning utiliza Supabase como plataforma backend principal, aprovechando su conjunto de servicios para proporcionar una arquitectura moderna, escalable y segura.

```
┌─────────────────────────────────────────┐
│             Supabase Platform           │
├─────────────┬───────────────┬───────────┤
│ PostgreSQL  │ Authentication │ Storage   │
│ Database    │ & Authorization│ Services  │
├─────────────┼───────────────┼───────────┤
│ Row Level   │ Edge          │ Realtime  │
│ Security    │ Functions     │ Events    │
└─────────────┴───────────────┴───────────┘
```

### Componentes Principales

1. **PostgreSQL Database**
   - Base de datos relacional robusta y escalable
   - Esquemas organizados por dominio funcional
   - Funciones SQL para lógica de negocio compleja
   - Triggers para operaciones automatizadas
   - Foreign keys para integridad referencial
   - Índices para optimización de consultas

2. **Authentication & Authorization**
   - Sistema completo de gestión de usuarios
   - Múltiples proveedores (email/password, OAuth)
   - JWT para sesiones seguras
   - Verificación de email
   - Recuperación de contraseñas
   - Roles y permisos granulares

3. **Row Level Security (RLS)**
   - Políticas de acceso a nivel de fila
   - Segregación de datos por usuario/organización
   - Control granular de operaciones CRUD
   - Integración con sistema de autenticación
   - Funciones para verificación de permisos

4. **Storage**
   - Almacenamiento de archivos escalable
   - Organización en buckets por tipo de contenido
   - Políticas de acceso configurables
   - CDN para distribución eficiente
   - Transformaciones de imágenes

5. **Edge Functions**
   - Funciones serverless para lógica compleja
   - Integración con servicios externos
   - Ejecución cercana al usuario final
   - Procesamiento asíncrono
   - Webhooks y triggers automatizados

6. **Realtime**
   - Suscripciones a cambios en la base de datos
   - Notificaciones en tiempo real
   - Actualizaciones instantáneas en el cliente
   - Sincronización de estado

## Estructura de la Base de Datos

### Esquema Principal (public)

El esquema público contiene las tablas principales de la aplicación:

```
┌────────────┐       ┌────────────┐       ┌────────────┐
│   users    │◄──────┤ enrollments│◄──────┤  courses   │
└────────────┘       └────────────┘       └────────────┘
      ▲                                          ▲
      │                                          │
┌────────────┐       ┌────────────┐       ┌────────────┐
│  profiles  │       │lesson_progress     │  modules   │
└────────────┘       └────────────┘       └────────────┘
      ▲                    ▲                    ▲
      │                    │                    │
┌────────────┐       ┌────────────┐       ┌────────────┐
│user_roles  │       │  lessons   │       │categories  │
└────────────┘       └────────────┘       └────────────┘
      ▲                    ▲
      │                    │
┌────────────┐       ┌────────────┐
│   roles    │       │  comments  │
└────────────┘       └────────────┘
```

### Grupos Funcionales de Tablas

1. **Sistema de Usuarios**
   - `profiles`: Información de usuario extendida
   - `roles`: Roles disponibles en el sistema
   - `user_roles`: Asignación de roles a usuarios
   - `permissions`: Permisos individuales
   - `role_permissions`: Permisos asignados a roles

2. **Sistema de Cursos**
   - `courses`: Información de cursos
   - `modules`: Módulos dentro de cursos
   - `lessons`: Lecciones individuales
   - `categories`: Categorías de cursos
   - `course_categories`: Relación muchos a muchos

3. **Sistema de Aprendizaje**
   - `enrollments`: Inscripciones de usuarios a cursos
   - `lesson_progress`: Seguimiento de progreso
   - `comments`: Comentarios en lecciones
   - `lesson_notes`: Notas personales de usuarios

4. **Sistema de Evaluación**
   - `quizzes`: Cuestionarios de evaluación
   - `quiz_questions`: Preguntas individuales
   - `quiz_options`: Opciones para preguntas
   - `quiz_attempts`: Intentos de usuarios
   - `quiz_answers`: Respuestas individuales
   - `certificates`: Certificados emitidos

5. **Sistema de Comunicación**
   - `messages`: Mensajes entre usuarios
   - `conversations`: Conversaciones grupales o individuales
   - `conversation_participants`: Participantes en conversaciones
   - `notifications`: Notificaciones del sistema

6. **Sistema de Comunidad**
   - `follows`: Relaciones de seguimiento
   - `posts`: Publicaciones de usuarios
   - `post_likes`: Me gusta en publicaciones
   - `post_comments`: Comentarios en publicaciones
   - `groups`: Grupos de comunidad
   - `group_members`: Miembros de grupos

7. **Sistema de Pagos**
   - `payments`: Registro de pagos
   - `subscription_plans`: Planes disponibles
   - `user_subscriptions`: Suscripciones activas
   - `invoices`: Facturas generadas
   - `payment_methods`: Métodos de pago guardados

## Row Level Security (RLS)

### Estrategia de Seguridad

Las políticas de RLS implementan el siguiente modelo de seguridad:

1. **Segregación por Propiedad**
   - Cada usuario solo puede acceder a sus propios datos
   - Campos como `user_id` vinculan recursos a usuarios

2. **Permisos Basados en Rol**
   - Administradores tienen acceso ampliado
   - Instructores solo acceden a sus propios cursos
   - Estudiantes acceden solo a cursos en los que están inscritos

3. **Control Operacional**
   - Políticas específicas para cada operación (SELECT, INSERT, UPDATE, DELETE)
   - Restricciones basadas en estado y propiedad

### Funciones de Seguridad

```sql
-- Ejemplo de función para verificar el rol de usuario
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Función para verificar si un usuario tiene acceso a un curso
CREATE OR REPLACE FUNCTION public.has_course_access(course_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    -- Es instructor del curso
    EXISTS (SELECT 1 FROM courses WHERE id = course_id AND instructor_id = auth.uid())
    OR
    -- Está inscrito en el curso
    EXISTS (SELECT 1 FROM enrollments WHERE course_id = course_id AND user_id = auth.uid())
    OR
    -- Es administrador
    (SELECT public.get_user_role(auth.uid()) = 'admin')
  );
END;
$$;
```

### Ejemplos de Políticas RLS

```sql
-- Políticas para tabla courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede ver cursos publicados
CREATE POLICY "Cualquiera puede ver cursos publicados" ON public.courses
  FOR SELECT USING (is_published = true);

-- Instructores pueden gestionar sus propios cursos
CREATE POLICY "Instructores pueden gestionar sus cursos" ON public.courses
  USING (instructor_id = auth.uid());

-- Administradores pueden gestionar todos los cursos
CREATE POLICY "Administradores pueden gestionar todos los cursos" ON public.courses
  USING (public.get_user_role(auth.uid()) = 'admin');
```

## Edge Functions

Las Edge Functions extienden la funcionalidad del backend para operaciones complejas:

1. **Procesamiento de Pagos**
   - Integración con Stripe
   - Verificación de pagos
   - Generación de facturas

2. **Notificaciones**
   - Envío de emails transaccionales
   - Notificaciones push
   - Recordatorios programados

3. **Integraciones Externas**
   - Conexiones a APIs de terceros
   - Webhooks para servicios externos
   - Sincronización de datos

4. **Tareas Programadas**
   - Generación de informes
   - Mantenimiento de datos
   - Actualizaciones periódicas

## Modelo de Datos y Relaciones

### Entidades Principales y Relaciones

1. **User (Usuario)**
   - Relacionado con `profiles` (1:1)
   - Relacionado con `enrollments` (1:N)
   - Relacionado con `user_roles` (1:N)
   - Relacionado con `lesson_progress` (1:N)
   - Relacionado con `payments` (1:N)

2. **Course (Curso)**
   - Relacionado con `modules` (1:N)
   - Relacionado con `enrollments` (1:N)
   - Relacionado con `course_categories` (1:N)
   - Propietario: `instructor_id` (N:1 con `users`)

3. **Module (Módulo)**
   - Relacionado con `lessons` (1:N)
   - Pertenece a: `course_id` (N:1)

4. **Lesson (Lección)**
   - Relacionado con `comments` (1:N)
   - Relacionado con `lesson_progress` (1:N)
   - Pertenece a: `module_id` y `course_id` (N:1)

### Diagrama ER (Entidad-Relación) Simplificado

```
users(id, email) 1───┐
                     │
profiles(id, user_id, full_name, role) 1─────┐
  │                                          │
  │  ┌──────────────────────────────────────┐│
  │  │                                      ││
  │  ▼                                      ▼│
courses(id, instructor_id, title) 1─────► enrollments(id, user_id, course_id)
  │
  │
  ▼
modules(id, course_id, title) 1────┐
                                  │
                                  ▼
lessons(id, module_id, course_id, title) 1─────┐
  │                                           │
  │                                           ▼
  └─────► lesson_progress(id, user_id, lesson_id, course_id)
  │
  ▼
comments(id, user_id, lesson_id, content)
```

## Seguridad de Datos

### Estrategias Implementadas

1. **Encriptación**
   - Datos sensibles encriptados en reposo
   - TLS/SSL para transmisión segura
   - Encriptación de contraseñas con bcrypt

2. **Aislamiento de Datos**
   - RLS para segregación estricta
   - Funciones con SECURITY DEFINER para operaciones críticas
   - Validación de entrada en cliente y servidor

3. **Auditoría**
   - Registro de acciones críticas
   - Timestamps de creación/modificación
   - Trazabilidad de cambios importantes

4. **Backups y Recuperación**
   - Backups diarios automáticos
   - Point-in-time recovery (PITR)
   - Estrategia de retención configurable
