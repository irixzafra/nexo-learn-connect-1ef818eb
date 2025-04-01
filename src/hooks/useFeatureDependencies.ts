
import { useContext } from 'react';
import { FeaturesContext, FeaturesContextProps, FeatureId } from '@/contexts/features/types';
import { featureDependencies, getFeatureDependencies, getFeatureDependents } from '@/contexts/features/dependencies';

/**
 * Hook for managing feature dependencies
 */
export function useFeatureDependencies() {
  const featuresContext = useContext(FeaturesContext);

  if (!featuresContext) {
    throw new Error('useFeatureDependencies must be used within a FeaturesProvider');
  }

  // Safely check if a feature is enabled by string name, handling potential type mismatches
  const isFeatureEnabled = (featureName: string): boolean => {
    try {
      // Handle both direct features and feature flags
      if (featuresContext.isEnabled && typeof featuresContext.isEnabled === 'function') {
        return featuresContext.isEnabled(featureName as FeatureId);
      }
      
      // Fallback to featuresConfig if isEnabled doesn't exist
      if (featuresContext.featuresConfig) {
        return !!featuresContext.featuresConfig[featureName as keyof typeof featuresContext.featuresConfig];
      }
      
      return false;
    } catch (error) {
      console.error(`Error checking if feature "${featureName}" is enabled:`, error);
      return false;
    }
  };

  // Get dependencies for a feature as a normalized array
  const getDependencies = (featureName: string): string[] => {
    try {
      return getFeatureDependencies(featureName);
    } catch (error) {
      console.error(`Error getting dependencies for feature "${featureName}":`, error);
      return [];
    }
  };

  // Get dependents for a feature as a normalized array
  const getDependents = (featureName: string): string[] => {
    try {
      return getFeatureDependents(featureName);
    } catch (error) {
      console.error(`Error getting dependents for feature "${featureName}":`, error);
      return [];
    }
  };

  // Check if all dependencies for a feature are enabled
  const areDependenciesMet = (featureName: string): boolean => {
    try {
      const dependencies = getDependencies(featureName);
      if (!dependencies.length) return true;
      
      return dependencies.every(dep => isFeatureEnabled(dep));
    } catch (error) {
      console.error(`Error checking dependencies for feature "${featureName}":`, error);
      return false;
    }
  };

  return {
    isFeatureEnabled,
    getDependencies,
    getDependents,
    areDependenciesMet,
    featureDependencies
  };
}
