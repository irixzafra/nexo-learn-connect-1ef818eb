# Nexo Project - Guía de Desarrollo

**Versión:** 1.7
**Última Actualización:** 2023-12-01
**Estado:** Fase 1 (MVP) - En desarrollo

## 1. VISIÓN GENERAL

Nexo es una plataforma educativa unificada de alta tecnología (enfocada en Másters y FP de IA, Marketing, Creación de Contenidos, etc.) que integra funcionalidades LMS, ERP y comunidad.

**Principios:**
- Experiencia de usuario intuitiva y moderna (ver referencias visuales).
- Tecnología confiable y escalable.
- Arquitectura modular (`src/features/*`).
- Desarrollo iterativo por fases.
- Seguridad por diseño (RLS estricto).
- Diseño atractivo y profesional con animaciones fluidas (`Framer Motion`) pero optimizadas.
- Buen posicionamiento SEO (metadatos gestionables).

**Roles:**
- **Estudiante:** Accede a Másters/Carreras, sigue progreso, interactúa.
- **Instructor:** Crea y gestiona contenido de Másters/Carreras.
- **Administrador:** Gestiona usuarios, plataforma, contenidos, finanzas.

## 2. STACK TECNOLÓGICO

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Estado:** React Query, Context API
- **Validación:** React Hook Form, Zod
- **Backend:** Supabase (Auth, PostgreSQL DB, Storage, Edge/RPC Functions)
- **Animación:** Framer Motion
- **Iconos:** Lucide React
- **Editor:** Tiptap
- **Pagos:** Stripe
- **i18n:** i18next (base)

## 3. ARQUITECTURA

**Frontend:**
- Aplicación SPA React.
- Componentes reutilizables (`src/components`).
- Lógica de negocio modular (`src/features`).
- Layouts base: `PublicLayout` (Landing, Auth) y `AppLayout` (Dashboard).

**Backend:**
- Supabase Platform.
- Seguridad principal: Row Level Security (RLS) en PostgreSQL.
- Lógica específica/segura: RPC Functions (PL/pgSQL) o Edge Functions (Deno/TS).

## 4. ESQUEMA DE BASE DE DATOS (Inicial - Fase 1)

```sql
-- Tipos enumerados
CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE public.lesson_content_type AS ENUM ('text', 'video');
CREATE TYPE public.payment_status AS ENUM ('pending', 'succeeded', 'failed');
CREATE TYPE public.currency_code AS ENUM ('eur', 'usd');

-- Tablas principales
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
  -- Campos SEO y portada
  slug TEXT UNIQUE,
  seo_title TEXT,
  seo_description TEXT,
  cover_image_url TEXT,
  -- Campos de características del curso
  duration_text TEXT,
  level TEXT,
  prerequisites_text TEXT,
  -- Campo para destacar en landing
  is_featured_on_landing BOOLEAN NOT NULL DEFAULT false,
  -- Campo para ordenación personalizada
  display_order INTEGER DEFAULT 0
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
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  slug TEXT UNIQUE
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

-- Tabla de Auditoría para Impersonación
CREATE TABLE IF NOT EXISTS public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  admin_user_id UUID NOT NULL REFERENCES public.profiles(id),
  target_user_id UUID REFERENCES public.profiles(id), -- Puede ser NULL si la acción no es sobre un usuario
  action TEXT NOT NULL, -- Ej: 'IMPERSONATION_START', 'IMPERSONATION_STOP', 'ROLE_CHANGE'
  details JSONB, -- Detalles adicionales
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.audit_log IS 'Records critical administrative actions for auditing.';
```

## 5. RUTAS Y ACCESO POR ROL (Resumen Inicial)

**Públicas (Sin Login):**
- `/`: Landing Page (Diseño moderno, animaciones, SEO).
- `/auth/login`: Inicio de sesión.
- `/auth/register`: Registro.
- `/courses`: Catálogo de Másters/Carreras.
- `/courses/[slug]`: Detalle público de un Máster/Carrera (usa slug).

**Autenticadas (Todos los Roles):**
- `/home` o `/dashboard`: Panel Principal (Contenido adaptado al rol).
- `/profile`: Perfil del usuario (Vista inicial).
- `/settings`: Configuración básica (Idioma, Notificaciones - Futuro).
- `/community`: Feed de Comunidad (Futuro).
- `/network`: Red de contactos (Futuro).
- `/messages`: Mensajería directa (Futuro).
- `/unauthorized`: Página de acceso no autorizado.

