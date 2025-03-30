
# NEXO LEARNING - DOCUMENTACIÓN TÉCNICA COMPLETA

## 1. Stack Tecnológico Actual

### Frontend
- **React 18.3.1**: Biblioteca principal para la construcción de la interfaz de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Vite**: Herramienta de construcción y desarrollo rápido
- **React Router 6.26.2**: Gestión de rutas en la aplicación
- **Tailwind CSS**: Framework de utilidades CSS para el diseño
- **Shadcn/UI**: Biblioteca de componentes de UI basada en Radix UI
- **Framer Motion**: Biblioteca para animaciones
- **TanStack React Query 5.56.2**: Gestión de estado del servidor y caché
- **React Hook Form 7.53.0**: Gestión avanzada de formularios
- **Zod 3.23.8**: Validación de esquemas de datos
- **Lucide React 0.462.0**: Biblioteca de iconos vectoriales
- **Recharts 2.12.7**: Biblioteca para la creación de gráficos y visualizaciones
- **Sonner 1.5.0**: Sistema de notificaciones toast
- **React Beautiful DND**: Drag-and-drop para listas y elementos

### Backend (Supabase)
- **PostgreSQL**: Base de datos relacional
- **Row-Level Security (RLS)**: Seguridad a nivel de fila para control de acceso
- **Supabase Auth**: Sistema de autenticación y gestión de usuarios
- **Supabase Storage**: Almacenamiento de archivos
- **Supabase Functions**: Funciones serverless (Edge Functions)
- **Supabase Realtime**: Suscripciones en tiempo real

### Integración y Despliegue
- **GitHub**: Control de versiones
- **Sentry**: Monitorización de errores y rendimiento

## 2. Arquitectura General Actual

### Estructura Frontend
La aplicación sigue una arquitectura basada en características (feature-based) donde cada dominio funcional tiene su propio conjunto de componentes, hooks y utilidades:

```
src/
├── components/        # Componentes compartidos y de UI
├── contexts/          # Contextos de React para estado global
├── features/          # Funcionalidades organizadas por dominio
│   ├── auth/          # Autenticación y autorización
│   ├── courses/       # Gestión de cursos y catálogo
│   ├── instructor/    # Funcionalidades para instructores
│   ├── lessons/       # Gestión y visualización de lecciones
│   ├── messaging/     # Sistema de mensajería
│   └── ...
├── hooks/             # Hooks personalizados
├── layouts/           # Componentes de diseño principales
├── lib/               # Utilidades y servicios
│   ├── offline/       # Funcionalidades offline
│   └── ...
├── pages/             # Componentes de página
├── providers/         # Proveedores de contexto
├── routes/            # Configuración de rutas
└── types/             # Definiciones de tipos TypeScript
```

### Patrón de Arquitectura
- **Cliente-Servidor**: La aplicación frontend consume la API de Supabase
- **Arquitectura basada en características**: Organización de código según dominios funcionales
- **Componentes controlados**: Separación clara entre componentes de presentación y lógica
- **Hooks personalizados**: Encapsulación de lógica reutilizable y acceso a datos

### Componentes de UI con Shadcn y Tailwind
Utilizamos una combinación de componentes de Shadcn/UI (basados en Radix) con estilización mediante Tailwind CSS para:
- Garantizar la accesibilidad (ARIA)
- Mantener una apariencia consistente
- Facilitar la personalización mediante temas
- Ofrecer componentes interactivos avanzados (modales, menús, etc.)

## 3. Esquema de Base de Datos Completo

A continuación se muestra el esquema completo de la base de datos, incluyendo todos los tipos ENUM, tablas, funciones y triggers:

