
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeaturesConfig, FeaturesContextProps, defaultFeaturesConfig } from './types';
import { 
  getFeatureDependencies, 
  getFeatureDependents 
} from './dependencies';

// Crear contexto con valor por defecto
export const FeaturesContext = createContext<FeaturesContextProps | undefined>(undefined);

interface FeaturesProviderProps {
  children: React.ReactNode;
  initialFeatures?: Partial<FeaturesConfig>;
}

export const FeaturesProvider: React.FC<FeaturesProviderProps> = ({ 
  children, 
  initialFeatures 
}) => {
  const [features, setFeatures] = useState<FeaturesConfig>({
    ...defaultFeaturesConfig,
    ...initialFeatures
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Cargar configuración inicial
  useEffect(() => {
    reloadFeatures();
  }, []);

  // Verificar si una característica está habilitada
  const isFeatureEnabled = (feature: keyof FeaturesConfig): boolean => {
    return features[feature] === true;
  };

  // Activar/desactivar una característica
  const toggleFeature = async (feature: keyof FeaturesConfig, value: boolean): Promise<void> => {
    try {
      await updateFeatures({
        ...features,
        [feature]: value
      });
    } catch (err) {
      console.error('Error toggling feature:', err);
      throw err;
    }
  };

  // Actualizar todas las características
  const updateFeatures = async (newFeatures: FeaturesConfig): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Aquí iría una llamada a la API para guardar las características
      // Por ahora solo simulamos una espera
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Actualizar estado local
      setFeatures(newFeatures);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido al actualizar características'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Recargar configuración desde el servidor
  const reloadFeatures = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Aquí iría una llamada a la API para obtener las características
      // Por ahora solo simulamos una espera y usamos valores por defecto
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (initialFeatures) {
        setFeatures({
          ...defaultFeaturesConfig,
          ...initialFeatures
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido al cargar características'));
    } finally {
      setIsLoading(false);
    }
  };

  const value: FeaturesContextProps = {
    features,
    featuresConfig: features, // Alias para mantener compatibilidad
    isLoading,
    error,
    updateFeatures,
    reloadFeatures,
    isFeatureEnabled,
    toggleFeature,
    getFeatureDependencies,
    getFeatureDependents
  };

  return (
    <FeaturesContext.Provider value={value}>
      {children}
    </FeaturesContext.Provider>
  );
};

// Hook para usar el contexto de características
export const useFeatures = (): FeaturesContextProps => {
  const context = useContext(FeaturesContext);
  
  if (context === undefined) {
    throw new Error('useFeatures debe ser usado dentro de un FeaturesProvider');
  }
  
  return context;
};
