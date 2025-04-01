
export type FeatureId = 
  | 'user-management' 
  | 'courses' 
  | 'gamification' 
  | 'payment-system' 
  | 'certificates' 
  | 'analytics' 
  | 'community' 
  | 'theming';

export interface Feature {
  id: FeatureId;
  name: string;
  description: string;
  enabled: boolean;
  isCore?: boolean;
}

export interface FeaturesConfig {
  features: Record<FeatureId, Feature>;
}

export interface FeaturesContextProps {
  features: Record<FeatureId, Feature>;
  isEnabled: (featureId: FeatureId) => boolean;
  enableFeature: (featureId: FeatureId) => void;
  disableFeature: (featureId: FeatureId) => void;
  toggleFeature: (featureId: FeatureId) => void;
  getFeature: (featureId: FeatureId) => Feature | undefined;
}

export type FeatureGroup = {
  title: string;
  description: string;
  features: FeatureId[];
};
