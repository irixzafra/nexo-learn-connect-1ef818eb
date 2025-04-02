
import React from 'react';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

interface NotificationSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  // This is a placeholder component
  return (
    <div>
      <h2>Notification Settings</h2>
      <p>Configure notification settings here</p>
    </div>
  );
};

export default NotificationSettings;
