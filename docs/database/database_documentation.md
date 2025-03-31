
# Documentación de la Base de Datos - Nexo Learning Platform

## Visión General

Nexo Learning utiliza PostgreSQL a través de Supabase como su sistema de gestión de base de datos principal. La estructura está diseñada siguiendo principios de normalización, con un enfoque en rendimiento, seguridad y escalabilidad.

## Esquema de la Base de Datos

### Diagrama Entidad-Relación

El siguiente diagrama muestra las entidades principales y sus relaciones:

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ profiles      │       │ enrollments   │       │ courses       │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │◄──────┤ user_id       │       │ id            │
│ full_name     │       │ course_id     │───────┤ title         │
│ role          │       │ enrolled_at   │       │ description   │
│ email         │       └───────────────┘       │ instructor_id │◄─┐
└───────────────┘                               │ price         │  │
       ▲                                        │ is_published  │  │
       │                                        └───────────────┘  │
       │                                                │          │
       │                                                │          │
       │                                                ▼          │
       │                                        ┌───────────────┐  │
       │                                        │ modules       │  │
       │                                        ├───────────────┤  │
       │                                        │ id            │  │
       │                                        │ course_id     │  │
       │                                        │ title         │  │
       │                                        └───────────────┘  │
       │                                                │          │
       │                                                │          │
       │                                                ▼          │
       │                                        ┌───────────────┐  │
       │                                        │ lessons       │  │
       │                                        ├───────────────┤  │
       │                                        │ id            │  │
       │                                        │ module_id     │  │
       │                                        │ title         │  │
       │                                        │ content_type  │  │
       │                                        └───────────────┘  │
       │                                                │          │
       │                                                │          │
┌───────────────┐                              ┌───────▼───────┐  │
│ user_roles    │                              │ lesson_progress│  │
├───────────────┤                              ├───────────────┤  │
│ id            │                              │ id            │  │
│ user_id       │◄─────────────────────────────┤ user_id       │  │
│ role_id       │                              │ lesson_id     │  │
└───────────────┘                              │ is_completed  │  │
       │                                        └───────────────┘  │
       ▼                                                           │
┌───────────────┐                                                  │
│ roles         │                                                  │
├───────────────┤                                                  │
│ id            │                                                  │
│ name          │                                                  │
│ description   │                                                  │
└───────────────┘                                                  │
                                                                   │
┌───────────────┐                                                  │
│ payments      │                                                  │
├───────────────┤                                                  │
│ id            │                                                  │
│ user_id       │◄──────────────────────────────────────────────┐ │
│ course_id     │                                               │ │
│ amount        │                                               │ │
│ status        │                                               │ │
└───────────────┘                                               │ │
                                                                │ │
┌───────────────┐                                               │ │
│ notifications │                                               │ │
├───────────────┤                                               │ │
│ id            │                                               │ │
│ user_id       │◄──────────────────────────────────────────┐  │ │
│ title         │                                           │  │ │
│ content       │                                           │  │ │
│ is_read       │                                           │  │ │
└───────────────┘                                           │  │ │
                                                            │  │ │
┌───────────────┐                                           │  │ │
│ profiles      │◄───────────────────────────────────────┐  │  │ │
├───────────────┤                                        │  │  │ │
│ id            │                                        │  │  │ │
│ full_name     │                                        │  │  │ │
│ role          │                                        │  │  │ │
└───────────────┘                                        │  │  │ │
                                                         │  │  │ │
                                                         │  │  │ │
                                                         │  │  │ │
┌───────────────┐       ┌───────────────┐               │  │  │ │
│ auth.users    │       │ profiles      │               │  │  │ │
├───────────────┤       ├───────────────┤               │  │  │ │
│ id            │───────┤ id            │───────────────┘  │  │ │
│ email         │       │ user_id       │                  │  │ │
│ password      │       │ full_name     │──────────────────┘  │ │
└───────────────┘       └───────────────┘                     │ │
                                                              │ │
                                                              │ │
                                                              │ │
                                                              │ │
