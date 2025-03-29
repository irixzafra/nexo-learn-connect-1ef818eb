
# Informe de Auditoría Técnica - Nexo LMS

**Versión:** 1.7  
**Fecha:** 2023-12-01  
**Estado:** Fase 1 (MVP) - En desarrollo

## 1. Confirmación de Documentación

La Parte II (Documentación Técnica) del Nexo PSOT está actualizada con la documentación detallada de todas las funcionalidades marcadas como [x] en la Parte III (Roadmap). Se ha documentado específicamente la refactorización para modularidad bajo el ID REFAC-MODULARITY-MVP-01, que incluye:

- Creación de estructura de carpetas `src/features/` para organizar el código por módulos funcionales
- Extracción de componentes reutilizables como `CourseCard`, `EnrolledCoursesList`
- Implementación de hooks específicos como `useEnrolledCourses` y `useLessonProgress`
- Desacoplamiento entre lógica de negocio y presentación
- Mejora en el manejo de errores y estados de carga

## 2. Adherencia a la Arquitectura Modular (src/features/*)

### Evaluación de la Separación Modular

La aplicación mantiene una clara separación modular siguiendo el patrón de carpetas `src/features/`:

- `src/features/courses/`: Gestiona toda la funcionalidad relacionada con cursos, incluyendo componentes para visualización, hooks para fetching de datos, y tipos específicos.
- `src/features/instructor/`: Contiene componentes y hooks específicos para la gestión de cursos por parte de instructores.
- `src/features/lessons/`: Encapsula la funcionalidad de visualización y progreso de lecciones.

### Dependencias Directas Entre Módulos

Existen algunas dependencias directas entre módulos que podrían considerarse para mayor aislamiento en el futuro:

1. **Dependencia de `features/courses` hacia `features/instructor`**:
   - En el componente `CourseModulesList.tsx`, se importa la lógica de edición de módulos desde `features/instructor`.
   - Justificación: Ambos módulos comparten la necesidad de visualizar la estructura de módulos/lecciones, pero con diferentes niveles de interactividad.

2. **Dependencia de `features/lessons` hacia `features/courses`**:
   - En `LessonProgressControls.tsx` se utiliza el hook `useLessonProgress` desde `features/courses/hooks`.
   - Justificación: El progreso de lecciones está intrínsecamente vinculado a los cursos, aunque podría considerarse mover esta funcionalidad a un módulo más neutral como `features/progress`.

## 3. Estado Actual de la Base de Datos

### Tipos Enumerados

```sql
CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE public.lesson_content_type AS ENUM ('text', 'video');
CREATE TYPE public.payment_status AS ENUM ('pending', 'succeeded', 'failed');
CREATE TYPE public.currency_code AS ENUM ('eur', 'usd');
```

### Tablas Principales

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL CHECK (char_length(trim(title)) > 0),
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (price >= 0),
  currency currency_code NOT NULL DEFAULT 'eur',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  slug TEXT UNIQUE,
  seo_title TEXT,
  seo_description TEXT,
  cover_image_url TEXT,
  duration_text TEXT,
  level TEXT,
  prerequisites_text TEXT,
  is_featured_on_landing BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'curso',
  featured_instructor TEXT
);

CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(trim(title)) > 0),
  module_order INTEGER NOT NULL DEFAULT 0 CHECK (module_order >= 0),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(trim(title)) > 0),
  content_type lesson_content_type NOT NULL DEFAULT 'text',
  content_text JSONB,
  content_video_url TEXT CHECK (content_video_url IS NULL OR content_video_url ~* '^https?://'),
  lesson_order INTEGER NOT NULL DEFAULT 0 CHECK (lesson_order >= 0),
  is_previewable BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, course_id)
);

CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  stripe_charge_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT UNIQUE,
  amount NUMERIC(10, 2) NOT NULL,
  currency currency_code NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completion_date TIMESTAMP WITH TIME ZONE,
  last_position NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  admin_user_id UUID NOT NULL REFERENCES public.profiles(id),
  target_user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
```

### Funciones y Triggers

```sql
-- Función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'student'));
  RETURN new;
END;
$$;

-- Trigger para crear perfil al registrar usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Función para calcular progreso del curso
CREATE OR REPLACE FUNCTION public.calculate_course_progress(course_id_param UUID, user_id_param UUID)
RETURNS NUMERIC AS $$
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

## 4. Resumen de Lógica Backend Clave

### Función: `handle_new_user`

