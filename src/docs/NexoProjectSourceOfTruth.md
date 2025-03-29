
# Nexo Learning Project - Source of Truth

## Parte I: Visión del Producto

El objetivo de Nexo Learning es crear una plataforma educativa integral que permita:

- A los instructores, crear y gestionar cursos online con contenido multimedia.
- A los estudiantes, acceder a los cursos, seguir su progreso y obtener certificaciones.
- Generar una comunidad de aprendizaje donde los participantes puedan interactuar entre sí.

### Públicos Objetivos

1. **Instructores**:
   - Profesionales con conocimientos en áreas específicas que desean compartir su expertise.
   - Educadores que buscan una plataforma digital para ampliar su alcance.
   - Empresas que necesitan capacitar a su personal o clientes.

2. **Estudiantes**:
   - Profesionales buscando actualizar sus habilidades.
   - Personas en proceso de cambio de carrera.
   - Estudiantes complementando su educación formal.
   - Cualquier persona interesada en aprendizaje continuo.

### Funcionalidades Clave

**Fase 1 (MVP)**:

- Sistema de autenticación y gestión de usuarios con roles (estudiante, instructor, admin).
- Creación y gestión de cursos por parte de instructores.
- Visualización y consumo de cursos por parte de estudiantes.
- Seguimiento de progreso de los estudiantes.
- Sistema básico de pagos para cursos de pago.

**Fase 2**:

- Sistema de comentarios y discusiones en lecciones.
- Certificaciones al completar cursos.
- Evaluaciones y cuestionarios interactivos.
- Analíticas detalladas para instructores.

**Fase 3**:

- Comunidad y foros de discusión.
- Marketplace de cursos con sistema de comisiones.
- Funcionalidades sociales (seguimiento entre usuarios, recomendaciones).
- Aplicación móvil.

## Parte II: Documentación Técnica

### Estructura General del Proyecto

El proyecto está construido utilizando:

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: React Query + Context API
- **Backend & Auth**: Supabase
- **Routing**: React Router

La estructura del proyecto sigue un enfoque modular basado en características (feature-based):

```
src/
├── components/         # Componentes reutilizables a nivel de aplicación
├── contexts/           # Contextos de React para estado global
├── features/           # Módulos organizados por funcionalidad
│   ├── auth/
│   ├── courses/
│   ├── instructor/
│   └── ...
├── hooks/              # Hooks personalizados
├── layouts/            # Componentes de layout
├── lib/                # Utilidades, configuraciones y helpers
├── pages/              # Componentes a nivel de página
└── types/              # Definiciones de TypeScript
```

### Estructura de Base de Datos

La base de datos PostgreSQL (gestionada por Supabase) incluye las siguientes tablas principales:

**1. Tablas de Autenticación**
- `auth.users` - Tabla gestionada por Supabase con información básica de autenticación
- `public.profiles` - Información adicional de los usuarios (vinculada a auth.users)

**2. Tablas de Contenido Educativo**
- `public.courses` - Información de los cursos
- `public.modules` - Módulos dentro de los cursos
- `public.lessons` - Lecciones dentro de los módulos

**3. Tablas de Interacción y Seguimiento**
- `public.enrollments` - Inscripciones de estudiantes a cursos
- `public.lesson_progress` - Seguimiento del progreso de estudiantes en lecciones
- `public.comments` - Comentarios en lecciones

**4. Tablas de Comercio**
- `public.payments` - Registro de pagos por cursos

### Seguridad y Acceso a Datos

El proyecto utiliza Row Level Security (RLS) de PostgreSQL para controlar el acceso a los datos basado en roles y propiedad. Cada tabla tiene políticas específicas que definen qué usuarios pueden leer, crear, actualizar o eliminar registros.

### Implementaciones Técnicas Detalladas

#### CORE-AUTH-USER-01: Sistema de Autenticación

- Implementación de autenticación basada en Supabase Auth con soporte para email/password.
- Contexto de autenticación (`AuthContext`) que proporciona:
  - Estado de autenticación y datos de usuario actuales
  - Funciones para login, registro y logout
  - Verificación de roles y permisos
- Sistema de redirección basado en autenticación y roles utilizando componentes protegidos.
- Tablas y triggers para sincronización entre `auth.users` y `public.profiles`.

#### CORE-COURSE-STRUCTURE-01: Estructura de Cursos

- Modelo jerárquico de datos: Cursos → Módulos → Lecciones.
- Cada entidad tiene metadatos específicos y controles de acceso basados en propiedad y rol.
- Soporte para contenido en formato texto y video.
- Sistema de ordenación manual de módulos y lecciones dentro de cada nivel superior.

