
# Módulo de Páginas

## Visión General

El módulo de páginas gestiona el contenido estático y dinámico de la plataforma, incluyendo páginas informativas, blog, documentación y contenido de marketing. Proporciona un sistema flexible para crear y editar páginas sin necesidad de código.

## Componentes Principales

### Páginas

- **PageView**: Visualizador de página dinámica
- **PagesList**: Listado administrativo de páginas
- **PageEditor**: Editor visual para páginas
- **BlogList**: Listado de artículos de blog
- **BlogPost**: Visualizador de un artículo de blog

### Componentes UI

- **PageContent**: Renderizador de contenido estructurado
- **PageBlocks**: Bloques de contenido reutilizables
- **PageSidebar**: Navegación contextual para páginas
- **RichTextEditor**: Editor WYSIWYG para contenido
- **PageLayoutSelector**: Selector de plantillas de página

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/pages/:slug` | PageView | Visualizador de página dinámica |
| `/admin/pages` | PagesList | Gestión administrativa de páginas |
| `/admin/pages/create` | PageEditor | Creación de nueva página |
| `/admin/pages/:id/edit` | PageEditor | Edición de página existente |
| `/blog` | BlogList | Listado de artículos de blog |
| `/blog/:slug` | BlogPost | Artículo de blog específico |

## Hooks Personalizados

- **usePage**: Obtención y renderizado de página
- **usePageEditor**: Lógica para edición de páginas
- **usePageBlocks**: Gestión de bloques de contenido
- **useBlog**: Funcionalidades específicas para blog
- **usePageMetadata**: Gestión de SEO y metadatos

## Modelo de Datos

El módulo trabaja principalmente con estas tablas:

- `site_pages`: Páginas del sitio
- `site_page_revisions`: Historial de revisiones
- `page_templates`: Plantillas disponibles
- `page_categories`: Categorización de páginas

## Flujos de Trabajo Principales

### Visualización de Página

1. Usuario accede a URL de página
2. Sistema resuelve slug a ID de página
3. Carga del contenido y metadatos
4. Renderizado según layout seleccionado
5. Tracking de visualización (opcional)

### Creación/Edición de Página

1. Administrador selecciona crear página o editar existente
2. Configuración de metadatos y settings
3. Edición de contenido por bloques
4. Previsualización de cambios
5. Guardado (crea nueva revisión)
6. Publicación o guardado como borrador

### Gestión de Blog

1. Creación de artículos con formato específico
2. Categorización y etiquetado
3. Programación de publicación
4. Gestión de comentarios (opcional)
5. Analíticas de lectura

## Estado Actual

- ✅ Estructura base implementada
- ✅ Visualizador básico de páginas funcional
- 🔄 Editor de páginas en desarrollo
- 🔄 Sistema de revisiones en implementación
- ⏱️ Blog pendiente
- ⏱️ Analíticas avanzadas pendientes

## API y Funciones

### Consultas Principales

- **getPageBySlug**: Obtiene página por su slug
- **getPageById**: Obtiene página por su ID
- **getPageRevisions**: Obtiene historial de revisiones
- **getPages**: Obtiene listado de páginas con filtros

### Mutaciones

- **createPage**: Crea una nueva página
- **updatePage**: Actualiza contenido de página existente
- **publishPage**: Cambia estado a publicado
- **unpublishPage**: Cambia estado a borrador
- **deletePage**: Elimina página (o marca como eliminada)

## Consideraciones para SEO

- Generación de metadatos optimizados
- URLs amigables configurables
- Soporte para Open Graph y Twitter Cards
- Campos para description y keywords
- Generación de sitemap

## Próximas Mejoras

- Sistema avanzado de blogs
- Comentarios en artículos
- Plantillas personalizables
- Editor visual mejorado con más bloques
- Integración con redes sociales
- Programación de publicaciones
- Estadísticas detalladas de visualizaciones