**Estudiante:**
- `/my-courses`: Mis Másters/Carreras inscritos.
- `/learn/courses/[course_slug]/lessons/[lesson_slug]`: Vista de aprendizaje.

**Instructor:**
- `/instructor/dashboard`: Panel de Instructor (Futuro).
- `/instructor/courses`: Gestión de sus Másters/Carreras.
- `/instructor/courses/new`: Formulario creación.
- `/instructor/courses/[course_id]/edit`: Edición completa (estructura, contenido, SEO, publicación).
- `/instructor/students`: Gestión de estudiantes inscritos (Futuro).

**Administrador:**
- `/admin/dashboard`: Panel de Admin (Futuro).
- `/admin/users`: Gestión de todos los usuarios (Vista/Editar Rol).
- `/admin/courses`: Gestión de todos los Másters/Carreras (Vista/Publicar/Enlace Editar).
- `/admin/impersonate`: Interfaz para iniciar/detener impersonación.
- `/admin/billing`: Gestión financiera (Futuro).
- `/admin/settings`: Configuración plataforma (Futuro).

## 6. ROADMAP Y FUNCIONALIDADES PLANIFICADAS

Esta sección detalla las funcionalidades planeadas para Nexo, agrupadas por fases. Sirve como guía para el desarrollo. El estado indica si la funcionalidad está completada ([x]), en pruebas ([🧪]) o pendiente ([ ]).

### Fase: Fundación (MVP) - ACTUAL

* **Funcionalidad: Configuración Inicial del Proyecto y Layouts Base**
  * **Objetivo:**
    * Establecer estructura frontend
    * Integrar librerías base
    * Crear contenedores visuales principales
  * **Estado:** [x]

* **Funcionalidad: Registro de Usuarios (Email/Contraseña)**
  * **Objetivo:**
    * Permitir a nuevos usuarios crear una cuenta
  * **Estado:** [x]

* **Funcionalidad: Inicio de Sesión (Email/Contraseña)**
  * **Objetivo:**
    * Permitir a usuarios registrados acceder a la plataforma
  * **Estado:** [x]

* **Funcionalidad: Contexto de Autenticación y Protección de Rutas**
  * **Objetivo:**
    * Gestionar estado de sesión globalmente
    * Proteger rutas privadas
  * **Estado:** [x]

* **Funcionalidad: Cambio de Vista de Rol (Interfaz Admin)**
  * **Objetivo:**
    * Permitir a Admins previsualizar la interfaz como otros roles para pruebas/navegación
  * **Estado:** [x]

* **Funcionalidad: Visualización Básica de Perfil de Usuario**
  * **Objetivo:**
    * Que el usuario pueda ver su información básica registrada
  * **Estado:** [x]

* **Funcionalidad: Landing Page Moderna y Atractiva**
  * **Objetivo:**
    * Crear una página de inicio (/) visualmente impactante, profesional y optimizada para SEO que presente Nexo y sus ofertas (Másters/Carreras).
  * **Estado:** [x]

* **Funcionalidad: Creación de Cursos (Metadatos y SEO)**
  * **Objetivo:**
    * Permitir a Instructores/Admins iniciar creación de Máster/Carrera con datos básicos y SEO
  * **Estado:** [x]

* **Funcionalidad: Edición de Estructura del Curso (Módulos y Lecciones)**
  * **Objetivo:**
    * Permitir organizar el contenido del Máster/Carrera
  * **Estado:** [x]

* **Funcionalidad: Edición de Contenido de Lección (Texto/Video)**
  * **Objetivo:**
    * Permitir añadir el material didáctico a cada lección
  * **Estado:** [x]

* **Funcionalidad: Publicar / Despublicar Curso**
  * **Objetivo:**
    * Controlar la visibilidad pública de un curso
  * **Estado:** [x]

* **Funcionalidad: Catálogo Público de Cursos**
  * **Objetivo:**
    * Permitir a cualquiera descubrir los cursos disponibles
  * **Estado:** [x]

* **Funcionalidad: Página de Detalle del Curso**
  * **Objetivo:**
    * Mostrar información completa de un curso y permitir compra o acceso
  * **Estado:** [x]

