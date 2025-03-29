
# Nexo Project - Guía de Desarrollo

**Versión:** 1.5
**Última Actualización:** 2023-11-16
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
  cover_image_url TEXT
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

**Estudiante:**
- `/student/my-courses`: Mis Másters/Carreras inscritos.
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

* **Funcionalidad: Landing Page Moderna y Atractiva**
  * **Objetivo:**
    * Crear una página de inicio (/) visualmente impactante, profesional y optimizada para SEO que presente Nexo y sus ofertas (Másters/Carreras).
  * **Acciones Clave del Usuario:**
    * Ver propuesta de valor
    * Explorar secciones (ej: Carreras Destacadas)
    * Hacer clic en CTAs (Call to Action) como "Descubre tu Camino" o "Registrarse"
  * **Flujo Principal:**
    * Usuario llega a / -> Ve contenido atractivo -> Navega por secciones -> Interactúa con CTAs
  * **Interacciones / Relaciones Clave:**
    * Enlaza a /courses, /auth/register, /auth/login
    * Debe obtener y mostrar específicamente los cursos (courses) que tengan is_published = true Y is_featured_on_landing = true en la sección "Carreras Destacadas"
  * **Pistas UI/UX:**
    * Usar paleta de colores y estilo de las imágenes de referencia (tonos azules/morados/negros, gradientes sutiles, tipografía moderna)
    * Incorporar animaciones fluidas (Framer Motion) en scroll, hover, carga de elementos (efecto "wow" pero optimizado)
    * Diseño profesional y serio, adecuado a educación superior tecnológica
    * Secciones Sugeridas: Hero principal con titular potente, sección "Acerca de Nexo", sección "Carreras Destacadas" (usar Cards como en referencia), sección de Testimonios (placeholder), Footer con enlaces
    * Botón flotante de Chat/Ayuda (como en referencias)
    * SEO: Implementar metatags (title, description, keywords, OpenGraph) dinámicas o configurables. URLs limpias. Buen performance (optimizar imágenes/animaciones)
    * Logo: Diseñar/Implementar un logo moderno para "Nexo Learning Platform" o "Nexo Ecosistema Creativo" visible en el header
  * **Estado:** [ ] Pendiente

* **Funcionalidad: Creación de Cursos (Metadatos y SEO)**
  * **Objetivo:**
    * Permitir a Instructores/Admins iniciar creación de Máster/Carrera con datos básicos y SEO
  * **Acciones Clave:**
    * Acceder UI creación
    * Definir Título, Descripción, Precio, Moneda
    * Definir Características del Curso (ej: Duración estimada en meses/horas, Nivel [Principiante/Intermedio/Avanzado], Prerrequisitos - inicialmente campos de texto simples)
    * Marcar/Desmarcar una casilla "Destacar en Landing Page"
    * Añadir: Imagen de Portada (subida a Storage), Slug URL, Título SEO, Descripción SEO
    * Guardar borrador
  * **Flujo Principal:**
    * Acceder UI -> Rellenar formulario (validado) -> Subir imagen -> Guardar -> Nuevo courses (no publicado, instructor_id, campos SEO/imagen) -> Redirigido a edición estructura
  * **Interacciones:**
    * Escritura courses
    * Subida a Supabase Storage
    * Nuevos campos necesarios en la tabla courses para almacenar características (ej: duration_text, level, prerequisites_text) y el flag is_featured_on_landing (BOOLEAN)
  * **Pistas UI/UX:**
    * Formulario incluye campos SEO y carga de imagen
  * **Instrucción Adicional:**
    * Crea la tabla courses si no existe y añade 1-2 cursos de prueba (ej: "Máster en IA Generativa", "Carrera Desarrollo Full-Stack") con datos ficticios (incluyendo imagen placeholder URL, slug, SEO, y ahora también características de ejemplo y uno marcado como destacado)
  * **Estado:** [ ] Pendiente (Estado del doc anterior [x] pero se añaden requisitos)

* **Funcionalidad: Edición de Estructura del Curso (Módulos y Lecciones)**
  * **Objetivo:**
    * Permitir organizar el contenido del Máster/Carrera
  * **Acciones Clave:**
    * CRUD + Reordenar Módulos y Lecciones (títulos/orden)
  * **Flujo Principal:**
    * Edita curso -> Manipula estructura -> Cambios guardados en modules, lessons
  * **Interacciones:**
    * CRUD + Update modules, lessons
  * **Pistas UI/UX:**
    * Lista anidada clara
    * Controles intuitivos
  * **Instrucción Adicional:**
    * Crea las tablas modules y lessons si no existen. Añade 2-3 módulos y 2-3 lecciones de prueba para uno de los cursos creados anteriormente
  * **Estado:** [ ] Pendiente (Estado del doc anterior [x] pero se añade requisito de datos)

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
  * **Instrucción Adicional:**
    * Añade contenido de prueba (texto lorem ipsum o URL video público) a algunas de las lecciones creadas
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
  * **Estado:** [ ] Pendiente

