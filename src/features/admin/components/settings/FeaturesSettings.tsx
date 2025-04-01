
import React from 'react';
import { useFeatures } from '@/hooks/useFeatures';
import { FeatureManagement } from '@/components/admin/features/FeatureManagement';

export const FeaturesSettings: React.FC = () => {
  return <FeatureManagement />;
};

export default FeaturesSettings;