```sql
-- =======================================
-- TIPOS ENUM
-- =======================================

-- Roles de usuario
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin', 'sistemas', 'anonimo');

-- Códigos de moneda
CREATE TYPE currency_code AS ENUM ('eur', 'usd');

-- Estados de pago
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed');

-- Tipos de contenido de lección
CREATE TYPE lesson_content_type AS ENUM ('text', 'video');

-- Niveles de curso
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced', 'all-levels');

-- Estados de certificado
CREATE TYPE certificate_status AS ENUM ('issued', 'revoked', 'expired');

-- Estados de mensaje
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');

-- Estados de envío de tarea
CREATE TYPE assignment_status AS ENUM ('pending', 'submitted', 'graded', 'late');

-- Tipos de pregunta de quiz
CREATE TYPE question_type AS ENUM ('multiple_choice', 'true_false', 'text');

-- Estados de solicitud de trabajo
CREATE TYPE application_status AS ENUM ('pending', 'reviewing', 'accepted', 'rejected');

-- Tipos de trabajo
CREATE TYPE job_type AS ENUM ('full_time', 'part_time', 'contract', 'internship', 'freelance');

-- Tipos de notificación
CREATE TYPE notification_type AS ENUM ('course', 'message', 'social', 'system');

-- Tipos de insignia
CREATE TYPE badge_type AS ENUM ('achievement', 'course_completion', 'skill', 'rank');

-- =======================================
-- TABLAS PRINCIPALES
-- =======================================

-- Perfiles de usuario
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Cursos
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  currency currency_code NOT NULL DEFAULT 'eur',
  is_published BOOLEAN NOT NULL DEFAULT false,
  cover_image_url TEXT,
  slug TEXT,
  seo_title TEXT,
  seo_description TEXT,
  level TEXT,
  duration_text TEXT,
  prerequisites_text TEXT,
  category TEXT NOT NULL DEFAULT 'curso',
  featured_instructor TEXT,
  is_featured_on_landing BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Categorías
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.categories,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Relación cursos-categorías
CREATE TABLE public.course_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL,
  category_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Módulos de curso
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL,
  title TEXT NOT NULL,
  module_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Lecciones
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL,
  course_id UUID NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  content_text JSONB,
  content_video_url TEXT,
  lesson_order INTEGER NOT NULL DEFAULT 0,
  is_previewable BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inscripciones
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Progreso de lecciones
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  course_id UUID NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completion_date TIMESTAMP WITH TIME ZONE,
  last_position NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Comentarios
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  parent_comment_id UUID,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Pagos
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID,
  stripe_charge_id TEXT,
  stripe_checkout_session_id TEXT,
  amount NUMERIC NOT NULL,
  currency currency_code NOT NULL DEFAULT 'eur',
  status payment_status NOT NULL DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quizzes
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL,
  module_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  passing_score NUMERIC NOT NULL DEFAULT 60,
  time_limit INTEGER,
  max_attempts INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT false,
  quiz_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Preguntas de quiz
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL,
  question TEXT NOT NULL,
  question_type question_type NOT NULL,
  explanation TEXT,
  points NUMERIC NOT NULL DEFAULT 1,
  question_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Opciones de respuesta
CREATE TABLE public.quiz_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  option_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Intentos de quiz
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  quiz_id UUID NOT NULL,
  course_id UUID NOT NULL,
  score NUMERIC,
  max_score NUMERIC,
  percentage NUMERIC,
  passed BOOLEAN,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Respuestas de quiz
CREATE TABLE public.quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL,
  question_id UUID NOT NULL,
  selected_option_id UUID,
  text_answer TEXT,
  is_correct BOOLEAN,
  points_earned NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tareas/Asignaciones
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL,
  module_id UUID,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  max_points NUMERIC NOT NULL DEFAULT 100,
  is_published BOOLEAN NOT NULL DEFAULT false,
  assignment_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Envíos de tareas
CREATE TABLE public.assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  content TEXT,
  submission_files JSONB,
  status assignment_status NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  graded_by UUID,
  grade NUMERIC,
  feedback TEXT,
  graded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Certificados
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expiry_date TIMESTAMP WITH TIME ZONE,
  certificate_number TEXT NOT NULL,
  verification_url TEXT,
  status certificate_status NOT NULL DEFAULT 'issued',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Rutas de aprendizaje
CREATE TABLE public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  created_by UUID NOT NULL,
  estimated_hours INTEGER,
  level course_level,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Cursos en rutas de aprendizaje
CREATE TABLE public.learning_path_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id UUID NOT NULL,
  course_id UUID NOT NULL,
  course_order INTEGER NOT NULL DEFAULT 0,
  is_required BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inscripciones a rutas de aprendizaje
CREATE TABLE public.learning_path_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  path_id UUID NOT NULL,
  progress NUMERIC NOT NULL DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Mensajes
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  status message_status NOT NULL DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Conversaciones
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  is_group BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Participantes en conversaciones
CREATE TABLE public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  user_id UUID NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  left_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Conexiones entre usuarios
CREATE TABLE public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL,
  addressee_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Seguidores
CREATE TABLE public.follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Publicaciones
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  media_urls JSONB,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Me gusta en publicaciones
CREATE TABLE public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Comentarios en publicaciones
CREATE TABLE public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Grupos
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  is_private BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Miembros de grupos
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Publicaciones de grupo
CREATE TABLE public.group_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  media_urls JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ofertas de trabajo
CREATE TABLE public.job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  job_type job_type NOT NULL,
  salary_range JSONB,
  is_remote BOOLEAN NOT NULL DEFAULT false,
  contact_email TEXT,
  application_url TEXT,
  posted_by UUID NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Solicitudes de trabajo
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL,
  user_id UUID NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  status application_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Notificaciones
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  resource_type TEXT,
  resource_id UUID,
  action_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insignias
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT NOT NULL,
  badge_type badge_type NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  requirements JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insignias de usuario
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL,
  awarded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Puntos de usuario
CREATE TABLE public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  points_history JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Registro de auditoría
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  user_id UUID,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =======================================
-- FUNCIONES Y TRIGGERS
-- =======================================

-- Función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    COALESCE(new.raw_user_meta_data->>'role', 'student')::user_role
  );
  RETURN new;
END;
$$;

-- Trigger para crear perfil al registrar usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Función para actualizar timestamp de última modificación
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers para actualizar timestamps
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Función para obtener el rol de un usuario
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Función para calcular el progreso en un curso
CREATE OR REPLACE FUNCTION public.calculate_course_progress(
  course_id_param UUID, 
  user_id_param UUID
)
RETURNS NUMERIC 
LANGUAGE plpgsql
AS $$
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
$$;

-- Función para información sobre las columnas de una tabla
CREATE OR REPLACE FUNCTION public.get_table_columns(table_name text)
RETURNS TABLE (
  column_name text,
  data_type text,
  is_nullable boolean
) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    column_name::text, 
    data_type::text, 
    is_nullable::boolean
  FROM 
    information_schema.columns
  WHERE 
    table_schema = 'public' 
    AND table_name = table_name;
$$;
```

