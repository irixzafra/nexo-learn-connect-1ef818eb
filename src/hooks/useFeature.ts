
import { useFeatures } from '@/contexts/features/FeaturesContext';
import type { FeatureId } from '@/contexts/features/types';

/**
 * Custom hook to check if a feature is enabled
 * @param featureId - The ID of the feature to check
 * @returns boolean indicating whether the feature is enabled
 */
export const useFeature = (featureId: FeatureId): boolean => {
  const { isEnabled } = useFeatures();
  return isEnabled(featureId);
};

export default useFeature;
