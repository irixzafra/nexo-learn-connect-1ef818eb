
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING

Este documento define la estructura actual de navegación del sistema, facilitando la toma de decisiones sobre dónde ubicar nuevos elementos o cómo modificar los existentes.

## Principios de Navegación

1. **Simplicidad**: Máximo 2 niveles de navegación para evitar la complejidad
2. **Contextualidad**: Elementos de navegación específicos al contexto actual
3. **Consistencia**: Patrones de navegación similares en toda la aplicación
4. **Respuesta**: Adaptabilidad a diferentes tamaños de pantalla

## Estructura General

La navegación se compone de:

1. **Navegación General** - Para usuarios regulares (estudiantes, instructores)
2. **Navegación Administrativa** - Específica para administradores y páginas de administración

### Navegación General

**Nivel 1: Categorías principales**
- Dashboard
- Mis Cursos
- Explorar
- Comunidad
- Configuración
- Ayuda

**Nivel 2: Subcategorías**
- Ejemplo: Mis Cursos > En Progreso, Completados, Favoritos

### Navegación Administrativa

**Nivel 1: Módulos administrativos**
- Dashboard
- Usuarios
- Cursos
- Finanzas
- Contenido
- Configuración
- Sistema

**Nivel 2: Subcategorías administrativas**
- Ejemplo: Usuarios > Lista, Roles, Permisos

## Componentes Clave

- **AdminPageLayout**: Layout principal para páginas administrativas
- **AdminTabs**: Componente para navegación contextual
- **ConditionalSidebar**: Determina qué navegación mostrar según la ruta

## Arquitectura de Archivos

La estructura de navegación se gestiona en:

```
/src
  /config
    /navigation        # Configuración centralizada de navegación
  /components
    /layout            # Componentes estructurales
    /admin             # Componentes administrativos
    /navigation        # Componentes de navegación general
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

Documento actualizado: 2023-07-01