auth.users.id ──────────────────────────────────────────────────┘
```

### Tablas Principales

#### auth.users
Tabla gestionada por Supabase Auth que almacena credenciales de usuario.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único del usuario (PK) |
| email | text | Email único del usuario |
| encrypted_password | text | Contraseña encriptada |
| confirmed_at | timestamp | Momento de confirmación de email |
| last_sign_in_at | timestamp | Último inicio de sesión |

#### profiles
Extensión de información de usuario visible en la aplicación.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único (FK a auth.users.id) |
| full_name | text | Nombre completo del usuario |
| role | text | Rol principal del usuario |
| email | text | Email del usuario (para acceso rápido) |
| phone | text | Número telefónico (opcional) |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Fecha de última actualización |

#### courses
Cursos disponibles en la plataforma.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único (PK) |
| title | text | Título del curso |
| description | text | Descripción detallada |
| instructor_id | uuid | ID del creador (FK a profiles.id) |
| price | numeric | Precio del curso |
| currency | text | Moneda (eur, usd, etc.) |
| is_published | boolean | Estado de publicación |
| cover_image_url | text | URL de imagen de portada |
| slug | text | Slug para URL amigable |
| level | text | Nivel de dificultad |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Fecha de última actualización |

#### modules
Módulos dentro de un curso.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único (PK) |
| course_id | uuid | Curso al que pertenece (FK) |
| title | text | Título del módulo |
| module_order | integer | Orden de visualización |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Fecha de última actualización |

#### lessons
Lecciones individuales dentro de módulos.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único (PK) |
| module_id | uuid | Módulo al que pertenece (FK) |
| course_id | uuid | Curso al que pertenece (FK) |
| title | text | Título de la lección |
| content_type | text | Tipo de contenido (texto/video) |
| content_text | jsonb | Contenido en formato estructurado |
| content_video_url | text | URL de video (si aplica) |
| lesson_order | integer | Orden de visualización |
| is_previewable | boolean | Si es visible sin inscripción |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Fecha de última actualización |

#### enrollments
Inscripciones de usuarios a cursos.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único (PK) |
| user_id | uuid | Usuario inscrito (FK) |
| course_id | uuid | Curso al que se inscribe (FK) |
| enrolled_at | timestamp | Fecha de inscripción |

#### lesson_progress
Seguimiento del progreso en lecciones.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único (PK) |
| user_id | uuid | Usuario (FK) |
| lesson_id | uuid | Lección (FK) |
| course_id | uuid | Curso (FK) |
| is_completed | boolean | Estado de completitud |
| completion_date | timestamp | Fecha de finalización |
| last_position | numeric | Posición de lectura/video |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Fecha de actualización |

#### payments
Registro de transacciones de pago.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único (PK) |
| user_id | uuid | Usuario que realiza pago (FK) |
| course_id | uuid | Curso adquirido (FK, opcional) |
| amount | numeric | Monto de la transacción |
| currency | text | Moneda del pago |
| status | text | Estado (pending/succeeded/failed) |
| stripe_charge_id | text | ID de referencia en Stripe |
| created_at | timestamp | Fecha de la transacción |

## Seguridad de la Base de Datos

### Row Level Security (RLS)

Implementamos políticas RLS para limitar el acceso a los datos basado en la identidad del usuario:

#### Políticas para profiles

```sql
-- Usuarios pueden ver sus propios perfiles
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Usuarios pueden actualizar sus propios perfiles
CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Administradores pueden ver todos los perfiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (public.get_user_role(auth.uid()) = 'admin');
```

#### Políticas para courses

```sql
-- Cualquiera puede ver cursos publicados
CREATE POLICY "Anyone can view published courses" 
  ON public.courses 
  FOR SELECT 
  USING (is_published = true);

-- Instructores pueden gestionar sus propios cursos
CREATE POLICY "Instructors can manage own courses" 
  ON public.courses 
  FOR ALL 
  USING (instructor_id = auth.uid());

-- Administradores pueden gestionar todos los cursos
CREATE POLICY "Admins can manage all courses" 
  ON public.courses 
  FOR ALL 
  USING (public.get_user_role(auth.uid()) = 'admin');
```

#### Políticas para enrollments

```sql
-- Usuarios pueden ver sus propias inscripciones
CREATE POLICY "Users can view own enrollments" 
  ON public.enrollments 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Instructores pueden ver inscripciones a sus cursos
CREATE POLICY "Instructors can view enrollments to their courses" 
  ON public.enrollments 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.courses 
    WHERE courses.id = enrollments.course_id 
    AND courses.instructor_id = auth.uid()
  ));
