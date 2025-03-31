import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
  sizes: {
    base: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export interface ThemeSpacing {
  unit: number;
  scale: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  borderRadius: string;
  customCSS: string;
}

export interface DesignSystemContextType {
  theme: ThemeConfig;
  isLoading: boolean;
  saveTheme: (theme: ThemeConfig) => Promise<void>;
  resetTheme: () => Promise<void>;
  previewTheme: (theme: ThemeConfig) => void;
  endPreview: () => void;
  isPreviewing: boolean;
  designFeatureEnabled: boolean;
  toggleDesignFeature: (enabled: boolean) => Promise<void>;
}

const defaultTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#8B5CF6',
    secondary: '#F97316',
    accent: '#0EA5E9',
    background: '#FFFFFF',
    foreground: '#1A1F2C',
    muted: '#F6F6F7',
    border: '#E5E7EB',
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'monospace',
    sizes: {
      base: '16px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
  },
  spacing: {
    unit: 4,
    scale: {
      xs: 0.25,
      sm: 0.5,
      md: 1,
      lg: 1.5,
      xl: 2,
      '2xl': 3,
    },
  },
  borderRadius: '0.5rem',
  customCSS: '',
};

export const DesignSystemContext = createContext<DesignSystemContextType>({
  theme: defaultTheme,
  isLoading: false,
  saveTheme: async () => {},
  resetTheme: async () => {},
  previewTheme: () => {},
  endPreview: () => {},
  isPreviewing: false,
  designFeatureEnabled: true,
  toggleDesignFeature: async () => {},
});

export const DesignSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [originalTheme, setOriginalTheme] = useState<ThemeConfig>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [designFeatureEnabled, setDesignFeatureEnabled] = useState(true);

  useEffect(() => {
    loadTheme();
    loadDesignFeatureState();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      applyThemeToDom(theme);
      console.log('Design system theme applied:', theme);
    }
  }, [isLoading, theme]);

  const loadTheme = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('design_system')
        .select('*')
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No data found, use default theme
          await saveTheme(defaultTheme);
          setTheme(defaultTheme);
          setOriginalTheme(defaultTheme);
        } else {
          throw error;
        }
      } else if (data) {
        const loadedTheme = data.theme_config as ThemeConfig;
        setTheme(loadedTheme);
        setOriginalTheme(loadedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      toast.error('Error al cargar la configuración de diseño');
      // En caso de error, usamos el tema por defecto
      setTheme(defaultTheme);
      setOriginalTheme(defaultTheme);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDesignFeatureState = async () => {
    try {
      const { data, error } = await supabase
        .from('features_config')
        .select('design_system_enabled')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No data found, create default entry
          await supabase
            .from('features_config')
            .insert({ id: 1, design_system_enabled: true });
          setDesignFeatureEnabled(true);
        } else {
          throw error;
        }
      } else if (data) {
        setDesignFeatureEnabled(data.design_system_enabled);
        console.log('Design system enabled:', data.design_system_enabled);
      }
    } catch (error) {
      console.error('Error loading design feature state:', error);
      // En caso de error, habilitamos por defecto
      setDesignFeatureEnabled(true);
    }
  };

  const saveTheme = async (newTheme: ThemeConfig) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('design_system')
        .upsert({ id: 1, theme_config: newTheme }, { onConflict: 'id' });
      
      if (error) throw error;
      
      setTheme(newTheme);
      setOriginalTheme(newTheme);
      setIsPreviewing(false);
      
      // Apply theme to the DOM
      applyThemeToDom(newTheme);
      
      toast.success('Configuración de diseño guardada correctamente');
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Error al guardar la configuración de diseño');
    } finally {
      setIsLoading(false);
    }
  };

  const resetTheme = async () => {
    try {
      await saveTheme(defaultTheme);
      toast.success('Configuración de diseño restablecida correctamente');
    } catch (error) {
      console.error('Error resetting theme:', error);
      toast.error('Error al restablecer la configuración de diseño');
    }
  };

  const previewTheme = (previewTheme: ThemeConfig) => {
    setTheme(previewTheme);
    setIsPreviewing(true);
    applyThemeToDom(previewTheme);
  };

  const endPreview = () => {
    setTheme(originalTheme);
    setIsPreviewing(false);
    applyThemeToDom(originalTheme);
  };

  const toggleDesignFeature = async (enabled: boolean) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('features_config')
        .upsert({ id: 1, design_system_enabled: enabled }, { onConflict: 'id' });
      
      if (error) throw error;
      
      setDesignFeatureEnabled(enabled);
      console.log('Design system feature toggled:', enabled);
      
      // Si se desactiva, cancelamos cualquier vista previa
      if (!enabled && isPreviewing) {
        endPreview();
      }
      
      // Si se activa, aplicamos el tema actual
      if (enabled) {
        applyThemeToDom(theme);
      } else {
        // Si se desactiva, eliminamos cualquier estilo personalizado
        const styleElement = document.getElementById('custom-theme-styles');
        if (styleElement) {
          styleElement.textContent = '';
        }
      }
      
    } catch (error) {
      console.error('Error toggling design feature:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const applyThemeToDom = (theme: ThemeConfig) => {
    if (!designFeatureEnabled) {
      console.log('Design system is disabled, not applying theme');
      return;
    }
    
    console.log('Applying theme to DOM:', theme);
    
    const root = document.documentElement;
    
    const convertColorToHSL = (color: string) => {
      if (color.startsWith('hsl')) {
        return color;
      }
      
      const tempEl = document.createElement('div');
      tempEl.style.color = color;
      document.body.appendChild(tempEl);
      const rgbColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);
      
      const rgbMatch = rgbColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
      if (!rgbMatch) return color;
      
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      
      const r1 = r / 255;
      const g1 = g / 255;
      const b1 = b / 255;
      
      const max = Math.max(r1, g1, b1);
      const min = Math.min(r1, g1, b1);
      
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r1:
            h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
            break;
          case g1:
            h = (b1 - r1) / d + 2;
            break;
          case b1:
            h = (r1 - g1) / d + 4;
            break;
        }
        
        h *= 60;
      }
      
      return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      const hslValue = convertColorToHSL(value);
      root.style.setProperty(`--${key}`, hslValue);
    });
    
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    root.style.setProperty('--font-mono', theme.fonts.mono);
    
    Object.entries(theme.fonts.sizes).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });
    
    root.style.setProperty('--radius', theme.borderRadius);
    
    let styleElement = document.getElementById('custom-theme-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'custom-theme-styles';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = theme.customCSS || '';
    
    console.log('Theme applied successfully');
  };

  return (
    <DesignSystemContext.Provider
      value={{
        theme,
        isLoading,
        saveTheme,
        resetTheme,
        previewTheme,
        endPreview,
        isPreviewing,
        designFeatureEnabled,
        toggleDesignFeature,
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => useContext(DesignSystemContext);