#### CORE-COURSE-PROGRESS-01: Seguimiento de Progreso

- Tracking granular a nivel de lección utilizando la tabla `lesson_progress`.
- Cálculo de progreso a nivel de curso mediante funciones SQL agregadas.
- Visualización de progreso mediante barras y porcentajes en la interfaz.
- Soporte para marcar lecciones como completadas y tracking de última posición.

#### CORE-COMMS-COMMENT-01: Sistema de Comentarios en Lecciones

- **Resumen Técnico**: Sistema completo de comentarios y respuestas en lecciones con soporte para comentarios anidados (un nivel de profundidad), permisos diferenciados por rol, y operaciones CRUD completas.

- **SQL DDL completo de la tabla `comments`**:
  ```sql
  CREATE TABLE public.comments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
  );
  
  -- Trigger para mantener actualizado el campo updated_at
  CREATE TRIGGER on_comments_update
    BEFORE UPDATE ON public.comments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
  ```

- **SQL DDL completo de las políticas RLS**:
  ```sql
  -- Habilitar Row Level Security
  ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
  
  -- Política 1: Los usuarios pueden ver comentarios de lecciones en cursos donde están inscritos
  CREATE POLICY "Users can read comments for enrolled courses" 
  ON public.comments 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      JOIN public.lessons l ON l.course_id = e.course_id
      WHERE l.id = comments.lesson_id AND e.user_id = auth.uid()
    )
  );
  
  -- Política 2: Los usuarios pueden insertar comentarios en lecciones de cursos donde están inscritos
  CREATE POLICY "Users can insert comments for enrolled courses" 
  ON public.comments 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      JOIN public.lessons l ON l.course_id = e.course_id
      WHERE l.id = comments.lesson_id AND e.user_id = auth.uid()
    )
  );
  
  -- Política 3: Los usuarios pueden actualizar sus propios comentarios
  CREATE POLICY "Users can update their own comments" 
  ON public.comments 
  FOR UPDATE 
  USING (user_id = auth.uid());
  
  -- Política 4: Los usuarios pueden eliminar sus propios comentarios
  CREATE POLICY "Users can delete their own comments" 
  ON public.comments 
  FOR DELETE 
  USING (user_id = auth.uid());
  
  -- Política 5: Instructores y administradores pueden eliminar cualquier comentario en sus cursos
  CREATE POLICY "Instructors can delete comments in their courses" 
  ON public.comments 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.lessons l
      JOIN public.courses c ON c.id = l.course_id
      JOIN public.profiles p ON p.id = auth.uid()
      WHERE l.id = comments.lesson_id AND 
      (c.instructor_id = auth.uid() OR p.role = 'admin')
    )
  );
  ```

- **Lógica de permisos**:
  - **Estudiantes**:
    - Pueden ver comentarios en lecciones de cursos donde están inscritos.
    - Pueden añadir comentarios nuevos y responder a comentarios existentes en cursos donde están inscritos.
    - Pueden editar y eliminar únicamente sus propios comentarios.
  - **Instructores**:
    - Además de las capacidades de estudiantes, pueden eliminar cualquier comentario en los cursos que ellos imparten.
  - **Administradores**:
    - Tienen las mismas capacidades que los instructores, pero para todos los cursos.

- **Descripción del hook `useComments`**:
  - **Propósito**: Gestiona el estado y las operaciones CRUD de comentarios para una lección específica.
  - **Operaciones que maneja**:
    - Carga inicial de comentarios y respuestas para una lección.
    - Adición de nuevos comentarios (tanto comentarios principales como respuestas).
    - Eliminación de comentarios (con manejo diferenciado de permisos).
    - Estado para gestionar procesos en curso (carga, adición, eliminación).
    - Estado y funciones para manejar la UI de respuestas.
  - **Dependencias principales**:
    - Utiliza TanStack Query para gestión de estado del servidor.
    - Integra con el contexto de autenticación para verificar el usuario actual.
    - Utiliza Supabase para operaciones de base de datos con manejo adecuado de RLS.
    - Integra con sistema de notificaciones (toast) para feedback al usuario.

