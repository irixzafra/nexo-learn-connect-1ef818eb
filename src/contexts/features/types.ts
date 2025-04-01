
// Core feature IDs with specific names for type safety
export type CoreFeatureId = 
  | 'core-editing'
  | 'core-publishing'
  | 'core-templates'
  | 'core-media'
  | 'core-users'
  | 'core-settings'
  | 'core-analytics'
  | 'core-backup'
  | 'user-management'
  | 'courses'
  | 'gamification'
  | 'payment-system'
  | 'certificates'
  | 'analytics'
  | 'community'
  | 'theming';

// Extended feature IDs that are boolean flags
export type ExtendedFeatureId = 
  | 'enableDarkMode'
  | 'enableNotifications'
  | 'enableAnalytics'
  | 'enableFeedback'
  | 'enableBetaFeatures'
  | 'enableOfflineMode'
  | 'enableDebugMode'
  | 'enableTestDataGenerator'
  | 'enableAdvancedFilters'
  | 'enableCategoryManagement'
  | 'enableAIFeatures'
  | 'enableMultiLanguage'
  | 'enableGamification'
  | 'enableCommunityFeatures'
  | 'enablePaymentSystem'
  | 'enableThemingOptions'
  | 'enableAdminTools'
  | 'enableLiveChat'
  | 'enableVideoLessons'
  | 'enableCertificates'
  | 'enableCustomBranding'
  | 'enableMobileApp'
  | 'enableEmailNotifications'
  | 'enableProgressTracking'
  | 'enableSocialSharing'
  | 'enableUserFeedback'
  | 'enableLeaderboards'
  | 'enableBadges'
  | 'enableDashboardCustomization'
  | 'enableCodeEditor'
  | 'enableWhiteboardFeature'
  | 'enableGroupClasses'
  | 'enableMentoring'
  | 'enableSubscriptionPause'
  | 'enableGiftSubscriptions'
  | 'enableInlineEditing'
  | 'designSystemEnabled'
  | 'enableThemeSwitcher'
  | 'enableAutoBackups'
  | 'enableQueryCache'
  | 'enableMaintenanceMode'
  | 'enableDatabaseDevMode'
  | 'enable2FA'
  | 'enableMultipleSessions'
  | 'enablePublicRegistration'
  | 'requireEmailVerification'
  | 'enableActivityLog'
  | 'enableOnboarding'
  | 'requireOnboarding'
  | 'autoStartOnboarding'
  | 'showOnboardingTrigger'
  | 'enableContextualHelp'
  | 'enableHreflangTags'
  | 'enableRegionalContent'
  | 'enableLangPrefixUrls';

// Union type for all feature IDs
export type FeatureId = CoreFeatureId | ExtendedFeatureId;

// Feature object interface
export interface Feature {
  id: FeatureId;
  name: string;
  enabled: boolean;
  description?: string;
  isCore?: boolean;
  dependencies?: FeatureId[];
  incompatibleWith?: FeatureId[];
}

// Features configuration
export interface FeaturesConfig {
  features: Record<CoreFeatureId, Feature>;
  
  // Extended features as boolean flags
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
  enableInlineEditing: boolean;
  
  // Settings features
  designSystemEnabled: boolean;
  enableThemeSwitcher: boolean;
  enableAutoBackups: boolean;
  enableQueryCache: boolean;
  enableMaintenanceMode: boolean;
  enableDatabaseDevMode: boolean;
  enable2FA: boolean;
  enableMultipleSessions: boolean;
  enablePublicRegistration: boolean;
  requireEmailVerification: boolean;
  enableActivityLog: boolean;
  enableOnboarding: boolean;
  requireOnboarding: boolean;
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  enableContextualHelp: boolean;
  
  // Internationalization features
  enableHreflangTags: boolean;
  enableRegionalContent: boolean;
  enableLangPrefixUrls: boolean;
}

// Context interface for Features
export interface FeaturesContextProps {
  featuresConfig: FeaturesConfig;
  isEnabled: (featureName: FeatureId) => boolean;
  enableFeature: (featureId: FeatureId) => Promise<void>;
  disableFeature: (featureId: FeatureId) => Promise<void>;
  toggleFeature: (featureId: FeatureId, value?: boolean) => Promise<void>;
  getFeature: (featureName: FeatureId) => Feature | undefined;
  isFeatureEnabled: (featureName: FeatureId) => boolean;
  toggleExtendedFeature: (featureId: ExtendedFeatureId, value?: boolean) => Promise<void>;
  updateFeatures: (features: Partial<FeaturesConfig>) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}