- **Propósito**: Crear automáticamente un perfil en la tabla `profiles` cada vez que se registra un usuario nuevo.
- **Pasos lógicos**:
  1. Se activa tras cada inserción en `auth.users`
  2. Extrae el nombre completo del usuario de los metadatos
  3. Establece el rol predeterminado como 'student' o utiliza el definido en metadatos
  4. Crea el registro en la tabla `profiles`
- **Seguridad**: Utiliza `SECURITY DEFINER` para ejecutarse con los privilegios del propietario de la función.

### Función: `calculate_course_progress`

- **Propósito**: Calcular el porcentaje de progreso de un usuario en un curso específico.
- **Pasos lógicos**:
  1. Cuenta el número total de lecciones en el curso
  2. Cuenta el número de lecciones completadas por el usuario
  3. Calcula el porcentaje de progreso
  4. Retorna un valor numérico entre 0 y 100
- **Seguridad**: El acceso está controlado por políticas RLS en las tablas involucradas.

### Edge Functions implementadas:

#### `create-checkout-session`

- **Propósito**: Crear una sesión de pago con Stripe para la compra de un curso.
- **Pasos lógicos**:
  1. Verifica la autenticación del usuario
  2. Obtiene los detalles del curso a comprar
  3. Crea la sesión de checkout en Stripe
  4. Registra la intención de pago en la tabla `payments`
  5. Devuelve la URL de la sesión de checkout
- **Seguridad**: Verifica la autenticación mediante JWT, utiliza la clave secreta de Stripe almacenada en Supabase Secrets.

#### `stripe-webhook`

- **Propósito**: Procesar eventos de webhook de Stripe, principalmente para confirmar pagos exitosos.
- **Pasos lógicos**:
  1. Verifica la firma del webhook usando la clave secreta
  2. Procesa eventos específicos como `checkout.session.completed`
  3. Actualiza el estado de pago en la tabla `payments`
  4. Para pagos exitosos, crea la inscripción del usuario en el curso
- **Seguridad**: Verifica la firma del webhook con el secreto compartido, no requiere autenticación del usuario.

## 5. Revisión de Seguridad (RLS y Otras)

### Políticas RLS Activas

```sql
-- Policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published courses" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Instructors can view their own draft courses" ON public.courses FOR SELECT USING (auth.uid() = instructor_id);
CREATE POLICY "Instructors can update their own courses" ON public.courses FOR UPDATE USING (auth.uid() = instructor_id);
CREATE POLICY "Instructors can insert their own courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = instructor_id);
CREATE POLICY "Admins can view all courses" ON public.courses FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can modify all courses" ON public.courses FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Policies for modules
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view modules of published courses" ON public.modules FOR SELECT USING (course_id IN (SELECT id FROM public.courses WHERE is_published = true));
CREATE POLICY "Instructors can view modules of their own courses" ON public.modules FOR SELECT USING (course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid()));
CREATE POLICY "Instructors can modify modules of their own courses" ON public.modules FOR ALL USING (course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid()));
CREATE POLICY "Admins can view all modules" ON public.modules FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can modify all modules" ON public.modules FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Policies for lessons
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view lessons of published courses" ON public.lessons FOR SELECT USING (course_id IN (SELECT id FROM public.courses WHERE is_published = true));
CREATE POLICY "Instructors can view lessons of their own courses" ON public.lessons FOR SELECT USING (course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid()));
CREATE POLICY "Instructors can modify lessons of their own courses" ON public.lessons FOR ALL USING (course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid()));
CREATE POLICY "Admins can view all lessons" ON public.lessons FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can modify all lessons" ON public.lessons FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Policies for enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all enrollments" ON public.enrollments FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Instructors can view enrollments for their courses" ON public.enrollments FOR SELECT USING (course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid()));

-- Policies for payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all payments" ON public.payments FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Policies for lesson_progress
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own progress" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.lesson_progress FOR UPDATE USING (auth.uid() = user_id);
```

### Validación de Entradas

1. **Frontend**:
   - Uso de Zod y React Hook Form en todos los formularios principales.
   - Esquemas de validación específicos para:
     - Registro de usuarios
     - Creación/edición de cursos
     - Creación/edición de lecciones
     - Información de pago

2. **Backend**:
   - Validación en funciones PL/pgSQL para operaciones críticas.
   - Restricciones CHECK en tablas para validación a nivel de base de datos.
   - Uso de tipos ENUM para limitar valores posibles.

### Gestión de Secretos

