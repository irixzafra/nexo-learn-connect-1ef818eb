
# Nexo Project - Guía de Desarrollo

**Versión:** 1.5
**Última Actualización:** 2023-11-15
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

## 6. ROADMAP Y FUNCIONALIDADES PLANIFICADAS

Esta sección detalla las funcionalidades planeadas para Nexo, agrupadas por fases. Sirve como guía para el desarrollo. El estado indica si la funcionalidad está completada ([x]) o pendiente ([ ]).

### Fase: Fundación (MVP) - ACTUAL

* **Funcionalidad: Configuración Inicial del Proyecto y Layouts Base**
  * **Objetivo:**
    * Establecer estructura frontend
    * Integrar librerías base
    * Crear contenedores visuales principales
  * **Acciones Clave:**
    * (Setup técnico) Instalar dependencias (React, TS, Vite, Supabase, shadcn, etc.)
    * Configurar Tailwind, cliente Supabase, Router, i18n base
  * **Flujo Principal:**
    * (Setup técnico) Inicializar proyecto -> Instalar -> Configurar -> Crear Layouts (PublicLayout, AppLayout con TopBar/SideBar placeholders)
  * **Interacciones:**
    * Base para todo el frontend
    * Conexión inicial Supabase
  * **Pistas UI/UX:**
    * Layouts claros
    * SideBar con animación retráctil básica (Framer Motion)
  * **Estado:** [x]

* **Funcionalidad: Registro de Usuarios (Email/Contraseña)**
  * **Objetivo:**
    * Permitir a nuevos usuarios crear una cuenta
  * **Acciones Clave:**
    * Ir a /auth/register
    * Rellenar Nombre, Email, Contraseña
    * Enviar formulario
  * **Flujo Principal:**
    * Navegar a registro -> Completar datos válidos (RHF/Zod) -> Submit -> Cuenta creada en Supabase Auth y profiles (vía trigger) -> Redirigido a /home
  * **Interacciones:**
    * supabase.auth.signUp
    * Trigger handle_new_user
    * Tabla profiles
  * **Pistas UI/UX:**
    * Formulario claro (Card, Input, Button shadcn/ui)
    * Sin confirmación email MVP
  * **Estado:** [x]

* **Funcionalidad: Inicio de Sesión (Email/Contraseña)**
  * **Objetivo:**
    * Permitir a usuarios registrados acceder a la plataforma
  * **Acciones Clave:**
    * Ir a /auth/login
    * Rellenar Email, Contraseña
    * Enviar formulario
  * **Flujo Principal:**
    * Navegar a login -> Completar credenciales -> Submit -> Sesión iniciada (Supabase Auth) -> Redirigido a /home
  * **Interacciones:**
    * supabase.auth.signInWithPassword
  * **Pistas UI/UX:**
    * Formulario claro
    * Manejo de errores (credenciales inválidas)
  * **Estado:** [x]

* **Funcionalidad: Contexto de Autenticación y Protección de Rutas**
  * **Objetivo:**
    * Gestionar estado de sesión globalmente
    * Proteger rutas privadas
  * **Acciones Clave:**
    * (Interno) Escuchar cambios auth
    * Obtener datos usuario (rol)
    * (Usuario) Usar botón Logout
  * **Flujo Principal:**
    * App carga -> Contexto inicializa -> Escucha Supabase Auth -> Si logueado, obtiene datos perfil -> Estado isAuthenticated=true -> Rutas protegidas accesibles. Si no logueado -> isAuthenticated=false -> Redirigido a login al intentar acceder a ruta protegida. Logout limpia sesión.
  * **Interacciones:**
    * supabase.auth.onAuthStateChange, supabase.auth.signOut
    * Lectura profiles
    * Componente ProtectedRoute
  * **Pistas UI/UX:**
    * Botón Logout accesible (en TopBar)
    * Loader mientras carga estado inicial
  * **Estado:** [x]