- **Componentes UI clave**:
  - **LessonComments**: Componente principal que:
    - Muestra la lista de comentarios de una lección.
    - Muestra el formulario para añadir nuevos comentarios.
    - Gestiona estados de carga y mensaje cuando no hay comentarios.
  - **CommentItem**: Componente para mostrar un comentario individual que:
    - Muestra el contenido, autor y fecha del comentario.
    - Proporciona botones para responder o eliminar según permisos.
    - Maneja la visualización diferenciada de comentarios principales vs respuestas anidadas.
  - **CommentForm**: Componente de entrada que:
    - Permite escribir y enviar nuevos comentarios o respuestas.
    - Adapta su comportamiento según si es un comentario principal o una respuesta.
    - Muestra estados de carga durante el envío.

- **Integración en LessonView.tsx**:
  - El componente `LessonComments` se integra en la página de visualización de lección.
  - Se añadió una sección dedicada a comentarios debajo del contenido principal de la lección.
  - Se pasa el ID de la lección actual como prop para cargar los comentarios relevantes.
  - La interfaz se adapta automáticamente para mostrar comentarios cuando están disponibles.

- **Consideraciones técnicas y de seguridad**:
  - **Estructura de datos**: Los comentarios se almacenan con un campo `parent_comment_id` que permite solo un nivel de anidación (comentarios y respuestas).
  - **Optimización**: Los comentarios se organizan en el frontend para minimizar consultas adicionales.
  - **Seguridad**:
    - Todas las operaciones están protegidas por RLS a nivel de base de datos.
    - La interfaz de usuario también comprueba permisos en el cliente para mostrar u ocultar controles.
    - Se implementó protección contra eliminación accidental mediante permisos diferenciados.
  - **UX**: 
    - Se agregaron indicadores visuales para diferenciar comentarios principales de respuestas.
    - Se implementaron estados de carga para proporcionar feedback al usuario durante operaciones.
    - El sistema mantiene la autoría y marcas de tiempo en todos los comentarios.

#### CORE-UI-ROLES-01: Sistema de Gestión de Roles

- **Resumen Técnico**: Implementación avanzada para la gestión y visualización de roles de usuarios, incluyendo cambio de contexto para administradores, visualización diferenciada según rol, y búsqueda integrada de usuarios.

- **Componentes UI clave**:
  - **RoleSwitcher**: Permite a los administradores cambiar su vista al contexto de otros roles para previsualizar la experiencia de usuario.
    - Búsqueda integrada directamente en el menú desplegable con actualización dinámica en tiempo real.
    - Interfaz intuitiva con iconos específicos para cada rol y badges informativos.
    - Opción clara para volver al rol original desde la interfaz de previsualización.
  - **SidebarFooterContent**: Muestra información contextual del rol actual y opciones relacionadas con el perfil de usuario.
    - Indicadores visuales del modo de previsualización.
    - Integración de menús contextuales para acciones rápidas.

- **Lógica de permisos**:
  - **Administradores**:
    - Pueden visualizar la plataforma desde cualquier perspectiva de rol.
    - Tienen acceso a funciones de búsqueda de usuarios en tiempo real integradas.
    - Pueden volver a su rol original desde cualquier vista previsualizada.
  - **Instructores y Estudiantes**:
    - Visualizan solamente las funcionalidades relevantes a su rol.
    - La interfaz adapta automáticamente las opciones disponibles.

- **Mejoras de UX implementadas**:
  - Búsqueda dinámica de usuarios que actualiza resultados mientras se escribe.
  - Indicadores visuales claros del rol actual y modo de previsualización.
  - Navegación intuitiva entre diferentes contextos de rol.
  - Sistema de badges y separadores visuales para mejorar la comprensión.

### Integración con Servicios Externos

- **Supabase**: Para base de datos, autenticación, almacenamiento y Row Level Security.
- **Stripe**: Integración planificada para el procesamiento de pagos.
- **AWS S3**: Almacenamiento a través de Supabase Storage para archivos de contenido.
- **Sentry**: Monitoreo de errores y rendimiento de la aplicación.

### Prácticas Técnicas Implementadas

- Autorización basada en RLS a nivel de base de datos.
- Validación de datos tanto en cliente como en servidor.
- Manejo de estado optimizado con React Query.
- Suspense y estados de carga para mejor experiencia de usuario.
- Componentes UI reutilizables con shadcn/ui.
- Tipado estricto con TypeScript.
- Rutas protegidas basadas en autenticación y roles.

### Roadmap Técnico

**Próximas Implementaciones**:

1. Sistema de evaluaciones y quizzes
2. Procesamiento de pagos con Stripe
3. Generación de certificados
4. API para integración con sistemas externos
5. Soporte para contenido interactivo en lecciones
6. Funcionalidades de gamificación
7. Sistema de mensajería directa entre usuarios
