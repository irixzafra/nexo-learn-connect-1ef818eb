
-- Esta función devolverá información sobre las columnas de una tabla específica
CREATE OR REPLACE FUNCTION public.get_table_columns(table_name text)
RETURNS TABLE (
  column_name text,
  data_type text,
  is_nullable boolean
) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    column_name::text, 
    data_type::text, 
    is_nullable::boolean
  FROM 
    information_schema.columns
  WHERE 
    table_schema = 'public' 
    AND table_name = table_name;
$$;

-- Otorgar permisos para que cualquier usuario autenticado pueda ejecutar esta función
GRANT EXECUTE ON FUNCTION public.get_table_columns(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_table_columns(text) TO anon;

-- Función para obtener estudiantes inscritos en un curso con detalles de contacto
CREATE OR REPLACE FUNCTION public.get_course_enrollments_with_details(course_id_param uuid)
RETURNS TABLE (
  enrollment_id uuid,
  user_id uuid,
  enrolled_at timestamp with time zone,
  full_name text
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    e.id AS enrollment_id,
    e.user_id,
    e.enrolled_at,
    p.full_name
  FROM 
    public.enrollments e
  INNER JOIN 
    public.profiles p ON e.user_id = p.id
  WHERE 
    e.course_id = course_id_param;
$$;

-- Otorgar permisos para la nueva función
GRANT EXECUTE ON FUNCTION public.get_course_enrollments_with_details(uuid) TO authenticated;