```

### Funciones de Seguridad

```sql
-- Función para obtener el rol de un usuario
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Función para verificar si un usuario tiene acceso a un curso
CREATE OR REPLACE FUNCTION public.has_course_access(course_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    -- Admin siempre tiene acceso
    (SELECT public.get_user_role(auth.uid()) = 'admin')
    OR 
    -- Instructor del curso
    EXISTS (
      SELECT 1 FROM courses 
      WHERE id = course_id AND instructor_id = auth.uid()
    )
    OR 
    -- Usuario inscrito
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE course_id = course_id AND user_id = auth.uid()
    )
  );
END;
$$;
```

## Índices y Optimización

### Índices Implementados

| Tabla | Columna(s) | Tipo | Propósito |
|-------|-----------|------|-----------|
| profiles | role | btree | Filtrado por rol de usuario |
| courses | instructor_id | btree | Búsqueda de cursos por instructor |
| courses | is_published | btree | Filtrado de cursos publicados |
| courses | slug | unique | Acceso rápido por URL |
| enrollments | user_id, course_id | btree | Verificación de inscripción |
| lesson_progress | user_id, lesson_id | btree | Consulta de progreso |
| payments | user_id | btree | Historial de pagos por usuario |
| payments | status | btree | Filtrado por estado de pago |

### Estrategias de Optimización

1. **Consultas Eficientes**
   - Uso de JOINs optimizados
   - Selección de columnas específicas
   - Límites y paginación para grandes conjuntos

2. **Denormalización Estratégica**
   - Duplicación calculada para acceso rápido
   - Ejemplo: `course_id` en `lessons` para evitar joins

3. **Particionamiento**
   - Particionamiento por tiempo para tablas históricas
   - División de tablas grandes por criterios lógicos

4. **Materialized Views**
   - Vistas materializadas para reportes complejos
   - Actualización programada para datos frescos

### Ejemplos de Consultas Optimizadas

```sql
-- Obtener progreso del estudiante en un curso
CREATE OR REPLACE FUNCTION public.calculate_course_progress(
  p_course_id UUID, 
  p_user_id UUID
)
RETURNS NUMERIC 
LANGUAGE plpgsql
AS $$
DECLARE
  total_lessons INT;
  completed_lessons INT;
  progress NUMERIC;
BEGIN
  -- Usar índices en estas consultas
  SELECT COUNT(*) INTO total_lessons 
  FROM public.lessons 
  WHERE course_id = p_course_id;
  
  SELECT COUNT(*) INTO completed_lessons 
  FROM public.lesson_progress 
  WHERE course_id = p_course_id 
    AND user_id = p_user_id 
    AND is_completed = true;
  
  IF total_lessons > 0 THEN
    progress := (completed_lessons::NUMERIC / total_lessons::NUMERIC) * 100;
  ELSE
    progress := 0;
  END IF;
  
  RETURN progress;
