
# Nexo Project Source of Truth

**Versión del Documento:** 1.2
**Fecha Última Actualización:** 29 de octubre de 2023
**Estado General:** Inicio del Proyecto - Fase 1 (MVP)

---

## (Parte I) GUIA DE PROYECTO

**Objetivo:** Definir cómo colaboramos, tus responsabilidades y las del equipo humano en la construcción de Nexo.

*   **Visión General:** Nexo integra LMS, Gestión (ERP-Lite) y Comunidad para una experiencia unificada, moderna y eficiente.
*   **Principios Clave:** Usuario Primero (UI/UX `shadcn/ui`), Tecnología Sólida (React, TS, Supabase, etc.), Modularidad (`src/features/*`), Desarrollo Iterativo, Seguridad Integral.
*   **Roles:** Estudiante, Instructor, Administrador.

*   **Filosofía de Trabajo:**
    *   **SSOT:** Este documento es la **única fuente de verdad**.
    *   **Documento Vivo:** Evoluciona constantemente. Parte III define futuro, Parte II refleja lo implementado por ti.
    *   **Iterativo y Validado:** Implementas -> Documentas -> Validamos (`[ ]` -> `[WIP]` -> `[🧪]` -> `[✔️]`).

*   **Instrucciones para el Equipo Humano (Referencia para ti):**
    1.  Definen estrategia y Roadmap (Parte III).
    2.  Crean Briefs (Parte III) - QUÉ/POR QUÉ/CONTEXTO/INTENCIÓN.
    3.  Gestionan estado (`[ ]`, `[WIP]`, `[🧪]`, `[✔️]`) en Parte III.
    4.  Realizan Validación Doble (Funcional y Técnica).
    5.  Mantienen coherencia del documento.

*   **Instrucciones para Ti (Lovable.dev):**
    1.  **Contexto Completo:** Usa este documento como tu guía integral y única.
    2.  **Implementación:**
        *   **Fase 1 (MVP):** Implementa según especificaciones técnicas iniciales en Parte II.
        *   **Fase 2+:** Implementa según *Briefs* (Parte III). Toma decisiones técnicas alineadas (principios, stack, arquitectura). Prioriza robustez, seguridad, escalabilidad.
    3.  **Asignación de ID:** Al documentar una funcionalidad en Parte II, **asígnale y usa un ID único** (ej: `CORE-SETUP-01`).
    4.  **Código:** Modular en `src/features/*`.
    5.  **Clarificación:** Si un Brief es ambiguo, **pregunta**.
    6.  **Requisito Crítico: Documentación Técnica Post-Implementación:**
        *   **Cuándo:** Después de implementar (estado `[🧪]`).
        *   **Dónde:** En **Parte II, Sección: Detalles de Funcionalidades Implementadas**, bajo el ID asignado.
        *   **Qué Documentar (Mínimo):** Resumen técnico, **Cambios BD (SQL DDL obligatorio)**, Lógica Backend (RPC/Edge), Políticas RLS (SQL DDL), Acceso y UI por Rol (páginas, roles, funciones visibles), Cambios Clave Frontend, APIs Externas, Seguridad, Decisiones Técnicas.
        *   **Estilo:** Claro, conciso, completo. Usa bloques de código.

---

## (Parte II) DOCUMENTACION TÉCNICA

**Objetivo:** Reflejar el **estado técnico actual implementado** de Nexo.

### Sección: Pila Tecnológica Principal (Tech Stack)
*(Actualizarás esta sección si introduces nuevas tecnologías principales)*

*   React 18+, TypeScript, Vite, shadcn/ui, Tailwind CSS, Framer Motion, Lucide React, Supabase (PostgreSQL, Auth, Storage, Edge/RPC Functions), React Query, React Context, React Router DOM v6, React Hook Form, Zod, Tiptap, Stripe SDKs, i18next (base).

### Sección: Arquitectura General del Sistema
*(Actualizarás esta sección si hay cambios arquitectónicos mayores)*

*   **Frontend:** SPA React (Vite). Modular (`src/features/*`). Compartidos (`src/components`, `src/hooks`, `src/lib`). Layouts (`PublicLayout`, `AppLayout`). Comunicación: `supabase-js` + React Query.
*   **Backend:** Supabase Platform. API Gateway. Seguridad: RLS + RPC/Edge Functions seguras.

### Sección: Esquema de Base de Datos (Supabase PostgreSQL)
*(Refleja el estado actual. Documentarás cambios aquí y en la sección de funcionalidad)*

