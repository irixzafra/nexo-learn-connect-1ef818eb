
import { useFeatures } from './useFeatures';
import { ExtendedFeatureId } from '@/contexts/features/types';
import { isFeatureEnabled } from '@/utils/featureUtils';

/**
 * Hook to check if a specific feature is enabled
 * @param featureId The ID of the feature to check
 * @returns boolean indicating if the feature is enabled
 */
export const useFeature = (featureId: ExtendedFeatureId): boolean => {
  const { isFeatureEnabled: contextIsFeatureEnabled, featuresConfig } = useFeatures();
  
  // Use either the context method or the utility function as a fallback
  if (typeof contextIsFeatureEnabled === 'function') {
    return contextIsFeatureEnabled(featureId);
  }
  
  return isFeatureEnabled(featuresConfig, featureId);
};

export default useFeature;
