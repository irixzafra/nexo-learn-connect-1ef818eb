
# Navegación del Sistema Nexo Learning

Este documento sirve como la fuente única de verdad (SSOT) para la estructura de navegación de Nexo Learning. Define los principios, componentes y organización de la navegación para todos los roles de usuario.

## Principios de Navegación

La navegación de Nexo Learning se basa en cuatro principios fundamentales:

1. **Simplicidad**: Máximo 2 niveles de navegación para evitar la complejidad.
2. **Contextualidad**: Elementos de navegación específicos al contexto actual del usuario.
3. **Consistencia**: Patrones de navegación similares en toda la aplicación.
4. **Adaptabilidad**: Sistema de navegación único que se adapta a cada rol de usuario.

## Componentes Principales de Navegación

### Barra Lateral (Sidebar)
- **SidebarMainNavigation**: Componente principal que contiene grupos de navegación
- **SidebarNavGroup**: Grupos colapsables de elementos de navegación
- **SidebarNavItem**: Elementos individuales de navegación (enlaces)
- **SidebarNavSeparator**: Separadores visuales entre grupos
- **SidebarFooterSection**: Controles de usuario en la parte inferior

### Barra Superior (Header)
- **MainHeader**: Barra superior con logo, búsqueda y acciones rápidas
- **Breadcrumbs**: Navegación de ruta actual
- **QuickActions**: Botones de acción rápida (notificaciones, mensajes, etc.)
- **UserMenu**: Menú desplegable de acciones del usuario

### Pie de Página (Footer)
- **MainFooter**: Enlaces legales, información de contacto y redes sociales
- **Copyright**: Información legal y de derechos de autor

## Flujo de Navegación Dinámico

1. El componente `ConditionalSidebar` detecta la ruta actual y el rol del usuario
2. Se cargan los elementos de navegación adecuados del directorio `src/config/navigation/`
3. Se filtran los elementos según los permisos del usuario
4. Se muestra la navegación correspondiente manteniendo una experiencia coherente

## Estructura de Navegación por Rol

### Administración (Admin)

La navegación de administración está organizada por dominios funcionales:

1. **Dashboard**
   - Visión General (`/app/admin/dashboard`)
   - KPIs clave
   - Resumen de actividad reciente
   - Alertas y notificaciones importantes

2. **Académico (LMS)**
   - Gestión de cursos
   - Contenido Global
   - Categorías
   - Rutas de Aprendizaje
   - Certificados
   - Analíticas Académicas

3. **Gestión Central (ERP)**
   - Gestión de usuarios
   - Roles y permisos
   - Analíticas de usuarios
   - Comunicación

4. **Finanzas**
   - Transacciones
   - Suscripciones
   - Analíticas Financieras
   - Configuración de pagos

5. **Sistema (Plataforma)**
   - Configuración General
   - Diseño
   - Páginas CMS
   - Gestión de Features
   - Integraciones
   - Analíticas de Plataforma
   - Salud/Logs

6. **Herramientas Dev (Opcional)**
   - Diagrama de navegación
   - Revisión de elementos
   - Herramientas de desarrollo
   - Configuraciones avanzadas

**Rutas principales**: `/app/admin/*`  
**Componentes clave**: `AdminDashboard`, `DomainNavigation`, `EntityManagers`

### Instructor

La navegación de instructores está organizada por flujo de trabajo natural:

1. **Dashboard**
   - Panel Instructor (`/app/instructor/dashboard`)
   - Resumen de actividad reciente
   - Métricas de cursos
   - Próximas clases
   - Notificaciones importantes

2. **Gestión Académica**
   - Mis Cursos
   - Crear Curso
   - Biblioteca de Contenido

3. **Estudiantes**
   - Mis Estudiantes
   - Progreso/Notas
   - Comunicación

4. **Rendimiento**
   - Analíticas de Cursos

5. **Cuenta**
   - Mi Perfil
   - Mi Facturación
   - Configuración

**Rutas principales**: `/app/instructor/*`  
**Componentes clave**: `InstructorDashboard`, `CourseEditor`, `StudentManager`

