
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

/**
 * Custom hook to access and manage a specific feature flag
 * @param featureId - The name of the feature to manage
 */
export const useFeature = (featureId?: FeatureId) => {
  const { 
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
          return toggleFeature(featureId, true);
        } else {
          return toggleFeature(featureId, false);
        }
      } else {
        // It's an extended feature
        return toggleExtendedFeature(featureId as ExtendedFeatureId, value);
      }
    } else {
      // Simple toggle
      return toggleFeature(featureId);
    }
  };

  // Check dependencies (placeholder for future implementation)
  const dependencies: string[] = [];
  const dependents: string[] = [];

  return {
    isEnabled: isFeatureActive,
    toggle,
    isLoading,
    dependencies,
    dependents
  };
};

export default useFeature;
