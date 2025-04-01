
import { useState, useEffect } from 'react';

// Interfaz para el estado expandido de los grupos del sidebar
interface ExpandedState {
  general: boolean;
  learning: boolean;
  instructor: boolean;
  academic: boolean;
  finance: boolean;
  settings: boolean;
  admin: boolean;
  [key: string]: boolean;
}

// Estado inicial por defecto
const defaultExpandedState: ExpandedState = {
  general: true,
  learning: false,
  instructor: false,
  academic: false,
  finance: false,
  settings: true, // Configuración por defecto expandida
  admin: false
};

const STORAGE_KEY = 'sidebar_expanded_state';

/**
 * Hook personalizado para gestionar el estado de los grupos expandidos en el sidebar
 */
export const useSidebarState = () => {
  // Intentar obtener el estado guardado del localStorage
  const getSavedState = (): ExpandedState => {
    if (typeof window === 'undefined') return defaultExpandedState;
    
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      return savedState ? JSON.parse(savedState) : defaultExpandedState;
    } catch (error) {
      console.error('Error al cargar el estado del sidebar:', error);
      return defaultExpandedState;
    }
  };

  const [expanded, setExpanded] = useState<ExpandedState>(getSavedState);

  // Función para cambiar el estado de un grupo específico
  const toggleExpanded = (groupId: keyof ExpandedState) => {
    setExpanded(prev => {
      const newState = { ...prev, [groupId]: !prev[groupId] };
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      }
      
      return newState;
    });
  };

  // Alias de toggleExpanded para compatibilidad con componentes existentes
  const toggleGroup = toggleExpanded;

  // Para expandir un grupo específico
  const expandGroup = (groupId: keyof ExpandedState) => {
    setExpanded(prev => {
      const newState = { ...prev, [groupId]: true };
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      }
      
      return newState;
    });
  };

  // Carga inicial desde localStorage
  useEffect(() => {
    setExpanded(getSavedState());
  }, []);

  return {
    expanded,
    toggleExpanded,
    toggleGroup,
    expandGroup
  };
};
