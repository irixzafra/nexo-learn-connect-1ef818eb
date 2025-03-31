
import { useState, useEffect } from 'react';

// Definición de features disponibles
type FeatureName = 
  | 'community' 
  | 'messages' 
  | 'finanzas' 
  | 'analytics'
  | 'datos';

// Por defecto, definimos qué features están habilitadas
// En una aplicación real, esto vendría de un API o localStorage
const defaultFeatures: Record<FeatureName, boolean> = {
  community: true,
  messages: true,
  finanzas: false, // Feature deshabilitada por defecto
  analytics: true,
  datos: false     // Feature deshabilitada por defecto
};

export const useFeatureFlags = () => {
  const [features, setFeatures] = useState<Record<FeatureName, boolean>>(defaultFeatures);
  
  // En una implementación real, podrías cargar las features desde una API
  useEffect(() => {
    // Simular carga de configuración de features
    const loadFeatures = async () => {
      try {
        // Aquí iría una llamada API o leer de localStorage
        // Por ahora usamos valores por defecto
        setFeatures(defaultFeatures);
      } catch (error) {
        console.error('Error al cargar feature flags:', error);
      }
    };
    
    loadFeatures();
  }, []);
  
  const isFeatureEnabled = (featureName: FeatureName): boolean => {
    return features[featureName] || false;
  };
  
  return { isFeatureEnabled };
};
