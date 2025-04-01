
import { useContext, useState, useCallback } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';
import type { ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

/**
 * Hook to access and manage feature flags
 */
export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }

  // Extend the context with loading state
  const toggleFeature = useCallback(async (featureId: ExtendedFeatureId, value?: boolean) => {
    setIsLoading(true);
    try {
      await context.toggleFeature(featureId, value);
      // If there was additional async logic needed, it would go here
      return Promise.resolve();
    } catch (error) {
      console.error('Error toggling feature:', error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  return {
    ...context,
    isLoading,
    toggleFeature,
    featuresConfig: context.featuresConfig,
  };
};

// Create a useFeature hook specifically for accessing single features
export const useFeature = (featureId: FeatureId) => {
  const { isEnabled } = useFeatures();
  return isEnabled(featureId);
};

// Export the hook as default
export default useFeatures;