## 4. Navegación y Acceso por Rol Actual

### Rutas Públicas (accesibles sin autenticación)

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/` | Página de inicio | `LandingPage` |
| `/auth/login` | Inicio de sesión | `Login` |
| `/auth/register` | Registro de usuario | `Register` |
| `/courses` | Catálogo de cursos | `CoursesCatalog` |
| `/courses/:id` | Detalles de un curso específico | `CourseLanding` |
| `/about-us` | Acerca de nosotros | `AboutUs` |
| `/scholarships` | Becas disponibles | `Scholarships` |

### Rutas Protegidas (requieren autenticación)

| Ruta | Descripción | Roles Permitidos | Componente |
|------|-------------|------------------|------------|
| `/home` | Dashboard del usuario | Todos | `Home` |
| `/profile` | Perfil de usuario | Todos | `Profile` |
| `/my-courses` | Cursos del estudiante | Todos | `CoursesEnrolled` |
| `/courses/:courseId/learn` | Interfaz de aprendizaje | Todos | `CourseLearn` |
| `/courses/:courseId/learn/:lessonId` | Visualización de lección | Todos | `LessonView` |
| `/notifications` | Centro de notificaciones | Todos | `Notifications` |
| `/community` | Comunidad de usuarios | Todos | `Community` |
| `/messages` | Sistema de mensajería | Todos | `Messages` |
| `/checkout/:courseId` | Proceso de pago | Todos | `Checkout` |

### Rutas de Instructor (requieren rol 'instructor')

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/instructor/dashboard` | Panel de control | `InstructorDashboard` |
| `/instructor/courses` | Listado de cursos | `InstructorCoursesList` |
| `/instructor/courses/create` | Crear curso | `CreateCourse` |
| `/instructor/courses/:id/edit` | Edición de curso | `EditCourseDetails` |
| `/instructor/courses/:id/editor` | Editor de curso | `CourseEditor` |
| `/instructor/courses/:id/structure` | Estructura del curso | `EditCourseStructure` |
| `/instructor/courses/:courseId/lessons/:lessonId/edit` | Editar lección | `EditLesson` |
| `/instructor/students` | Gestión de estudiantes | `Students` |

