
# Documentación de Administración

## Panel de Administración

El Panel de Administración es el centro de control unificado para la gestión de la plataforma. Permite gestionar usuarios, cursos, configuraciones del sistema y monitorizar actividades.

## Estructura de Navegación

La navegación del panel de administración sigue una estructura jerárquica simple de 2 niveles:

1. **Nivel 1**: Categorías principales en la barra lateral
2. **Nivel 2**: Elementos dentro de cada categoría

### Estructura Actual

#### Dashboard
- Visión general del sistema
- Métricas clave
- Accesos rápidos

#### Usuarios
- Lista de Usuarios
- Roles y Permisos

#### Cursos
- Todos los Cursos
- Categorías
- Rutas de Aprendizaje
- Certificados

#### Finanzas
- Facturación
- Suscripciones
- Reportes

#### Páginas
- Gestión de Contenido
- Editor de Páginas

#### Configuración
- General
- Seguridad
- Apariencia
- Características
- Datos y Respaldos

## Implementación Técnica

La navegación administrativa se implementa a través de:

1. **AdminNavigation**: Componente principal de navegación del panel administrativo
2. **ConditionalSidebar**: Determina qué tipo de barra lateral mostrar según la ruta
3. **AdminRoutes**: Define todas las rutas disponibles en el panel administrativo

## Principios de Diseño

1. **Simplicidad**: Máximo de 2 niveles de navegación para evitar complejidad
2. **Contextualidad**: Las tabs aparecen sólo cuando son relevantes para la página actual
3. **Consistencia**: Diseño uniforme en todas las secciones administrativas
4. **Respuesta**: Adaptación a diferentes tamaños de pantalla

## Convenciones de Nomenclatura

Para mantener consistencia, se siguen estas convenciones:

1. Los componentes de administración se encuentran en `src/components/admin/`
2. Las rutas administrativas siguen el patrón `/admin/[categoria]/[accion]`
3. Los archivos de configuración están en `src/config/`

---

Última actualización: 2023-07-01
