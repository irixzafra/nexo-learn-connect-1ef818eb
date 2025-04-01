
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { FeaturesConfig } from '@/contexts/features/types';

/**
 * Custom hook to access and manage feature flags
 */
export const useFeature = (featureName: keyof FeaturesConfig) => {
  const { 
    featuresConfig, 
    toggleFeature,
    isFeatureEnabled,
    isLoading,
    getFeatureDependencies,
    getFeatureDependents
  } = useFeatures();

  // Get the current state of the feature
  const isEnabled = !!featuresConfig[featureName];

  // Toggle the feature
  const toggle = (value: boolean) => toggleFeature(featureName, value);

  // Check dependencies
  const dependencies = getFeatureDependencies(featureName);
  const dependents = getFeatureDependents(featureName);

  return {
    isEnabled,
    toggle,
    isLoading,
    dependencies,
    dependents
  };
};

export default useFeature;