### Rutas de Administrador (requieren rol 'admin')

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/admin/dashboard` | Panel de administración | `AdminDashboard` |
| `/admin/users` | Gestión de usuarios | `UserManagement` |
| `/admin/content` | Gestión de contenido | `ContentManagement` |
| `/admin/roles` | Gestión de roles | `RoleManagement` |
| `/admin/settings` | Configuración del sistema | `SystemSettings` |
| `/admin/test-data` | Gestión de datos de prueba | `TestDataManagement` |
| `/admin/billing` | Gestión de facturación | `Billing` |

## 5. Funcionalidades Implementadas

### CORE-AUTH-01: Sistema Base de Autenticación

#### Resumen
Sistema completo para registro, inicio de sesión y gestión de sesiones de usuario. Incluye páginas específicas, verificación de correo electrónico y recuperación de contraseña.

#### SQL DDL
```sql
-- Tabla manejada por Supabase Auth
-- Tabla de perfiles gestionada por trigger
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trigger para creación automática de perfiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    COALESCE(new.raw_user_meta_data->>'role', 'student')::user_role
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### RLS (Row Level Security)
```sql
-- Políticas para tabla profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Usuarios pueden ver sus propios perfiles
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Usuarios pueden actualizar sus propios perfiles
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Administradores pueden ver todos los perfiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (
  public.get_user_role(auth.uid()) = 'admin'
);

-- Administradores pueden actualizar todos los perfiles
CREATE POLICY "Admins can update all profiles" 
ON public.profiles FOR UPDATE 
USING (
  public.get_user_role(auth.uid()) = 'admin'
);
```

#### Implementación Frontend
- **AuthContext**: Contexto global para gestionar estado de autenticación y sesión
- **useAuth**: Hook para acceder al contexto en cualquier componente
- **Login/Register**: Componentes de formulario con validación para inicio de sesión y registro
- **ProtectedRoute**: HOC para proteger rutas que requieren autenticación

#### Flujo de Autenticación
1. Usuario se registra proporcionando correo, contraseña y datos básicos
2. Supabase Auth crea el usuario y el trigger automáticamente crea el perfil
3. Usuario inicia sesión y obtiene un token JWT
4. AuthContext gestiona el estado global de la sesión
5. ProtectedRoute verifica la presencia del token para rutas protegidas

#### Verificación de Roles
- **requiredRole**: Propiedad en ProtectedRoute para verificar roles específicos
- **useAuth().userRole**: Proporciona el rol actual del usuario
- **get_user_role**: Función en la BD para obtener el rol de forma segura

