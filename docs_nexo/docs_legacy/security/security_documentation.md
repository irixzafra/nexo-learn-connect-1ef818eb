# Documentación de Seguridad - Nexo Learning Platform

## Visión General de Seguridad

La seguridad de Nexo Learning Platform está diseñada siguiendo el principio de defensa en profundidad, implementando múltiples capas de protección para mitigar riesgos y vulnerabilidades.

```
┌─────────────────────────────────────────────────────────┐
│                 Seguridad en Capas                      │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │  Seguridad  │ │  Seguridad  │ │     Seguridad       │ │
│ │    de la    │ │    de la    │ │      de la          │ │
│ │ Aplicación  │ │Infraestructura│   Información      │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Autenticación y Autorización

### Sistema de Autenticación

Nexo Learning implementa un sistema de autenticación robusto basado en Supabase Auth con las siguientes características:

#### Métodos de Autenticación

1. **Email y Contraseña**
   - Verificación de correo electrónico
   - Políticas de fortaleza de contraseñas
   - Protección contra intentos repetidos de inicio de sesión

2. **OAuth Providers (opcional)**
   - Google
   - GitHub
   - Microsoft

3. **Sessiones basadas en JWT**
   - Tokens firmados y verificados
   - Refresh tokens para renovación automática
   - Revocación de tokens en cierre de sesión

#### Flujo de Autenticación

```
┌──────────┐     ┌────────────┐     ┌─────────────┐
│ Cliente  │────►│ Formulario │────►│ Supabase    │
│          │     │ de Login   │     │ Auth API    │
└──────────┘     └────────────┘     └─────────────┘
      ▲                                   │
      │                                   │
      │              ┌─────────────┐      │
      └──────────────┤ JWT + User  │◄─────┘
                     │ Information │
                     └─────────────┘
