
import { useCallback } from 'react';
import { FeaturesConfig } from '@/contexts/features/types';
import { getFeatureDependencies, getFeatureDependents } from '@/contexts/features/dependencies';

/**
 * Custom hook to handle feature dependencies and relationships
 */
export const useFeatureDependencies = () => {
  /**
   * Get all features that depend on a specific feature
   */
  const getDependentFeatures = useCallback((feature: keyof FeaturesConfig): string[] => {
    return getFeatureDependents(feature);
  }, []);

  /**
   * Check if a feature can be disabled based on its dependents
   */
  const checkIfCanDisable = useCallback((feature: keyof FeaturesConfig): boolean => {
    const dependents = getFeatureDependents(feature);
    // Si no tiene dependientes, se puede deshabilitar
    return dependents.length === 0;
  }, []);

  /**
   * Get all dependencies for a specific feature
   */
  const getFeatureDeps = useCallback((feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
    return getFeatureDependencies(feature);
  }, []);

  /**
   * Check if all dependencies of a feature are enabled
   */
  const checkDependenciesEnabled = useCallback((
    feature: keyof FeaturesConfig, 
    featuresConfig: FeaturesConfig
  ): boolean => {
    const dependencies = getFeatureDependencies(feature);
    return dependencies.every(dep => !!featuresConfig[dep]);
  }, []);

  return {
    getDependentFeatures,
    checkIfCanDisable,
    getFeatureDeps,
    checkDependenciesEnabled
  };
};

export default useFeatureDependencies;
