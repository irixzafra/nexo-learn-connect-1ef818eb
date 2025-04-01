
import { useContext } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';
import { FeatureId } from '@/contexts/features/types';

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  
  return context;
};

export const useFeature = (featureId: FeatureId) => {
  const { isEnabled } = useFeatures();
  return isEnabled(featureId);
};
