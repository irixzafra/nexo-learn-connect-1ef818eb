
import { useContext } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';
import type { FeaturesConfig } from '@/contexts/features/types';

/**
 * Custom hook to access feature flags
 */
export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  
  return context;
};

/**
 * Check if a specific feature is enabled
 * @param featureName The name of the feature to check
 * @returns Boolean indicating if the feature is enabled
 */
export const useFeature = (featureName: keyof FeaturesConfig): boolean => {
  const { featuresConfig } = useFeatures();
  return !!featuresConfig[featureName];
};
