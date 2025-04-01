
import { FeaturesConfig } from './types';

// Feature dependency mapping
const featureDependencies: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
  // Design system
  designSystemEnabled: [],
  enableDesignSystem: [],
  
  // Content management
  enableContentReordering: [],
  enableCategoryManagement: [],
  enableAdvancedEditor: ['enableContentReordering'],
  
  // UI Customization
  enableThemeSwitcher: [],
  enableMultiLanguage: [],
  enableEditMode: [],
  
  // User management
  enableRoleSwitcher: [],
  enableRoleManagement: [],
  enableCustomRoles: ['enableRoleManagement'],
  enableInvitations: [],
  enablePublicRegistration: [],
  requireEmailVerification: [],
  
  // Onboarding
  enableOnboardingSystem: [],
  showOnboardingTrigger: ['enableOnboardingSystem'],
  autoStartOnboarding: ['enableOnboardingSystem', 'showOnboardingTrigger'],
  
  // Development tools
  enableTestDataGenerator: [],
  enableDatabaseDevMode: [],
  enableMaintenanceMode: [],
  enableQueryCache: [],
  enableAutoBackups: [],
  
  // Notifications
  enableNotifications: [],
  enableRealTimeNotifications: ['enableNotifications'],
  enableEmailNotifications: ['enableNotifications'],
  
  // Security
  enable2FA: [],
  enableMultipleSessions: [],
  enableActivityLog: [],
  
  // Integrations
  enableAI: [],
  enablePublicApi: [],
  enableWebhooks: [],
  
  // Gamification
  enableLeaderboard: []
};

// Get all dependencies for a feature
export const getFeatureDependencies = (feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  return featureDependencies[feature] || [];
};

// Get all features that depend on a specific feature
export const getFeatureDependents = (feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  const dependents: (keyof FeaturesConfig)[] = [];
  
  Object.entries(featureDependencies).forEach(([key, dependencies]) => {
    if (dependencies.includes(feature as keyof FeaturesConfig)) {
      dependents.push(key as keyof FeaturesConfig);
    }
  });
  
  return dependents;
};
