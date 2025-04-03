
# Arquitectura de Nexo Learning

## Diagrama de Arquitectura

```ascii
+-------------------------------------------+
|                                           |
|             Cliente (Browser)             |
|                                           |
+-------------------+-----------------------+
                    |
+-------------------v-----------------------+
|                                           |
|         Frontend SPA (React + TS)         |
|                                           |
+-------------------+-----------------------+
                    |
+-------------------v-----------------------+
|                                           |
|         API Layer (Supabase APIs)         |
|                                           |
+---------------+-------------+-------------+
                |             |
+---------------v-----+ +-----v-------------+
|                     | |                   |
|   Base de Datos     | |   Autenticación   |
|   (PostgreSQL)      | |   (Supabase Auth) |
|                     | |                   |
+---------------------+ +-------------------+
```

## Frontend

- **Framework**: React con TypeScript
- **Arquitectura SPA**: Aplicación de página única con React Router para navegación
- **Estado**: Combinación de Context API para estado global y React Query para datos del servidor
- **Organización del Código**: Estructura basada en características (feature-based)

### Estructura de Carpetas Principal

```
/src
├── components/       # Componentes reutilizables UI
│   ├── ui/           # Componentes base (shadcn/ui)
│   └── ...
├── contexts/         # Contextos React para estado global
├── features/         # Módulos organizados por dominio
│   ├── courses/      # Gestión de cursos
│   ├── users/        # Gestión de usuarios
│   └── ...
├── hooks/            # Hooks personalizados
├── layouts/          # Plantillas de página
├── lib/              # Utilidades y configuración
├── pages/            # Componentes de página
└── types/            # Definiciones de tipos TS
```

## Backend

- **Enfoque Serverless**: Utilizamos Supabase como backend principal
- **Base de Datos**: PostgreSQL gestionado por Supabase
- **Autenticación**: Sistema de Supabase Auth
- **Seguridad**: Políticas RLS (Row Level Security) para control de acceso a datos
- **Almacenamiento**: Supabase Storage para archivos y multimedia

## Enfoque Feature-based

La aplicación está estructurada alrededor de dominios funcionales (features) en lugar de capas tecnológicas, lo que permite:

- Desarrollo y mantenimiento más intuitivo
- Mejor colaboración entre equipos
- Mayor cohesión y menor acoplamiento
- Evolución independiente de cada característica

## Sistema de Navegación y Rutas

### Principios de Navegación

1. **Organizados por Dominio/Flujo**: Navegación estructurada según contexto del usuario
2. **Simplicidad**: Máximo 2 niveles de navegación para mantener usabilidad
3. **Contextualidad**: Elementos específicos al rol y situación del usuario
4. **Consistencia**: Patrones similares en toda la aplicación

### Estructura de Navegación por Rol

#### Admin (Organizado por Dominios Funcionales)
- **Panel Principal**: Visión ejecutiva y KPIs
- **Académico (LMS)**: Gestión de cursos, contenido y certificaciones
- **Personas (CRM)**: Gestión de usuarios, roles y comunicaciones
- **Finanzas**: Pagos, facturación y suscripciones
- **Analíticas/Reportes**: Dashboards e informes personalizados
- **Plataforma (Sistema)**: Configuración, diseño e integraciones
- **Herramientas Técnicas**: Funcionalidades avanzadas para administradores técnicos

#### Instructor (Organizado por Flujo de Trabajo)
- **Panel Principal**: Vista general y actividad reciente
- **Mis Cursos**: Creación y gestión de contenido educativo
- **Mis Estudiantes**: Seguimiento y comunicación con estudiantes
- **Analíticas**: Estadísticas de cursos y estudiantes
- **Recursos**: Materiales y herramientas didácticas
- **Perfil**: Información profesional y configuración

#### Estudiante
- **Dashboard**: Panel personalizado de aprendizaje
- **Aprendizaje**: Cursos, rutas, calendario, recursos
- **Comunidad**: Mensajes, foros, notificaciones
- **Perfil**: Configuración personal y certificados

#### Usuario no Autenticado
- **Exploración**: Home, cursos, rutas de aprendizaje
- **Información**: Sobre nosotros, ayuda, contacto
- **Legal**: Términos, privacidad, cookies
- **Autenticación**: Login, registro, recuperación

## Flujo de Datos

1. **Consulta**: React Query para fetching, caching y actualización de datos
2. **Mutación**: Funciones específicas para actualizar el estado del servidor
3. **Estado Local**: Hooks useState/useReducer para estado de componente
4. **Estado Global**: Context API para estado compartido entre componentes

## Seguridad

- **Autenticación**: Supabase Auth con soporte para email/password, OAuth y magic links
- **Autorización**: Basada en roles (admin, instructor, student) y políticas RLS
- **Protección de Rutas**: Componente ProtectedRoute para acceso condicional

## Consideraciones de Rendimiento

- **Code Splitting**: Lazy loading de rutas y componentes grandes
- **Optimización de Imágenes**: Servicio para redimensionar y optimizar imágenes
- **Estrategias de Caché**: Uso de React Query para minimizar peticiones
