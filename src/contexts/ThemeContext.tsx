
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark' | 'futuristic' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Intentar obtener el tema guardado en localStorage, o usar el sistema por defecto
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && ['light', 'dark', 'futuristic', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Si el sistema prefiere el modo oscuro, usarlo por defecto
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
    
    // Remover todas las clases de tema anteriores
    document.documentElement.classList.remove('light', 'dark', 'futuristic');
    
    // Si es "system", determinar el tema basado en las preferencias del sistema
    if (theme === 'system') {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
    } else {
      // Añadir la clase del tema actual
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