* **Funcionalidad: Cambio de Vista de Rol (Interfaz Admin)**
  * **Objetivo:**
    * Permitir a Admins previsualizar la interfaz como otros roles para pruebas/navegación
  * **Acciones Clave:**
    * Admin selecciona rol ('Instructor'/'Student') desde control UI (Select?) en TopBar
  * **Flujo Principal:**
    * Admin logueado -> Selecciona rol en switcher -> Estado UI se actualiza -> SideBar y otras UIs condicionales muestran la vista del rol seleccionado
  * **Interacciones:**
    * Lee rol real del AuthContext
    * Actualiza estado UI (local/contexto UI)
    * SideBar re-renderiza basado en rol seleccionado. No afecta permisos backend.
  * **Pistas UI/UX:**
    * Control solo visible para role='admin'
    * Feedback claro del rol que se está visualizando
  * **Estado:** [x]

* **Funcionalidad: Visualización Básica de Perfil de Usuario**
  * **Objetivo:**
    * Que el usuario pueda ver su información básica registrada
  * **Acciones Clave:**
    * Navegar a /profile (desde menú usuario)
  * **Flujo Principal:**
    * Usuario va a /profile -> Página carga datos del AuthContext -> Muestra Email, Nombre Completo, Rol
  * **Interacciones:**
    * Lee datos del AuthContext
  * **Pistas UI/UX:**
    * Página simple, solo lectura (Card?)
  * **Estado:** [x]

* **Funcionalidad: Creación de Cursos (Metadatos)**
  * **Objetivo:**
    * Permitir a Instructores/Admins iniciar la creación de un curso
  * **Acciones Clave:**
    * Acceder a UI creación (form)
    * Definir Título, Descripción, Precio, Moneda
    * Guardar borrador
  * **Flujo Principal:**
    * Acceder a UI -> Rellenar formulario (validado RHF/Zod) -> Guardar -> Nuevo registro en courses (no publicado, instructor_id asignado) -> Redirigido a edición estructura
  * **Interacciones:**
    * Escritura en courses
    * Lee instructor_id del usuario actual
    * React Query useMutation
  * **Pistas UI/UX:**
    * Formulario claro (Input, Textarea, Select)
    * Feedback guardado
  * **Estado:** [x]

* **Funcionalidad: Edición de Estructura del Curso (Módulos y Lecciones)**
  * **Objetivo:**
    * Permitir organizar el contenido del curso en módulos y lecciones
  * **Acciones Clave:**
    * (En edición curso) Añadir Módulo
    * Editar título Módulo
    * Eliminar Módulo
    * Reordenar Módulos
    * Añadir Lección (a módulo)
    * Editar título Lección
    * Eliminar Lección
    * Reordenar Lecciones (dentro módulo)
    * Navegar a editar contenido lección
  * **Flujo Principal:**
    * Instructor edita curso -> Usa controles UI para manipular módulos/lecciones -> Cambios se guardan en BD (modules, lessons) vía React Query
  * **Interacciones:**
    * CRUD + Update (orden) en modules, lessons
  * **Pistas UI/UX:**
    * Lista anidada clara
    * Controles intuitivos (botones, iconos)
    * D&D opcional
  * **Estado:** [x]

* **Funcionalidad: Edición de Contenido de Lección (Texto/Video)**
  * **Objetivo:**
    * Permitir añadir el material didáctico a cada lección
  * **Acciones Clave:**
    * (En edición lección) Seleccionar tipo (Texto/Video)
    * Escribir/editar en Tiptap (formato básico)
    * Pegar URL video
    * Guardar contenido
  * **Flujo Principal:**
    * Navega a editar lección -> Elige tipo -> Edita contenido -> Guarda -> Contenido actualizado en lessons (content_text o content_video_url)
  * **Interacciones:**
    * Update lessons
    * Editor Tiptap
  * **Pistas UI/UX:**
    * Editor Tiptap integrado
    * Input URL claro
  * **Estado:** [x]

* **Funcionalidad: Publicar / Despublicar Curso**
  * **Objetivo:**
    * Controlar la visibilidad pública de un curso
  * **Acciones Clave:**
    * (En edición curso) Activar/desactivar control de publicación
  * **Flujo Principal:**
    * Edita curso -> Cambia estado switch/botón -> Campo is_published en courses se actualiza
  * **Interacciones:**
    * Update courses
  * **Pistas UI/UX:**
    * Control claro (Switch?)
  * **Estado:** [ ]

