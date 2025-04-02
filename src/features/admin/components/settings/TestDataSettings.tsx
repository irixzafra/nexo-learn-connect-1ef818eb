
import React from 'react';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

interface TestDataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

const TestDataSettings: React.FC<TestDataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  // This is a placeholder component
  return (
    <div>
      <h2>Test Data Settings</h2>
      <p>Configure test data generation settings here</p>
    </div>
  );
};

export default TestDataSettings;
