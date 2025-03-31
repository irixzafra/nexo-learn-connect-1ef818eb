
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'futuristic';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Recuperar tema guardado del localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    // Si no hay tema guardado, usar preferencia del sistema o 'light' por defecto
    return savedTheme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
    
    // Aplicar clase de tema al elemento html
    const root = document.documentElement;
    
    // Eliminar todas las clases de tema
    root.classList.remove('light', 'dark', 'futuristic');
    
    // Añadir la clase del tema actual
    root.classList.add(theme);
    
    console.log('Theme applied:', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
