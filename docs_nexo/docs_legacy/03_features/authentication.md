
# Autenticación y Roles

Este módulo gestiona los procesos de autenticación, autorización y control de acceso basado en roles en Nexo Learning Platform.

## Flujo de Autenticación

### Registro de Usuario
1. El usuario accede al formulario de registro (`/register`)
2. Introduce datos personales básicos y credenciales
3. El sistema valida los datos y crea la cuenta en Supabase Auth
4. Se crea automáticamente un perfil en la tabla `profiles` mediante un trigger
5. El usuario recibe un email de confirmación
6. Al confirmar, el usuario es redirigido al proceso de onboarding

### Login
1. El usuario accede al formulario de login (`/login`)
2. Introduce sus credenciales (email/password)
3. El sistema valida las credenciales contra Supabase Auth
4. Se genera un token JWT y se almacena en localStorage
5. El usuario es redirigido según su rol y estado de onboarding

### Recuperación de Contraseña
1. El usuario accede al formulario de recuperación
2. Introduce su email
3. Recibe un enlace de restablecimiento por email
4. Accede al enlace y establece una nueva contraseña
5. Es redirigido al login con credenciales actualizadas

## Gestión de Sesión

### Persistencia
- Tokens JWT almacenados en localStorage
- Refresh tokens para renovación automática
- Gestión de expiración y logout automático

### Seguridad
- HTTPS para toda comunicación
- Tokens con tiempo de expiración limitado
- Invalidación de sesiones al cambiar contraseña
- Protección contra CSRF

## Roles y Permisos

### Roles Principales
- **Estudiante**: Usuario básico que puede consumir contenido
- **Instructor**: Puede crear y gestionar cursos propios
- **Administrador**: Acceso completo al sistema
- **Sistema**: Para operaciones automatizadas

### Tabla de Permisos

| Recurso                | Estudiante | Instructor | Administrador |
|------------------------|------------|------------|---------------|
| Ver cursos públicos    | ✓          | ✓          | ✓             |
| Inscribirse en cursos  | ✓          | ✓          | ✓             |
| Crear cursos           | ✗          | ✓          | ✓             |
| Editar cursos propios  | ✗          | ✓          | ✓             |
| Editar cualquier curso | ✗          | ✗          | ✓             |
| Gestionar usuarios     | ✗          | ✗          | ✓             |
| Configurar sistema     | ✗          | ✗          | ✓             |

## Implementación Técnica

### Componentes Principales
- `AuthContext`: Proveedor de contexto para estado de autenticación
- `LoginForm` y `RegisterForm`: Componentes de formulario
- `ProtectedRoute`: HOC para proteger rutas basado en roles
- `useAuth`: Hook personalizado para acceder al contexto de auth

### Hooks Relevantes
- `useLogin`: Gestiona el proceso de login
- `useRegister`: Gestiona el proceso de registro
- `useLogout`: Maneja el cierre de sesión
- `useResetPassword`: Flujo de recuperación de contraseña

## Políticas RLS Relevantes

Las siguientes políticas de Row Level Security (RLS) están implementadas para proteger los datos basados en la autenticación y roles:

```sql
-- Ejemplo: Política para perfiles
CREATE POLICY "Los usuarios pueden ver sus propios perfiles"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Los administradores pueden ver todos los perfiles"
ON profiles FOR SELECT
USING (IS_ADMIN());

-- Función auxiliar para verificar rol admin
CREATE OR REPLACE FUNCTION IS_ADMIN()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;
```

## Auditoría y Seguridad

### Eventos Auditados
- Inicios de sesión exitosos y fallidos
- Creación de cuentas
- Cambios de contraseña
- Modificaciones de roles
- Intentos de acceso no autorizados

### Almacenamiento de Auditoría
Los eventos de seguridad se registran en la tabla `audit_log` con información detallada sobre la acción, usuario, timestamp, dirección IP y otros metadatos relevantes.
