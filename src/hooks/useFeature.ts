
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { FeaturesConfig } from '@/contexts/features/types';

/**
 * Hook personalizado para verificar si una característica específica está habilitada
 * 
 * @param feature - La característica a verificar
 * @returns Un objeto con el estado de la característica y funciones útiles
 */
export function useFeature<K extends keyof FeaturesConfig>(feature: K) {
  const {
    featuresConfig,
    toggleFeature,
    isFeatureEnabled,
    isLoading,
    getFeatureDependencies,
    getFeatureDependents
  } = useFeatures();
  
  const isEnabled = isFeatureEnabled(feature);
  
  // Obtener todas las dependencias
  const dependencies = getFeatureDependencies(feature);
  
  // Obtener todos los dependientes
  const dependents = getFeatureDependents(feature);
  
  // Verificar si se cumplen todas las dependencias
  const areDependenciesMet = dependencies.every(dep => isFeatureEnabled(dep));
  
  // Función para activar o desactivar esta característica específica
  const toggle = async (enabled: boolean) => {
    await toggleFeature(feature, enabled);
  };
  
  // Función para activar esta característica
  const enable = async () => {
    if (!isEnabled) {
      await toggleFeature(feature, true);
    }
  };
  
  // Función para desactivar esta característica
  const disable = async () => {
    if (isEnabled) {
      await toggleFeature(feature, false);
    }
  };
  
  return {
    isEnabled,
    isLoading,
    dependencies,
    dependents,
    areDependenciesMet,
    toggle,
    enable,
    disable
  };
}
