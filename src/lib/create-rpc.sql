
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
