
export type FeatureId = keyof FeaturesConfig;

export interface Feature {
  enabled: boolean;
  description?: string;
}

export interface FeaturesConfig {
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
}
