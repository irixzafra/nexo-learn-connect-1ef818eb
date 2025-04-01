
export type FeatureId = keyof FeaturesConfig;
export type CoreFeatureId = 'user-management' | 'courses' | 'gamification' | 'payment-system' | 'certificates' | 'analytics' | 'community' | 'theming';
export type ExtendedFeatureId = Exclude<keyof FeaturesConfig, CoreFeatureId>;

export interface Feature {
  enabled: boolean;
  description?: string;
  id?: CoreFeatureId;
  name?: string;
  isCore?: boolean;
}

export interface FeaturesConfig {
  features: Record<CoreFeatureId, Feature>;
  enableDarkMode: boolean;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  enableFeedback: boolean;
  enableBetaFeatures: boolean;
  enableOfflineMode: boolean;
  enableDebugMode: boolean;
  enableTestDataGenerator: boolean;
  enableAdvancedFilters: boolean;
  enableCategoryManagement: boolean;
  enableAIFeatures: boolean;
  enableMultiLanguage: boolean;
  enableGamification: boolean;
  enableCommunityFeatures: boolean;
  enablePaymentSystem: boolean;
  enableThemingOptions: boolean;
  enableAdminTools: boolean;
  enableLiveChat: boolean;
  enableVideoLessons: boolean;
  enableCertificates: boolean;
  enableCustomBranding: boolean;
  enableMobileApp: boolean;
  enableEmailNotifications: boolean;
  enableProgressTracking: boolean;
  enableSocialSharing: boolean;
  enableUserFeedback: boolean;
  enableLeaderboards: boolean;
  enableBadges: boolean;
  enableDashboardCustomization: boolean;
  enableCodeEditor: boolean;
  enableWhiteboardFeature: boolean;
  enableGroupClasses: boolean;
  enableMentoring: boolean;
  enableSubscriptionPause: boolean;
  enableGiftSubscriptions: boolean;
  // Additional features for Settings pages
  designSystemEnabled?: boolean;
  enableThemeSwitcher?: boolean;
  enableAutoBackups?: boolean;
  enableQueryCache?: boolean;
  enableMaintenanceMode?: boolean;
  enableDatabaseDevMode?: boolean;
  enable2FA?: boolean;
  enableMultipleSessions?: boolean;
  enablePublicRegistration?: boolean;
  requireEmailVerification?: boolean;
  enableActivityLog?: boolean;
  enableOnboarding?: boolean;
  requireOnboarding?: boolean;
  autoStartOnboarding?: boolean;
  showOnboardingTrigger?: boolean;
  enableContextualHelp?: boolean;
}

export interface FeaturesContextProps {
  features: Record<CoreFeatureId, Feature>;
  featuresConfig: FeaturesConfig;
  isEnabled: (featureId: FeatureId) => boolean;
  enableFeature: (featureId: FeatureId) => void;
  disableFeature: (featureId: FeatureId) => void;
  toggleFeature: (featureId: FeatureId, value?: boolean) => void;
  getFeature?: (featureId: FeatureId) => Feature | undefined;
  isFeatureEnabled: (featureFlag: ExtendedFeatureId) => boolean;
  toggleExtendedFeature: (featureId: ExtendedFeatureId, value: boolean) => Promise<void>;
  updateFeatures: (config: Partial<FeaturesConfig>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
