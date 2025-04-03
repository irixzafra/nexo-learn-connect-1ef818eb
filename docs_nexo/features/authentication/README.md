
# Módulo de Autenticación

## Visión General

El módulo de autenticación gestiona los procesos de registro, inicio de sesión, recuperación de contraseña y gestión de sesiones de usuario. Utiliza Supabase Auth como proveedor principal y añade lógica personalizada para roles y permisos.

## Componentes Principales

### Páginas

- **Login**: Página de inicio de sesión
- **Register**: Página de registro de nuevos usuarios
- **ForgotPassword**: Solicitud de recuperación de contraseña
- **ResetPassword**: Formulario de nueva contraseña
- **VerifyEmail**: Verificación de correo electrónico

### Componentes UI

- **AuthForm**: Formulario base adaptable para autenticación
- **SocialLogin**: Botones para inicio de sesión con proveedores externos
- **PasswordStrength**: Indicador de fortaleza de contraseña
- **AuthGuard**: Componente HOC para proteger rutas
- **RoleGuard**: Componente para acceso basado en roles

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/auth/login` | Login | Inicio de sesión |
| `/auth/register` | Register | Registro de nuevos usuarios |
| `/auth/forgot-password` | ForgotPassword | Recuperación de contraseña |
| `/auth/reset-password` | ResetPassword | Establecer nueva contraseña |
| `/auth/verify` | VerifyEmail | Verificación de email |

## Contexto y Hooks

- **AuthContext**: Contexto global para estado de autenticación
- **useAuth**: Hook principal para funcionalidades de autenticación
- **useUser**: Hook para acceder a información del usuario actual
- **useRoles**: Hook para gestión de roles y permisos
- **useRedirectAuthed**: Hook para redireccionar usuarios autenticados

## Flujos de Trabajo Principales

### Registro de Usuario

1. Usuario completa formulario de registro
2. Validación de campos y formato de email
3. Creación de cuenta en Supabase Auth
4. Creación de registro en tabla `profiles`
5. Asignación de rol inicial (`student` por defecto)
6. Envío de email de verificación
7. Redirección a página de confirmación

### Inicio de Sesión

1. Usuario ingresa credenciales
2. Validación contra Supabase Auth
3. Si es exitoso, recuperación de perfil y roles
4. Almacenamiento de sesión
5. Redirección basada en rol y URL anterior

### Verificación y Recuperación

1. Proceso de verificación vía token en URL
2. Validación de token contra Supabase Auth
3. Activación de cuenta o restablecimiento de contraseña
4. Confirmación y redirección

## Estado Actual

- ✅ Registro e inicio de sesión implementados
- ✅ Recuperación de contraseña funcional
- ✅ Integración con Supabase Auth completa
- ✅ Manejo de roles básico implementado
- 🔄 Mejora de validaciones en desarrollo
- 🔄 Autenticación social en implementación
- ⏱️ Verificación en dos pasos pendiente

## Seguridad

- Tokens JWT para sesiones
- Políticas RLS basadas en rol del usuario
- Almacenamiento seguro de contraseñas (gestionado por Supabase)
- Protección contra CSRF en formularios
- Bloqueo temporal después de múltiples intentos fallidos
- Verificación obligatoria de email para cuentas nuevas

## Modelo de Datos

El módulo trabaja principalmente con:

- Tabla `auth.users` (gestionada por Supabase)
- Tabla `public.profiles` (perfil público del usuario)
- Tabla `public.roles` (definición de roles)
- Tabla `public.user_roles` (asignación de roles a usuarios)

## Próximas Mejoras

- Autenticación con proveedores sociales (Google, GitHub, etc.)
- Verificación en dos pasos (2FA)
- Login con Magic Link
- Mejora en el sistema de recuperación de contraseña
- Registro por invitación para roles específicos
- Auditoría detallada de eventos de autenticación
