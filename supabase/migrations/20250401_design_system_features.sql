
-- Altera la tabla features_config para añadir el campo design_system_enabled
ALTER TABLE IF EXISTS public.features_config
ADD COLUMN IF NOT EXISTS design_system_enabled BOOLEAN DEFAULT TRUE;

-- Crea una tabla para la configuración del sistema de diseño si no existe
CREATE TABLE IF NOT EXISTS public.design_system (
    id INTEGER PRIMARY KEY DEFAULT 1,
    theme_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Políticas de acceso para design_system
ALTER TABLE public.design_system ENABLE ROW LEVEL SECURITY;

-- Política para leer la configuración del sistema de diseño
CREATE POLICY "Cualquier usuario puede leer la configuración de diseño" ON public.design_system
    FOR SELECT USING (true);

-- Política para insertar o actualizar la configuración del sistema de diseño (solo administradores)
CREATE POLICY "Solo administradores pueden modificar la configuración de diseño" ON public.design_system
    FOR ALL USING (auth.jwt() ? 'role' AND auth.jwt()->>'role' = 'admin');

-- Comentarios para documentación
COMMENT ON TABLE public.design_system IS 'Almacena la configuración del sistema de diseño';
COMMENT ON COLUMN public.design_system.theme_config IS 'Configuración completa del tema en formato JSON';
COMMENT ON COLUMN public.features_config.design_system_enabled IS 'Indica si el sistema de diseño está habilitado';

-- Asegurar que exista al menos un registro por defecto
INSERT INTO public.design_system (id, theme_config)
VALUES (1, '{
  "mode": "light",
  "colors": {
    "primary": "#8B5CF6",
    "secondary": "#F97316",
    "accent": "#0EA5E9",
    "background": "#FFFFFF",
    "foreground": "#1A1F2C",
    "muted": "#F6F6F7",
    "border": "#E5E7EB"
  },
  "fonts": {
    "heading": "Inter, system-ui, sans-serif",
    "body": "Inter, system-ui, sans-serif",
    "mono": "monospace",
    "sizes": {
      "base": "16px",
      "sm": "14px",
      "md": "16px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px"
    }
  },
  "spacing": {
    "unit": 4,
    "scale": {
      "xs": 0.25,
      "sm": 0.5,
      "md": 1,
      "lg": 1.5,
      "xl": 2,
      "2xl": 3
    }
  },
  "borderRadius": "0.5rem",
  "customCSS": ""
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Grant permissions
GRANT ALL ON public.design_system TO authenticated;
GRANT ALL ON public.design_system TO service_role;
