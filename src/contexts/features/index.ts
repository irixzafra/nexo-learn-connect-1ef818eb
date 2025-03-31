
// Temporary implementation for feature flags
// This file should be replaced with the real feature flags implementation later

/**
 * A simple hook to check if features are enabled
 * This is a temporary implementation and should be replaced with the real one
 */
export const useFeatureFlags = () => {
  // For the sake of functionality, let's enable all features for now
  const isFeatureEnabled = (featureName: string): boolean => {
    // Common features we want to enable by default
    const enabledFeatures = [
      'community',
      'messages', 
      'analytics',
      'finanzas',
      'datos'
    ];
    
    return enabledFeatures.includes(featureName);
  };

  return { isFeatureEnabled };
};