* **Funcionalidad: Catálogo Público de Cursos**
  * **Objetivo:**
    * Permitir a cualquiera descubrir los cursos disponibles
  * **Acciones Clave:**
    * Navegar a /courses
    * Ver lista de cursos
    * Hacer clic en un curso
  * **Flujo Principal:**
    * Usuario visita /courses -> Se cargan cursos is_published=true -> Se muestran tarjetas (Título, Instructor, Precio) -> Clic lleva a detalle curso
  * **Interacciones:**
    * Lectura courses y profiles (instructor)
  * **Pistas UI/UX:**
    * Diseño atractivo (Cards)
    * Carga eficiente
  * **Estado:** [ ]

* **Funcionalidad: Página de Detalle del Curso**
  * **Objetivo:**
    * Mostrar información completa de un curso y permitir compra o acceso
  * **Acciones Clave:**
    * Ver Título, Desc, Instructor, Precio, Estructura (Módulos/Lecciones)
    * Clic en "Comprar" o "Ir al Curso"
  * **Flujo Principal:**
    * Usuario llega a /courses/:id -> Se carga info curso y estado inscripción -> UI muestra detalles -> Botón acción correspondiente visible
  * **Interacciones:**
    * Lectura courses, modules, lessons, profiles, enrollments
    * Llama a flujo Stripe o navega a /learn
  * **Pistas UI/UX:**
    * Info bien estructurada
    * CTA claro
  * **Estado:** [ ]

* **Funcionalidad: Acceso Estudiante (Mis Cursos y Vista de Lección)**
  * **Objetivo:**
    * Permitir a estudiantes acceder y consumir el contenido de sus cursos
  * **Acciones Clave:**
    * Ir a /student/my-courses
    * Ver lista cursos inscritos
    * Clic para ir a curso
    * Navegar entre lecciones
    * Ver contenido lección
  * **Flujo Principal:**
    * Va a "Mis Cursos" -> Carga enrollments+courses -> Ve lista -> Clic -> Va a /learn/... -> Carga lección (valida inscripción) -> Muestra contenido -> Usa navegación (sidebar/botones) para cambiar lección
  * **Interacciones:**
    * Lectura enrollments, courses, modules, lessons
    * Render Tiptap/Video player
  * **Pistas UI/UX:**
    * Navegación curso clara en /learn
    * Contenido legible/visible
  * **Estado:** [ ]

* **Funcionalidad: Integración de Pago Stripe (Frontend)**
  * **Objetivo:**
    * Iniciar el proceso de pago seguro a través de Stripe
  * **Acciones Clave:**
    * Usuario hace clic en "Comprar Ahora"
  * **Flujo Principal:**
    * Clic -> Llama a Edge Function (create-checkout-session) -> Recibe sessionId -> Redirige a Stripe (stripe.redirectToCheckout)
  * **Interacciones:**
    * Llamada a Edge Function
    * Uso stripe-js
  * **Pistas UI/UX:**
    * Feedback de carga en botón
  * **Estado:** [ ]

* **Funcionalidad: Procesamiento de Pago Stripe (Backend - Webhook)**
  * **Objetivo:**
    * Confirmar pagos y otorgar acceso automáticamente
  * **Acciones Clave:**
    * (Sistema) Recibir evento Stripe
    * Validar firma
    * Procesar datos
    * Actualizar BD
  * **Flujo Principal:**
    * Stripe envía checkout.session.completed -> Edge Function recibe -> Verifica firma -> Extrae metadata -> Inserta en payments y enrollments
  * **Interacciones:**
    * Recibe webhook Stripe
    * Escritura payments, enrollments
  * **Pistas UI/UX:**
    * (Ninguna directa) Fiabilidad y seguridad backend. Idempotencia.
  * **Estado:** [ ]