* **Funcionalidad: Catálogo Público de Cursos**
  * **Objetivo:**
    * Permitir a cualquiera descubrir los cursos disponibles
  * **Acciones Clave:**
    * Navegar a /courses
    * Ver lista de cursos
    * Hacer clic en un curso
  * **Flujo Principal:**
    * Usuario visita /courses -> Se cargan todos los cursos is_published=true -> Se muestran tarjetas (Título, Instructor, Precio, Imagen Portada) -> Clic lleva a detalle curso
  * **Interacciones:**
    * Lectura courses (con cover_image_url), profiles
  * **Pistas UI/UX:**
    * Diseño atractivo (Cards como referencia)
    * Carga eficiente
    * Usar imagen portada
  * **Estado:** [ ] Pendiente

* **Funcionalidad: Página de Detalle del Curso**
  * **Objetivo:**
    * Mostrar información completa de un curso y permitir compra o acceso
  * **Acciones Clave:**
    * Ver detalles (Desc, Instructor, Precio, Estructura)
    * Clic "Comprar"/"Ir al Curso"
  * **Flujo Principal:**
    * Usuario llega a /courses/[slug] -> Se carga info curso + estado inscripción -> UI muestra detalles -> Botón acción correspondiente visible
  * **Interacciones:**
    * Lectura BD
    * Llama a Stripe / navega a /learn
    * Usa slug en URL
  * **Pistas UI/UX:**
    * Info bien estructurada
    * CTA claro
    * Usar imagen portada
    * SEO (usar seo_title, seo_description)
  * **Estado:** [ ] Pendiente

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
    * Usar slugs en URL si aplica
  * **Estado:** [ ] Pendiente

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
  * **Estado:** [ ] Pendiente

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
  * **Instrucción Adicional:**
    * Crea las tablas payments y enrollments si no existen. Añade 1 inscripción de prueba para el estudiante y curso de prueba
  * **Estado:** [ ] Pendiente

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
  * **Instrucción Adicional:**
    * Crea la tabla profiles (si no existe, y el trigger handle_new_user). Asegúrate de tener 1 Admin, 1 Instructor, 1 Estudiante de prueba
  * **Estado:** [ ] Pendiente

* **Funcionalidad: Vista de Administración de Cursos (Básica)**
  * **Objetivo:**
    * Permitir a Admins ver todos los cursos creados
  * **Acciones Clave:**
    * Navegar a /admin/courses
    * Ver tabla cursos
    * Clic en enlace para editar
    * (Admin) Reordenar la lista de cursos mediante Drag & Drop
  * **Flujo Principal:**
    * Admin va a /admin/courses -> Carga datos courses (+instructor) -> Muestra tabla -> Enlace lleva a edición
  * **Interacciones:**
    * Lectura courses, profiles
    * Se necesita un campo display_order (INTEGER) en la tabla courses para almacenar el orden personalizado
    * La acción de Drag & Drop debe actualizar este campo en la base de datos para los cursos afectados
  * **Pistas UI/UX:**
    * Tabla clara
    * Enlace a edición visible. Solo vista/enlace. Paginación/Búsqueda opcional.
    * La tabla (shadcn/ui) debe soportar Drag & Drop para reordenar filas (investigar librerías como dnd-kit o similares compatibles con tanstack/table si se usa)
  * **Estado:** [ ] Pendiente

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
  * **Instrucción Adicional:**
    * Crea la tabla audit_log según esquema en Sección 4
  * **Estado:** [ ] Pendiente

* **Funcionalidad: Datos de Prueba Iniciales (Seed)**
  * **Objetivo:**
    * Facilitar el desarrollo y pruebas iniciales con datos relevantes
  * **Acciones Clave:**
    * (Desarrollador) Ejecutar script SQL
  * **Flujo Principal:**
    * Ejecutar seed.sql -> BD poblada (usuarios, cursos, etc.)
  * **Interacciones:**
    * Escritura BD
  * **Pistas UI/UX:**
    * Script SQL claro. (Nota: Varias tareas anteriores ya piden crear datos de prueba, este script puede consolidar o complementar)
  * **Estado:** [ ] Pendiente

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
  * **Estado:** [ ] Pendiente

* **Funcionalidad General: Ordenamiento Drag & Drop en Vistas de Gestión (Admin/Instructor)**
  * **Objetivo:**
    * Permitir a usuarios con permisos (Admin/Instructor) definir un orden visual personalizado para listas de elementos (Cursos, Módulos, Lecciones, Usuarios, etc.) en las tablas de gestión.
  * **Implementación:**
    * Cuando se implemente una tabla de gestión para Admins o Instructores donde el orden sea relevante, incluir la funcionalidad de reordenamiento mediante Drag & Drop.
    * Esto requerirá añadir un campo display_order (o similar) a la tabla correspondiente y actualizarlo en la BD tras la acción de D&D.
    * Este orden personalizado podría usarse opcionalmente para filtrar o mostrar elementos en otras partes de la aplicación.

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

