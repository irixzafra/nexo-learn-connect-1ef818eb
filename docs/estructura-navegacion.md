
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

## Componentes Clave

- **ConditionalSidebar**: Determina qué navegación mostrar basado en la ruta actual
- **SidebarMainNavigation**: Componente base de navegación utilizado por todos los usuarios
- **AdminNavigation**: Utilizado exclusivamente en secciones administrativas
- **SidebarFooterSection**: Controles de usuario en la parte inferior de la barra lateral

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

## Estructura Específica por Rol

### Estudiante (student)
- Inicio (Dashboard, Notificaciones)
- Mis Cursos (En Progreso, Completados)
- Comunidad (Foros, Mensajes)
- Explorar (Catálogo, Rutas de Aprendizaje)
- Configuración (General, Seguridad, Notificaciones)

### Instructor
- Todo lo de estudiante
- Profesor (Mis Cursos, Estudiantes)

### Administrador
- Todo lo anterior
- Gestión Académica (Cursos, Usuarios, Certificaciones)
- Finanzas (Transacciones, Informes, Facturación)
- Configuración (opciones extendidas)

## Adaptación Móvil

En dispositivos móviles:
- La barra lateral se colapsa automáticamente
- Se muestra un menú inferior para navegación principal
- Se ajustan los componentes para optimizar el espacio

## Mejores Prácticas para Desarrollo

1. Usar siempre componentes existentes de navegación
2. Añadir nuevos elementos en el nivel apropiado
3. Mantener la consistencia visual
4. Considerar la experiencia en dispositivos móviles
5. Documentar cambios significativos en este documento

## Documentación Relacionada

- [Documentación de Administración](./admin/administracion.md)
- [Arquitectura de Componentes](./architecture/components.md)

---

Última actualización: Julio 2024
