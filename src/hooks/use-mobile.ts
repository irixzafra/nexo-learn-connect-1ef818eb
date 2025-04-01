
import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el dispositivo es móvil
 * @param mobileBreakpoint Punto de ruptura para considerar dispositivo móvil (por defecto 768px)
 * @returns Boolean indicando si el dispositivo es móvil
 */
export function useIsMobile(mobileBreakpoint = 768) {
  // Estado inicial (por defecto asumimos desktop para SSR)
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Función para actualizar el estado según el tamaño de ventana
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      }
    };
    
    // Comprobación inicial
    checkMobile();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile);
    
    // Limpiar event listener
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [mobileBreakpoint]);
  
  return isMobile;
}
