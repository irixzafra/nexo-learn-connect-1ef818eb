
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

1. **Panel Principal**
   - Dashboard con KPIs clave
   - Resumen de actividad reciente
   - Alertas y notificaciones importantes

2. **Dominio Académico**
   - Gestión de cursos
   - Gestión de categorías
   - Rutas de aprendizaje
   - Certificados

3. **Dominio de Personas**
   - Gestión de usuarios
   - Roles y permisos
   - Instructores
   - Estudiantes

4. **Dominio de Finanzas**
   - Gestión de pagos
   - Facturación
   - Reportes financieros
   - Configuración de precios

5. **Dominio de Analíticas**
   - Dashboards
   - Reportes personalizables
   - Exportación de datos
   - Métricas de rendimiento

6. **Dominio de Plataforma**
   - Configuración global
   - Personalización de diseño
   - Páginas del sistema
   - SEO

7. **Herramientas Técnicas**
   - Diagnóstico del sistema
   - Logs y auditoría
   - Herramientas de desarrollo
   - Configuraciones avanzadas

**Rutas principales**: `/app/admin/*`  
**Componentes clave**: `AdminDashboard`, `DomainNavigation`, `EntityManagers`

### Instructor

La navegación de instructores está organizada por flujo de trabajo natural:

1. **Panel Principal**
   - Resumen de actividad reciente
   - Métricas de cursos
   - Próximas clases
   - Notificaciones importantes

2. **Mis Cursos**
   - Creación y edición de cursos
   - Materiales y recursos
   - Organización de contenido
   - Configuración de evaluaciones

3. **Mis Estudiantes**
   - Lista de estudiantes
   - Seguimiento de progreso
   - Calificaciones
   - Comunicaciones

4. **Analíticas**
   - Estadísticas de engagement
   - Rendimiento por lección
   - Métricas de finalización
   - Retroalimentación

5. **Recursos**
   - Biblioteca de materiales
   - Plantillas
   - Herramientas didácticas
   - Recursos compartidos

6. **Perfil**
   - Información personal
   - Credenciales
   - Especialidades
   - Configuración

**Rutas principales**: `/app/instructor/*`  
**Componentes clave**: `InstructorDashboard`, `CourseEditor`, `StudentManager`

### Estudiante

La navegación de estudiantes está centrada en la experiencia de aprendizaje:

1. **Panel Principal**
   - Cursos en progreso
   - Próximas entregas
   - Recomendaciones personalizadas
   - Notificaciones

2. **Aprendizaje**
   - Mis cursos
   - Explorar catálogo
   - Rutas de aprendizaje
   - Certificados

3. **Comunidad**
   - Foros
   - Mensajería
   - Grupos de estudio
   - Eventos

4. **Recursos**
   - Biblioteca de materiales
   - Herramientas
   - Descargas
   - Favoritos

5. **Perfil y Configuración**
   - Información personal
   - Preferencias
   - Suscripciones
   - Configuración

**Rutas principales**: `/app/*`  
**Componentes clave**: `StudentDashboard`, `CoursePlayer`, `LearningPathViewer`

### Usuario Invitado (Guest)

La navegación para usuarios no autenticados:

1. **Página Principal**
   - Presentación de la plataforma
   - Testimonios
   - Cursos destacados

2. **Explorar**
   - Catálogo de cursos
   - Filtrado y búsqueda
   - Previsualizaciones

3. **Inscripción**
   - Registro
   - Iniciar sesión
   - Planes y precios

4. **Información**
   - Acerca de nosotros
   - Blog
   - Contacto
   - Ayuda

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
  adminUsers: '/app/admin/users',
  
  // Rutas de instructor
  instructor: '/app/instructor',
  instructorCourses: '/app/instructor/courses',
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
