
# Documentación de Administración

## Panel de Administración

El Panel de Administración es el centro de control unificado para la gestión de la plataforma. Permite gestionar usuarios, cursos, configuraciones del sistema y monitorizar actividades.

## Estructura de Navegación

La navegación del sistema sigue una estructura jerárquica simple y unificada para todos los usuarios:

1. **Nivel 1**: Categorías principales en la barra lateral
2. **Nivel 2**: Elementos dentro de cada categoría

Lo que cambia según el rol del usuario es **qué elementos** puede ver, no el **componente** que se utiliza para mostrarlos.

### Estructura Actual

El sistema muestra diferentes secciones de navegación según el rol del usuario, pero utilizando los mismos componentes:

#### Estudiantes
- Dashboard
- Mis Cursos
- Comunidad
- Explorar
- Configuración

#### Instructores
- Todo lo anterior
- Sección de Profesor (Mis Cursos Creados, Estudiantes)

#### Administradores
- Todo lo anterior
- Dashboard Administrativo
- Usuarios y Roles
- Cursos y Categorías
- Finanzas
- Páginas
- Configuración del Sistema
- Datos y Respaldos

## Implementación Técnica

La navegación se implementa a través de:

1. **ConditionalSidebar**: Componente único que determina qué elementos mostrar según la ruta y el rol del usuario
2. **SidebarNavigation**: Componente base de navegación utilizado por todos los usuarios
3. **Filtrado por rol**: Los elementos se filtran automáticamente según el rol del usuario

## Principios de Diseño

1. **Simplicidad**: Máximo de 2 niveles de navegación para evitar complejidad
2. **Contextualidad**: Las tabs aparecen sólo cuando son relevantes para la página actual
3. **Consistencia**: Diseño uniforme en todas las secciones
4. **Respuesta**: Adaptación a diferentes tamaños de pantalla

## Convenciones de Nomenclatura

Para mantener consistencia, se siguen estas convenciones:

1. Los componentes de navegación se encuentran en `src/components/layout/`
2. La configuración de navegación está centralizada en `src/config/navigation/`
3. Las rutas administrativas siguen el patrón `/admin/[categoria]/[accion]`

---

Última actualización: 2024-07-15

