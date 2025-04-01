
import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el dispositivo es móvil basado en el ancho de la ventana
 * @param mobileBreakpoint Punto de ruptura para considerar dispositivo móvil (por defecto 768px)
 * @returns Boolean indicando si el dispositivo es móvil
 */
export function useIsMobile(mobileBreakpoint = 768) {
  // Estado inicial (por defecto asumimos desktop para SSR)
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Función para actualizar el estado según el tamaño de ventana
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    // Comprobación inicial
    checkMobile();
    
    // Crear media query listener para mejorar performance
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    mql.addEventListener('change', checkMobile);
    
    // Limpiar event listener
    return () => {
      mql.removeEventListener('change', checkMobile);
    };
  }, [mobileBreakpoint]);
  
  return isMobile;
}

// Exportación alternativa para mantener compatibilidad
export const useMobile = () => {
  const isMobile = useIsMobile();
  return { isMobile };
};