* **Funcionalidad: Vista de Administración de Usuarios (Básica)**
  * **Objetivo:**
    * Permitir a Admins ver quién está registrado
  * **Acciones Clave:**
    * Navegar a /admin/users
    * Ver tabla usuarios
  * **Flujo Principal:**
    * Admin va a /admin/users -> Carga datos profiles (+email de auth.users) -> Muestra tabla
  * **Interacciones:**
    * Lectura profiles, auth.users
  * **Pistas UI/UX:**
    * Tabla clara (shadcn/ui)
    * Paginación/Búsqueda básica opcional. Solo vista.
  * **Estado:** [ ]

* **Funcionalidad: Vista de Administración de Cursos (Básica)**
  * **Objetivo:**
    * Permitir a Admins ver todos los cursos creados
  * **Acciones Clave:**
    * Navegar a /admin/courses
    * Ver tabla cursos
    * Clic en enlace para editar
  * **Flujo Principal:**
    * Admin va a /admin/courses -> Carga datos courses (+instructor) -> Muestra tabla -> Enlace lleva a edición
  * **Interacciones:**
    * Lectura courses, profiles
  * **Pistas UI/UX:**
    * Tabla clara
    * Enlace a edición visible. Solo vista/enlace. Paginación/Búsqueda opcional.
  * **Estado:** [ ]

* **Funcionalidad: Impersonación de Usuarios (Admin)**
  * **Objetivo:**
    * Permitir a Admins experimentar la plataforma como otro usuario para soporte/pruebas
  * **Acciones Clave:**
    * Admin busca usuario
    * Selecciona usuario
    * Inicia impersonación
    * Navega como otro usuario
    * Detiene impersonación
  * **Flujo Principal:**
    * Admin usa UI búsqueda -> Selecciona usuario -> Llama a RPC start_impersonation -> Backend genera JWT temporal -> Frontend actualiza sesión -> UI muestra banner "Viendo como..." -> Admin navega -> Clic "Detener" -> Llama a RPC stop_impersonation -> Sesión admin restaurada
  * **Interacciones:**
    * Búsqueda profiles
    * RPCs seguras (start/stop_impersonation)
    * Gestión JWTs
    * Escritura audit_log (tabla a crear)
  * **Pistas UI/UX:**
    * Buscador con sugerencias (Combobox?)
    * Banner impersonación MUY visible
    * Botón detener claro. Alta precaución seguridad.
  * **Estado:** [ ]

* **Funcionalidad: Datos de Prueba Iniciales (Seed)**
  * **Objetivo:**
    * Facilitar el desarrollo y pruebas iniciales con datos relevantes
  * **Acciones Clave:**
    * (Desarrollador) Ejecutar script SQL
  * **Flujo Principal:**
    * Ejecutar seed.sql -> BD poblada con Admin, Instructor, Estudiante, Cursos, Módulos, Lecciones, Inscripción
  * **Interacciones:**
    * Escritura en múltiples tablas
  * **Pistas UI/UX:**
    * Script SQL claro y comentado
  * **Estado:** [ ]

* **Funcionalidad: Internacionalización (i18n - Base)**
  * **Objetivo:**
    * Preparar la app para soportar múltiples idiomas
  * **Acciones Clave:**
    * (Dev) Configurar i18next
    * Crear archivos EN/ES
    * (Usuario) Usar LanguageSwitcher UI
  * **Flujo Principal:**
    * App carga con idioma por defecto -> Usuario cambia idioma -> UI se actualiza con traducciones
  * **Interacciones:**
    * Librería i18next
  * **Pistas UI/UX:**
    * LanguageSwitcher simple (botones/select). (Prioridad baja Fase 1).
  * **Estado:** [ ]

### Fase: Enriquecimiento LMS e Interacción Inicial

* **Funcionalidad: Seguimiento de Progreso en Cursos**
  * **Objetivo:**
    * Permitir a estudiantes y a la plataforma rastrear el avance en los cursos
  * **Acciones Clave:**
    * Estudiante marca/desmarca lección completada
    * Ver indicador progreso en curso/lección
  * **Flujo Principal:**
    * Estudiante en lección -> Clic en checkbox "Completado" -> Estado se guarda en BD (ej: enrollments.completed_lessons) -> UI se actualiza (checkbox, icono en sidebar, barra progreso en "Mis Cursos")
  * **Interacciones:**
    * Update enrollments
    * Lectura estado progreso
    * Componentes UI (Checkbox, Progress bar)
  * **Pistas UI/UX:**
    * Control de completitud claro en vista lección
    * Progreso visible en puntos clave
  * **Estado:** [ ]