* **Funcionalidad: Acceso Estudiante (Mis Cursos y Vista de Lección)**
  * **Objetivo:**
    * Permitir a estudiantes acceder y consumir el contenido de sus cursos
  * **Estado:** [x]

* **Funcionalidad: Integración de Pago Stripe (Frontend)**
  * **Objetivo:**
    * Iniciar el proceso de pago seguro a través de Stripe
  * **Estado:** [x]

* **Funcionalidad: Procesamiento de Pago Stripe (Backend - Webhook)**
  * **Objetivo:**
    * Confirmar pagos y otorgar acceso automáticamente
  * **Estado:** [x]

* **Funcionalidad: Vista de Administración de Usuarios (Básica)**
  * **Objetivo:**
    * Permitir a Admins ver quién está registrado
    * Cambiar roles de usuarios (admin, instructor, student)
  * **Estado:** [x]

* **Funcionalidad: Vista de Administración de Cursos (Básica)**
  * **Objetivo:**
    * Permitir a Admins ver todos los cursos creados
    * Reordenar cursos mediante Drag & Drop
  * **Estado:** [x]

* **Funcionalidad: Impersonación de Usuarios (Admin)**
  * **Objetivo:**
    * Permitir a Admins experimentar la plataforma como otro usuario para soporte/pruebas
  * **Estado:** [x]

* **Funcionalidad: Datos de Prueba Iniciales (Seed)**
  * **Objetivo:**
    * Facilitar el desarrollo y pruebas iniciales con datos relevantes
  * **Estado:** [x]

* **Funcionalidad: Internacionalización (i18n - Base)**
  * **Objetivo:**
    * Preparar la app para soportar múltiples idiomas
  * **Estado:** [ ]

* **Funcionalidad: Página de Acceso No Autorizado**
  * **Objetivo:**
    * Mostrar una página informativa cuando un usuario intenta acceder a una ruta para la cual no tiene permisos
  * **Estado:** [x]

* **Funcionalidad: Notificaciones en UI (Toast)**
  * **Objetivo:**
    * Proveer feedback inmediato y no intrusivo de las acciones del usuario
  * **Estado:** [x]

* **Funcionalidad General: Ordenamiento Drag & Drop en Vistas de Gestión (Admin/Instructor)**
  * **Objetivo:**
    * Permitir a usuarios con permisos (Admin/Instructor) definir un orden visual personalizado para listas de elementos (Cursos, Módulos, Lecciones, Usuarios, etc.) en las tablas de gestión.
  * **Estado:** [x]

### Fase: Enriquecimiento LMS e Interacción Inicial

* **Funcionalidad: Seguimiento de Progreso en Cursos**
  * **Objetivo:**
    * Permitir a estudiantes y a la plataforma rastrear el avance en los cursos
  * **Estado:** [🧪]

* **Funcionalidad: Comentarios en Lecciones**
  * **Objetivo:**
    * Fomentar la discusión y resolución de dudas sobre el contenido
  * **Estado:** [ ]

* **Funcionalidad: Edición Básica de Perfil**
  * **Objetivo:**
    * Permitir a usuarios mantener su nombre actualizado
  * **Estado:** [ ]

* **Funcionalidad: Panel de Control Instructor (Dashboard)**
  * **Objetivo:**
    * Dar al instructor una vista rápida del estado de sus cursos y estudiantes
  * **Estado:** [ ]

* **Funcionalidad: Calificaciones y Retroalimentación (v1 - Tareas)**
  * **Objetivo:**
    * Permitir a instructores evaluar las tareas enviadas
  * **Estado:** [ ]

## 7. DOCUMENTACIÓN TÉCNICA

### REFAC-MODULARITY-MVP-01: Refactorización para Modularidad

**Fecha**: [Fecha de Implementación]
**Autor**: Lovable AI
**Estado**: Completado

#### Descripción

Se realizó una refactorización del código MVP para mejorar la modularidad y permitir que las grandes áreas funcionales puedan ser potencialmente activadas o desactivadas en diferentes instancias del producto en el futuro.

#### Cambios Implementados

1. **Estructura de Directorios**:
   - Creación de estructura de carpetas `src/features/` para organizar el código por módulos funcionales.
   - Módulo inicial `src/features/courses/` para centralizar la funcionalidad del LMS.

