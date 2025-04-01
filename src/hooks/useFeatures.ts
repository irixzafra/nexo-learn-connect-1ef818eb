
import { useContext } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';
import type { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

/**
 * Custom hook to access feature flags
 */
export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  
  if (!context) {
    console.warn('useFeatures must be used within a FeaturesProvider');
    // Return a default context to prevent crashes when FeaturesProvider is not available
    return {
      features: {},
      featuresConfig: {
        features: {},
        enableInlineEditing: true, // Default to enabled to prevent crashes
      } as FeaturesConfig,
      isEnabled: () => true,
      enableFeature: async () => {},
      disableFeature: async () => {},
      toggleFeature: async () => {},
      getFeature: () => undefined,
      isFeatureEnabled: () => true,
      toggleExtendedFeature: async () => {},
      updateFeatures: async () => {},
      isLoading: false,
      error: null
    };
  }
  
  return context;
};

/**
 * Check if a specific feature is enabled
 * @param featureName The name of the feature to check
 * @returns Boolean indicating if the feature is enabled
 */
export const useFeature = (featureName: FeatureId): boolean => {
  const { featuresConfig, isEnabled } = useFeatures();
  
  if (typeof isEnabled === 'function') {
    return isEnabled(featureName);
  }
  
  if (!featuresConfig) {
    return false;
  }

  // Safe check if it's a core feature
  if (featureName.includes('-') && featuresConfig.features) {
    return !!featuresConfig.features[featureName as keyof typeof featuresConfig.features]?.enabled;
  }
  
  return !!featuresConfig[featureName as keyof FeaturesConfig];
};
