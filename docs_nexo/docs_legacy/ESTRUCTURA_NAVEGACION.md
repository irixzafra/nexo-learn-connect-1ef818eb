
# ESTRUCTURA DE NAVEGACIÓN - NEXO LEARNING

Este documento define la estructura de navegación del sistema, facilitando la toma de decisiones sobre dónde ubicar nuevos elementos o modificar los existentes.

## Principios de Navegación

1. **Simplicidad**: Máximo 2 niveles de navegación para evitar la complejidad
2. **Contextualidad**: Elementos de navegación específicos al contexto actual
3. **Consistencia**: Patrones de navegación similares en toda la aplicación
4. **Unificación**: Sistema de navegación único para todos los roles de usuario

## Estructura General

La navegación se compone de un sistema unificado que muestra diferentes elementos según:
1. **El rol del usuario** (estudiante, instructor, administrador, etc.)
2. **La ruta actual** (páginas normales vs. páginas administrativas)

### Flujo de Navegación

1. El componente `ConditionalSidebar` detecta la ruta actual y el rol del usuario
2. Se cargan los elementos de navegación adecuados del directorio `src/config/navigation/`
3. Se filtran los elementos según los permisos del usuario
4. Se muestra la navegación correspondiente manteniendo una experiencia coherente

## Componentes de Navegación

### Barra Lateral (Sidebar)
- **SidebarMainNavigation**: Componente principal que contiene grupos de navegación
- **SidebarNavGroup**: Grupos colapsables de elementos (Mis Cursos, Explorar, etc.)
- **SidebarNavItem**: Elementos individuales de navegación
- **SidebarFooterSection**: Controles de usuario en la parte inferior

### Cabecera (Header)
- **MainHeader**: Barra superior con logo, búsqueda y acciones rápidas
- **Breadcrumbs**: Navegación de ruta actual
- **QuickActions**: Botones de acción rápida (notificaciones, mensajes, etc.)

### Pie de Página (Footer)
- **MainFooter**: Enlaces legales, información de contacto y redes sociales
- **Copyright**: Información legal y de derechos de autor

## Gestión del Estado

- **useSidebarState**: Hook para gestionar el estado de los grupos expandidos/colapsados
- **useValidateRoutes**: Hook para validar y mejorar las rutas de navegación

## Roadmap de Implementación

### Fase 1: Estructura Base ✅
- Sistema de navegación lateral básico
- Filtrado por roles
- Persistencia del estado de expansión

### Fase 2: Mejoras de UX ✅
- Iconos y badges de notificación
- Animaciones de transición
- Adaptación responsive

### Fase 3: Herramientas de Gestión ✅
- Diagrama de navegación
- Documentación de estructura
- Vista de exploración de páginas

### Fase 4: Optimización (En Progreso 🚧)
- Validación de rutas
- Prevención de enlaces rotos
- Mejor adaptación a dispositivos móviles

### Fase 5: Expansión (Planificado ⏳)
- Integración con sistema de permisos avanzado
- Personalización por usuario
- Analíticas de uso de navegación

## Mejores Prácticas

1. **Uso de Configuración Centralizada**: Todos los elementos de navegación deben definirse en `/src/config/navigation/`
2. **Filtrado por Rol**: Utilizar `requiredRole` para mostrar/ocultar elementos según el rol
3. **Enlaces Dinámicos**: Usar funciones para generar rutas con parámetros
4. **Validación de Rutas**: Utilizar `useValidateRoutes` para verificar rutas antes de mostrarlas
5. **Persistencia de Estado**: Aprovechar `useSidebarState` para mantener la experiencia del usuario

## Ubicación de Componentes

```
/src
  /components
    /layout
      /sidebar         # Componentes de la barra lateral
        /navigation    # Elementos específicos de navegación
      /header          # Componentes de la cabecera
      /footer          # Componentes del pie de página
  /config
    /navigation        # Configuración de menús por sección
  /hooks               # Hooks de navegación (useSidebarState, etc.)
```

## Próximos Pasos

1. Mejorar la validación de rutas para evitar enlaces rotos
2. Implementar sistema de breadcrumbs contextuales
3. Añadir capacidades de personalización de navegación por usuario
4. Desarrollar menú de favoritos personalizable
5. Integrar análisis de uso para optimizar la navegación

---

Última actualización: Julio 2024