2. **Componentes Extraídos**:
   - `CourseCard`: Componente reutilizable para mostrar tarjetas de cursos en diferentes contextos.
   - `EnrolledCoursesList`: Componente para mostrar la lista de cursos en los que un estudiante está matriculado.

3. **Hooks Específicos**:
   - `useEnrolledCourses`: Hook para obtener los cursos en los que un usuario está matriculado, encapsulando toda la lógica de datos.

4. **Desacoplamiento**:
   - Separación clara entre la lógica de negocio (hooks) y la presentación (componentes).
   - Simplificación de la página `StudentCourses.tsx` para que solo se ocupe de la composición de los componentes.
   - Mejora en el manejo de errores y estados de carga.

5. **Manejo de Datos**:
   - Mejor gestión de los datos obtenidos de Supabase, con validación de tipos adecuada.
   - Corrección en el manejo de datos de instructor para prevenir errores de tipo.

#### Beneficios

- **Mantenibilidad**: Código más modular y fácil de mantener.
- **Reutilización**: Componentes que pueden ser utilizados en diferentes partes de la aplicación.
- **Escalabilidad**: Estructura preparada para la adición de nuevas funcionalidades por módulo.
- **Desacoplamiento**: Reducción de dependencias directas entre módulos potencialmente activables.

#### Próximos Pasos

- Continuar con la refactorización de otras áreas del MVP siguiendo este patrón.
- Implementar la siguiente funcionalidad del roadmap ("Seguimiento de Progreso en Cursos") utilizando esta estructura modular.

### SEC-RLS-CORRECTION-01: Corrección de Políticas RLS

**Fecha**: 2023-12-10
**Autor**: Lovable AI
**Estado**: Completado

#### Descripción

Se realizó una revisión y corrección de las políticas de Row Level Security (RLS) para asegurar que los permisos de acceso a los datos están correctamente implementados según los principios de seguridad establecidos para la plataforma Nexo.

#### Políticas Implementadas

##### Table: profiles

```sql
-- Los usuarios pueden ver su propio perfil completo
CREATE POLICY "Users can view their own profile completely" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Los usuarios autenticados pueden ver información básica de otros perfiles
CREATE POLICY "Users can view basic info of other profiles" 
ON public.profiles FOR SELECT 
TO authenticated
USING (true);

-- Los usuarios pueden actualizar solo su propio perfil
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Los administradores pueden ver todos los perfiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Los administradores pueden actualizar todos los perfiles
CREATE POLICY "Admins can update all profiles" 
ON public.profiles FOR UPDATE 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
```

##### Table: courses

```sql
-- Cualquier usuario puede ver cursos publicados
CREATE POLICY "Public can view published courses" 
ON public.courses FOR SELECT 
USING (is_published = true);

-- Los usuarios matriculados pueden ver sus cursos (incluso los no publicados)
CREATE POLICY "Enrolled users can view courses" 
ON public.courses FOR SELECT 
TO authenticated
USING (
  id IN (
    SELECT course_id FROM public.enrollments WHERE user_id = auth.uid()
  )
);

-- Instructores pueden ver sus propios cursos
CREATE POLICY "Instructors can view their own courses" 
ON public.courses FOR SELECT 
USING (instructor_id = auth.uid());

-- Instructores pueden modificar sus propios cursos
CREATE POLICY "Instructors can modify their own courses" 
ON public.courses FOR ALL 
USING (instructor_id = auth.uid());

-- Administradores pueden ver todos los cursos
CREATE POLICY "Admins can view all courses" 
ON public.courses FOR SELECT 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Administradores pueden modificar todos los cursos
CREATE POLICY "Admins can modify all courses" 
ON public.courses FOR ALL 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
```

##### Table: modules

```sql
-- Cualquier usuario puede ver módulos de cursos publicados
CREATE POLICY "Public can view modules of published courses" 
ON public.modules FOR SELECT 
USING (
  course_id IN (SELECT id FROM public.courses WHERE is_published = true)
);

-- Usuarios matriculados pueden ver módulos de sus cursos
CREATE POLICY "Enrolled users can view modules" 
ON public.modules FOR SELECT 
TO authenticated
USING (
  course_id IN (
    SELECT course_id FROM public.enrollments WHERE user_id = auth.uid()
  )
);

-- Instructores pueden ver módulos de sus cursos
CREATE POLICY "Instructors can view modules of their own courses" 
ON public.modules FOR SELECT 
USING (
  course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid())
);

-- Instructores pueden modificar módulos de sus cursos
CREATE POLICY "Instructors can modify modules of their own courses" 
ON public.modules FOR ALL 
USING (
  course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid())
);

-- Administradores pueden ver todos los módulos
CREATE POLICY "Admins can view all modules" 
ON public.modules FOR SELECT 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Administradores pueden modificar todos los módulos
CREATE POLICY "Admins can modify all modules" 
ON public.modules FOR ALL 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
```

