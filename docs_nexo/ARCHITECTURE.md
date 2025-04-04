
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

Para información detallada sobre el sistema de navegación y estructura de rutas, consulte [Documentación de Navegación](./NAVIGATION.md).

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
