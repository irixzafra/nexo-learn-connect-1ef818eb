
import { FeaturesConfig } from './types';

/**
 * Gets the list of feature dependencies for a given feature
 */
export const getFeatureDependencies = (featureKey: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  const dependencies: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
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
  
  return dependencies[featureKey] || [];
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
