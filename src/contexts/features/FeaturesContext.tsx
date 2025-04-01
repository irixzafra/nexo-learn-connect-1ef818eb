
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FeaturesConfig, defaultFeaturesConfig, FeaturesContextValue } from './types';
import { applyDependencyRules, getAllDependencies, getAllDependents } from './dependencies';

const FeaturesContext = createContext<FeaturesContextValue | undefined>(undefined);

export type { FeaturesConfig } from './types';
export { defaultFeaturesConfig } from './types';

export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultFeaturesConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock loading features from API on mount
  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // In a real implementation, this would be an API call
        // For now, we'll just simulate a delay and use default values
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Try to load from localStorage if available
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

  // Check if a feature is enabled
  const isFeatureEnabled = (feature: keyof FeaturesConfig): boolean => {
    return !!featuresConfig[feature];
  };

  // Get all direct and indirect dependencies of a feature
  const getFeatureDependencies = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependencies(feature);
  };

  // Get all features that depend on this feature
  const getFeatureDependents = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependents(feature);
  };

  // Toggle a feature and handle dependencies
  const toggleFeature = async (feature: keyof FeaturesConfig, value: boolean): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Apply dependency rules
      const updatedFeatures = applyDependencyRules(feature, value, featuresConfig);
      
      // Save to localStorage for persistence
      localStorage.setItem('features', JSON.stringify(updatedFeatures));
      
      // Update state
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

  // Update multiple features at once
  const updateFeatures = async (updates: Partial<FeaturesConfig>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedFeatures = {
        ...featuresConfig,
        ...updates
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('features', JSON.stringify(updatedFeatures));
      
      // Update state
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
