
# Nexo Project - Guía de Desarrollo

**Versión:** 1.4
**Última Actualización:** 2023-11-01
**Estado:** Fase 1 (MVP) - En desarrollo

## 1. VISIÓN GENERAL

Nexo es una plataforma educativa unificada que integra funcionalidades LMS, ERP y comunidad.

**Principios:**
- Experiencia de usuario intuitiva
- Tecnología confiable y moderna
- Arquitectura modular
- Desarrollo iterativo
- Seguridad por diseño

**Roles:**
- **Estudiante:** Acceso a cursos, seguimiento de progreso
- **Instructor:** Creación y gestión de cursos
- **Administrador:** Gestión de usuarios y sistema

## 2. STACK TECNOLÓGICO

- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui
- **Estado:** React Query, Context API
- **Validación:** React Hook Form, Zod
- **Backend:** Supabase (Auth, DB, Storage)
- **Extras:** Tiptap (editor), Stripe (pagos)

## 3. ARQUITECTURA

**Frontend:**
- Aplicación SPA React
- Componentes en `src/components`
- Features en `src/features`
- Layouts: `PublicLayout` y `AppLayout`

**Backend:**
- Supabase con Row Level Security
- Tablas relacionales en PostgreSQL

## 4. ESQUEMA DE BASE DE DATOS

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
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
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
```

## 5. RUTAS Y ACCESO

**Públicas:**
- `/`: Landing page
- `/auth/login`: Inicio de sesión
- `/auth/register`: Registro
- `/courses`: Catálogo de cursos

**Autenticadas:**
- `/home`: Dashboard
- `/profile`: Perfil de usuario
- `/settings`: Configuración

**Estudiante:**
- `/student/my-courses`: Cursos inscritos
- `/learn/courses/:courseId/lessons/:lessonId`: Vista de lección

**Instructor:**
- `/instructor/courses`: Gestión de cursos
- `/instructor/courses/new`: Creación de curso
- `/instructor/courses/:id/edit`: Edición de curso
- `/instructor/students`: Gestión de estudiantes

**Administrador:**
- `/admin/users`: Gestión de usuarios
- `/admin/courses`: Gestión de todos los cursos
- `/admin/impersonate`: Impersonación de usuarios

## 6. ROADMAP DE DESARROLLO

### Fase 1: Fundación (MVP) - ACTUAL

- [x] Configuración Inicial del Proyecto
- [x] Registro de Usuarios
- [x] Inicio de Sesión
- [x] Contexto de Autenticación
- [x] Cambio de Vista de Rol (Admin)
- [x] Visualización de Perfil de Usuario
- [ ] Creación de Cursos (Metadatos)
- [ ] Edición de Estructura del Curso
- [ ] Edición de Contenido de Lección
- [ ] Publicar/Despublicar Curso
- [ ] Catálogo Público de Cursos
- [ ] Página de Detalle del Curso
- [ ] Acceso Estudiante (Mis Cursos)
- [ ] Integración de Pago Stripe
- [ ] Procesamiento de Pago Stripe
- [ ] Vista de Administración de Usuarios
- [ ] Vista de Administración de Cursos
- [ ] Impersonación de Usuarios
- [ ] Datos de Prueba Iniciales
- [ ] Internacionalización (Base)

### Fase 2: Enriquecimiento

- [ ] Seguimiento de Progreso del Estudiante
- [ ] Comentarios en Lecciones
- [ ] Edición de Perfil de Usuario
- [ ] Panel de Control Instructor
- [ ] Notificaciones en UI
- [ ] Calificaciones y Retroalimentación

### Fase 3: Expansión

- [ ] Dashboards Avanzados
- [ ] Reportes y Analíticas
- [ ] Quizzes y Evaluaciones
- [ ] Sistema de Comunidad
- [ ] Integraciones Avanzadas

## 7. SOLICITUDES DE IMPLEMENTACIÓN

Para solicitar una nueva funcionalidad, agregue una entrada así:

```
### Solicitud: [Nombre de la Funcionalidad]
**Descripción:** [Breve descripción]
**Prioridad:** [Alta/Media/Baja]
**Detalles:**
- [Punto 1]
- [Punto 2]
```

### Solicitud: Creación de Cursos
**Descripción:** Implementar el flujo de creación de cursos para instructores
**Prioridad:** Alta
**Detalles:**
- Crear formulario de creación con título, descripción y precio
- Implementar subida de imagen de portada
- Permitir guardar como borrador o publicar
