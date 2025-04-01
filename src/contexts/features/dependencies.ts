
import { FeaturesConfig } from './types';

// Define feature dependencies
export const featureDependencies: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
  // General features
  enableDarkMode: [],
  enableNotifications: [],
  enableAnalytics: [],
  enableFeedback: [],
  
  // User features
  enableUserRegistration: [],
  enableSocialLogin: ['enableUserRegistration'],
  enablePublicProfiles: [],

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
  enableDatabaseDevMode: [],

  // Security features
  enable2FA: [],
  enableMultipleSessions: [],
  enablePublicRegistration: ['enableUserRegistration'],
  requireEmailVerification: ['enableUserRegistration'],
  enableActivityLog: [],

  // Test features
  enableTestDataGenerator: [],
  
  // Onboarding features
  enableOnboarding: [],
  enableContextualHelp: [],
  requireOnboarding: ['enableOnboarding']
};

/**
 * Obtiene las dependencias inversas (qué características dependen de una característica dada)
 */
export function getReverseDependencies(): Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> {
  const reverseDeps: Record<string, (keyof FeaturesConfig)[]> = {};

  // Inicializar el objeto de dependencias inversas
  Object.keys(featureDependencies).forEach(feature => {
    reverseDeps[feature] = [];
  });

  // Construir las dependencias inversas
  Object.entries(featureDependencies).forEach(([feature, dependencies]) => {
    dependencies.forEach(dependency => {
      if (reverseDeps[dependency]) {
        reverseDeps[dependency].push(feature as keyof FeaturesConfig);
      }
    });
  });

  return reverseDeps as Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]>;
}

/**
 * Obtiene todas las dependencias de una característica, incluyendo las indirectas
 */
export function getFeatureDependencies(feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] {
  const directDependencies = featureDependencies[feature] || [];
  const allDependencies = new Set<keyof FeaturesConfig>(directDependencies);

  // Función recursiva para añadir dependencias indirectas
  function addIndirectDependencies(deps: (keyof FeaturesConfig)[]) {
    let newDepsAdded = false;
    
    deps.forEach(dep => {
      const indirectDeps = featureDependencies[dep] || [];
      indirectDeps.forEach(indirectDep => {
        if (!allDependencies.has(indirectDep)) {
          allDependencies.add(indirectDep);
          newDepsAdded = true;
        }
      });
    });

    // Si se añadieron nuevas dependencias, verificar sus dependencias también
    if (newDepsAdded) {
      addIndirectDependencies(Array.from(allDependencies));
    }
  }

  addIndirectDependencies(directDependencies);
  return Array.from(allDependencies);
}
