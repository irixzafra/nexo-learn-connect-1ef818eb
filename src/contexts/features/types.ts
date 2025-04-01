
export interface FeaturesConfig {
  // Interface features
  enableDarkMode: boolean;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  enableFeedback: boolean;
  
  // User features
  enableUserRegistration: boolean;
  enableSocialLogin: boolean;
  enablePublicProfiles: boolean;
  
  // Design system
  designSystemEnabled: boolean;
  enableThemeSwitcher: boolean;
  enableMultiLanguage: boolean;
  
  // Content features
  enableAdvancedEditor: boolean;
  enableContentReordering: boolean;
  enableCategoryManagement: boolean;
  enableLeaderboard: boolean;
  
  // Technical features
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
  
  // Development features
  enableTestDataGenerator: boolean;
  
  // Onboarding features
  enableOnboarding: boolean;
  enableContextualHelp: boolean;
  requireOnboarding: boolean;
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  
  // Role management
  enableRoleManagement: boolean;
  enableRoleSwitcher: boolean;
}

export const defaultFeaturesConfig: FeaturesConfig = {
  // Interface features
  enableDarkMode: true,
  enableNotifications: true,
  enableAnalytics: true,
  enableFeedback: true,
  
  // User features
  enableUserRegistration: true,
  enableSocialLogin: false,
  enablePublicProfiles: false,
  
  // Design system
  designSystemEnabled: true,
  enableThemeSwitcher: true,
  enableMultiLanguage: false,
  
  // Content features
  enableAdvancedEditor: false,
  enableContentReordering: false,
  enableCategoryManagement: false,
  enableLeaderboard: false,
  
  // Technical features
  enableAutoBackups: false,
  enableQueryCache: true,
  enableMaintenanceMode: false,
  enableDatabaseDevMode: false,
  
  // Security features
  enable2FA: false,
  enableMultipleSessions: true,
  enablePublicRegistration: true,
  requireEmailVerification: true,
  enableActivityLog: true,
  
  // Development features
  enableTestDataGenerator: false,
  
  // Onboarding features
  enableOnboarding: true,
  enableContextualHelp: true,
  requireOnboarding: false,
  autoStartOnboarding: true,
  showOnboardingTrigger: true,
  
  // Role management
  enableRoleManagement: true,
  enableRoleSwitcher: true
};