### CORE-ROLES-01: Sistema de Roles y Permisos

#### Resumen
Sistema que establece roles (estudiante, instructor, admin) con permisos y vistas adaptadas. Incluye navegación condicional y protección de rutas basada en roles.

#### Roles Implementados
- **student**: Usuario estándar que consume contenido
- **instructor**: Creador de contenido con permisos especiales
- **admin**: Administrador con acceso total al sistema
- **sistemas**: Rol técnico para operaciones avanzadas

#### Implementación
- Navegación adaptativa según rol en `SidebarNavigation`
- Componente de visualización de roles en encabezado: `RoleIndicator`
- Conmutador de roles para administradores: `RoleSwitcher`
- Rutas protegidas por rol mediante `requiredRole` en `ProtectedRoute`

#### Almacenamiento de Estado
- Persistencia del rol seleccionado en localStorage
- Hook `useCurrentViewRole` para gestionar el rol de visualización actual

### CORE-COURSE-CREATE-01: Creación Básica de Cursos

#### Resumen
Funcionalidad para que instructores creen cursos con información básica y estructura modular, incluyendo formularios de creación, edición y gestión.

#### Implementación
- **CreateCourse**: Formulario multipaso para creación inicial
- **EditCourseDetails**: Edición de metadatos del curso
- **EditCourseStructure**: Gestión de módulos y lecciones
- **CourseEditor**: Interfaz completa para gestión de contenido

#### Formularios y Validación
- React Hook Form con validación mediante Zod
- Campos requeridos para título, descripción, precio, etc.
- Gestión de imágenes mediante Supabase Storage

#### Drag-and-Drop
- Funcionalidad para reordenar módulos y lecciones
- Actualización de los campos module_order y lesson_order

### CORE-COURSE-VIEW-01: Visualización de Cursos

#### Resumen
Interfaces para explorar el catálogo de cursos, ver detalles y previsualizar contenido con listado, filtrado y páginas detalladas.

#### Implementación
- **CoursesCatalog**: Listado completo con filtros por categoría
- **AdvancedCourseFilters**: Filtros adicionales (precio, nivel, duración)
- **CourseCard/EnhancedCourseCard**: Componentes de visualización de cursos
- **CourseLanding**: Página detallada de curso con información completa

#### Destacados
- Diseño responsive para móvil y desktop
- Animaciones con Framer Motion
- Indicadores de popularidad y novedad
- Secciones para cursos destacados y recientemente vistos

### CORE-LEARN-01: Interfaz de Aprendizaje

#### Resumen
Sistema para que estudiantes accedan a las lecciones de cursos a los que están inscritos, incluyendo reproductor de contenido y navegación.

#### Implementación
- **CourseLearn**: Página principal de aprendizaje con estructura del curso
- **LessonView**: Visualizador de contenido de lecciones
- **CourseModulesList**: Navegación entre módulos y lecciones
- **LessonContent**: Renderizador de contenido según tipo (texto/video)

#### Características
- Reproductor de video responsivo para contenido tipo video
- Renderizado de contenido estructurado JSONB para texto
- Acceso a lecciones previewables sin inscripción
- Navegación entre lecciones con botones siguiente/anterior

### CORE-ENROLL-01: Sistema de Inscripción a Cursos

#### Resumen
Funcionalidad que permite a los estudiantes inscribirse en cursos gratuitos o de pago, gestionando verificaciones y acceso.

#### SQL DDL
```sql
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

#### RLS (Row Level Security)
```sql
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Usuarios pueden ver sus propias inscripciones
CREATE POLICY "Users can view own enrollments" 
ON public.enrollments FOR SELECT 
USING (auth.uid() = user_id);

-- Usuarios pueden crear sus propias inscripciones
CREATE POLICY "Users can create own enrollments" 
ON public.enrollments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Instructores pueden ver inscripciones a sus cursos
CREATE POLICY "Instructors can view enrollments to their courses" 
ON public.enrollments FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.courses 
    WHERE courses.id = enrollments.course_id 
    AND courses.instructor_id = auth.uid()
  )
);

