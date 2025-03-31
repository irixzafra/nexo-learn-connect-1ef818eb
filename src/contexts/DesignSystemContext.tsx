
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
        } else {
          throw error;
        }
      } else if (data) {
        setDesignFeatureEnabled(data.design_system_enabled);
      }
    } catch (error) {
      console.error('Error loading design feature state:', error);
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
      
      // Si se desactiva, cancelamos cualquier vista previa
      if (!enabled && isPreviewing) {
        endPreview();
      }
      
    } catch (error) {
      console.error('Error toggling design feature:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Apply theme to the DOM by updating CSS variables
  const applyThemeToDom = (theme: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply fonts
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    root.style.setProperty('--font-mono', theme.fonts.mono);
    
    // Apply font sizes
    Object.entries(theme.fonts.sizes).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });
    
    // Apply border radius
    root.style.setProperty('--radius', theme.borderRadius);
    
    // Apply custom CSS if any
    let styleElement = document.getElementById('custom-theme-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'custom-theme-styles';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = theme.customCSS;
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
