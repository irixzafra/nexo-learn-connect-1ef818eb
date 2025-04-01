
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { FeaturesConfig } from '@/contexts/features/types';

/**
 * Custom hook to access and manage a specific feature flag
 * @param featureName - The name of the feature to manage
 */
export const useFeature = (featureName?: keyof FeaturesConfig) => {
  const { 
    features,
    featuresConfig, 
    toggleFeature,
    isFeatureEnabled,
    isLoading,
    updateFeatures,
    getFeatureDependencies,
    getFeatureDependents
  } = useFeatures();

  // If no feature name is provided, return the context data
  if (!featureName) {
    return {
      features,
      updateFeatures,
      isLoading
    };
  }

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
