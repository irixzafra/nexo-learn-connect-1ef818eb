
-- Corrected migration for design system features

-- Create the design_system table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.design_system (
    id INTEGER PRIMARY KEY DEFAULT 1,
    theme_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create features_config table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.features_config (
    id INTEGER PRIMARY KEY DEFAULT 1,
    enable_theme_switcher BOOLEAN DEFAULT TRUE,
    enable_multi_language BOOLEAN DEFAULT TRUE,
    design_system_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- If features_config already exists but doesn't have design_system_enabled column
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'features_config') THEN
        IF NOT EXISTS (SELECT FROM information_schema.columns 
                      WHERE table_schema = 'public' 
                      AND table_name = 'features_config' 
                      AND column_name = 'design_system_enabled') THEN
            ALTER TABLE public.features_config ADD COLUMN design_system_enabled BOOLEAN DEFAULT TRUE;
        END IF;
    END IF;
END
$$;

-- Policies for design_system
ALTER TABLE public.design_system ENABLE ROW LEVEL SECURITY;

-- Readable by all users
CREATE POLICY IF NOT EXISTS "Cualquier usuario puede leer la configuración de diseño" ON public.design_system
    FOR SELECT USING (true);

-- Writable only by admins
CREATE POLICY IF NOT EXISTS "Solo administradores pueden modificar la configuración de diseño" ON public.design_system
    FOR ALL USING (auth.jwt() ? 'role' AND auth.jwt()->>'role' = 'admin');

-- Insert default design theme if not exists
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

-- Insert default features configuration if not exists
INSERT INTO public.features_config (id, design_system_enabled)
VALUES (1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Grant permissions
GRANT ALL ON public.design_system TO authenticated;
GRANT ALL ON public.design_system TO service_role;
GRANT ALL ON public.features_config TO authenticated;
GRANT ALL ON public.features_config TO service_role;

-- Add comments
COMMENT ON TABLE public.design_system IS 'Almacena la configuración del sistema de diseño';
COMMENT ON COLUMN public.design_system.theme_config IS 'Configuración completa del tema en formato JSON';
COMMENT ON COLUMN public.features_config.design_system_enabled IS 'Indica si el sistema de diseño está habilitado';
