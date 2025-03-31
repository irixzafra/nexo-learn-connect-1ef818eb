
# Flujos de Usuario Principales

Este documento describe los principales flujos de usuario en la plataforma Nexo Learning, detallando su implementación técnica y consideraciones de diseño.

## 1. Onboarding y Registro

### Flujo de Usuario
1. Usuario llega a la página de landing
2. Selecciona "Registrarse"
3. Completa formulario con información básica
4. Recibe confirmación por correo (opcional)
5. Completa perfil adicional
6. Es redirigido al dashboard personalizado

### Implementación Técnica

**Componentes involucrados**:
- `RegisterForm`: Formulario principal de registro
- `OnboardingModal`: Guía de primeros pasos post-registro
- `useAuth.signup()`: Método para creación de cuenta

**Flujo de datos**:
```
RegisterForm → useAuth.signup() → Supabase Auth → 
Trigger DB → Crear perfil → Redirección → OnboardingModal
```

**Consideraciones de seguridad**:
- Validación robusta de correo electrónico
- Políticas de contraseñas seguras
- Protección contra creación masiva de cuentas
- Verificación por correo opcional

## 2. Autenticación

### Flujo de Usuario
1. Usuario visita la página de login
2. Introduce credenciales (email/password)
3. Sistema valida credenciales
4. Se crea sesión autenticada
5. Usuario es redirigido según su rol

### Implementación Técnica

**Componentes involucrados**:
- `LoginForm`: Interfaz de inicio de sesión
- `useAuth.login()`: Método de autenticación
- `AuthContext`: Proveedor de estado de autenticación

**Flujo de datos**:
```
LoginForm → useAuth.login() → Supabase Auth → 
JWT generado → Actualización de AuthContext → 
Carga de perfil → Redirección basada en rol
```

**Gestión de sesión**:
- Tokens JWT almacenados según configuración
- Refresh automatizado mediante Supabase
- Cierre de sesión con limpieza completa de estado

## 3. Navegación basada en Roles

### Flujo de Usuario
1. Usuario autenticado accede a la plataforma
2. Visualiza opciones de navegación específicas según su rol
3. Puede acceder solo a funcionalidades permitidas
4. Administradores pueden simular otros roles para testing

### Implementación Técnica

**Componentes involucrados**:
- `RefactoredSidebarNavigation`: Menú lateral principal
- `ProtectedRoute`: HOC para protección de rutas
- `RoleSwitcher`: Componente para cambiar vista de rol

**Control de acceso**:
- Rutas protegidas mediante verificación de rol
- Elementos UI condicionalmente renderizados
- Backend protegido mediante RLS

**Funcionalidad "View As"**:
```typescript
// Ejemplo simplificado
const effectiveRole = viewAsRole === 'current' ? userRole : viewAsRole;

// Decisiones de navegación basadas en effectiveRole, no userRole
```

## 4. Gestión de Cursos

### Flujo de Usuario (Estudiante)
1. Navega al catálogo de cursos
2. Filtra y busca cursos de interés
3. Se inscribe en un curso
4. Accede al contenido del curso
5. Realiza seguimiento de su progreso

### Flujo de Usuario (Instructor)
1. Crea nuevo curso
2. Estructura módulos y lecciones
3. Carga contenido educativo
4. Configura ajustes de publicación
5. Monitorea inscripciones y progreso de estudiantes

### Implementación Técnica

**Componentes principales**:
- `CoursesList`: Catálogo de cursos disponibles
- `CourseLandingPage`: Página de detalles y matriculación
- `CourseContentTab`: Visualización de estructura de curso
- `CourseProgressBar`: Indicador de avance del estudiante

**Datos y persistencia**:
- Tabla `courses` para información general
- Tablas `modules` y `lessons` para estructura jerárquica
- Tabla `enrollments` para inscripciones
- Tabla `lesson_progress` para seguimiento de avance

## 5. Administración del Sistema

