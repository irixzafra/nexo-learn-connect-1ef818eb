
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { FeaturesConfig, defaultFeaturesConfig } from './types';
import { 
  getFeatureDependencies, 
  getFeatureDependents 
} from './dependencies';

// Context props definition
export interface FeaturesContextProps {
  features: FeaturesConfig;
  isLoading: boolean;
  toggleFeature: (featureName: keyof FeaturesConfig, value: boolean) => Promise<void>;
  updateFeatures: (newConfig: Partial<FeaturesConfig>) => Promise<void>;
  isFeatureEnabled: (featureName: keyof FeaturesConfig) => boolean;
  getFeatureDependencies: (feature: keyof FeaturesConfig) => (keyof FeaturesConfig)[];
  getFeatureDependents: (feature: keyof FeaturesConfig) => (keyof FeaturesConfig)[];
}

// Create context with default empty values
const FeaturesContext = createContext<FeaturesContextProps>({} as FeaturesContextProps);

// Custom hook to use the features context
export const useFeatures = () => useContext(FeaturesContext);

export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<FeaturesConfig>(defaultFeaturesConfig);
  const [isLoading, setIsLoading] = useState(false);

  // Check if a feature is enabled
  const isFeatureEnabled = useCallback(
    (featureName: keyof FeaturesConfig) => {
      return !!features[featureName];
    },
    [features]
  );

  // Toggle a feature on/off
  const toggleFeature = useCallback(
    async (featureName: keyof FeaturesConfig, value: boolean): Promise<void> => {
      try {
        setIsLoading(true);
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setFeatures(prev => ({
          ...prev,
          [featureName]: value
        }));
        
        toast.success(`Característica "${String(featureName)}" ${value ? 'activada' : 'desactivada'}`);
        return Promise.resolve();
      } catch (error) {
        console.error('Error toggling feature:', error);
        toast.error(`Error al cambiar el estado de "${String(featureName)}"`);
        return Promise.reject(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Update multiple features at once
  const updateFeatures = useCallback(
    async (newConfig: Partial<FeaturesConfig>): Promise<void> => {
      try {
        setIsLoading(true);
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setFeatures(prev => ({
          ...prev,
          ...newConfig
        }));
        
        toast.success("Configuración actualizada correctamente");
        return Promise.resolve();
      } catch (error) {
        console.error('Error updating features:', error);
        toast.error("Error al actualizar la configuración");
        return Promise.reject(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Provide the context value
  const contextValue: FeaturesContextProps = {
    features,
    isLoading,
    toggleFeature,
    updateFeatures,
    isFeatureEnabled,
    getFeatureDependencies,
    getFeatureDependents
  };

  return (
    <FeaturesContext.Provider value={contextValue}>
      {children}
    </FeaturesContext.Provider>
  );
};

// Re-export for simplicity
export type { FeaturesConfig };
export { defaultFeaturesConfig };
