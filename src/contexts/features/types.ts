
// Define the configuration for system features
export interface FeaturesConfig {
  // Design system
  designSystemEnabled: boolean;
  
  // Content management
  enableContentReordering: boolean;
  enableCategoryManagement: boolean;
  
  // UI Customization
  enableThemeSwitcher: boolean;
  
  // User management
  enableRoleSwitcher: boolean;
  enableRoleManagement: boolean;
  
  // Onboarding
  enableOnboardingSystem: boolean;
  showOnboardingTrigger: boolean;
  autoStartOnboarding: boolean;
  
  // Development tools
  enableTestDataGenerator: boolean;
  
  // Notifications
  enableNotifications: boolean;
}
