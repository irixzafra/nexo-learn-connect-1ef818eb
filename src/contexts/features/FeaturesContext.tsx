import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FeaturesConfig,
  FeaturesContextValue,
  defaultFeaturesConfig
} from './types';
import { applyDependencyRules, getAllDependencies, getAllDependents } from './dependencies';

const FeaturesContext = createContext<FeaturesContextValue | undefined>(undefined);

export { FeaturesConfig } from './types';
export { defaultFeaturesConfig } from './types';

export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultFeaturesConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const savedFeatures = localStorage.getItem('features');
        if (savedFeatures) {
          setFeaturesConfig(JSON.parse(savedFeatures));
        }
      } catch (error) {
        console.error('Error loading features:', error);
        setError(error instanceof Error ? error : new Error('Unknown error loading features'));
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, []);

  const isFeatureEnabled = (feature: keyof FeaturesConfig): boolean => {
    return !!featuresConfig[feature];
  };

  const getFeatureDependencies = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependencies(feature);
  };

  const getFeatureDependents = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependents(feature);
  };

  const toggleFeature = async (feature: keyof FeaturesConfig, value: boolean): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedFeatures = applyDependencyRules(feature, value, featuresConfig);
      
      localStorage.setItem('features', JSON.stringify(updatedFeatures));
      
      setFeaturesConfig(updatedFeatures);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error toggling feature:', error);
      setError(error instanceof Error ? error : new Error('Error toggling feature'));
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeatures = async (updates: Partial<FeaturesConfig>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedFeatures = {
        ...featuresConfig,
        ...updates
      };
      
      localStorage.setItem('features', JSON.stringify(updatedFeatures));
      
      setFeaturesConfig(updatedFeatures);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating features:', error);
      setError(error instanceof Error ? error : new Error('Error updating features'));
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FeaturesContext.Provider value={{ 
      featuresConfig, 
      isLoading, 
      error,
      toggleFeature, 
      isFeatureEnabled,
      updateFeatures,
      getFeatureDependencies,
      getFeatureDependents
    }}>
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (context === undefined) {
    throw new Error('useFeatures debe ser usado dentro de un FeaturesProvider');
  }
  return context;
};
