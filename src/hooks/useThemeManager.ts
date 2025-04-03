
import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'futuristic';

interface ThemeManagerReturn {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark' | 'futuristic';
  isDark: boolean;
  isFuturistic: boolean;
}

export function useThemeManager(): ThemeManagerReturn {
  // Inicializar tema desde localStorage o preferencia del sistema
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as ThemeMode) || 'system';
    }
    return 'system';
  });

  const resolveTheme = (): 'light' | 'dark' | 'futuristic' => {
    if (theme === 'futuristic') {
      return 'futuristic';
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

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remover todas las clases de tema
    root.classList.remove('light', 'dark', 'futuristic');
    
    // Añadir la clase correspondiente al tema resuelto
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark', 'futuristic');
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
    isFuturistic
  };
}
