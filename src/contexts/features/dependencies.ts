
import { FeaturesConfig } from './types';

// Define el grafo de dependencias entre características
// La clave es la característica dependiente, el valor es un array de características de las que depende
export const featureDependencies: Partial<Record<keyof FeaturesConfig, Array<keyof FeaturesConfig>>> = {
  // Onboarding
  autoStartOnboarding: ['enableOnboardingSystem'],
  showOnboardingTrigger: ['enableOnboardingSystem'],
  
  // UI
  enableContentReordering: ['enableEditMode'],
  
  // Notificaciones específicas dependen del sistema general de notificaciones
  enableRealTimeNotifications: ['enableNotifications'],
  enableEmailNotifications: ['enableNotifications'],
  
  // Características avanzadas de usuario dependen de la gestión de roles
  enableCustomRoles: ['enableRoleManagement'],
  enableRoleSwitcher: ['enableRoleManagement'],

  // Otros sistemas dependen de características base
  enableCategoryManagement: ['enableContentManagement']
};

/**
 * Obtiene todas las características que dependen directamente de la característica proporcionada
 */
export function getDirectDependents(feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> {
  return Object.entries(featureDependencies)
    .filter(([_, dependencies]) => dependencies.includes(feature))
    .map(([dependent]) => dependent as keyof FeaturesConfig);
}

/**
 * Obtiene todas las características que dependen directa o indirectamente de la característica proporcionada
 */
export function getAllDependents(feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> {
  const directDependents = getDirectDependents(feature);
  const allDependents = [...directDependents];
  
  // Recursivamente obtener todos los dependientes
  directDependents.forEach(dependent => {
    const nestedDependents = getAllDependents(dependent);
    nestedDependents.forEach(nested => {
      if (!allDependents.includes(nested)) {
        allDependents.push(nested);
      }
    });
  });
  
  return allDependents;
}

/**
 * Obtiene todas las dependencias directas de una característica
 */
export function getDirectDependencies(feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> {
  return featureDependencies[feature] || [];
}

/**
 * Obtiene todas las dependencias (directas e indirectas) de una característica
 */
export function getAllDependencies(feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> {
  const directDeps = getDirectDependencies(feature);
  const allDeps = [...directDeps];
  
  // Recursivamente obtener todas las dependencias
  directDeps.forEach(dependency => {
    const nestedDeps = getAllDependencies(dependency);
    nestedDeps.forEach(nested => {
      if (!allDeps.includes(nested)) {
        allDeps.push(nested);
      }
    });
  });
  
  return allDeps;
}

/**
 * Verifica si todas las dependencias de una característica están habilitadas
 */
export function areDependenciesMet(
  feature: keyof FeaturesConfig, 
  config: FeaturesConfig
): boolean {
  const dependencies = getDirectDependencies(feature);
  return dependencies.every(dependency => config[dependency]);
}

/**
 * Aplica automáticamente las reglas de dependencia al cambiar una característica
 * Si se deshabilita una característica, deshabilita todas las que dependen de ella
 * Si se habilita una característica, habilita todas de las que depende
 */
export function applyDependencyRules(
  featureToUpdate: keyof FeaturesConfig,
  newValue: boolean,
  currentConfig: FeaturesConfig
): FeaturesConfig {
  const newConfig = { ...currentConfig };
  newConfig[featureToUpdate] = newValue;
  
  // Si estamos desactivando una característica
  if (!newValue) {
    // Desactivar también todas las que dependen de ella
    const dependents = getAllDependents(featureToUpdate);
    dependents.forEach(dependent => {
      newConfig[dependent] = false;
    });
  } 
  // Si estamos activando una característica
  else {
    // Activar todas las dependencias requeridas
    const dependencies = getAllDependencies(featureToUpdate);
    dependencies.forEach(dependency => {
      newConfig[dependency] = true;
    });
  }
  
  return newConfig;
}
