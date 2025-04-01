
export type CoreFeatureId = 
  | 'user-management' 
  | 'courses' 
  | 'gamification' 
  | 'payment-system' 
  | 'certificates' 
  | 'analytics' 
  | 'community' 
  | 'theming';

// Extended feature flags for more granular controls
export type ExtendedFeatureId =
  | 'enableDarkMode'
  | 'enableNotifications'
  | 'enableAnalytics'
  | 'enableFeedback'
  | 'enableUserRegistration'
  | 'enableSocialLogin'
  | 'enablePublicProfiles'
  | 'designSystemEnabled'
  | 'enableThemeSwitcher'
  | 'enableMultiLanguage'
  | 'enableAdvancedEditor'
  | 'enableContentReordering'
  | 'enableCategoryManagement'
  | 'enableLeaderboard'
  | 'enableAutoBackups'
  | 'enableQueryCache'
  | 'enableMaintenanceMode'
  | 'enableDatabaseDevMode'
  | 'enable2FA'
  | 'enableMultipleSessions'
  | 'enablePublicRegistration'
  | 'requireEmailVerification'
  | 'enableActivityLog'
  | 'enableTestDataGenerator'
  | 'enableOnboarding'
  | 'enableContextualHelp'
  | 'requireOnboarding'
  | 'autoStartOnboarding'
  | 'showOnboardingTrigger'
  | 'enableRoleManagement'
  | 'enableRoleSwitcher';

// Combined type for all feature IDs
export type FeatureId = CoreFeatureId | ExtendedFeatureId;

export interface Feature {
  id: FeatureId;
  name: string;
  description: string;
  enabled: boolean;
  isCore?: boolean;
}

export interface FeaturesConfig {
  features: Record<CoreFeatureId, Feature>;
  // Extended feature flags can be accessed directly as boolean values
  [key: string]: boolean | Record<CoreFeatureId, Feature>;
}

export interface FeaturesContextProps {
  features: Record<CoreFeatureId, Feature>;
  isEnabled: (featureId: FeatureId) => boolean;
  enableFeature: (featureId: FeatureId) => void;
  disableFeature: (featureId: FeatureId) => void;
  toggleFeature: (featureId: FeatureId) => void;
  getFeature: (featureId: FeatureId) => Feature | undefined;
  // Additional props for extended features
  featuresConfig: FeaturesConfig;
  isFeatureEnabled: (featureFlag: ExtendedFeatureId) => boolean;
  toggleExtendedFeature: (featureFlag: ExtendedFeatureId, value: boolean) => Promise<void>;
  updateFeatures: (config: Partial<FeaturesConfig>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export type FeatureGroup = {
  title: string;
  description: string;
  features: FeatureId[];
};

// Add a default config with empty features record
export const defaultFeaturesConfig: FeaturesConfig = {
  features: {} as Record<CoreFeatureId, Feature>
};
