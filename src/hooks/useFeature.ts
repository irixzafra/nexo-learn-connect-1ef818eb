
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { ExtendedFeatureId, FeatureId } from '@/contexts/features/types';
import { getFeatureDependencies, getFeatureDependents } from '@/contexts/features/dependencies';

/**
 * Custom hook to access and manage a specific feature flag
 * @param featureId - The name of the feature to manage
 */
export const useFeature = (featureId?: FeatureId) => {
  const { 
    features,
    featuresConfig, 
    isEnabled,
    toggleFeature,
    toggleExtendedFeature,
    isFeatureEnabled,
    isLoading,
    updateFeatures
  } = useFeatures();

  // If no feature name is provided, return the context data
  if (!featureId) {
    return {
      features,
      featuresConfig,
      updateFeatures,
      isLoading
    };
  }

  // Get the current state of the feature
  const isFeatureActive = isEnabled(featureId);

  // Toggle the feature
  const toggle = (value?: boolean) => {
    if (typeof value === 'boolean') {
      if (Object.keys(featuresConfig.features).includes(featureId as string)) {
        // It's a core feature
        if (value) {
          return Promise.resolve(enableFeature(featureId));
        } else {
          return Promise.resolve(disableFeature(featureId));
        }
      } else {
        // It's an extended feature
        return toggleExtendedFeature(featureId as ExtendedFeatureId, value);
      }
    } else {
      // Simple toggle
      toggleFeature(featureId);
      return Promise.resolve();
    }
  };

  // Check dependencies
  const dependencies = getFeatureDependencies(featureId);
  const dependents = getFeatureDependents(featureId);

  return {
    isEnabled: isFeatureActive,
    toggle,
    isLoading,
    dependencies,
    dependents
  };
};

export default useFeature;