```

### Autorización

#### Sistema de Roles

Nexo Learning implementa un sistema de roles flexible:

| Rol | Descripción | Permisos Principales |
|-----|-------------|----------------------|
| `student` | Usuario estándar | Ver contenido, participar en cursos, publicar en comunidad |
| `instructor` | Creador de contenido | Gestionar sus propios cursos, ver estadísticas |
| `admin` | Administrador del sistema | Acceso completo a gestión de la plataforma |
| `sistemas` | Soporte técnico | Herramientas de diagnóstico y ayuda |

#### Row Level Security (RLS)

Para proteger los datos a nivel de fila, aplicamos políticas RLS específicas:

```sql
-- Ejemplo de política RLS para contenido de cursos
CREATE POLICY "Acceso restringido a lecciones"
ON public.lessons
FOR SELECT
USING (
  -- Administradores pueden ver todas las lecciones
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  OR
  -- Instructores pueden ver lecciones de sus cursos
  EXISTS (
    SELECT 1 FROM public.courses 
    WHERE courses.id = lessons.course_id 
    AND courses.instructor_id = auth.uid()
  )
  OR
  -- Estudiantes pueden ver lecciones de cursos en los que están inscritos
  EXISTS (
    SELECT 1 FROM public.enrollments 
    WHERE enrollments.course_id = lessons.course_id 
    AND enrollments.user_id = auth.uid()
  )
  OR
  -- Cualquiera puede ver lecciones de vista previa
  lessons.is_previewable = true
);
```

#### Seguridad Basada en Contexto

- Verificación de roles en componentes de React mediante hooks personalizados
- Rutas protegidas en frontend mediante componente `ProtectedRoute`
- Verificación de permisos específicos para acciones críticas

## Protección de Datos

### Encriptación

#### Datos en Reposo

- **Contraseñas**: Almacenadas con hash bcrypt
- **Datos sensibles**: Encriptación AES-256
- **Almacenamiento**: Cifrado a nivel de volumen en Supabase

#### Datos en Tránsito

- **HTTPS/TLS**: Todas las comunicaciones cifradas con TLS 1.3
- **Secure Cookies**: Flags Secure y HttpOnly en cookies sensibles
- **HSTS**: Strict Transport Security para prevenir downgrade attacks

### Protección de Información Sensible

1. **Datos Personales**
   - Mínima recolección de datos (principio de minimización)
   - Acceso limitado basado en necesidad de conocimiento
   - Políticas de retención y eliminación

2. **Datos de Pago**
   - Integración con Stripe para procesamiento de pagos
   - No almacenamiento de datos de tarjetas en nuestros servidores
   - Tokenización de métodos de pago

3. **Material Educativo**
   - DRM para contenido premium
   - Políticas anti-descarga no autorizada
   - Marcas de agua personalizadas según usuario

## Seguridad de la Aplicación

### Protección contra Vulnerabilidades Comunes

#### Cross-Site Scripting (XSS)

1. **Prevención de XSS en React**
   - Escape automático de contenido por React
   - Uso de TypeScript para validación de tipos
   - Validación estricta de entrada con Zod

2. **Sanitización de Contenido**
   - Limpieza de HTML en campos de Rich Text
   - Validación de entradas según reglas estrictas
   - Uso adecuado de `dangerouslySetInnerHTML` solo cuando es necesario

3. **Políticas de Seguridad de Contenido (CSP)**
   - Configuración estricta de Content-Security-Policy
   - Restricción de fuentes para scripts, estilos e imágenes
   ```
   Content-Security-Policy: default-src 'self'; 
     script-src 'self' https://apis.google.com; 
     style-src 'self' https://fonts.googleapis.com; 
     img-src 'self' data: https://*.supabase.co; 
     font-src 'self' https://fonts.gstatic.com;
     connect-src 'self' https://*.supabase.co;
   ```

#### Cross-Site Request Forgery (CSRF)

1. **Tokens CSRF**
   - Generación de tokens únicos por sesión
   - Validación en operaciones sensibles

2. **Cabeceras de Seguridad**
   - Same-Origin Policy
   - `SameSite=Strict` en cookies sensibles

#### SQL Injection

1. **Uso de Supabase Client**
   - Preparación automática de consultas
   - Parametrización de entradas

2. **Validación de Entrada**
   - Fuerte validación en cliente y servidor
   - Sanitización específica según contexto

#### Otras Protecciones

1. **Rate Limiting**
   - Límites en intentos de login
   - Protección contra abuso de API

2. **Subresource Integrity (SRI)**
   - Verificación de integridad para recursos externos

3. **X-Frame-Options & Clickjacking Protection**
   - Cabecera `X-Frame-Options: DENY`
   - Defensa contra ataques de UI Redressing

## Gestión de Sesiones

### Configuración de Sesiones

1. **Ciclo de Vida**
   - Duración máxima de sesión: 2 semanas
   - Renovación automática si hay actividad
   - Expiración forzada tras inactividad prolongada (3 días)

2. **Almacenamiento Seguro**
   - JWT almacenado en localStorage con manejo cuidadoso
   - Refresh tokens con rotación segura

3. **Invalidación**
   - Cierre de sesión en múltiples dispositivos
   - Revocación de tokens por parte de administradores
   - Invalidación automática en cambio de contraseña

### Gestión de Estados de Autenticación

```typescript
// AuthContext implementation pattern
const AuthProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ...rest of the provider
}
```

## Seguridad de Infraestructura

### Arquitectura de Seguridad

1. **Entornos Segregados**
   - Separación de desarrollo, staging y producción
   - Aislamiento de datos entre entornos

2. **Principio de Menor Privilegio**
   - Acceso mínimo necesario a recursos
   - Roles y permisos específicos por función

### Gestión de Secretos

1. **Variables de Entorno**
   - Inyección en tiempo de despliegue
   - No almacenamiento en repositorio de código

2. **Supabase Vault (en caso de uso)**
   - Almacenamiento seguro de claves de API
   - Acceso limitado con políticas de permisos

3. **Rotación Periódica**
   - Cambio programado de credenciales críticas
   - Procedimientos de actualización documentados

## Monitorización y Logging

### Sistema de Logs

1. **Eventos Auditables**
   - Acciones de administrador
   - Cambios en datos críticos
   - Inicios y cierres de sesión
   - Accesos inusuales o sospechosos

2. **Estructura de Logs**
   ```json
   {
     "timestamp": "2023-05-15T14:32:45Z",
     "event": "user.login",
     "status": "success",
     "user_id": "123e4567-e89b-12d3-a456-426614174000",
     "ip": "203.0.113.42",
     "user_agent": "Mozilla/5.0...",
     "details": { "method": "password" }
   }
   ```

3. **Almacenamiento y Retención**
   - Logs almacenados en sistema segregado
   - Retención según política y normativas
   - Protección contra manipulación

### Sistema de Alertas

1. **Alertas en Tiempo Real**
   - Intentos de acceso sospechosos
   - Cambios masivos en datos
   - Problemas de rendimiento
   - Errores críticos en producción

2. **Canales de Notificación**
   - Email para incidentes de baja prioridad
   - SMS/llamada para incidentes críticos
   - Integración con sistemas de tickets

## Gestión de Vulnerabilidades

### Auditoría de Seguridad

1. **Revisión de Código**
   - Revisiones manuales periódicas
   - Análisis estático automatizado (ESLint, SonarQube)
   - Verificación de dependencias vulnerables

2. **Pruebas de Seguridad**
   - SAST (Static Application Security Testing)
   - DAST (Dynamic Application Security Testing)
   - Pruebas de penetración periódicas

### Gestión de Dependencias

1. **Herramientas de Análisis**
   - Dependabot para actualizaciones automáticas
   - Revisiones manuales de PRs críticos
   - Auditorías con `npm audit`

2. **Política de Actualizaciones**
   - Actualizaciones rápidas para vulnerabilidades críticas
   - Actualizaciones programadas para mejoras menores
   - Proceso documentado para breaking changes

3. **Verificación de Integridad**
   - Auditoría de NPM shrinkwrap/package-lock
   - Verificación de firmas en paquetes críticos

## Plan de Respuesta a Incidentes

### Clasificación de Incidentes

| Nivel | Descripción | Ejemplos | Tiempo de Respuesta |
|-------|-------------|----------|---------------------|
| P1    | Crítico | Violación de datos, Caída total | Inmediato (< 1 hora) |
| P2    | Alto | Degradación severa, Acceso no autorizado | < 4 horas |
| P3    | Medio | Problemas de funcionalidad, Bugs de seguridad | < 24 horas |
| P4    | Bajo | Mejoras de seguridad, Advertencias | < 1 semana |

### Procedimiento de Respuesta

1. **Detección y Reporte**
   - Canales de comunicación definidos
   - Formulario de informe estandarizado
   - Sistema de escalamiento

2. **Contención**
   - Aislamiento de sistemas comprometidos
   - Bloqueo temporal de accesos si es necesario
   - Mitigación de daños en curso

3. **Erradicación y Recuperación**
   - Eliminación de vulnerabilidades
   - Restauración desde backups verificados
   - Implementación de controles adicionales

4. **Análisis Post-Incidente**
   - Investigación de causa raíz
   - Documentación detallada
   - Mejoras en procesos y sistemas

## Cumplimiento Normativo

### Regulaciones Relevantes

1. **RGPD/GDPR**
   - Base legal para procesamiento de datos
   - Derechos de los sujetos de datos implementados
   - Registros de actividades de procesamiento

2. **LOPD**
   - Cumplimiento de legislación española
   - Medidas técnicas y organizativas documentadas
   - Adaptación a requisitos específicos

3. **PCI DSS (si aplica)**
   - Cumplimiento para procesamiento de pagos
   - Scope limitado mediante tokenización
   - Auditorías periódicas de cumplimiento

### Controles Implementados

1. **Privacidad por Diseño**
   - Minimización de datos
   - Implementación de consentimientos explícitos
   - Capacidades de exportación y borrado de datos

2. **Documentación de Cumplimiento**
   - Políticas de privacidad
   - Términos de servicio
   - Registro de actividades de tratamiento

## Verificación de Seguridad

### Pruebas de Seguridad Continuas

1. **Testing Automatizado**
   - Suite de pruebas de seguridad
   - Integración en pipeline CI/CD
   - Análisis de código estático

2. **Revisiones Manuales**
   - Revisiones de código enfocadas en seguridad
   - Análisis periódicos de configuración
   - Auditorías de acceso y permisos

### Ejemplos de Pruebas

```javascript
// Ejemplo de test de autenticación
describe('Authentication Security', () => {
  test('should fail login with incorrect password', async () => {
    const response = await api.post('/auth/login', {
      email: 'test@example.com',
      password: 'incorrectPassword'
    });
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
  
  test('should lock account after multiple failed attempts', async () => {
    // Test implementation
  });
  
  test('should require strong passwords', async () => {
    // Test implementation
  });
});
```

## Mejores Prácticas Implementadas

### Frontend

1. **Validación Cliente-Servidor**
   - Validación en cliente para UX
   - Validación en servidor para seguridad
   - Uso de Zod para esquemas de validación

2. **Sanitización**
   - Limpieza de inputs según contexto
   - Escapado de código HTML en contenido generado
   - Validación de tipos en TypeScript

3. **Protección de Rutas**
   ```tsx
   // Ejemplo de componente ProtectedRoute
   const ProtectedRoute: React.FC<{
     children: React.ReactNode;
     requiredRole?: UserRoleType;
   }> = ({ children, requiredRole }) => {
     const { user, userRole, loading } = useAuth();
     const navigate = useNavigate();
     
     useEffect(() => {
       if (!loading && !user) {
         navigate('/auth/login');
       } else if (
         !loading && 
         requiredRole && 
         userRole !== 'admin' && 
         userRole !== requiredRole
       ) {
         navigate('/unauthorized');
       }
     }, [user, userRole, loading, navigate, requiredRole]);
     
     if (loading) return <LoadingScreen />;
     if (!user) return null;
     if (requiredRole && userRole !== 'admin' && userRole !== requiredRole)
       return null;
       
     return <>{children}</>;
   };
   ```

### Backend

1. **Supabase Seguro**
   - Políticas RLS estrictas
   - Funciones con SECURITY DEFINER cuando apropiado
   - Validación estricta en Edge Functions

2. **Protección API**
   - Autenticación JWT consistente
   - Rate limiting en endpoints sensibles
   - Validación de parámetros y cuerpo de peticiones

3. **Manejo de Errores**
   - Mensajes de error genéricos (sin detalles técnicos)
   - Logging detallado para diagnóstico interno
   - Respuestas apropiadas según el error

## Recursos de Seguridad

### Documentación Interna

1. **Política de Seguridad**
   - Principios generales
   - Roles y responsabilidades
   - Procedimientos de seguridad

2. **Guía de Desarrollo Seguro**
   - Checklist para desarrollo
   - Patrones recomendados
   - Anti-patrones a evitar

3. **Plan de Continuidad**
   - Procedimientos de backup y restauración
   - Recuperación ante desastres
   - Contactos y escalamiento

### Referencias Externas

1. **OWASP Top 10**
   - Mitigaciones implementadas para cada categoría
   - Recursos de aprendizaje

2. **SANS Critical Security Controls**
   - Controles aplicables implementados
   - Plan de mejora continua

3. **Recursos Específicos de Tecnología**
   - Guías de seguridad de React
   - Documentación de seguridad de Supabase
   - Mejores prácticas para PostgreSQL
