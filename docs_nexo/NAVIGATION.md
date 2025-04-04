

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

### Navegación Pública (Invitado)

**Header:**
- Logo
- Explorar Cursos
- Rutas Aprendizaje
- Sobre Nosotros
- Ayuda
- Iniciar Sesión
- Registrarse
- Selector Idioma

**Footer:**
- Secciones Plataforma
- Legal
- Recursos
- Redes Sociales
- Copyright

### Navegación Autenticada (General)

**Header:**
- Logo
- Buscador (Futuro)
- Notificaciones (Placeholder)
- Mensajes (Placeholder)
- UserMenu (Perfil, Config, Ayuda, Logout)
- Idioma
- Tema

### Sidebar - Rol Admin (por Dominios)

1. **Dashboard**
   - Visión General (`/app/admin/dashboard`)
   - KPIs clave
   - Resumen de actividad reciente
   - Alertas y notificaciones importantes

2. **Académico (LMS)**
   - Gestión de cursos
   - Contenido Global (Placeholder)
   - Categorías (Placeholder)
   - Rutas de Aprendizaje (Placeholder)
   - Certificados (Placeholder)
   - Analíticas Académicas

3. **Gestión Central (ERP)**
   - Gestión de usuarios
   - Roles y permisos
   - Analíticas de usuarios
   - Comunicación (Placeholder)

4. **Finanzas**
   - Transacciones (Placeholder)
   - Suscripciones (Placeholder)
   - Analíticas Financieras
   - Configuración de pagos (Placeholder)

5. **Sistema (Plataforma)**
   - Configuración General (Ruta Unificada)
   - Diseño (Placeholder)
   - Páginas CMS (Ruta Unificada)
   - Gestión de Features
   - Integraciones (Placeholder)
   - Analíticas de Plataforma (Placeholder)
   - Salud/Logs (Placeholder)

6. **Herramientas Dev (Opcional)**
   - Diagrama de navegación
   - Revisión de elementos (Placeholder)
   - Herramientas de desarrollo
   - Configuraciones avanzadas

**Rutas principales**: `/app/admin/*`  
**Componentes clave**: `AdminDashboard`, `DomainNavigation`, `EntityManagers`

### Sidebar - Rol Instructor (por Workflow)

1. **Dashboard**
   - Panel Instructor (`/app/instructor/dashboard`)
   - Resumen de actividad reciente
   - Métricas de cursos
   - Próximas sesiones
   - Notificaciones importantes

2. **Gestión Académica**
   - Mis Cursos
   - Crear Curso
   - Biblioteca de Contenido (Placeholder)

3. **Participantes**
   - Mis Participantes
   - Progreso/Retroalimentación (Placeholder)
   - Comunicación (Placeholder)

4. **Rendimiento**
   - Analíticas de Cursos (Placeholder)

5. **Cuenta**
   - Mi Perfil
   - Mi Facturación (Placeholder)
   - Configuración

**Rutas principales**: `/app/instructor/*`  
**Componentes clave**: `InstructorDashboard`, `CourseEditor`, `ParticipanteManager`

### Sidebar - Rol Participante (Comunidad Primero)

1. **Dashboard**
   - Mi Panel (`/app/dashboard`)
   - Resumen de actividad
   - Próximas entregas
   - Recomendaciones personalizadas
   - Notificaciones

2. **Comunidad**
   - Feed (Placeholder)
   - Leaderboard (Placeholder)
   - Mensajes (Placeholder)
   - Notificaciones (Placeholder)

3. **Aprendizaje**
   - Mis Cursos
   - Explorar Cursos
   - Rutas de Aprendizaje (Placeholder)
   - Calendario (Placeholder)

4. **Mi Cuenta**
   - Mi Perfil
   - Progreso/Certificados (Placeholder)
   - Facturación/Participaciones (Placeholder)
   - Configuración

5. **Ayuda**
   - Centro de Ayuda (Placeholder)
   - Contactar Soporte (Placeholder)

**Rutas principales**: `/app/*`  
**Componentes clave**: `ParticipanteDashboard`, `CoursePlayer`, `LearningPathViewer`

### Footer Sidebar (Autenticado)

- Selector de Idioma
- Selector de Tema
- Botón de Cierre de Sesión (Logout)
- RoleSwitcher (solo visible para Administradores)

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