```sql
-- SQL DDL para el esquema inicial - Fase 1
DO $$ BEGIN CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.lesson_content_type AS ENUM ('text', 'video'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.payment_status AS ENUM ('pending', 'succeeded', 'failed'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.currency_code AS ENUM ('eur', 'usd'); EXCEPTION WHEN duplicate_object THEN null; END $$;
CREATE TABLE IF NOT EXISTS public.profiles ( id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, full_name TEXT, role user_role NOT NULL DEFAULT 'student', created_at TIMESTAMPTZ DEFAULT now() NOT NULL, updated_at TIMESTAMPTZ DEFAULT now() NOT NULL );
CREATE TABLE IF NOT EXISTS public.courses ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), instructor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL, title TEXT NOT NULL CHECK (char_length(trim(title)) > 0), description TEXT, price NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (price >= 0), currency currency_code NOT NULL DEFAULT 'eur', is_published BOOLEAN NOT NULL DEFAULT false, created_at TIMESTAMPTZ DEFAULT now() NOT NULL, updated_at TIMESTAMPTZ DEFAULT now() NOT NULL );
CREATE TABLE IF NOT EXISTS public.modules ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE, title TEXT NOT NULL CHECK (char_length(trim(title)) > 0), module_order INTEGER NOT NULL DEFAULT 0 CHECK (module_order >= 0), created_at TIMESTAMPTZ DEFAULT now() NOT NULL, updated_at TIMESTAMPTZ DEFAULT now() NOT NULL );
CREATE TABLE IF NOT EXISTS public.lessons ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE, course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE, title TEXT NOT NULL CHECK (char_length(trim(title)) > 0), content_type lesson_content_type NOT NULL DEFAULT 'text', content_text JSONB, content_video_url TEXT CHECK (content_video_url IS NULL OR content_video_url ~* '^https?://'), lesson_order INTEGER NOT NULL DEFAULT 0 CHECK (lesson_order >= 0), is_previewable BOOLEAN NOT NULL DEFAULT false, created_at TIMESTAMPTZ DEFAULT now() NOT NULL, updated_at TIMESTAMPTZ DEFAULT now() NOT NULL );
CREATE TABLE IF NOT EXISTS public.enrollments ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE, course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE, enrolled_at TIMESTAMPTZ DEFAULT now() NOT NULL, UNIQUE (user_id, course_id) );
CREATE TABLE IF NOT EXISTS public.payments ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE, course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL, stripe_charge_id TEXT UNIQUE, stripe_checkout_session_id TEXT UNIQUE, amount NUMERIC(10, 2) NOT NULL, currency currency_code NOT NULL, status payment_status NOT NULL DEFAULT 'pending', metadata JSONB, created_at TIMESTAMPTZ DEFAULT now() NOT NULL );
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;
DO $$ BEGIN CREATE TRIGGER set_profiles_timestamp BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp(); EXCEPTION WHEN duplicate_object THEN null; END $$; DO $$ BEGIN CREATE TRIGGER set_courses_timestamp BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp(); EXCEPTION WHEN duplicate_object THEN null; END $$; DO $$ BEGIN CREATE TRIGGER set_modules_timestamp BEFORE UPDATE ON public.modules FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp(); EXCEPTION WHEN duplicate_object THEN null; END $$; DO $$ BEGIN CREATE TRIGGER set_lessons_timestamp BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp(); EXCEPTION WHEN duplicate_object THEN null; END $$;
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$ DECLARE user_meta_data jsonb := new.raw_user_meta_data; user_full_name text := user_meta_data ->> 'full_name'; BEGIN INSERT INTO public.profiles (id, full_name) VALUES (new.id, user_full_name); RETURN new; EXCEPTION WHEN unique_violation THEN RETURN new; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
DO $$ BEGIN CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); EXCEPTION WHEN duplicate_object THEN null; END $$;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY; ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY; ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY; ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY; ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY; ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
-- RLS Policies (Initial - Apply and document changes)
CREATE POLICY "Profiles: Allow own read" ON public.profiles FOR SELECT USING (auth.uid() = id); CREATE POLICY "Profiles: Allow admin read" ON public.profiles FOR SELECT TO authenticated USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); CREATE POLICY "Profiles: Allow logged-in read basic" ON public.profiles FOR SELECT TO authenticated USING (true); CREATE POLICY "Profiles: Allow own update" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id); CREATE POLICY "Profiles: Allow admin update" ON public.profiles FOR UPDATE TO authenticated USING (((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')); CREATE POLICY "Courses: Public read published" ON public.courses FOR SELECT USING (is_published = true); CREATE POLICY "Courses: Enrolled read" ON public.courses FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.course_id = courses.id AND enrollments.user_id = auth.uid())); CREATE POLICY "Courses: Instructor access" ON public.courses FOR ALL USING (auth.uid() = instructor_id); CREATE POLICY "Courses: Admin access" ON public.courses FOR ALL TO authenticated USING (((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')); CREATE POLICY "Modules: Read based on course" ON public.modules FOR SELECT USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = modules.course_id)); CREATE POLICY "Modules: Write based on course" ON public.modules FOR ALL USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = modules.course_id)); CREATE POLICY "Lessons: Public read previewable" ON public.lessons FOR SELECT USING (is_previewable = true AND EXISTS (SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id AND courses.is_published = true)); CREATE POLICY "Lessons: Enrolled read non-previewable" ON public.lessons FOR SELECT TO authenticated USING (NOT is_previewable AND EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.course_id = lessons.course_id AND enrollments.user_id = auth.uid())); CREATE POLICY "Lessons: Write based on course" ON public.lessons FOR ALL USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id)); CREATE POLICY "Enrollments: Own access" ON public.enrollments FOR ALL USING (auth.uid() = user_id); CREATE POLICY "Enrollments: Instructor read" ON public.enrollments FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.instructor_id = auth.uid())); CREATE POLICY "Enrollments: Admin access" ON public.enrollments FOR ALL TO authenticated USING (((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')); CREATE POLICY "Payments: Own read" ON public.payments FOR SELECT USING (auth.uid() = user_id); CREATE POLICY "Payments: Admin read" ON public.payments FOR SELECT TO authenticated USING (((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'));
```

