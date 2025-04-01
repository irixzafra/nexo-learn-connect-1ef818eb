
import { FeaturesConfig } from './types';

// Define feature dependencies - what features are required for each feature
export const featureDependencies: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
  // General features
  enableDarkMode: [],
  enableNotifications: [],
  enableAnalytics: [],
  enableFeedback: [],
  
  // User features
  enableUserRegistration: [],
  enableSocialLogin: ['enableUserRegistration'],
  enablePublicProfiles: ['enableUserRegistration'],

  // Design system features
  designSystemEnabled: [],
  enableThemeSwitcher: ['designSystemEnabled'],
  enableMultiLanguage: [],

  // Content features
  enableAdvancedEditor: [],
  enableContentReordering: [],
  enableCategoryManagement: [],
  enableLeaderboard: [],
  enableNestedCategories: ['enableCategoryManagement'],

  // Data features
  enableAutoBackups: [],
  enableQueryCache: [],
  enableMaintenanceMode: [],
  enableDatabaseDevMode: [],

  // Security features
  enable2FA: [],
  enableMultipleSessions: [],
  enablePublicRegistration: [],
  requireEmailVerification: [],
  enableActivityLog: [],

  // Test features
  enableTestDataGenerator: [],
  
  // Onboarding features
  enableOnboarding: [],
  enableContextualHelp: [],
  requireOnboarding: ['enableOnboarding'],
  
  // Additional properties
  autoStartOnboarding: ['enableOnboarding'],
  showOnboardingTrigger: ['enableOnboarding']
};

// Define feature dependents - what features depend on each feature
export const featureDependents: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
  // Generate dependents based on dependencies
  ...Object.fromEntries(
    Object.keys(featureDependencies).map((key) => [key, []])
  ),
};

// Fill dependents based on dependencies
Object.entries(featureDependencies).forEach(([feature, deps]) => {
  deps.forEach((dep) => {
    if (featureDependents[dep]) {
      featureDependents[dep].push(feature as keyof FeaturesConfig);
    }
  });
});
