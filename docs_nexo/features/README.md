
# Documentación de Módulos (Features)

Este directorio contiene la documentación detallada de cada módulo funcional (feature) de Nexo Learning.

## Estructura del Directorio

Cada módulo tiene su propio subdirectorio con documentación detallada:

- [📊 Admin](admin/README.md): Panel de administración
- [🔐 Authentication](authentication/README.md): Sistema de autenticación
- [📚 Courses](courses/README.md): Gestión de cursos
- [👥 Users](users/README.md): Gestión de usuarios
- [📃 Pages](pages/README.md): Sistema de páginas
- [💬 Community](community/README.md): Funcionalidades de comunidad
- [🧭 Navigation](navigation/README.md): Sistema de navegación y enlaces

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

## Sistema de Navegación

El sistema de navegación de Nexo Learning está compuesto por varios componentes interrelacionados:

- **Rutas**: Definidas centralmente en `routeUtils.ts`
- **Enlaces**: Componentes como `SafeLink`, `NavigationLink` y `LocalizedLink`
- **Validación**: Utilidades para validar y monitorear enlaces
- **Redirección**: Sistema para gestionar redirecciones y URLs obsoletas

### Estado Actual de Navegación

- ✅ **Sistema de rutas centralizadas**: Implementado a través de `routeMap`
- ✅ **Componentes de enlace seguros**: Implementados (`SafeLink`, etc.)
- 🚧 **Validación de rutas**: En desarrollo, parcialmente funcional
- 🚧 **Monitoreo de enlaces rotos**: Herramientas básicas implementadas
- ⏱️ **Sistema de redirecciones**: Pendiente
- ⏱️ **Breadcrumbs dinámicos**: Pendiente

## Cómo Contribuir

Para actualizar la documentación de un módulo:

1. Navega al directorio del módulo correspondiente
2. Edita el archivo README.md
3. Para cambios importantes, crea un PR explicando los cambios

---

**Nota**: Esta documentación debe mantenerse actualizada junto con el código. Cualquier cambio significativo en un módulo debe reflejarse en su documentación.

