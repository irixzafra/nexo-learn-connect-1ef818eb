
import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'futuristic' | 'nexo';

interface ThemeManagerReturn {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark' | 'futuristic' | 'nexo';
  isDark: boolean;
  isFuturistic: boolean;
  isNexo: boolean;
}

export function useThemeManager(): ThemeManagerReturn {
  // Inicializar tema desde localStorage o preferencia del sistema
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as ThemeMode) || 'system';
    }
    return 'system';
  });

  const resolveTheme = (): 'light' | 'dark' | 'futuristic' | 'nexo' => {
    if (theme === 'futuristic') {
      return 'futuristic';
    }

    if (theme === 'nexo') {
      return 'nexo';
    }
    
    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    }
    
    return theme as 'light' | 'dark';
  };

  const resolvedTheme = resolveTheme();
  const isDark = resolvedTheme === 'dark';
  const isFuturistic = resolvedTheme === 'futuristic';
  const isNexo = resolvedTheme === 'nexo';

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remover todas las clases de tema
    root.classList.remove('light', 'dark', 'futuristic', 'nexo');
    
    // Añadir la clase correspondiente al tema resuelto
    root.classList.add(resolvedTheme);

    // Add dark class separately if system prefers dark and theme is system
    if (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    }
  }, [resolvedTheme, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
    isDark,
    isFuturistic,
    isNexo
  };
}
