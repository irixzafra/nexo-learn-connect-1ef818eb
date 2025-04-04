
# Sistema de Cursos

## Visión General

El sistema de cursos de Nexo Learning proporciona una plataforma completa para la creación, gestión y consumo de contenido educativo estructurado.

## Características Principales

### Para Estudiantes

- Exploración de catálogo de cursos con filtrado avanzado
- Visualización de contenido multimedia (video, audio, documentos)
- Seguimiento de progreso personalizado
- Sistema de notas y marcadores
- Certificaciones al completar cursos

### Para Instructores

- Editor avanzado de lecciones con formato enriquecido
- Herramientas de organización de contenido (módulos, lecciones, quizzes)
- Analíticas de progreso de estudiantes
- Gestión de preguntas y comentarios
- Configuración de requisitos y prerrequisitos

### Para Administradores

- Panel de control de cursos con métricas clave
- Herramientas de moderación de contenido
- Configuración global de precios y promociones
- Gestión de categorías y etiquetas
- Reportes de actividad y progreso

## Componentes del Sistema

### Catálogo de Cursos

El catálogo proporciona una interfaz intuitiva para explorar los cursos disponibles, con filtros por categoría, nivel, instructor y más.

### Editor de Lecciones

El editor de lecciones permite a los instructores crear contenido enriquecido con:

- Formato de texto avanzado
- Inserción de medios (imágenes, videos, audio)
- Componentes interactivos (quizzes, polls)
- Código con resaltado de sintaxis
- Archivos adjuntos descargables

### Sistema de Aprendizaje

La experiencia de aprendizaje incluye:

- Navegación intuitiva entre lecciones
- Reproducción de contenido multimedia optimizada
- Controles de progreso y marcadores
- Toma de notas integrada
- Modo sin conexión para contenido descargado

## Implementación Técnica

El sistema de cursos se implementa a través de los siguientes componentes técnicos:

- Base de datos: Tablas `courses`, `lessons`, `modules`, `enrollments`
- Frontend: Componentes React con TailwindCSS
- Backend: APIs REST y Row Level Security en Supabase
- Media: Almacenamiento en Supabase Storage con CDN

## Documentación Relacionada

- [Sistema de Navegación](../navigation.md)
- [Modelo de Datos](../../core/data-model/overview.md)
- [Guías para Instructores](../../guides/admin/course-management.md)

---

Última actualización: 2025-04-04