##### Table: lessons

```sql
-- Público puede ver solo lecciones previewables de cursos publicados
CREATE POLICY "Public can view previewable lessons of published courses" 
ON public.lessons FOR SELECT 
USING (
  is_previewable = true AND 
  course_id IN (SELECT id FROM public.courses WHERE is_published = true)
);

-- Usuarios matriculados pueden ver todas las lecciones de sus cursos
CREATE POLICY "Enrolled users can view all lessons of their enrolled courses" 
ON public.lessons FOR SELECT 
TO authenticated
USING (
  course_id IN (
    SELECT course_id FROM public.enrollments WHERE user_id = auth.uid()
  )
);

-- Instructores pueden ver lecciones de sus cursos
CREATE POLICY "Instructors can view lessons of their own courses" 
ON public.lessons FOR SELECT 
USING (
  course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid())
);

-- Instructores pueden modificar lecciones de sus cursos
CREATE POLICY "Instructors can modify lessons of their own courses" 
ON public.lessons FOR ALL 
USING (
  course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid())
);

-- Administradores pueden ver todas las lecciones
CREATE POLICY "Admins can view all lessons" 
ON public.lessons FOR SELECT 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Administradores pueden modificar todas las lecciones
CREATE POLICY "Admins can modify all lessons" 
ON public.lessons FOR ALL 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
```

##### Table: enrollments

```sql
-- Usuarios pueden ver sus propias inscripciones
CREATE POLICY "Users can view their own enrollments" 
ON public.enrollments FOR SELECT 
USING (auth.uid() = user_id);

-- Instructores pueden ver inscripciones para sus cursos
CREATE POLICY "Instructors can view enrollments for their courses" 
ON public.enrollments FOR SELECT 
USING (
  course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid())
);

-- Administradores pueden ver todas las inscripciones
CREATE POLICY "Admins can view all enrollments" 
ON public.enrollments FOR SELECT 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Administradores pueden modificar todas las inscripciones
CREATE POLICY "Admins can modify all enrollments" 
ON public.enrollments FOR ALL 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
```

##### Table: lesson_progress

```sql
-- Usuarios pueden ver su propio progreso
CREATE POLICY "Users can view their own progress" 
ON public.lesson_progress FOR SELECT 
USING (auth.uid() = user_id);

-- Usuarios pueden insertar su propio progreso
CREATE POLICY "Users can insert their own progress" 
ON public.lesson_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Usuarios pueden actualizar su propio progreso
CREATE POLICY "Users can update their own progress" 
ON public.lesson_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Administradores pueden ver todo el progreso
CREATE POLICY "Admins can view all progress" 
ON public.lesson_progress FOR SELECT 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
```

#### Funciones auxiliares

Para evitar problemas de recursión en las políticas RLS, se implementó una función de seguridad:

```sql
-- Función para obtener el rol de un usuario con SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS TEXT 
SECURITY DEFINER 
STABLE
LANGUAGE SQL AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;
```

#### Beneficios y Mejoras

- **Seguridad mejorada**: Se eliminó la capacidad de los usuarios para insertar sus propias inscripciones, limitando esto a procesos controlados como el webhook de pago.
- **Control de acceso granular**: Se definieron claramente las capacidades de lectura/escritura por rol.
- **Acceso adecuado a contenido**: Los usuarios matriculados pueden acceder a todo el contenido de sus cursos, incluso si no son públicos.
- **Prevención de recursión**: Se implementó una función con SECURITY DEFINER para prevenir problemas de recursión en las políticas RLS.
- **Consistencia**: Se aplicó el mismo patrón de políticas en todas las tablas para facilitar el mantenimiento.

### LMS-PROGRESS-01: Seguimiento de Progreso en Cursos

**Fecha**: 2023-12-15
**Autor**: Lovable AI
**Estado**: [🧪] Implementado - En pruebas

#### Descripción

