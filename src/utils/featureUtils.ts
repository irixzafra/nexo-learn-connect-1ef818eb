
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

/**
 * Safely check if a feature is enabled in a features config
 * @param config The features configuration object
 * @param featureId The ID of the feature to check
 * @returns boolean indicating if the feature is enabled
 */
export const isFeatureEnabled = (
  config: FeaturesConfig | Record<string, any>, 
  featureId: ExtendedFeatureId | FeatureId
): boolean => {
  if (!config) return false;
  
  // If it's a core feature in the features map
  if (featureId.includes('-') && config.features) {
    return !!config.features[featureId]?.enabled;
  }
  
  // Check if it's a boolean flag directly on the config object
  return !!config[featureId];
};

/**
 * Create a type-safe promise-returning toggle function
 * @param toggleFn The original toggle function that might not return a promise
 * @returns A function that always returns a Promise
 */
export const createSafeToggleFunction = (
  toggleFn: (featureId: ExtendedFeatureId | FeatureId, value?: boolean) => void | Promise<void>
): (featureId: ExtendedFeatureId | FeatureId, value?: boolean) => Promise<void> => {
  return async (featureId: ExtendedFeatureId | FeatureId, value?: boolean): Promise<void> => {
    const result = toggleFn(featureId, value);
    // Ensure we always return a Promise
    if (result instanceof Promise) {
      return result;
    }
    return Promise.resolve();
  };
};
