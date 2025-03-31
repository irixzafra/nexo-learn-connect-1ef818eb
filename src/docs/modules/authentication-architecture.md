
# Arquitectura del Sistema de Autenticación

## Visión General

El sistema de autenticación de Nexo Learning está diseñado con un enfoque modular y extensible utilizando React Context API y hooks personalizados. Esta arquitectura permite una clara separación de responsabilidades y facilita el testing y mantenimiento.

## Componentes Principales

### 1. AuthContext y AuthProvider

El `AuthContext` proporciona acceso global al estado de autenticación a través de la aplicación. El `AuthProvider` encapsula toda la lógica de autenticación y expone una API consistente para los componentes consumidores.

```typescript
// Estructura básica
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authState = useAuthState();
  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

// Hook de acceso
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
```

### 2. useAuthState (Controlador Principal)

El hook `useAuthState` orquesta los distintos aspectos de la autenticación mediante la composición de hooks especializados:

```typescript
export function useAuthState() {
  // Estado general de autenticación
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Hooks especializados
  const { user, session, setUser, setSession } = useAuthSession({ setIsAuthReady });
  const { profile, role, setProfile, setRole, updateUserProfile } = useAuthProfile({ user, setIsLoading });
  const { login, signup, logout, resetPassword } = useAuthMethods({ setProfile, setRole, navigate });
  const { theme, viewAs, setTheme, setUserRole, setViewAs, setViewAsRole, switchViewAsRole, saveUserPreferences } = useUserPreferences({ setRole });
  
  // Lógica adicional y retorno de estado/métodos unificados
  // ...
}
```

### 3. Hooks Especializados

#### 3.1 useAuthSession

Gestiona la sesión con Supabase Auth, maneja eventos de cambio de estado y proporciona información actualizada sobre el usuario autenticado.

**Responsabilidades**:
- Inicialización de estado de sesión
- Suscripción a eventos de autenticación
- Limpieza de suscripciones

#### 3.2 useAuthProfile

Maneja los perfiles de usuario y los metadatos asociados, sincronizando el estado con la base de datos.

**Responsabilidades**:
- Carga de perfil de usuario
- Actualización de datos de perfil
- Gestión de rol de usuario

#### 3.3 useAuthMethods

Encapsula los métodos de autenticación principales como login, registro, cierre de sesión y restablecimiento de contraseña.

**Responsabilidades**:
- Implementación de login/signup
- Proceso de logout
- Restablecimiento de contraseña

#### 3.4 useUserPreferences

Gestiona preferencias de usuario como tema de interfaz y opciones de "ver como" para simulación de roles.

**Responsabilidades**:
- Persistencia de preferencias
- Cambio de tema
- Simulación de roles (viewAs)

## Flujo de Datos

1. **Inicialización**:
   - `AuthProvider` se monta y inicializa `useAuthState`
   - `useAuthSession` verifica si existe una sesión activa
   - Se cargan las preferencias del usuario

2. **Autenticación**:
   - Usuario inicia sesión mediante `login()`
   - Se actualiza la sesión en `useAuthSession`
   - Se carga el perfil en `useAuthProfile`
   - Se establecen roles y permisos

3. **Durante uso de aplicación**:
   - El estado de autenticación se mantiene disponible vía Context API
   - Componentes acceden mediante `useAuth()`
   - Cambios de perfil o preferencias se sincronizan

4. **Cierre de sesión**:
   - Usuario llama a `logout()`
   - Se limpia la sesión de Supabase
   - Se resetea el estado en los hooks
   - Se redirecciona según configuración

## Sistema de Roles

El sistema implementa un control de acceso basado en roles (RBAC) con las siguientes características:

1. **Tipos de roles**:
   - Definidos como `UserRoleType` en `types.ts`
   - Incluye admin, instructor, student y otros roles especializados

2. **Funcionalidad "View As"**:
   - Permite a administradores cambiar su vista para simular otros roles
   - Facilita pruebas y depuración sin cambiar permisos reales

3. **Protección de rutas**:
   - Componentes HOC para verificar acceso basado en rol
   - Redirección automática a páginas apropiadas según permisos

## Consideraciones de Seguridad

1. **Gestión de tokens**:
   - JWT almacenados de manera segura
   - Renovación automática vía Supabase Auth

2. **Validación de roles**:
   - Verificación dual (cliente/servidor) para operaciones críticas
   - Row Level Security en base de datos como capa adicional

3. **Protección contra ataques comunes**:
   - Anti CSRF mediante tokens
   - Prevención de inyección mediante validación de entradas
   - Rate limiting para prevenir fuerza bruta

## Diagrama de Componentes

```
┌─────────────────────┐
│    AuthProvider     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│    useAuthState    │◄─────┐
└─────────┬───────────┘      │
          │                  │
  ┌───────┴───────┬──────────┴───────┬─────────────────┐
  ▼               ▼                  ▼                 ▼
┌────────────┐ ┌────────────┐  ┌────────────┐  ┌─────────────────┐
│useAuthSession│ │useAuthProfile│  │useAuthMethods│  │useUserPreferences│
└────────────┘ └────────────┘  └────────────┘  └─────────────────┘
```

## Recomendaciones para mejoras futuras

1. **Autenticación multifactor**:
   - Implementar 2FA para mayor seguridad
   - Integrar con servicios como Twilio o similares para SMS

2. **Mejoras en gestión de sesiones**:
   - Implementar detección de sesiones concurrentes
   - Añadir opciones para cierre de sesión remoto

3. **Auditoría mejorada**:
   - Registrar todos los eventos de autenticación
   - Crear dashboard para monitoreo de actividad sospechosa

4. **Integración con proveedores externos**:
   - Ampliar opciones de login social
   - Considerar implementación de SSO para entornos corporativos