Se implementó un sistema completo de seguimiento de progreso para que los estudiantes puedan rastrear su avance en los cursos en los que están matriculados. El sistema registra qué lecciones han sido completadas, calcula el porcentaje de avance general por curso, y proporciona interfaces visuales para que los estudiantes puedan ver su progreso y continuar desde donde lo dejaron.

#### Componentes Implementados

1. **Tabla de Base de Datos**: `lesson_progress`
   ```sql
   CREATE TABLE public.lesson_progress (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
     lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
     course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
     is_completed BOOLEAN NOT NULL DEFAULT false,
     completion_date TIMESTAMPTZ,
     last_position NUMERIC DEFAULT 0,
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     UNIQUE(user_id, lesson_id)
   );
   ```

2. **Función de Cálculo de Progreso**: `calculate_course_progress`
   ```sql
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

3. **Políticas RLS para `lesson_progress`**
   ```sql
   -- Usuarios pueden ver su propio progreso
   CREATE POLICY "Users can view their own progress" 
   ON public.lesson_progress FOR SELECT 
   USING (auth.uid() = user_id);

   -- Usuarios pueden insertar su propio progreso
   CREATE POLICY "Users can insert their own progress" 
   ON public.lesson_progress FOR INSERT 
   WITH CHECK (auth.uid() = user_id);

   -- Usuarios pueden actualizar su propio progreso
   CREATE POLICY "Users can update their own progress" 
   ON public.lesson_progress FOR UPDATE 
   USING (auth.uid() = user_id);

   -- Administradores pueden ver todo el progreso
   CREATE POLICY "Admins can view all progress" 
   ON public.lesson_progress FOR SELECT 
   USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

   -- Instructores pueden ver el progreso de sus cursos
   CREATE POLICY "Instructors can view progress for their courses" 
   ON public.lesson_progress FOR SELECT 
   USING (
     course_id IN (SELECT id FROM public.courses WHERE instructor_id = auth.uid())
   );
   ```

4. **Hooks Frontend**:
   - `useLessonProgress`: Hook para gestionar el progreso de lecciones individuales
     ```typescript
     // Métodos principales:
     // - markLessonCompleted(): Marca lección como completada
     // - updateLastPosition(position): Actualiza posición en lecciones tipo video
     // - updateProgress(updates): Actualiza cualquier aspecto del progreso
     // - Propiedades: isCompleted, lastPosition, courseProgressPercentage...
     ```
   - `useUserCoursesProgress`: Hook para obtener el progreso de múltiples cursos
     ```typescript
     // Proporciona:
     // - coursesProgress: Un mapa de courseId -> porcentaje de progreso
     // - isLoading: Estado de carga
     ```

5. **Componentes UI**:
   - `CourseProgressBar`: Componente visual para mostrar la barra de progreso
   - `LessonProgressControls`: Botones/controles para marcar lecciones como completadas

6. **Integración en páginas**:
   - `LessonView.tsx`: Muestra controles de progreso para cada lección
   - `CourseLearn.tsx`: Visualización del progreso general del curso, lecciones completadas, etc.
   - `CourseDetail.tsx` y `EnrolledCoursesList`: Muestran el progreso en tarjetas/listados de cursos

#### Flujo de Usuario

1. El estudiante accede a un curso en el que está matriculado
2. Ve indicadores visuales de su progreso general (porcentaje, barra)
3. Puede ver qué lecciones ha completado (iconos de check)
4. Al estudiar una lección, puede marcarla como completada
5. Para lecciones de video, se registra también la última posición
6. El sistema le sugiere continuar desde la siguiente lección no completada

#### Consideraciones Técnicas

- La tabla `lesson_progress` tiene una restricción UNIQUE en (user_id, lesson_id) para evitar duplicados
- Las políticas RLS garantizan que los estudiantes solo puedan ver y modificar su propio progreso
- Los instructores pueden ver el progreso de los estudiantes en sus cursos
- La función `calculate_course_progress` está optimizada para calcular el porcentaje por curso
- El sistema utiliza React Query para cacheo eficiente de datos de progreso

#### Próximas Mejoras (Futuras Fases)

- Añadir análisis avanzados de tiempo dedicado por lección
- Implementar logros y badges por completar secciones/cursos
- Añadir recordatorios personalizados basados en patrones de progreso
- Desarrollar vistas de análisis para instructores/administradores
