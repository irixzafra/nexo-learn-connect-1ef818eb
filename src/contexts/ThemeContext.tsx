
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/auth'; // Updated import path
import { toast } from 'sonner';

type ThemeMode = 'light' | 'dark' | 'system' | 'futuristic';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  useMaterialDesign: boolean;
  setUseMaterialDesign: (use: boolean) => void;
  colors: ColorPalette;
  setColors: (colors: Partial<ColorPalette>) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  resolvedTheme: 'light' | 'dark' | 'futuristic';
  isDark: boolean;
  isMaterial: boolean;
  isLoading: boolean;
}

const defaultColors: ColorPalette = {
  primary: '#8B5CF6',
  secondary: '#F97316',
  accent: '#0EA5E9',
  background: '#FFFFFF',
  foreground: '#1A1F2C',
  muted: '#F6F6F7',
  border: '#E5E7EB',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [useMaterialDesign, setUseMaterialDesignState] = useState(true);
  const [colors, setColorsState] = useState<ColorPalette>(defaultColors);
  const [animationsEnabled, setAnimationsEnabledState] = useState(true);
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load theme settings from localStorage first
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    const savedUseMaterial = localStorage.getItem('useMaterialDesign');
    const savedColors = localStorage.getItem('colorPalette');
    const savedAnimations = localStorage.getItem('animationsEnabled');
    const savedReducedMotion = localStorage.getItem('reducedMotion');

    if (savedTheme) setThemeState(savedTheme);
    if (savedUseMaterial !== null) setUseMaterialDesignState(savedUseMaterial === 'true');
    if (savedColors) setColorsState(JSON.parse(savedColors));
    if (savedAnimations !== null) setAnimationsEnabledState(savedAnimations === 'true');
    if (savedReducedMotion !== null) setReducedMotionState(savedReducedMotion === 'true');

    // Then load from database if user is logged in
    loadSettings();
  }, [user]);

  useEffect(() => {
    applyTheme();
  }, [theme, useMaterialDesign, colors, reducedMotion]);

  const loadSettings = async () => {
    try {
      setIsLoading(true);

      // If not logged in, use local settings
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc('get_design_system_settings');

      if (error) {
        console.error('Error loading theme settings:', error);
        toast.error('Error al cargar tus preferencias de tema');
        setIsLoading(false);
        return;
      }

      if (data) {
        const settings = data as any;
        setThemeState(settings.theme_mode || 'system');
        setUseMaterialDesignState(settings.use_material_design ?? true);
        setColorsState(settings.color_palette || defaultColors);
        setAnimationsEnabledState(settings.animations_enabled ?? true);
        setReducedMotionState(settings.reduced_motion ?? false);

        // Save to localStorage as well
        localStorage.setItem('theme', settings.theme_mode || 'system');
        localStorage.setItem('useMaterialDesign', String(settings.use_material_design ?? true));
        localStorage.setItem('colorPalette', JSON.stringify(settings.color_palette || defaultColors));
        localStorage.setItem('animationsEnabled', String(settings.animations_enabled ?? true));
        localStorage.setItem('reducedMotion', String(settings.reduced_motion ?? false));
      }
    } catch (err) {
      console.error('Unexpected error loading theme settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    // Always save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('useMaterialDesign', String(useMaterialDesign));
    localStorage.setItem('colorPalette', JSON.stringify(colors));
    localStorage.setItem('animationsEnabled', String(animationsEnabled));
    localStorage.setItem('reducedMotion', String(reducedMotion));

    // If not logged in, don't save to database
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('update_design_system_settings', {
        p_theme_mode: theme,
        p_use_material_design: useMaterialDesign,
        p_color_palette: colors,
        p_animations_enabled: animationsEnabled,
        p_reduced_motion: reducedMotion
      });

      if (error) {
        console.error('Error saving theme settings:', error);
        toast.error('Error al guardar tus preferencias de tema');
      }
    } catch (err) {
      console.error('Unexpected error saving theme settings:', err);
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    setTimeout(() => saveSettings(), 0);
  };

  const setUseMaterialDesign = (use: boolean) => {
    setUseMaterialDesignState(use);
    setTimeout(() => saveSettings(), 0);
  };

  const setColors = (newColors: Partial<ColorPalette>) => {
    setColorsState({ ...colors, ...newColors });
    setTimeout(() => saveSettings(), 0);
  };

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
    setTimeout(() => saveSettings(), 0);
  };

  const setReducedMotion = (enabled: boolean) => {
    setReducedMotionState(enabled);
    setTimeout(() => saveSettings(), 0);
  };

  const applyTheme = () => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine resolved theme
    let currentTheme: 'light' | 'dark' | 'futuristic' = 'light';
    if (theme === 'system') {
      currentTheme = prefersDark ? 'dark' : 'light';
    } else if (theme === 'futuristic' || theme === 'dark' || theme === 'light') {
      currentTheme = theme;
    }

    // Apply classes to html element
    root.classList.remove('light', 'dark', 'futuristic');
    root.classList.add(currentTheme);
    
    // Apply Material Design classes if enabled
    if (useMaterialDesign) {
      root.classList.add('material');
    } else {
      root.classList.remove('material');
    }

    // Apply reduced motion if enabled
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Apply animations if enabled
    if (animationsEnabled) {
      root.classList.add('animations-enabled');
    } else {
      root.classList.remove('animations-enabled');
    }

    // Apply colors to CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value);
      }
    });
  };

  // Calculate whether we're in dark mode for easy consumption
  const resolvedTheme = 
    theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : (theme as 'light' | 'dark' | 'futuristic');
  
  const isDark = resolvedTheme === 'dark' || resolvedTheme === 'futuristic';
  const isMaterial = useMaterialDesign;

  return (
    <ThemeContext.Provider 
      value={{
        theme,
        setTheme,
        useMaterialDesign,
        setUseMaterialDesign,
        colors,
        setColors,
        animationsEnabled,
        setAnimationsEnabled,
        reducedMotion,
        setReducedMotion,
        resolvedTheme,
        isDark,
        isMaterial,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