* **Funcionalidad: Comentarios en Lecciones**
  * **Objetivo:**
    * Fomentar la discusión y resolución de dudas sobre el contenido
  * **Acciones Clave:**
    * Ver comentarios existentes
    * Escribir nuevo comentario
    * (Instructor/Admin) Eliminar comentario
  * **Flujo Principal:**
    * Usuario ve lección -> Baja a sección comentarios -> Lee / Escribe en formulario -> Envía -> Comentario aparece en lista. Admin/Instructor ve opción eliminar.
  * **Interacciones:**
    * CRUD comments tabla
    * Lectura profiles (autor comentario)
  * **Pistas UI/UX:**
    * Sección comentarios clara
    * Formulario simple
    * Indicación visual de quién puede eliminar
  * **Estado:** [ ]

* **Funcionalidad: Edición Básica de Perfil**
  * **Objetivo:**
    * Permitir a usuarios mantener su nombre actualizado
  * **Acciones Clave:**
    * Ir a /profile
    * Editar campo Nombre Completo
    * Guardar cambios
  * **Flujo Principal:**
    * Usuario edita nombre -> Guarda -> Petición actualiza profiles.full_name -> Feedback éxito (Toast)
  * **Interacciones:**
    * Update profiles
    * React Query useMutation
  * **Pistas UI/UX:**
    * Campo editable claro
    * Botón guardar
  * **Estado:** [ ]

* **Funcionalidad: Panel de Control Instructor (Dashboard)**
  * **Objetivo:**
    * Dar al instructor una vista rápida del estado de sus cursos y estudiantes
  * **Acciones Clave:**
    * Navegar a /instructor/dashboard
    * Ver estadísticas clave
  * **Flujo Principal:**
    * Instructor accede a dashboard -> Se cargan datos agregados (inscritos, cursos activos, etc.) -> Se muestran en tarjetas/widgets
  * **Interacciones:**
    * Lectura agregada courses, enrollments
  * **Pistas UI/UX:**
    * Cards shadcn/ui para mostrar stats
    * Información relevante y accionable
  * **Estado:** [ ]

* **Funcionalidad: Notificaciones en UI (Toast)**
  * **Objetivo:**
    * Proveer feedback inmediato y no intrusivo de las acciones del usuario
  * **Acciones Clave:**
    * Realizar acción (guardar, error) -> Ver notificación toast
  * **Flujo Principal:**
    * Código llama a hook/función toast() -> Toaster (shadcn/ui) muestra mensaje flotante (éxito, error, info)
  * **Interacciones:**
    * Integrar llamadas a toast() en puntos clave (mutaciones React Query, manejo errores)
  * **Pistas UI/UX:**
    * Toasts claros, con icono/color apropiado
    * Posición consistente
  * **Estado:** [ ]

* **Funcionalidad: Calificaciones y Retroalimentación (v1 - Tareas)**
  * **Objetivo:**
    * Permitir a instructores evaluar las tareas enviadas
  * **Acciones Clave:**
    * Instructor ve entrega tarea
    * Asigna nota numérica
    * Escribe feedback textual
    * Guarda evaluación
    * Estudiante ve nota/feedback
  * **Flujo Principal:**
    * Instructor navega a entregas -> Selecciona una -> Usa UI para ingresar nota/feedback -> Guarda -> Datos se almacenan (ej: en assignment_submissions). Estudiante accede a su entrega/calificaciones y ve resultado.
  * **Interacciones:**
    * Update assignment_submissions (o tabla grades?)
    * Lectura por estudiante
  * **Pistas UI/UX:**
    * Interfaz clara para calificar
    * Vista clara para estudiante
  * **Estado:** [ ]