- **Claves API de Stripe**: Almacenadas correctamente en Supabase Secrets, no expuestas en el código frontend.
- **Webhook Secret de Stripe**: Almacenado en Supabase Secrets, utilizado para verificar la autenticidad de las notificaciones webhook.
- **Credenciales de Supabase**: Las claves anónimas se utilizan adecuadamente en el frontend, mientras que las claves de servicio sólo se utilizan en Edge Functions.

## 6. Estructura Frontend Clave

### Componentes Reutilizables (src/components)

1. **Componentes UI básicos** (basados en shadcn/ui):
   - Button, Card, Dialog, Toast, etc.

2. **Componentes específicos**:
   - `CourseCard`: Visualización de cursos en diferentes contextos
   - `CourseHeader`: Encabezado detallado de un curso
   - `CourseModulesList`: Lista expandible de módulos y lecciones
   - `CourseProgressBar`: Visualización del progreso en un curso
   - `EnrolledCoursesList`: Lista de cursos en los que un usuario está inscrito
   - `LessonContent`: Renderizado adaptativo del contenido de lecciones
   - `LessonProgressControls`: Controles para marcar progreso de lecciones

### Hooks Personalizados (src/hooks y src/features/*/hooks)

1. **Hooks de autenticación**:
   - `useAuth`: Proporciona estado de autenticación y funciones relacionadas
   - `useLogin`: Lógica de inicio de sesión
   - `useRegister`: Lógica de registro de usuarios

2. **Hooks específicos de cursos**:
   - `useEnrolledCourses`: Obtiene cursos en los que el usuario está inscrito
   - `useCourseDetails`: Obtiene detalles completos de un curso
   - `useLessonProgress`: Gestiona el progreso del usuario en lecciones
   - `useUserCoursesProgress`: Obtiene el progreso global en múltiples cursos
   - `useEnrollment`: Gestiona la inscripción en cursos

3. **Hooks para instructores**:
   - `useInstructorCourses`: Obtiene cursos creados por el instructor
   - `useModuleLessons`: Gestiona lecciones dentro de un módulo

### Uso de React Query

1. **Queries principales**:
   - `useQuery(["course", courseId])`: Detalles de un curso
   - `useQuery(["courseModules", courseId])`: Módulos de un curso
   - `useQuery(["lessonProgress", userId, lessonId])`: Progreso en una lección
   - `useQuery(["enrolledCourses", userId])`: Cursos inscritos de un usuario
   - `useQuery(["courseProgressPercentage", userId, courseId])`: Porcentaje de progreso

2. **Mutaciones clave**:
   - `useMutation(updateProgress)`: Actualizar progreso de lección
   - `useMutation(createCourse)`: Crear nuevo curso
   - `useMutation(updateCourse)`: Actualizar curso existente
   - `useMutation(createModule)`: Crear nuevo módulo
   - `useMutation(updateLesson)`: Actualizar contenido de lección

## 7. Identificación Proactiva de Problemas

### Deuda técnica identificada

1. **Gestión de estados global**:
   - El uso combinado de React Query y Context API puede llevar a inconsistencias en el estado.
   - Se recomienda estandarizar en React Query para la mayoría de los estados derivados del servidor.

2. **Complejidad creciente en useLessonProgress**:
   - El hook `useLessonProgress.ts` está creciendo en complejidad (208 líneas) y maneja múltiples responsabilidades.
   - Se recomienda dividirlo en hooks más pequeños y específicos.

3. **Dependencias circulares potenciales**:
   - Existen importaciones cruzadas entre módulos (courses, lessons, instructor) que podrían llevar a dependencias circulares.
   - Se recomienda reevaluar la estructura para evitar este problema a largo plazo.

### Riesgos de seguridad potenciales

1. **Validación de entradas inconsistente**:
   - No todos los formularios utilizan la misma estrategia de validación.
   - Se recomienda estandarizar utilizando Zod para todos los formularios.

2. **Manejo de sesiones para impersonación**:
   - La funcionalidad de impersonación para administradores necesita una revisión adicional para garantizar que no se puedan escalar privilegios inadvertidamente.

### Áreas que requieren refactorización

1. **Componentes sobrecargados**:
   - `EditCourseStructure.tsx` y `Users.tsx` están cerca de las 200 líneas y podrían beneficiarse de mayor modularización.

2. **Manejo de errores**:
   - El manejo de errores no es completamente consistente entre diferentes partes de la aplicación.
   - Se recomienda implementar un sistema de manejo de errores global.

3. **Optimización de consultas**:
   - Algunas consultas a la base de datos podrían beneficiarse de optimización, especialmente las que calculan estadísticas de progreso en cursos con muchas lecciones.