-- Admins pueden ver todas las inscripciones
CREATE POLICY "Admins can view all enrollments" 
ON public.enrollments FOR SELECT 
USING (
  public.get_user_role(auth.uid()) = 'admin'
);
```

#### Implementación Frontend
- **useEnrollment**: Hook custom para gestionar la lógica de inscripción
- **CourseEnrollCard**: Componente para mostrar botón de inscripción
- **Checkout**: Página de proceso de pago para cursos de pago

#### Flujo de Inscripción
1. Usuario ve detalles del curso en `CourseLanding`
2. Usuario hace clic en "Inscribirse" (curso gratuito) o "Comprar" (curso de pago)
3. Para cursos gratuitos, inscripción directa mediante llamada a la API
4. Para cursos de pago, redireccionamiento a checkout
5. Después de la inscripción, redirección a la página de aprendizaje

### CORE-COURSE-PROGRESS-01: Seguimiento de Progreso de Cursos

#### Resumen
Sistema para rastrear y visualizar el progreso de los estudiantes en los cursos, permitiendo marcar lecciones como completadas.

#### SQL DDL
```sql
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  course_id UUID NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completion_date TIMESTAMP WITH TIME ZONE,
  last_position NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.calculate_course_progress(
  course_id_param UUID, 
  user_id_param UUID
)
RETURNS NUMERIC 
LANGUAGE plpgsql
AS $$
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
$$;
```

#### RLS (Row Level Security)
```sql
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Usuarios pueden ver y gestionar su propio progreso
CREATE POLICY "Users can manage own progress" 
ON public.lesson_progress 
FOR ALL USING (auth.uid() = user_id);

-- Instructores pueden ver el progreso en sus cursos
CREATE POLICY "Instructors can view progress in their courses" 
ON public.lesson_progress FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.courses 
    WHERE courses.id = lesson_progress.course_id 
    AND courses.instructor_id = auth.uid()
  )
);
```

#### Implementación Frontend
- **useLessonProgress**: Hook para gestionar el progreso de lecciones
- **CourseProgressBar**: Componente visual para mostrar porcentaje
- **LessonProgressControls**: Controles para marcar como completado
- **useUserCoursesProgress**: Hook para obtener el progreso en múltiples cursos

### CORE-UI-EDIT-01: Edición Inline y Reordenamiento de Contenido

#### Resumen
Sistema que permite a los administradores editar textos directamente en la página y reorganizar elementos de la interfaz. 

#### Implementación
- **EditModeContext**: Contexto global para gestionar el modo de edición
- **EditModeToggle**: Botón para activar/desactivar el modo de edición
- **InlineEdit**: Componente para edición de textos in-situ
- **DraggableContent**: Componente para reordenar elementos mediante drag & drop

#### Seguridad
- Modo de edición solo disponible para administradores
- Validación en frontend y backend antes de actualizar contenido
- Notificaciones de éxito/error mediante toast

### CORE-PROFILE-EDIT-01: Edición Básica de Perfil

#### Resumen
Funcionalidad para que usuarios editen su información personal básica con validación y feedback.

#### Implementación
- **ProfileEditForm**: Formulario para actualizar datos personales
- **useProfileEdit**: Hook personalizado para mutación de datos
- **Form**: Componentes de shadcn/ui con validación

#### Validación
- Nombre completo requerido (mínimo 2 caracteres)
- Evitar cambios de rol por usuarios no autorizados
- Feedback mediante toast para operaciones exitosas/fallidas

### CORE-INSTRUCTOR-STATS-01: Panel de Estadísticas para Instructores

#### Resumen
Dashboard con métricas relevantes para instructores sobre sus cursos, incluyendo inscripciones y popularidad.

#### Implementación
- **useDashboardStats**: Hook centralizado para obtener estadísticas
- **DashboardStatCard**: Componente para visualizar estadísticas individuales
- **PopularCoursesCard**: Tarjeta con los cursos más populares
- **RecentEnrollmentsCard**: Listado de inscripciones recientes

#### Estadísticas Mostradas
- Total de cursos creados
- Cursos publicados
- Total de estudiantes inscritos
- Curso más popular
- Inscripciones recientes con detalles

### UX-COMMENTS-01: Sistema de Comentarios en Lecciones

#### Resumen
Funcionalidad para que estudiantes comenten lecciones y respondan a otros comentarios.

#### SQL DDL
```sql
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  parent_comment_id UUID,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

