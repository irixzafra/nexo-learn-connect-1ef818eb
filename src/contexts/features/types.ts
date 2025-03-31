
export interface FeatureFlag {
  id: string;
  feature_name: string;
  is_enabled: boolean;
  description: string | null;
  scope: string;
  config: Record<string, any> | null;
  updated_at: string;
  updated_by: string | null;
  created_at: string;
}

export interface FeatureFlagsContextType {
  features: FeatureFlag[];
  isLoading: boolean;
  error: Error | null;
  isFeatureEnabled: (featureName: string) => boolean;
  getFeatureConfig: <T>(featureName: string) => T | null;
  refreshFeatures: () => Promise<void>;
}
