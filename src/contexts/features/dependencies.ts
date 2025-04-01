
import { FeaturesConfig } from './types';

/**
 * Maps of dependencies between features
 */
export const featureDependencies: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
  // Interface
  enableDarkMode: [],
  enableNotifications: [],
  enableAnalytics: [],
  enableFeedback: [],
  
  // User features
  enableUserRegistration: [],
  enableSocialLogin: ['enableUserRegistration'],
  enablePublicProfiles: ['enableUserRegistration'],
  
  // Design system
  designSystemEnabled: [],
  enableThemeSwitcher: ['designSystemEnabled'],
  enableMultiLanguage: [],
  
  // Content features
  enableAdvancedEditor: [],
  enableContentReordering: [],
  enableCategoryManagement: [],
  enableLeaderboard: [],
  
  // Technical features
  enableAutoBackups: [],
  enableQueryCache: [],
  enableMaintenanceMode: [],
  enableDatabaseDevMode: [],
  
  // Security features
  enable2FA: ['enableUserRegistration'],
  enableMultipleSessions: ['enableUserRegistration'],
  enablePublicRegistration: ['enableUserRegistration'],
  requireEmailVerification: ['enableUserRegistration'],
  enableActivityLog: [],
  
  // Development features
  enableTestDataGenerator: [],
  
  // Onboarding features
  enableOnboarding: [],
  enableContextualHelp: [],
  requireOnboarding: ['enableOnboarding'],
  autoStartOnboarding: ['enableOnboarding'],
  showOnboardingTrigger: ['enableOnboarding'],
  
  // Role management
  enableRoleManagement: [],
  enableRoleSwitcher: ['enableRoleManagement']
};

/**
 * Generate the reverse mapping of feature dependents
 */
export const featureDependents: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = (() => {
  const result: Record<string, (keyof FeaturesConfig)[]> = {};
  
  // Initialize all features with empty arrays
  Object.keys(featureDependencies).forEach(key => {
    result[key] = [];
  });
  
  // Build the reverse mapping
  Object.entries(featureDependencies).forEach(([feature, dependencies]) => {
    dependencies.forEach(dependency => {
      if (result[dependency]) {
        result[dependency].push(feature as keyof FeaturesConfig);
      }
    });
  });
  
  return result as Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]>;
})();

/**
 * Gets the list of feature dependencies for a given feature
 */
export const getFeatureDependencies = (featureKey: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  return featureDependencies[featureKey] || [];
};

/**
 * Gets the list of features that depend on a given feature
 */
export const getFeatureDependents = (featureKey: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  return featureDependents[featureKey] || [];
};

/**
 * Gets a human-readable description of dependency relationship
 */
export const getDependencyDescription = (feature: keyof FeaturesConfig, dependency: keyof FeaturesConfig): string => {
  const descriptions: Record<string, string> = {
    'enableUserRegistration_enableSocialLogin': 'El inicio de sesión social requiere que el registro de usuarios esté habilitado',
    'enableUserRegistration_enablePublicProfiles': 'Los perfiles públicos requieren que el registro de usuarios esté habilitado',
    'enableUserRegistration_enable2FA': 'La autenticación de dos factores requiere que el registro de usuarios esté habilitado',
    'enableUserRegistration_enableMultipleSessions': 'Las sesiones múltiples requieren que el registro de usuarios esté habilitado',
    'enableUserRegistration_enablePublicRegistration': 'El registro público requiere que el registro de usuarios esté habilitado',
    'enableUserRegistration_requireEmailVerification': 'La verificación de email requiere que el registro de usuarios esté habilitado',
    'designSystemEnabled_enableThemeSwitcher': 'El selector de temas requiere que el sistema de diseño esté habilitado',
    'enableOnboarding_requireOnboarding': 'Requerir onboarding necesita que el sistema de onboarding esté habilitado',
    'enableOnboarding_autoStartOnboarding': 'El inicio automático de onboarding requiere que el sistema de onboarding esté habilitado',
    'enableOnboarding_showOnboardingTrigger': 'El botón de onboarding requiere que el sistema de onboarding esté habilitado',
    'enableRoleManagement_enableRoleSwitcher': 'El selector de roles requiere que la gestión de roles esté habilitada'
  };
  
  const key = `${dependency}_${feature}`;
  return descriptions[key] || `Esta característica depende de ${dependency}`;
};
