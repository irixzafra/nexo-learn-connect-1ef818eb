
// Define the configuration for system features
export interface FeaturesConfig {
  // Design system
  designSystemEnabled: boolean;
  enableDesignSystem?: boolean;
  
  // Content management
  enableContentReordering: boolean;
  enableCategoryManagement: boolean;
  enableAdvancedEditor?: boolean;
  
  // UI Customization
  enableThemeSwitcher: boolean;
  enableMultiLanguage?: boolean;
  enableEditMode?: boolean;
  
  // User management
  enableRoleSwitcher: boolean;
  enableRoleManagement: boolean;
  enableCustomRoles?: boolean;
  enableInvitations?: boolean;
  enablePublicRegistration?: boolean;
  requireEmailVerification?: boolean;
  
  // Onboarding
  enableOnboardingSystem: boolean;
  showOnboardingTrigger: boolean;
  autoStartOnboarding: boolean;
  
  // Development tools
  enableTestDataGenerator: boolean;
  enableDatabaseDevMode?: boolean;
  enableMaintenanceMode?: boolean;
  enableQueryCache?: boolean;
  enableAutoBackups?: boolean;
  
  // Notifications
  enableNotifications: boolean;
  enableRealTimeNotifications?: boolean;
  enableEmailNotifications?: boolean;
  
  // Security
  enable2FA?: boolean;
  enableMultipleSessions?: boolean;
  enableActivityLog?: boolean;
  
  // Integrations
  enableAI?: boolean;
  enablePublicApi?: boolean;
  enableWebhooks?: boolean;
  
  // Gamification
  enableLeaderboard?: boolean;
}

// Default Features Configuration
export const defaultFeaturesConfig: FeaturesConfig = {
  // Design system
  designSystemEnabled: true,
  enableDesignSystem: true,
  
  // Content management
  enableContentReordering: true,
  enableCategoryManagement: true,
  enableAdvancedEditor: false,
  
  // UI Customization
  enableThemeSwitcher: true,
  enableMultiLanguage: false,
  enableEditMode: true,
  
  // User management
  enableRoleSwitcher: true,
  enableRoleManagement: true,
  enableCustomRoles: false,
  enableInvitations: false,
  enablePublicRegistration: true,
  requireEmailVerification: true,
  
  // Onboarding
  enableOnboardingSystem: true,
  showOnboardingTrigger: true,
  autoStartOnboarding: false,
  
  // Development tools
  enableTestDataGenerator: true,
  enableDatabaseDevMode: false,
  enableMaintenanceMode: false,
  enableQueryCache: true,
  enableAutoBackups: true,
  
  // Notifications
  enableNotifications: true,
  enableRealTimeNotifications: true,
  enableEmailNotifications: true,
  
  // Security
  enable2FA: false,
  enableMultipleSessions: true,
  enableActivityLog: true,
  
  // Integrations
  enableAI: false,
  enablePublicApi: false,
  enableWebhooks: false,
  
  // Gamification
  enableLeaderboard: true
};
