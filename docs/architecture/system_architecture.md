
# Documentación de Arquitectura - Nexo Learning Platform

## Arquitectura General

Nexo Learning Platform sigue una arquitectura moderna de aplicación de una sola página (SPA) con un backend serverless, aprovechando tecnologías actuales para ofrecer una plataforma educativa escalable, segura y de alto rendimiento.

```
┌─────────────────────────┐     ┌─────────────────────────┐
│                         │     │                         │
│   Frontend (Cliente)    │     │   Backend (Supabase)    │
│                         │     │                         │
│  ┌─────────────────┐    │     │  ┌─────────────────┐    │
│  │  Componentes    │    │     │  │  Base de Datos  │    │
│  │     React       │    │     │  │   PostgreSQL    │    │
│  └─────────────────┘    │     │  └─────────────────┘    │
│                         │     │                         │
│  ┌─────────────────┐    │     │  ┌─────────────────┐    │
│  │  Gestión de     │    │     │  │  Autenticación  │    │
│  │    Estado       ├────┼─────┼─►│   & Seguridad   │    │
│  └─────────────────┘    │     │  └─────────────────┘    │
│                         │     │                         │
│  ┌─────────────────┐    │     │  ┌─────────────────┐    │
│  │  Enrutamiento   │    │     │  │  Almacenamiento │    │
│  │  React Router   │    │     │  │    de Archivos  │    │
│  └─────────────────┘    │     │  └─────────────────┘    │
│                         │     │                         │
│  ┌─────────────────┐    │     │  ┌─────────────────┐    │
│  │    Interfaz     │    │     │  │ Edge Functions  │    │
│  │  Shadcn & UI    │    │     │  │  & Realtime DB  │    │
│  └─────────────────┘    │     │  └─────────────────┘    │
│                         │     │                         │
└─────────────────────────┘     └─────────────────────────┘
```

### Stack Tecnológico

#### Frontend
- **React 18+**: Biblioteca principal para construcción de interfaces de usuario
- **TypeScript**: Lenguaje tipado para desarrollo más seguro y mantenible
- **Vite**: Herramienta de construcción y desarrollo
- **React Router 6+**: Gestión de navegación y rutas
- **TanStack React Query**: Gestión de estado del servidor y caché
- **Tailwind CSS**: Utilidades CSS para la estilización
- **Shadcn/UI**: Componentes de UI accesibles y personalizables
- **Lucide React**: Iconos vectoriales optimizados
- **Zod**: Validación de esquemas
- **React Hook Form**: Manejo avanzado de formularios
- **Framer Motion**: Animaciones fluidas
- **Recharts**: Biblioteca para visualización de datos

#### Backend (Supabase)
- **PostgreSQL**: Base de datos relacional robusta
- **Row-Level Security (RLS)**: Control de acceso a nivel de fila
- **Supabase Auth**: Sistema completo de autenticación
- **Storage**: Gestión de archivos
- **Edge Functions**: Computación serverless para lógica de negocio compleja
- **Realtime**: Suscripciones en tiempo real a cambios en la base de datos

### Arquitectura de Componentes Frontend

La arquitectura frontend sigue un patrón modular basado en características (feature-based) con el siguiente esquema de organización:

```
src/
├── components/        # Componentes compartidos y de UI
│   ├── ui/            # Componentes base (shadcn/ui)
│   └── shared/        # Componentes reutilizables en toda la app
├── contexts/          # Contextos de React para estado global
├── features/          # Módulos funcionales organizados por dominio
│   ├── auth/          # Autenticación y autorización
│   ├── courses/       # Gestión y visualización de cursos
│   ├── admin/         # Funcionalidades administrativas
│   └── ...            # Otras características
├── hooks/             # Hooks personalizados
├── layouts/           # Plantillas de diseño reutilizables
├── lib/               # Utilidades, helpers y configuraciones
├── pages/             # Componentes de página
├── routes/            # Configuración de rutas
└── types/             # Definiciones de tipos TypeScript
```

### Flujo de Datos

