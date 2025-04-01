
export type CoreFeatureId = 
  | 'user-management'
  | 'courses'
  | 'gamification'
  | 'payment-system'
  | 'certificates'
  | 'analytics'
  | 'community'
  | 'theming';

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
  | 'enableInlineEditing' // Nueva opción para la edición inline
  // Otras configuraciones para páginas de configuración
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
  | 'enableContextualHelp';

export type FeatureId = CoreFeatureId | ExtendedFeatureId;

export interface Feature {
  id: CoreFeatureId;
  name: string;
  description: string;
  enabled: boolean;
  isCore?: boolean;
}

export interface FeaturesConfig {
  features: Record<CoreFeatureId, Feature>;
  // Opciones extendidas
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
  enableInlineEditing: boolean; // Nueva opción para la edición inline
  // Opciones adicionales para páginas de configuración
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
}

export interface FeaturesContextProps {
  features: Record<CoreFeatureId, Feature>;
  isEnabled: (featureId: FeatureId) => boolean;
  enableFeature: (featureId: FeatureId) => Promise<void>;
  disableFeature: (featureId: FeatureId) => Promise<void>;
  toggleFeature: (featureId: FeatureId, value?: boolean) => Promise<void>;
  getFeature: (featureId: FeatureId) => Feature | undefined;
  featuresConfig: FeaturesConfig;
  isFeatureEnabled: (featureFlag: ExtendedFeatureId) => boolean;
  toggleExtendedFeature: (featureId: ExtendedFeatureId, value: boolean) => Promise<void>;
  updateFeatures: (config: Partial<FeaturesConfig>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
