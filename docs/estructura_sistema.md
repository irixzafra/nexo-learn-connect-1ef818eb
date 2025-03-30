
# Documentación de Estructura del Sistema Nexo

## Sistema de Roles

### Roles Disponibles

| Rol             | Descripción                                       | Acceso                                |
|-----------------|---------------------------------------------------|---------------------------------------|
| `admin`         | Acceso completo al sistema                        | Todas las funcionalidades             |
| `instructor`    | Gestionar cursos y contenido educativo            | Panel instructor + funciones estudiante |
| `student`       | Usuario básico que consume contenido              | Funcionalidades básicas               |
| `sistemas`      | Acceso técnico al sistema                         | Configuraciones técnicas avanzadas    |
| `anonimo`       | Usuario no autenticado                            | Solo contenido público                |
| `moderator`     | Moderación de contenido y usuarios                | Funciones de moderación               |
| `content_creator`| Crear contenido sin ser instructor completo      | Creación de contenido                 |
| `guest`         | Visitante con acceso limitado                     | Vista previa de funcionalidades       |
| `beta_tester`   | Acceso a funcionalidades en desarrollo            | Funciones en beta                     |

### Jerarquía de Roles

La jerarquía de acceso es la siguiente (de mayor a menor):
1. `admin`
2. `sistemas`
3. `instructor`/`moderator`
4. `content_creator`/`beta_tester`
5. `student`
6. `guest`
7. `anonimo`

## Estructura de Navegación

### Navegación Principal

- **Inicio** (`/home`): Panel principal del usuario
- **Cursos** (`/courses`): Explorar y gestionar cursos
- **Comunidad** (`/community`): Espacios sociales y colaborativos
- **Mensajes** (`/messages`): Sistema de mensajería
- **Notificaciones** (`/notifications`): Centro de notificaciones
- **Perfil** (`/profile`): Gestión del perfil de usuario

### Navegación Administrativa

#### Panel Principal Admin (`/admin/dashboard`)

Acceso a métricas generales y accesos rápidos a secciones administrativas.

#### Categorías Principales de Administración

1. **Dashboard** (`/admin/dashboard`)
   - Vista general del sistema
   - Métricas clave
   - Accesos rápidos

2. **Usuarios** (`/admin/users`)
   - **Pestañas**:
     - Usuarios: Gestión de cuentas
     - Roles: Administración de roles
     - Permisos: Configuración de permisos
     - Analíticas: Estadísticas de usuarios

3. **Cursos** (`/admin/courses`)
   - **Pestañas**:
     - Cursos: Listado y gestión de cursos
     - Categorías: Organización de cursos
     - Rutas: Rutas de aprendizaje
     - Certificados: Gestión de certificaciones
     - Analíticas: Estadísticas educativas

4. **Finanzas** (`/admin/finanzas`)
   - **Pestañas**:
     - Cobros: Gestión de pagos
     - Suscripciones: Planes y suscripciones
     - Analíticas: Métricas financieras

5. **Datos** (`/admin/test-data`)
   - **Pestañas**:
     - Generación: Datos de prueba
     - Logs: Registros de auditoría
     - Analíticas: Métricas de datos

6. **Configuración** (`/admin/settings`)
   - **Pestañas**:
     - Funcionalidades: Activación de características
     - Seguridad: Configuraciones de seguridad
     - Apariencia: Personalización visual
     - Contenido: Gestión de contenido
     - Analíticas: Configuración de métricas

### Navegación por Rol

#### Admin
- Acceso completo a todas las secciones
- Panel administrativo completo
- Funcionalidades de instructores y estudiantes

#### Instructor
- Panel de instructor (`/instructor/dashboard`)
- Gestión de cursos propios (`/instructor/courses`)
- Estudiantes inscritos (`/instructor/students`)
- Funcionalidades de estudiante

#### Student
- Inicio personalizado (`/home`)
- Mis cursos (`/courses`)
- Explorar catálogo (`/explore`)
- Comunidad y mensajes

#### Sistemas
- Configuraciones técnicas
- Panel de administración
- Herramientas de desarrollo

## Componentes de Navegación

### Sidebar Principal
- `SidebarNavigation`: Componente principal de navegación lateral
- Soporta colapso/expansión
- Adaptativo según el rol del usuario
- Indicador de rol activo

### Navegación Administrativa
- `AdminNavigation`: Navegación específica de administración
- `AdminTabs`: Sistema de pestañas para subsecciones
- `AdminMenuItem`: Elementos de menú administrativo

### Modificador de Roles (Solo Admin)
- `RoleSwitcher`: Cambio de perspectiva para visualizar como otro rol
- No modifica permisos reales, solo visualización

## Permisos y Control de Acceso

### Rutas Protegidas
- Utiliza el componente `ProtectedRoute` para verificar acceso
- Opciones para requerir roles específicos o múltiples roles
- Redirección a página no autorizada si no tiene permisos

### Comprobación de Permisos
- A nivel de componente usando hooks de autenticación
- A nivel de API usando Row Level Security (RLS) en Supabase
- A nivel de ruta usando comprobaciones de rol

## Gestión de Estado de Autenticación

El estado de autenticación se gestiona a través del contexto `AuthContext` que proporciona:

- Estado de autenticación (`isAuthenticated`)
- Perfil de usuario (`profile`)
- Rol del usuario (`userRole`)
- Rol de visualización (`viewAsRole`)
- Funciones para cerrar sesión, actualizar perfil, etc.

## Convenciones de Navegación

### URLs Principales
- `/` - Redirección basada en rol
- `/auth/*` - Páginas de autenticación
- `/admin/*` - Secciones administrativas
- `/instructor/*` - Panel de instructor
- `/home` - Inicio del usuario autenticado
- `/profile` - Perfil del usuario
- `/settings` - Configuración del usuario

### Estructura de Componentes
- `pages/`: Páginas completas
- `components/layout/`: Componentes estructurales
- `components/ui/`: Componentes de interfaz reusables
- `components/admin/`: Componentes administrativos
- `features/`: Módulos funcionales específicos
- `hooks/`: Hooks personalizados
- `utils/`: Utilidades y helpers