#### RLS (Row Level Security)
```sql
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Todos pueden ver comentarios
CREATE POLICY "Everyone can view comments" 
ON public.comments FOR SELECT 
USING (true);

-- Usuarios autenticados pueden crear comentarios
CREATE POLICY "Authenticated users can create comments" 
ON public.comments FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Usuarios pueden editar sus propios comentarios
CREATE POLICY "Users can update own comments" 
ON public.comments FOR UPDATE 
USING (auth.uid() = user_id);

-- Usuarios pueden eliminar sus propios comentarios
CREATE POLICY "Users can delete own comments" 
ON public.comments FOR DELETE 
USING (auth.uid() = user_id);

-- Administradores pueden gestionar todos los comentarios
CREATE POLICY "Admins can manage all comments" 
ON public.comments FOR ALL 
USING (
  public.get_user_role(auth.uid()) = 'admin'
);
```

#### Implementación Frontend
- **LessonComments**: Contenedor principal para sistema de comentarios
- **CommentItem**: Componente para mostrar un comentario individual
- **CommentForm**: Formulario para añadir/responder comentarios
- **useComments**: Hook para gestionar operaciones CRUD de comentarios

#### Funcionalidades
- Comentarios anidados (respuestas a comentarios)
- Validación de contenido
- Indicadores de carga
- Optimistic updates para mejor UX

## 6. Correcciones Implementadas

### FIX-CATALOG-LOAD-ERROR-01: Compatibilidad de Tipos en Catálogo

#### Problema
Error de carga en el catálogo de cursos debido a incompatibilidad de tipos entre los componentes y los datos de la API.

#### Causa Raíz
La interfaz `FeaturedCourse` utilizada en el componente `CourseGrid` carecía de propiedades requeridas por el tipo `Course`.

#### Solución
Se actualizó la interfaz `FeaturedCourse` para incluir todas las propiedades requeridas, garantizando la compatibilidad de tipos.

### FIX-NAV-ROUTES-01: Persistencia de Rol en Navegación

#### Problema
La navegación entre secciones no mantenía consistentemente el estado de usuario y rol.

#### Causa Raíz
Falta de persistencia del rol seleccionado entre navegaciones y recargas de página.

#### Solución
Implementación de almacenamiento en localStorage y actualización de la lógica de navegación para mantener el estado del rol.

### FIX-NAV-ADMIN-ICON-01: Icono Administración Faltante

#### Problema
El menú lateral carecía de un icono específico para acceder al dashboard de administración.

#### Causa Raíz
El componente `SidebarMainNavigation` no incluía un ítem dedicado para administración.

#### Solución
Se agregó un nuevo ítem con el icono `Shield` que dirige al dashboard de administración, visible solo para usuarios con roles adecuados.

### FIX-TYPE-COMPATIBILITY-01: Incompatibilidad de Tipos

#### Problema
Errores de tipo en componentes del catálogo debido a incompatibilidades entre interfaces.

#### Causa Raíz
Propiedades opcionales/requeridas inconsistentes y tipos de datos incorrectos (number vs string).

#### Solución
Actualización de interfaces para garantizar la coherencia de tipos en toda la aplicación.
