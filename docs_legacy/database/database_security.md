
# Seguridad de Base de Datos - Nexo Learning Platform

## Arquitectura de Seguridad

La plataforma Nexo Learning implementa una arquitectura de seguridad de múltiples capas para la protección de su base de datos PostgreSQL gestionada a través de Supabase.

### Diagrama de Arquitectura de Seguridad

```
┌─────────────────────────────────────┐
│          Capa de Aplicación         │
│                                     │
│  ┌─────────────┐    ┌─────────────┐ │
│  │  Validación │    │  Sanitización│ │
│  │  de Entrada │    │  de Datos   │ │
│  └─────────────┘    └─────────────┘ │
└───────────────────┬─────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│          Capa de API                │
│                                     │
│  ┌─────────────┐    ┌─────────────┐ │
│  │ Autenticación   │ Autorización │ │
│  │  (JWT)      │    │  (RLS)      │ │
│  └─────────────┘    └─────────────┘ │
└───────────────────┬─────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│         Capa de Base de Datos       │
│                                     │
│  ┌─────────────┐    ┌─────────────┐ │
│  │   Políticas │    │ Encriptación│ │
│  │   RLS       │    │ de Datos    │ │
│  └─────────────┘    └─────────────┘ │
│                                     │
│  ┌─────────────┐    ┌─────────────┐ │
│  │  Funciones  │    │  Auditoría  │ │
│  │  Seguras    │    │  de Acceso  │ │
│  └─────────────┘    └─────────────┘ │
└─────────────────────────────────────┘
```

## Políticas de Row-Level Security (RLS)

### Principios y Mejores Prácticas

1. **Política Universal**: Todas las tablas deben tener RLS habilitado y políticas definidas.
2. **Principio de Mínimo Privilegio**: Los usuarios solo deben poder acceder a los datos que necesitan.
3. **Prevención de Recursión Infinita**: Uso de funciones SECURITY DEFINER para evitar problemas de recursión.
4. **Funciones Específicas**: Creación de funciones dedicadas para operaciones complejas de seguridad.

### Plantilla para Implementación de RLS

```sql
-- Habilitar RLS en la tabla
ALTER TABLE public.nombre_tabla ENABLE ROW LEVEL SECURITY;

-- Política para SELECT (lectura)
CREATE POLICY "Usuarios pueden ver sus propios datos"
ON public.nombre_tabla
FOR SELECT
USING (auth.uid() = user_id);

-- Política para INSERT (creación)
CREATE POLICY "Usuarios pueden crear sus propios datos"
ON public.nombre_tabla
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Política para UPDATE (actualización)
CREATE POLICY "Usuarios pueden actualizar sus propios datos"
ON public.nombre_tabla
FOR UPDATE
USING (auth.uid() = user_id);

-- Política para DELETE (eliminación)
CREATE POLICY "Usuarios pueden eliminar sus propios datos"
ON public.nombre_tabla
FOR DELETE
USING (auth.uid() = user_id);

-- Política específica para administradores
CREATE POLICY "Administradores pueden gestionar todos los datos"
ON public.nombre_tabla
FOR ALL
USING (public.get_user_role(auth.uid()) = 'admin');
```

### Prevención de Recursión Infinita

```sql
-- Función para obtener el rol del usuario actual
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
SECURITY DEFINER
STABLE
LANGUAGE SQL
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Uso en políticas RLS
CREATE POLICY "Solo administradores pueden ver todos los perfiles"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id OR public.get_user_role() = 'admin'
);
```

## Funciones de Seguridad

### Funciones con SECURITY DEFINER

Las funciones con SECURITY DEFINER se ejecutan con los privilegios del propietario de la función, no del invocador, lo que permite implementar operaciones privilegiadas de forma segura.

```sql
-- Función para verificar si un usuario tiene un rol específico
CREATE OR REPLACE FUNCTION public.has_role(role_name TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = role_name
  );
$$;

-- Función para registrar actividad sensible
CREATE OR REPLACE FUNCTION public.log_admin_action(action_name TEXT, resource_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_log(user_id, action, resource_id)
  VALUES (auth.uid(), action_name, resource_id);
END;
$$;
```

