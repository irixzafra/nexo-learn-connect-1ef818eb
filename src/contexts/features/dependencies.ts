
import { CoreFeatureId, ExtendedFeatureId, FeatureId } from './types';

/**
 * Define dependencies between features
 * The key is the feature that depends on the values
 */
export const featureDependencies: Record<FeatureId, FeatureId[]> = {
  // Core features
  'user-management': [],
  'courses': ['user-management'],
  'gamification': ['courses'],
  'payment-system': ['user-management'],
  'certificates': ['courses'],
  'analytics': ['courses'],
  'community': ['user-management'],
  'theming': [],
  
  // Extended features
  'enableDarkMode': ['theming'],
  'enableNotifications': [],
  'enableAnalytics': ['analytics'],
  'enableFeedback': [],
  'enableUserRegistration': ['user-management'],
  'enableSocialLogin': ['user-management'],
  'enablePublicProfiles': ['user-management'],
  'designSystemEnabled': ['theming'],
  'enableThemeSwitcher': ['theming'],
  'enableMultiLanguage': [],
  'enableAdvancedEditor': ['courses'],
  'enableContentReordering': ['courses'],
  'enableCategoryManagement': ['courses'],
  'enableLeaderboard': ['gamification'],
  'enableAutoBackups': [],
  'enableQueryCache': [],
  'enableMaintenanceMode': [],
  'enableDatabaseDevMode': [],
  'enable2FA': ['user-management'],
  'enableMultipleSessions': ['user-management'],
  'enablePublicRegistration': ['user-management'],
  'requireEmailVerification': ['user-management'],
  'enableActivityLog': [],
  'enableTestDataGenerator': [],
  'enableOnboarding': [],
  'enableContextualHelp': [],
  'requireOnboarding': ['enableOnboarding'],
  'autoStartOnboarding': ['enableOnboarding'],
  'showOnboardingTrigger': ['enableOnboarding'],
  'enableRoleManagement': ['user-management'],
  'enableRoleSwitcher': ['enableRoleManagement']
};

/**
 * Get all required dependencies for a feature
 * @param featureId The feature ID to check dependencies for
 * @returns Array of feature IDs that are required
 */
export const getFeatureDependencies = (featureId: FeatureId): FeatureId[] => {
  return featureDependencies[featureId] || [];
};

/**
 * Get all features that depend on a specific feature
 * @param featureId The feature ID to check dependents for
 * @returns Array of feature IDs that depend on the specified feature
 */
export const getFeatureDependents = (featureId: FeatureId): FeatureId[] => {
  return Object.entries(featureDependencies)
    .filter(([_, deps]) => deps.includes(featureId))
    .map(([id]) => id as FeatureId);
};

/**
 * Get a human-readable description of a dependency
 * @param featureId The feature that has the dependency
 * @param dependencyId The dependency to describe
 * @returns A human-readable description
 */
export const getDependencyDescription = (featureId: FeatureId, dependencyId: FeatureId): string => {
  return `Para activar "${featureId}" primero debe activar "${dependencyId}"`;
};
