
export interface FeaturesConfig {
  // General features
  enableDarkMode: boolean;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  enableFeedback: boolean;
  
  // User features
  enableUserRegistration: boolean;
  enableSocialLogin: boolean;
  enablePublicProfiles: boolean;

  // Design system features
  designSystemEnabled: boolean;
  enableThemeSwitcher: boolean;
  enableMultiLanguage: boolean;

  // Content features
  enableAdvancedEditor: boolean;
  enableContentReordering: boolean;
  enableCategoryManagement: boolean;
  enableLeaderboard: boolean;

  // Data features
  enableAutoBackups: boolean;
  enableQueryCache: boolean;
  enableMaintenanceMode: boolean;
  enableDatabaseDevMode: boolean;

  // Security features
  enable2FA: boolean;
  enableMultipleSessions: boolean;
  enablePublicRegistration: boolean;
  requireEmailVerification: boolean;
  enableActivityLog: boolean;

  // Test features
  enableTestDataGenerator: boolean;
  
  // Onboarding features
  enableOnboarding: boolean;
  enableContextualHelp: boolean;
  requireOnboarding: boolean;
}

export interface FeaturesContextProps {
  features: FeaturesConfig;
  isLoading: boolean;
  error: Error | null;
  updateFeatures: (newFeatures: FeaturesConfig) => Promise<void>;
  reloadFeatures: () => Promise<void>;
}
