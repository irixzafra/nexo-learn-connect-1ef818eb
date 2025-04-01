
import { FeaturesConfig } from './types';

/**
 * Este archivo contiene las definiciones de dependencias entre características
 * Las dependencias indican qué características necesitan estar activas para que otra característica funcione
 */

// Lista de características que dependen de otras
export const featureDependencies: Record<keyof FeaturesConfig, Array<keyof FeaturesConfig>> = {
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

  // Data features
  enableAutoBackups: [],
  enableQueryCache: [],
  enableMaintenanceMode: [],
  enableDatabaseDevMode: ['enableMaintenanceMode'],

  // Security features
  enable2FA: [],
  enableMultipleSessions: [],
  enablePublicRegistration: ['enableUserRegistration'],
  requireEmailVerification: ['enableUserRegistration'],
  enableActivityLog: [],

  // Test features
  enableTestDataGenerator: ['enableDatabaseDevMode'],
  
  // Onboarding features
  enableOnboarding: [],
  enableContextualHelp: [],
  requireOnboarding: ['enableOnboarding'],
  
  // Additional properties
  autoStartOnboarding: ['enableOnboarding'],
  showOnboardingTrigger: ['enableOnboarding']
};

// Lista de características que dependen de una característica dada
// Este es el inverso de featureDependencies para facilitar las consultas
export const featureDependents = (() => {
  const result: Record<string, Array<keyof FeaturesConfig>> = {};
  
  // Inicializar todas las características con un array vacío
  Object.keys(featureDependencies).forEach(feature => {
    result[feature] = [];
  });
  
  // Construir el mapa inverso
  Object.entries(featureDependencies).forEach(([feature, dependencies]) => {
    dependencies.forEach(dependency => {
      result[dependency].push(feature as keyof FeaturesConfig);
    });
  });
  
  return result as Record<keyof FeaturesConfig, Array<keyof FeaturesConfig>>;
})();

/**
 * Obtiene la lista de características que dependen de una característica dada
 */
export const getFeatureDependents = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
  return featureDependents[feature] || [];
};

/**
 * Obtiene la lista de características de las que depende una característica dada
 */
export const getFeatureDependencies = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
  return featureDependencies[feature] || [];
};

/**
 * Verifica recursivamente si una característica puede ser desactivada
 * Una característica no puede ser desactivada si otra característica activa depende de ella
 */
export const canDisableFeature = (
  feature: keyof FeaturesConfig, 
  features: FeaturesConfig, 
  visited: Set<keyof FeaturesConfig> = new Set()
): boolean => {
  // Evitar bucles infinitos
  if (visited.has(feature)) {
    return true;
  }
  
  visited.add(feature);
  
  // Comprobar dependientes directos
  for (const dependent of featureDependents[feature] || []) {
    // Si el dependiente está activo, no podemos desactivar esta característica
    if (features[dependent]) {
      return false;
    }
    
    // Comprobar dependientes indirectos (recursivamente)
    if (!canDisableFeature(dependent, features, visited)) {
      return false;
    }
  }
  
  return true;
};

/**
 * Verifica si una característica puede ser activada
 * Una característica no puede ser activada si alguna de sus dependencias está desactivada
 */
export const canEnableFeature = (feature: keyof FeaturesConfig, features: FeaturesConfig): boolean => {
  // Comprobar si todas las dependencias están activas
  for (const dependency of featureDependencies[feature] || []) {
    if (!features[dependency]) {
      return false;
    }
  }
  
  return true;
};
