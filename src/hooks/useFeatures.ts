
import { useContext, useState, useCallback } from 'react';
import { FeaturesContext } from '@/contexts/FeaturesContext';
import type { ExtendedFeatureId } from '@/contexts/features/types';

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
      context.toggleFeature(featureId);
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
    featuresConfig: {
      // This is a mock until we have actual feature config data
      isLoading,
      enabledFeatures: Object.entries(context.features)
        .filter(([_, enabled]) => enabled)
        .map(([key]) => key),
    },
  };
};

// Export the hook as default
export default useFeatures;