### Validación y Sanitización

```sql
-- Función para validar datos antes de inserción
CREATE OR REPLACE FUNCTION public.validate_course_data()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validar título
  IF LENGTH(NEW.title) < 3 THEN
    RAISE EXCEPTION 'El título del curso debe tener al menos 3 caracteres';
  END IF;
  
  -- Validar precio
  IF NEW.price < 0 THEN
    RAISE EXCEPTION 'El precio no puede ser negativo';
  END IF;
  
  -- Sanitizar campos
  NEW.title := TRIM(NEW.title);
  NEW.description := TRIM(NEW.description);
  
  RETURN NEW;
END;
$$;

-- Trigger para la validación
CREATE TRIGGER validate_course_before_insert
BEFORE INSERT OR UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.validate_course_data();
```

## Auditoría y Monitorización

### Sistema de Auditoría

```sql
-- Tabla de auditoría
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  timestamp TIMESTAMPTZ DEFAULT now(),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  user_agent TEXT
);

-- Trigger para cambios en cursos
CREATE OR REPLACE FUNCTION public.audit_course_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.audit_log(
    user_id, 
    action, 
    resource_type, 
    resource_id, 
    old_data, 
    new_data
  )
  VALUES (
    auth.uid(),
    TG_OP,
    'courses',
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('UPDATE', 'INSERT') THEN to_jsonb(NEW) ELSE NULL END
  );
  RETURN NULL;
END;
$$;

CREATE TRIGGER audit_course_changes
AFTER INSERT OR UPDATE OR DELETE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.audit_course_changes();
```

### Monitorización de Seguridad

```sql
-- Vista para actividad sospechosa
CREATE OR REPLACE VIEW public.suspicious_activity AS
SELECT 
  a.user_id,
  p.email,
  COUNT(*) as action_count,
  MIN(a.timestamp) as first_action,
  MAX(a.timestamp) as last_action
FROM 
  public.audit_log a
JOIN 
  public.profiles p ON a.user_id = p.id
WHERE 
  a.timestamp > now() - interval '1 hour'
GROUP BY 
  a.user_id, p.email
HAVING 
  COUNT(*) > 100 -- Umbral de alerta
ORDER BY 
  action_count DESC;

-- Función para notificar actividad sospechosa
CREATE OR REPLACE FUNCTION public.check_suspicious_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  suspicious_count INT;
BEGIN
  SELECT COUNT(*) INTO suspicious_count
  FROM public.suspicious_activity;
  
  IF suspicious_count > 0 THEN
    -- Lógica para enviar alerta al equipo de seguridad
    INSERT INTO public.system_notifications(type, title, content)
    VALUES ('security_alert', 'Actividad Sospechosa Detectada', 
           'Se ha detectado actividad potencialmente maliciosa. Revisar dashboard de seguridad.');
  END IF;
  
  RETURN NULL;
END;
$$;

CREATE TRIGGER check_for_security_threats
AFTER INSERT ON public.audit_log
EXECUTE FUNCTION public.check_suspicious_activity();
```

## Mejores Prácticas de Implementación

1. **Revisión de Seguridad**: Incluir verificación de seguridad en el proceso de revisión de código.
2. **Pruebas Automatizadas**: Implementar pruebas que verifiquen el correcto funcionamiento de las políticas RLS.
3. **Documentación**: Mantener documentación actualizada de todas las políticas y funciones de seguridad.
4. **Monitorización Continua**: Implementar sistemas de alerta para patrones de acceso inusuales.
5. **Actualizaciones Regulares**: Revisar y actualizar las políticas de seguridad trimestralmente.

## Procedimientos de Emergencia

1. **Bloqueo de Emergencia**: Procedimiento para desactivar temporalmente el acceso a la base de datos.
2. **Recuperación de Datos**: Proceso para restaurar desde copias de seguridad en caso de corrupción.
3. **Escalamiento**: Flujo de comunicación para incidentes de seguridad graves.
4. **Análisis Forense**: Procedimiento para investigar brechas de seguridad.

---

Este documento debe revisarse y actualizarse regularmente para mantener los más altos estándares de seguridad de datos.

Última actualización: Mayo 2024
