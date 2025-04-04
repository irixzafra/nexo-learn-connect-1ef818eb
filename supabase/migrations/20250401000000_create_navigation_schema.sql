
-- Tabla principal para elementos de navegación
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  icon_name TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  path TEXT,
  item_type TEXT NOT NULL CHECK (item_type IN ('link', 'group', 'separator')),
  parent_id UUID REFERENCES public.navigation_items(id),
  role TEXT NOT NULL,
  required_roles TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Comentarios en las columnas para mayor claridad
COMMENT ON TABLE public.navigation_items IS 'Almacena los elementos de navegación dinámica para cada rol';
COMMENT ON COLUMN public.navigation_items.id IS 'Identificador único del elemento de navegación';
COMMENT ON COLUMN public.navigation_items.label IS 'Etiqueta visible del elemento de navegación';
COMMENT ON COLUMN public.navigation_items.icon_name IS 'Nombre del icono de Lucide React';
COMMENT ON COLUMN public.navigation_items.sort_order IS 'Orden de presentación del elemento';
COMMENT ON COLUMN public.navigation_items.is_active IS 'Indica si el elemento está activo o no';
COMMENT ON COLUMN public.navigation_items.is_visible IS 'Indica si el elemento es visible o no';
COMMENT ON COLUMN public.navigation_items.path IS 'Ruta de navegación (solo para links)';
COMMENT ON COLUMN public.navigation_items.item_type IS 'Tipo de elemento: link, grupo o separador';
COMMENT ON COLUMN public.navigation_items.parent_id IS 'ID del elemento padre para elementos anidados';
COMMENT ON COLUMN public.navigation_items.role IS 'Rol para el que aplica este elemento';
COMMENT ON COLUMN public.navigation_items.required_roles IS 'Roles que pueden ver este elemento';

-- Añadir índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_navigation_items_role ON public.navigation_items(role);
CREATE INDEX IF NOT EXISTS idx_navigation_items_parent_id ON public.navigation_items(parent_id);

-- Trigger para actualizar timestamp
CREATE OR REPLACE FUNCTION public.update_navigation_items_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp_navigation_items
BEFORE UPDATE ON public.navigation_items
FOR EACH ROW
EXECUTE FUNCTION public.update_navigation_items_timestamp();

-- Políticas de Row Level Security
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Política para administradores (CRUD completo)
CREATE POLICY "Allow full access for admins"
  ON public.navigation_items
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Política para lectura para todos los usuarios autenticados
CREATE POLICY "Allow read for authenticated users"
  ON public.navigation_items
  FOR SELECT
  TO authenticated
  USING (true);

-- Tabla de historial de cambios (opcional para una fase posterior)
CREATE TABLE IF NOT EXISTS public.navigation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.navigation_items(id),
  user_id UUID NOT NULL,
  change_type TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

COMMENT ON TABLE public.navigation_history IS 'Registro histórico de cambios en la navegación';