### Flujo de Usuario (Administrador)
1. Accede a panel de administración
2. Gestiona usuarios y asigna roles
3. Supervisa métricas del sistema
4. Configura parámetros globales
5. Genera reportes administrativos

### Implementación Técnica

**Componentes principales**:
- `RoleManagement`: Gestión de roles de usuario
- `UserManagement`: Administración de cuentas
- `AuditLog`: Visualización de registro de actividades
- `AdminCourses`: Gestión global de contenidos

**Características implementadas**:
- Asignación directa de roles
- Visualización filtrada de usuarios
- Logs detallados de acciones críticas
- Estadísticas administrativas

## 6. Perfiles de Usuario

### Flujo de Usuario
1. Accede a su página de perfil
2. Visualiza y edita información personal
3. Configura preferencias y ajustes
4. Revisa historial de actividades
5. Gestiona configuración de notificaciones

### Implementación Técnica

**Componentes principales**:
- `ProfileEditForm`: Edición de datos personales
- `UserPreferences`: Configuración de preferencias
- `ActivityHistory`: Registro de actividades recientes
- `NotificationSettings`: Configuración de alertas

**Datos involucrados**:
- Tabla `profiles` para información básica
- Datos de preferencias (tema, idioma, notificaciones)
- Historial de actividad relacionada

**Funcionalidades destacadas**:
- Cambio de tema claro/oscuro
- Selección de idioma de interfaz
- Configuración granular de notificaciones

## 7. Comunicación y Notificaciones

### Flujo de Usuario
1. Recibe notificaciones en tiempo real
2. Accede al centro de notificaciones
3. Lee mensajes de instructores o sistema
4. Responde según sea necesario
5. Configura preferencias de comunicación

### Implementación Técnica

**Componentes principales**:
- `NotificationIndicator`: Indicador de notificaciones nuevas
- `NotificationPanel`: Panel desplegable con alertas
- `MessagesList`: Lista de conversaciones
- `ConversationView`: Visualización de mensajes

**Datos involucrados**:
- Tabla `notifications` para alertas del sistema
- Tablas `conversations` y `messages` para mensajería
- Preferencias de notificación en perfil de usuario

## 8. Sistema de Gamificación

### Flujo de Usuario
1. Completa actividades y gana puntos
2. Desbloquea logros y badges
3. Avanza en niveles de usuario
4. Compara progreso en leaderboards
5. Obtiene recompensas por participación

### Implementación Técnica

**Componentes principales**:
- `UserAchievements`: Visualización de logros
- `Leaderboard`: Tabla de clasificación
- `PointsIndicator`: Muestra puntos acumulados
- `LevelProgress`: Progreso hacia siguiente nivel

**Datos involucrados**:
- Tabla `user_points` para seguimiento de puntos
- Tabla `badges` para definición de logros
- Tabla `user_badges` para logros desbloqueados

## Consideraciones Técnicas Generales

### Estado de Implementación
Cada flujo descrito se encuentra en diferentes estados de implementación:
- **Completo**: Autenticación, Navegación basada en roles
- **En desarrollo**: Gestión de perfiles, Gestión de cursos
- **Planificado**: Gamificación avanzada, Analíticas detalladas

### Puntos de Extensión
Se han identificado los siguientes puntos para extender funcionalidades:

1. **Autenticación**:
   - Integración con proveedores externos (Google, Apple)
   - Implementación de 2FA

2. **Cursos**:
   - Modalidades adicionales (autoguiado, con instructor)
   - Integración con herramientas de videoconferencia

3. **Analíticas**:
   - Visualización avanzada para instructores
   - Recomendaciones personalizadas para estudiantes

### Consideraciones de UX
Los flujos se han diseñado siguiendo estos principios:

1. **Simplicidad**: Minimizar pasos para completar tareas comunes
2. **Coherencia**: Patrones de interacción consistentes
3. **Retroalimentación**: Confirmación clara de acciones
4. **Accesibilidad**: Diseño inclusivo para diversos usuarios

---

Este documento debe ser actualizado conforme se implementen nuevas funcionalidades o se modifiquen los flujos existentes.
