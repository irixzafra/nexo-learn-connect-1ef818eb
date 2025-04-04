
# Funcionalidades Core

## Sistema de Categorías de Cursos

### LMS-COURSE-CATEGORIES-01

**Funcionalidad:** Sistema de categorización de cursos

**Objetivo:** Permitir la organización de cursos en categorías navegables para facilitar la búsqueda y exploración por parte de los usuarios.

**Implementación:**

1. **Estructura de Datos:**
   - Tabla `categories`: Almacena información de categorías (nombre, slug, descripción)
   - Tabla `course_categories`: Relación muchos a muchos entre cursos y categorías

2. **Categorías Principales Implementadas:**
   - Todos (vista general)
   - Másters (programas completos)
   - Programación
   - Negocios
   - Marketing
   - Diseño
   - Idiomas
   - Certificaciones

3. **Componentes de UI:**
   - Selector de categorías con iconos en `CoursesCatalog.tsx`
   - Estado visual para categoría seleccionada
   - Filtrado de cursos basado en la categoría seleccionada

4. **Interacción de Datos:**
   - Filtrado cliente-side de cursos por categoría
   - Preparado para integración futura con filtrado en backend

5. **Aspectos Visuales:**
   - Iconos representativos para cada categoría
   - Diseño responsivo del selector de categorías
   - Transiciones suaves al cambiar entre categorías

**Tablas Relacionadas:**
```sql
-- Definición simplificada de la estructura
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.course_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id),
  category_id UUID NOT NULL REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

**Políticas RLS:**
- Las categorías son de lectura pública
- La administración de categorías está restringida a roles admin/instructor

**Estado:** ✅ Implementado

**Notas:** El sistema está diseñado para escalar con la adición de subcategorías (mediante parent_id) y para soportar operaciones CRUD completas para la gestión de categorías por parte de los administradores.
