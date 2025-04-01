
import { FeatureId } from './types';

/**
 * Define dependencies between features
 * The key is the feature that depends on the values
 */
export const featureDependencies: Record<string, FeatureId[]> = {
  // Core features
  'user-management': [],
  'courses': ['user-management' as FeatureId],
  'gamification': ['courses' as FeatureId],
  'payment-system': ['user-management' as FeatureId],
  'certificates': ['courses' as FeatureId],
  'analytics': ['courses' as FeatureId],
  'community': ['user-management' as FeatureId],
  'theming': [],
  
  // Extended features
  'enableDarkMode': ['enableThemingOptions'],
  'enableNotifications': [],
  'enableAnalytics': ['enableAnalytics'],
  'enableFeedback': [],
  'enableUserRegistration': ['enableAdminTools'],
  'enableSocialLogin': ['enableAdminTools'],
  'enablePublicProfiles': ['enableAdminTools'],
  'designSystemEnabled': ['enableThemingOptions'],
  'enableThemeSwitcher': ['enableThemingOptions'],
  'enableMultiLanguage': [],
  'enableAdvancedEditor': ['enableCategoryManagement'],
  'enableContentReordering': ['enableCategoryManagement'],
  'enableCategoryManagement': [],
  'enableLeaderboards': ['enableGamification'],
  'enableAutoBackups': [],
  'enableQueryCache': [],
  'enableMaintenanceMode': [],
  'enableDatabaseDevMode': [],
  'enable2FA': ['enableAdminTools'],
  'enableMultipleSessions': ['enableAdminTools'],
  'enablePublicRegistration': ['enableAdminTools'],
  'requireEmailVerification': ['enableAdminTools'],
  'enableActivityLog': [],
  'enableTestDataGenerator': [],
  'enableOnboarding': [],
  'enableContextualHelp': [],
  'requireOnboarding': ['enableOnboarding'],
  'autoStartOnboarding': ['enableOnboarding'],
  'showOnboardingTrigger': ['enableOnboarding'],
  'enableRoleManagement': ['enableAdminTools'],
  'enableRoleSwitcher': ['enableRoleManagement']
};

/**
 * Get all required dependencies for a feature
 * @param featureId The feature ID to check dependencies for
 * @returns Array of feature IDs that are required
 */
export const getFeatureDependencies = (featureId: FeatureId): FeatureId[] => {
  return featureDependencies[featureId as string] || [];
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
