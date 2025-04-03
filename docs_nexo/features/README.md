
# Documentación de Módulos (Features)

Este directorio contiene la documentación detallada de cada módulo funcional (feature) de Nexo Learning.

## Estructura del Directorio

Cada módulo tiene su propio subdirectorio con documentación detallada:

- [📊 Admin](admin/README.md): Panel de administración organizado por dominios funcionales
- [👨‍🏫 Instructor](instructor/README.md): Sistema para instructores organizado por flujo de trabajo
- [🔐 Authentication](authentication/README.md): Sistema de autenticación
- [📚 Courses](courses/README.md): Gestión de cursos
- [👥 Users](users/README.md): Gestión de usuarios
- [📃 Pages](pages/README.md): Sistema de páginas
- [💬 Community](community/README.md): Funcionalidades de comunidad

## Estructura de Navegación por Roles

### Admin (Organizado por Dominios Funcionales)
- **Panel Principal**: Visión ejecutiva y KPIs
- **Académico (LMS)**: Gestión de cursos, contenido y certificaciones
- **Personas (CRM)**: Gestión de usuarios, roles y comunicaciones
- **Finanzas**: Pagos, facturación y suscripciones
- **Analíticas/Reportes**: Dashboards e informes personalizados
- **Plataforma (Sistema)**: Configuración, diseño e integraciones
- **Herramientas Técnicas**: Funcionalidades avanzadas para administradores técnicos

### Instructor (Organizado por Flujo de Trabajo)
- **Panel Principal**: Vista general y actividad reciente
- **Mis Cursos**: Creación y gestión de contenido educativo
- **Mis Estudiantes**: Seguimiento y comunicación con estudiantes
- **Analíticas**: Estadísticas de cursos y estudiantes
- **Recursos**: Materiales y herramientas didácticas
- **Perfil**: Información profesional y configuración

### Estudiante
- **Dashboard**: Panel personalizado de aprendizaje
- **Aprendizaje**: Cursos, rutas, calendario, recursos
- **Comunidad**: Mensajes, foros, notificaciones
- **Perfil**: Configuración personal y certificados

### Usuario no Autenticado
- **Exploración**: Home, cursos, rutas de aprendizaje
- **Información**: Sobre nosotros, ayuda, contacto
- **Legal**: Términos, privacidad, cookies
- **Autenticación**: Login, registro, recuperación

## Convenciones de Documentación

Para cada módulo, documentamos:

- **Propósito y Alcance**: Qué hace el módulo y sus límites
- **Componentes Clave**: Componentes React principales
- **Hooks Personalizados**: Hooks específicos del módulo
- **Tipos de Datos**: Interfaces y tipos TypeScript
- **API y Endpoints**: Interacciones con el backend
- **Rutas**: Rutas asociadas al módulo
- **Estado Actual**: Estado de desarrollo

## Cómo Usar esta Documentación

- **Desarrolladores**: Usa esta documentación para entender el funcionamiento interno de cada módulo
- **Diseñadores**: Revisa los componentes disponibles y sus variantes
- **QA**: Usa esta documentación para verificar la conformidad con los requisitos

## Cómo Contribuir

Para actualizar la documentación de un módulo:

1. Navega al directorio del módulo correspondiente
2. Edita el archivo README.md
3. Para cambios importantes, crea un PR explicando los cambios

---

**Nota**: Esta documentación debe mantenerse actualizada junto con el código. Cualquier cambio significativo en un módulo debe reflejarse en su documentación.
