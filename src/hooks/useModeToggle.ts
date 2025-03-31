
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useModeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar si hay un tema guardado en localStorage
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      return storedTheme;
    }
    
    // Verificar preferencias del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(prev => prev === 'dark' ? 'light' : 'dark'),
  };
};
