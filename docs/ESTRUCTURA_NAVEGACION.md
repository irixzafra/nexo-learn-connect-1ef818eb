
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING

Este documento define la estructura actual de navegación del sistema, facilitando la toma de decisiones sobre dónde ubicar nuevos elementos o cómo modificar los existentes.

## Principios de Navegación

1. **Simplicidad**: Máximo 2 niveles de navegación para evitar la complejidad
2. **Contextualidad**: Elementos de navegación específicos al contexto actual
3. **Consistencia**: Patrones de navegación similares en toda la aplicación
4. **Respuesta**: Adaptabilidad a diferentes tamaños de pantalla

## Estructura General

La navegación se compone de un sistema unificado que muestra diferentes elementos según:
1. **El rol del usuario** (estudiante, instructor, administrador, etc.)
2. **La ruta actual** (páginas normales vs. páginas administrativas)

### Flujo de Navegación

1. El componente `ConditionalSidebar` detecta la ruta actual y el rol del usuario
2. Se cargan los elementos de navegación adecuados del directorio `src/config/navigation/`
3. Se filtran los elementos según los permisos del usuario
4. Se muestra la navegación correspondiente manteniendo una experiencia coherente

### Filtrado por Rol

Los usuarios ven únicamente los elementos de navegación para los que tienen permisos:

- **Estudiantes**: Dashboard, Mis Cursos, Comunidad, Explorar, Configuración básica
- **Instructores**: Todo lo anterior + Sección de profesor
- **Administradores**: Todo lo anterior + Secciones administrativas

## Componentes Clave

- **SidebarNavigation**: Componente base de navegación utilizado por todos los usuarios
- **ConditionalSidebar**: Determina qué elementos mostrar según el contexto
- **AdminTabs**: Componente para navegación contextual dentro de páginas administrativas

## Arquitectura de Archivos

La estructura de navegación se gestiona en:

```
/src
  /config
    /navigation        # Configuración centralizada de navegación
  /components
    /layout            # Componentes estructurales
    /navigation        # Componentes de navegación
  /layouts             # Layouts principales
  /routes              # Definición de rutas
```

## Adaptación Móvil

En dispositivos móviles:
- La barra lateral se colapsa automáticamente
- Se muestra un menú inferior para navegación principal
- Se ajustan los componentes para optimizar el espacio

## Navegación Contextual

Además de la navegación principal, existen elementos contextuales:
- Pestañas dentro de páginas específicas
- Breadcrumbs para ubicación
- Menús de acciones contextuales

## Mejores Prácticas

1. Usar siempre los componentes de navegación existentes
2. Agregar nuevos elementos en el nivel apropiado
3. Mantener la consistencia visual
4. Considerar la experiencia en dispositivos móviles
5. Documentar cualquier cambio significativo

---

Documento actualizado: 2024-07-15