### Estudiante

La navegación de estudiantes está centrada en la comunidad y experiencia de aprendizaje:

1. **Dashboard**
   - Mi Panel (`/app/dashboard`)
   - Resumen de actividad
   - Próximas entregas
   - Recomendaciones personalizadas
   - Notificaciones

2. **Comunidad**
   - Feed
   - Leaderboard
   - Mensajes
   - Notificaciones

3. **Aprendizaje**
   - Mis Cursos
   - Explorar Cursos
   - Rutas de Aprendizaje
   - Calendario

4. **Mi Cuenta**
   - Mi Perfil
   - Progreso/Certificados
   - Facturación/Inscripciones
   - Configuración

5. **Ayuda**
   - Centro de Ayuda
   - Contactar Soporte

**Rutas principales**: `/app/*`  
**Componentes clave**: `StudentDashboard`, `CoursePlayer`, `LearningPathViewer`

### Usuario Invitado (Guest)

La navegación para usuarios no autenticados:

1. **Header**
   - Cursos
   - Rutas
   - Sobre Nosotros
   - Ayuda
   - Login/Registro
   - Idioma
   - Tema

2. **Footer**
   - Plataforma
   - Legal
   - Recursos
   - Redes

**Rutas principales**: `/` (raíz), `/landing`, `/auth/*`  
**Componentes clave**: `LandingPage`, `Auth`, `PublicCourseView`

## Gestión Técnica de Rutas

### Definición Centralizada

Las rutas se definen de manera centralizada en `routeMap` dentro de `src/utils/routeUtils.ts`. Esto garantiza consistencia y facilita el mantenimiento. Ejemplo:

```typescript
// Extracto de routeMap
export const routeMap = {
  // Rutas públicas
  home: '/',
  login: '/auth/login',
  
  // Rutas de aplicación autenticada
  dashboard: '/app/dashboard',
  myCourses: '/app/my-courses',
  
  // Rutas de administración
  admin: '/app/admin',
  adminDashboard: '/app/admin/dashboard',
  
  // Rutas de instructor
  instructor: '/app/instructor',
  instructorDashboard: '/app/instructor/dashboard',
};
```

### Validación de Rutas

El sistema incluye herramientas para validar rutas y detectar:
- Enlaces rotos
- Rutas duplicadas
- Rutas sin autorización adecuada
- Rutas deprecadas

### Buenas Prácticas

1. **Usar `routeMap`**: Siempre usar constantes de `routeMap` en lugar de hardcodear rutas
2. **Validación**: Utilizar `isRouteActive()` para verificar rutas activas
3. **Parámetros**: Para rutas dinámicas, usar funciones generadoras (ej: `courseDetail(id)`)
4. **Breadcrumbs**: Mantener la coherencia con la estructura de navegación

## Detalle de Rutas por Módulo

Para rutas específicas y detalladas de cada módulo, consultar la documentación correspondiente:

- **Admin**: [Documentación de Administración](features/admin/README.md)
- **Instructor**: [Documentación de Instructor](features/instructor/README.md)
- **Cursos**: [Documentación de Cursos](features/courses/README.md)
- **Autenticación**: [Documentación de Autenticación](features/authentication/README.md)
- **Comunidad**: [Documentación de Comunidad](features/community/README.md)
- **Usuarios**: [Documentación de Usuarios](features/users/README.md)

## Estado de Implementación

La implementación del sistema de navegación se encuentra en constante evolución:

- ✅ **Sistema base de navegación**: Implementado
- ✅ **Navegación por roles**: Implementado
- ✅ **Navegación condicional**: Implementado
- 🚧 **Navegación móvil avanzada**: En desarrollo
- 🚧 **Breadcrumbs dinámicos**: En desarrollo
- ⏳ **Personalización por usuario**: Planificado

---

*Este documento representa la fuente única de verdad sobre la navegación del sistema. Cualquier cambio en la estructura de navegación debe reflejarse aquí primero.*

*Última actualización: Abril 2025*
