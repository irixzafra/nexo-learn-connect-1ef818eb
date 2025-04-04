
# Módulo de Cursos

Este módulo es el núcleo de la plataforma educativa, proporcionando todas las funcionalidades relacionadas con la creación, gestión, visualización y participación en cursos educativos.

## Descripción Funcional

El módulo de cursos permite a instructores crear y gestionar contenido educativo estructurado, y a estudiantes descubrir, inscribirse y participar en estos cursos. Las principales capacidades incluyen:

- Catálogo de cursos con búsqueda y filtros
- Creación y edición de cursos con estructura modular
- Landing pages públicas para promoción de cursos
- Sistema de inscripción y seguimiento de progreso
- Evaluación mediante quizzes y asignaciones
- Certificados de finalización

## Administración de Cursos

### Panel de Administración
- Visión completa del catálogo con información detallada
- Filtros por estado (publicados, borradores, etc.)
- Estadísticas de desempeño y matriculación
- Herramientas de gestión masiva

### Operaciones Administrativas
- Creación y edición de metadatos del curso
- Estructuración de contenido (módulos, lecciones)
- Control de publicación y visibilidad
- Asignación y cambio de instructores
- Matriculación manual de estudiantes

### Flujo de Trabajo del Instructor
1. Creación del curso y metadatos básicos
2. Diseño de la estructura de módulos y lecciones
3. Creación de contenido educativo
4. Configuración de evaluaciones
5. Revisión y publicación

## Landing Pages Públicas

### Elementos Principales
- Hero section con título, descripción y CTA
- Información del instructor
- Detalles del curso (duración, nivel, requisitos)
- Tabla de contenidos y estructura
- Testimonios y valoraciones
- Sección FAQ
- Botón de inscripción/compra

### Optimización SEO
- Generación automática de URLs amigables (slugs)
- Metadatos personalizables (title, description)
- Estructura de datos schema.org para cursos
- Imágenes optimizadas con tags alt

## Generación de Slugs

Los slugs se generan automáticamente a partir del título del curso mediante una función SQL que:

1. Convierte el texto a minúsculas
2. Elimina caracteres especiales y acentos
3. Reemplaza espacios por guiones
4. Asegura unicidad añadiendo un sufijo numérico si es necesario

```sql
-- Ejemplo simplificado de la función de slugify
CREATE OR REPLACE FUNCTION slugify(text) RETURNS text AS $$
  SELECT lower(
    regexp_replace(
      regexp_replace(
        regexp_replace($1, '[^\w\s-]', '', 'g'),
        '\s+', '-', 'g'),
      '-+', '-', 'g')
  );
$$ LANGUAGE sql STRICT IMMUTABLE;
```

## Esquema BD Relevante

### Tablas Principales

#### Courses
```
id UUID PRIMARY KEY
title TEXT NOT NULL
description TEXT
instructor_id UUID REFERENCES profiles(id)
price NUMERIC DEFAULT 0
is_published BOOLEAN DEFAULT false
slug TEXT UNIQUE
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

#### Modules
```
id UUID PRIMARY KEY
course_id UUID REFERENCES courses(id)
title TEXT NOT NULL
module_order INTEGER DEFAULT 0
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

#### Lessons
```
id UUID PRIMARY KEY
module_id UUID REFERENCES modules(id)
course_id UUID REFERENCES courses(id)
title TEXT NOT NULL
content_text JSONB
content_video_url TEXT
lesson_order INTEGER DEFAULT 0
is_previewable BOOLEAN DEFAULT false
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

#### Enrollments
```
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
course_id UUID REFERENCES courses(id)
enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

#### Lesson_Progress
```
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
lesson_id UUID REFERENCES lessons(id)
course_id UUID REFERENCES courses(id)
is_completed BOOLEAN DEFAULT false
last_position NUMERIC DEFAULT 0
completion_date TIMESTAMP WITH TIME ZONE
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

## Funciones RPC/API

### Gestión de Cursos
- `get_course_details(course_id)`: Obtiene detalles completos de un curso
- `get_course_structure(course_id)`: Obtiene la estructura de módulos y lecciones
- `get_course_by_slug(slug)`: Busca un curso por su slug

### Progreso del Estudiante
- `calculate_course_progress(course_id, user_id)`: Calcula el porcentaje de progreso
- `mark_lesson_completed(lesson_id, user_id)`: Marca una lección como completada
- `get_user_enrollments(user_id)`: Obtiene todos los cursos en que está matriculado

### Estadísticas
- `get_course_enrollment_stats(course_id)`: Obtiene estadísticas de matriculación
- `get_course_completion_rate(course_id)`: Calcula tasa de finalización del curso