END;
$$;
```

## Integridad de Datos

### Constraints

1. **Primary Keys**
   - Todas las tablas tienen identificador UUID único
   - Generación automática con `gen_random_uuid()`

2. **Foreign Keys**
   - Relaciones definidas con `REFERENCES`
   - Comportamiento en cascada donde apropiado
   ```sql
   ALTER TABLE public.enrollments
     ADD CONSTRAINT fk_enrollments_user
     FOREIGN KEY (user_id) REFERENCES auth.users(id)
     ON DELETE CASCADE;
   ```

3. **Unique Constraints**
   - Valores que deben ser únicos
   ```sql
   ALTER TABLE public.courses
     ADD CONSTRAINT unique_course_slug
     UNIQUE (slug);
   ```

4. **Check Constraints**
   - Validación de datos
   ```sql
   ALTER TABLE public.payments
     ADD CONSTRAINT check_positive_amount
     CHECK (amount > 0);
   ```

### Triggers y Funciones

1. **Actualización de Timestamps**
   ```sql
   CREATE OR REPLACE FUNCTION public.handle_updated_at()
   RETURNS TRIGGER
   LANGUAGE plpgsql
   AS $$
   BEGIN
     NEW.updated_at = now();
     RETURN NEW;
   END;
   $$;
   
   CREATE TRIGGER set_updated_at
     BEFORE UPDATE ON public.courses
     FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
   ```

2. **Generación Automática de Slugs**
   ```sql
   CREATE OR REPLACE FUNCTION public.set_course_slug()
   RETURNS TRIGGER
   LANGUAGE plpgsql
   AS $$
   DECLARE
     base_slug TEXT;
     new_slug TEXT;
     counter INTEGER := 1;
     slug_exists BOOLEAN;
   BEGIN
     base_slug := public.slugify(NEW.title);
     new_slug := base_slug;
     
     LOOP
       SELECT EXISTS(
         SELECT 1 FROM public.courses WHERE slug = new_slug AND id != NEW.id
       ) INTO slug_exists;
       
       IF NOT slug_exists THEN
         EXIT;
       END IF;
       
       counter := counter + 1;
       new_slug := base_slug || '-' || counter;
     END LOOP;
     
     NEW.slug := new_slug;
     RETURN NEW;
   END;
   $$;
   
   CREATE TRIGGER handle_course_slug
     BEFORE INSERT OR UPDATE ON public.courses
     FOR EACH ROW EXECUTE FUNCTION public.set_course_slug();
   ```

## Backup y Recuperación

### Estrategia de Backup

1. **Backups Automáticos**
   - Supabase configura backups diarios automáticos
   - Retención configurable (7-30 días según plan)

2. **Point-in-Time Recovery (PITR)**
   - Capacidad de restaurar a cualquier momento
   - Implementado a través de archivado WAL

3. **Exportaciones Manuales**
   - Scripts programados para exportaciones adicionales
   - Almacenamiento en ubicaciones externas seguras

### Procedimiento de Recuperación

1. **Restauración Completa**
   - Recuperación desde backup completo más reciente
   - Aplicación de logs de transacciones hasta el punto deseado

2. **Restauración Selectiva**
   - Scripts para restaurar tablas específicas
   - Herramientas para migración de datos entre entornos

3. **Pruebas de Recuperación**
   - Verificaciones periódicas programadas
   - Entorno de staging para validar procedimientos

## Consideraciones de Escalabilidad

### Estrategias Implementadas

1. **Escalabilidad Vertical**
   - Aprovechamiento de planes Supabase escalables
   - Monitoreo de recursos para ajustes proactivos

2. **Sharding**
   - División lógica de datos para escenarios de alto volumen
   - Preparación para particionamiento futuro

3. **Optimización de Consultas**
   - Análisis periódico con EXPLAIN ANALYZE
   - Ajuste fino basado en patrones de uso reales

4. **Caching**
   - Implementación de caché en aplicación
   - Uso de Redis para escenarios de alta concurrencia

## Encriptación y Protección de Datos

### Datos en Reposo

1. **Cifrado de Columnas Sensibles**
   - Encriptación a nivel de columna para datos críticos
   - Algoritmos estándar de la industria (AES-256)

2. **Cifrado de Disco**
   - Protección a nivel de infraestructura Supabase
   - Volúmenes cifrados para datos en reposo

### Datos en Tránsito

1. **TLS/SSL**
   - Conexiones cifradas para todas las comunicaciones
   - Certificados gestionados y renovados automáticamente

2. **API Security**
   - Autenticación con tokens JWT firmados
   - Políticas RLS para control granular

## Auditoría y Monitoreo

### Sistema de Auditoría

Tabla `audit_log` para registro de acciones críticas:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Identificador único del registro |
| action | text | Tipo de acción realizada |
| user_id | uuid | Usuario que realizó la acción |
| resource_type | text | Tipo de recurso (tabla) |
| resource_id | uuid | ID del recurso afectado |
| details | jsonb | Detalles de los cambios |
| ip_address | text | Dirección IP del usuario |
| created_at | timestamp | Momento de la acción |

### Triggers de Auditoría

```sql
CREATE OR REPLACE FUNCTION public.audit_course_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.audit_log(
    action, 
    user_id, 
    resource_type, 
    resource_id, 
    details
  )
  VALUES (
    TG_OP,
    auth.uid(),
    'courses',
    NEW.id,
    jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    )
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER audit_course_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.audit_course_changes();
```

### Monitoreo de Rendimiento

1. **Métricas de Base de Datos**
   - Tiempo de respuesta de consultas
   - Uso de CPU y memoria
   - Operaciones de lectura/escritura

2. **Alertas Configuradas**
   - Notificaciones por umbral de rendimiento
   - Alertas de espacio de almacenamiento
   - Monitoreo de conexiones activas