### Sección: Navegación y Acceso a Páginas por Rol (Resumen)
*(Vista general inicial. Detalles en tu documentación por funcionalidad)*

**Públicas:** /, /auth/login, /auth/register, /courses, /courses/:id, /payment/*.

**Comunes (Autenticado):** /home, /profile, /settings.

**Estudiante:** /student/my-courses, /learn/courses/:courseId/lessons/:lessonId.

**Instructor:** /instructor/courses, /instructor/courses/new, /instructor/courses/:id/edit.

**Administrador:** /admin/users, /admin/courses, /admin/impersonate.

**Control Acceso:** ProtectedRoute (FE) + RLS (BE). UI condicional por rol.

### Sección: Detalles de Funcionalidades Implementadas
*(Aquí documentarás y modificarás tú, Lovable.dev, post-implementación)*

**ID Asignado por Lovable**: CORE-SETUP-01  
**Funcionalidad**: Configuración Inicial del Proyecto y Layouts Base  
**Fase**: 1  
**Estado**: [✔️] Validado

Resumen Técnico: Implementación inicial del proyecto con configuración base, layouts principales y componentes fundamentales.

Cambios BD:

SQL DDL: 
```sql
-- No aplica para esta funcionalidad
```

Lógica Backend: No aplica para esta funcionalidad.

Políticas RLS: No aplica para esta funcionalidad.

Acceso y UI por Rol:
- Páginas creadas: Layouts base (PublicLayout, AppLayout)
- Acceso: Layouts aplicados a rutas correspondientes
- Funcionalidades Visibles: Placeholders de interfaz para la estructura básica

Cambios Clave Frontend:
- Instalación de dependencias principales
- Configuración del cliente Supabase
- Creación de componentes de layout principales
- Configuración de rutas básicas

APIs Externas: Conexión inicial a Supabase (sólo configuración)

Seguridad: Configuración base para futuras implementaciones de seguridad

Decisiones Técnicas:
- Uso de shadcn/ui para componentes de interfaz coherentes
- Estructura de archivos organizada para escalabilidad
- Separación clara entre layouts públicos y de aplicación autenticada

**ID Asignado por Lovable**: AUTH-REGISTER-01  
**Funcionalidad**: Registro de Usuarios (Email/Contraseña)  
**Fase**: 1  
**Estado**: [🧪] Para Validación (Equipo)  

Resumen Técnico: Implementación del sistema de registro de usuarios mediante correo electrónico y contraseña, utilizando React Hook Form con validación Zod y Supabase Auth.

Cambios BD:

SQL DDL: 
```sql
-- No requiere cambios adicionales, se utilizan las tablas auth.users (interna de Supabase) y profiles ya definidas
-- El trigger handle_new_user ya está configurado para crear el perfil al registrarse
```

Lógica Backend: Se utiliza la funcionalidad integrada de Supabase Auth para el registro. Cuando un usuario se registra, se envía su nombre completo como metadata, y el trigger handle_new_user lo guarda en la tabla profiles.

Políticas RLS: Se mantienen las políticas RLS existentes que permiten a los usuarios leer su propio perfil.

Acceso y UI por Rol:
- Páginas creadas/modificadas: /auth/register (formulario de registro)
- Acceso: Ruta pública, cualquier usuario no autenticado
- Funcionalidades Visibles: Formulario de registro con validación en tiempo real

Cambios Clave Frontend:
- Implementación de esquema de validación con Zod (registerSchema)
- Creación de hook personalizado useRegister para manejar la lógica de autenticación
- Implementación de formulario con React Hook Form y shadcn/ui
- Feedback visual durante el proceso de registro con indicadores de carga
- Notificaciones de éxito/error con toast

APIs Externas: Integración con Supabase Auth para el proceso de registro

Seguridad:
- Validación de contraseñas con requisitos mínimos (longitud, mayúsculas, minúsculas, números)
- Confirmación de contraseña para prevenir errores
- Manejo adecuado de errores de autenticación

Decisiones Técnicas:
- Separación de lógica de validación (schema) y lógica de negocio (hook)
- Uso de React Hook Form para manejo eficiente de formularios con validación
- Implementación de feedback en tiempo real para mejorar UX
- Redirección automática a /home tras registro exitoso

## (Parte III) ROADMAP DE DESARROLLO

**Objetivo:** Definir qué construir a continuación (Briefs para ti).

### Sección: Resumen de Fases del Roadmap

**(Fase 1) Fundación (MVP - Foco Actual)**: Núcleo: Auth, Crear/Vender/Consumir Cursos, Pagos, Admin Básico.

**(Fase 2) Enriquecimiento LMS e Interacción**: Progreso, Comentarios, Edición Perfil/Admin, Notifs UI.

**(Fase 3) Gestión, Interactividad y Mejoras Instructor**: Dashboards, Reportes, Quizzes, Tareas, Categorías.

**(Fase 4) Comunidad y Networking (Base)**: Perfiles Ampliados, Feed, Conexiones/Seguimiento, Mensajería.

**(Fase 5) Funcionalidades Avanzadas e IA**: Grupos, Empleo, Certificados, Rutas, IA, Realtime.

**(Fase 6+) Escala, Optimización y SAAS**: Rendimiento, API, Integraciones, Tematización.

### Sección: Funcionalidades Planificadas (Briefs para Ti, Lovable.dev)
*(Implementa en orden. Asigna ID al documentar en Parte II)*

**Fase: Fundación (MVP)**

**Funcionalidad: Configuración Inicial del Proyecto y Layouts Base**

Brief: Crear proyecto React/TS/Vite; Instalar/configurar dependencias (Supabase, shadcn, Tailwind, Router, React Query, RHF/Zod, Tiptap, Framer Motion, i18next); Definir PublicLayout y AppLayout (con TopBar, SideBar placeholders); Configurar routing y cliente Supabase base.

Estado: [✔️] Completado

**Funcionalidad: Registro de Usuarios (Email/Contraseña)**

Brief: Crear UI (/auth/register) para Nombre, Email, Contraseña; Usar supabase.auth.signUp (pasar full_name); Trigger debe crear profiles con nombre; Validar (RHF/Zod); Sin confirmación email MVP; Redirigir a /home.

Estado: [🧪] Para Validación

**Funcionalidad: Inicio de Sesión (Email/Contraseña)**

Brief: Crear UI (/auth/login) para Email, Contraseña; Usar supabase.auth.signInWithPassword; Validar; Redirigir a /home; Manejar errores.

Estado: [ ] Pendiente

**Funcionalidad: Contexto de Autenticación y Protección de Rutas**

Brief: Crear AuthContext (escucha onAuthStateChange, guarda session, user con rol/nombre de profiles); Exponer estado y logout; Crear ProtectedRoute (redirige si no auth); Aplicar a rutas; Botón Logout.

Estado: [ ] Pendiente

**Funcionalidad: Cambio de Vista de Rol (Interfaz Admin)**

Brief: Control UI (Select?) en TopBar, solo Admins; Opciones "Ver como: [Rol Actual] / Instructor / Student"; Actualizar estado UI; SideBar filtra navegación; No cambiar permisos backend.

Estado: [ ] Pendiente

**Funcionalidad: Visualización Básica de Perfil de Usuario**

Brief: Página /profile; Mostrar Email, Nombre, Rol (desde AuthContext); Solo vista.

Estado: [ ] Pendiente

**Funcionalidad: Creación de Cursos (Metadatos)**

Brief: (Instructores/Admins) UI (form) para Título, Descripción, Precio, Moneda; Guardar en courses (instructor_id = actual); Inicia no publicado; Validar; Usar React Query (useMutation); Redirigir a edición.

Estado: [ ] Pendiente

**Funcionalidad: Edición de Estructura del Curso (Módulos y Lecciones)**

Brief: (Instructores/Admins) UI en edición curso: CRUD + Reordenar Módulos (title, order); CRUD + Reordenar Lecciones (title, order) dentro de módulos; Actualizar BD; D&D opcional; Enlace a editar contenido.

Estado: [ ] Pendiente

**Funcionalidad: Edición de Contenido de Lección (Texto/Video)**

Brief: (Instructores/Admins) UI edición lección: Selector tipo (Texto/Video); Editor Tiptap (básico) para Texto (guardar JSON en content_text); Input URL para Video (guardar en content_video_url); Limpiar campo no usado.

Estado: [ ] Pendiente

**Funcionalidad: Publicar / Despublicar Curso**

Brief: (Instructores/Admins) Control (Switch?) en edición curso para cambiar is_published en courses; Feedback visual.

Estado: [ ] Pendiente

**Funcionalidad: Catálogo Público de Cursos**

Brief: Página /courses; Mostrar tarjetas cursos is_published=true; Incluir Título, Instructor, Precio; Enlazar a detalle.

Estado: [ ] Pendiente

**Funcionalidad: Página de Detalle del Curso**

Brief: Página /courses/:id; Mostrar detalles (desc, instructor, precio, estructura); Botón "Comprar" (si no inscrito/logueado) O "Ir al Curso" (si inscrito).

Estado: [ ] Pendiente

**Funcionalidad: Acceso Estudiante (Mis Cursos y Vista de Lección)**

Brief: Página /student/my-courses (lista inscritos); Vista /learn/... (valida inscripción, muestra contenido Tiptap/Video, navegación lecciones).

Estado: [ ] Pendiente

**Funcionalidad: Integración de Pago Stripe (Frontend)**

Brief: Botón "Comprar" llama a Edge Function create-checkout-session; Recibe sessionId; Redirige a Stripe Checkout (stripe-js). Configurar URLs success/cancel.

Estado: [ ] Pendiente

**Funcionalidad: Procesamiento de Pago Stripe (Backend - Webhook)**

Brief: Edge Function stripe-webhook escucha checkout.session.completed; Verificar firma; Extraer metadata; Crear payments y enrollments; Idempotente.

Estado: [ ] Pendiente

**Funcionalidad: Vista de Administración de Usuarios (Básica)**

Brief: (Admins) Página /admin/users; Tabla (shadcn/ui) profiles: ID, Nombre, Email, Rol, Fecha Registro; Solo vista. Opcional: paginación/búsqueda.

Estado: [ ] Pendiente

**Funcionalidad: Vista de Administración de Cursos (Básica)**

Brief: (Admins) Página /admin/courses; Tabla courses: ID, Título, Instructor, Precio, Estado Pub.; Enlace a edición; Solo vista/enlace. Opcional: paginación/búsqueda.

Estado: [ ] Pendiente

**Funcionalidad: Impersonación de Usuarios (Admin)**

Brief: (Admins) UI búsqueda usuarios (con sugerencias); Lógica (RPC?) genera JWT temporal para objetivo; Actualizar sesión FE; UI: Banner "Viendo como..." + Botón "Detener"; Lógica "Detener" restaura sesión admin; BD: Tabla audit_log (inicio/fin impersonación). Alta precaución seguridad.

Estado: [ ] Pendiente

**Funcionalidad: Datos de Prueba Iniciales (Seed)**

Brief: Crear script seed.sql; Insertar usuarios (Admin, Instructor, Estudiante), cursos, módulos/lecciones, inscripción.

Estado: [ ] Pendiente

**Funcionalidad: Internacionalización (i18n - Base)**

Brief: Configurar i18next (EN/ES), archivos traducción, LanguageSwitcher UI. (Prioridad baja Fase 1).

Estado: [ ] Pendiente

**(Fase 2) Enriquecimiento LMS e Interacción Inicial**

*(Lista de funcionalidades omitida por brevedad, se incluirán en el documento completo)*

**(Fase 3-6) Futuras fases**

*(Lista de funcionalidades omitida por brevedad, se incluirán en el documento completo)*