1. **Solicitud del Cliente**: El cliente realiza peticiones HTTP a la API de Supabase.
2. **Autenticación y Autorización**: Supabase valida el token JWT y aplica políticas de seguridad (RLS).
3. **Procesamiento de Datos**: La base de datos PostgreSQL procesa la solicitud aplicando las políticas de acceso.
4. **Respuesta al Cliente**: Los datos son devueltos al cliente, donde React Query los almacena en caché.
5. **Renderizado de UI**: Los componentes React consumen los datos y se renderizan en la interfaz.

Para operaciones en tiempo real:
1. El cliente establece una conexión WebSocket con Supabase Realtime.
2. Las modificaciones en la base de datos generan eventos que se transmiten al cliente.
3. React Query invalida la caché y actualiza la UI automáticamente.

### Diagramas de Arquitectura

#### Flujo de Autenticación

```
┌──────────┐      ┌────────────┐      ┌────────────────┐
│  Cliente  │─────►  Supabase   │─────►  Auth Provider  │
└────┬─────┘      │    Auth    │      └────────┬───────┘
     │            └────────────┘               │
     │                   ▲                     │
     │                   │                     │
     │                   ▼                     │
     │            ┌────────────┐               │
     └───────────►  Contexto   │◄──────────────┘
                  │    Auth    │
                  └────────────┘
                        │
                        ▼
                  ┌────────────┐
                  │ Componentes│
                  │ Protegidos │
                  └────────────┘
```

#### Arquitectura del Sistema de Diseño

El sistema de diseño personalizado implementado permite:

1. Configuración dinámica de temas (claro, oscuro, futurista)
2. Personalización de colores, tipografía y espaciado
3. Almacenamiento de preferencias en la base de datos
4. Vista previa de cambios antes de aplicarlos
5. Aplicación en tiempo real de cambios de diseño

```
┌──────────────────┐      ┌───────────────────┐      ┌───────────────┐
│  Configuración   │─────►   DesignSystem     │─────►  Aplicación    │
│  de Diseño       │      │   Context         │      │  de Estilos   │
└──────────────────┘      └───────────────────┘      └───────────────┘
                                    │
                                    ▼
                          ┌───────────────────┐      ┌───────────────┐
                          │  Persistencia     │─────►│   Base de     │
                          │  de Preferencias  │      │   Datos       │
                          └───────────────────┘      └───────────────┘
```

## Dependencias entre Módulos

### Módulos Core

1. **Autenticación** (Auth Module)
   - Dependencias: `supabase/auth`, `contexts/AuthContext`
   - Dependen de él: Casi todos los módulos que requieren autenticación

2. **Gestión de Estado** (State Management)
   - Dependencias: `contexts/*`, `react-query`
   - Dependen de él: Todos los módulos con datos dinámicos

3. **Sistema de Diseño** (Design System)
   - Dependencias: `contexts/DesignSystemContext`, `contexts/ThemeContext`
   - Dependen de él: Todos los componentes con estilización

4. **Enrutamiento** (Routing)
   - Dependencias: `react-router-dom`, `components/ProtectedRoute`
   - Dependen de él: Toda la navegación de la aplicación

### Módulos Funcionales

1. **Gestión de Cursos** (Courses Module)
   - Dependencias: Auth Module, State Management
   - Componentes: CoursesList, CourseDetail, CourseEditor

2. **Sistema de Aprendizaje** (Learning Module)
   - Dependencias: Courses Module, Progress Tracking
   - Componentes: LessonView, QuizSystem, VideoPlayer

3. **Administración** (Admin Module)
   - Dependencias: Auth Module (con verificación de rol)
   - Componentes: UserManagement, ContentManagement, SystemSettings

4. **Perfiles de Usuario** (Profiles Module)
   - Dependencias: Auth Module, Storage Module
   - Componentes: ProfileView, ProfileEditor, AvatarUpload

## Infraestructura y Despliegue

La aplicación se despliega en la siguiente infraestructura:

1. **Frontend**: Alojado en servicios de hosting estático (Vercel/Netlify)
2. **Backend**: Supabase (PostgreSQL + Servicios)
3. **CDN**: Distribución de activos estáticos optimizados
4. **CI/CD**: Pipeline automatizado para pruebas y despliegue

La arquitectura soporta múltiples entornos (desarrollo, staging, producción) con configuraciones específicas para cada uno.
