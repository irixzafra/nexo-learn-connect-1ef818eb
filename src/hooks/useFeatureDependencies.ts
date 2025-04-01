
import { useFeatures } from '@/contexts/features/FeatureContext';
import { featureDependencies, getReverseDependencies } from '@/contexts/features/dependencies';
import { FeaturesConfig } from '@/contexts/features/types';

/**
 * Hook para manejar las dependencias entre características del sistema
 */
export const useFeatureDependencies = () => {
  const { features } = useFeatures();
  
  // Obtener características que dependen de una característica dada
  const reverseDependencies = getReverseDependencies();
  
  /**
   * Verifica si una característica puede ser desactivada
   * No se puede desactivar si hay características activas que dependen de ella
   */
  const checkIfCanDisable = (feature: keyof FeaturesConfig): boolean => {
    const dependents = reverseDependencies[feature];
    
    // Si no hay dependientes, siempre se puede desactivar
    if (!dependents || dependents.length === 0) {
      return true;
    }
    
    // Verificar si alguna de las características dependientes está activa
    for (const dependent of dependents) {
      if (features && features[dependent]) {
        return false;
      }
    }
    
    return true;
  };
  
  /**
   * Obtiene la lista de características que dependen de una característica dada
   */
  const getDependentFeatures = (feature: keyof FeaturesConfig): string[] => {
    return reverseDependencies[feature] || [];
  };
  
  /**
   * Obtiene la lista de características de las que depende una característica dada
   */
  const getDependencies = (feature: keyof FeaturesConfig): string[] => {
    return featureDependencies[feature] || [];
  };
  
  /**
   * Verifica si una característica puede ser activada
   * No se puede activar si alguna de sus dependencias está desactivada
   */
  const checkIfCanEnable = (feature: keyof FeaturesConfig): boolean => {
    const dependencies = featureDependencies[feature];
    
    // Si no hay dependencias, siempre se puede activar
    if (!dependencies || dependencies.length === 0) {
      return true;
    }
    
    // Verificar si todas las dependencias están activas
    for (const dependency of dependencies) {
      if (features && !features[dependency]) {
        return false;
      }
    }
    
    return true;
  };
  
  return {
    checkIfCanDisable,
    checkIfCanEnable,
    getDependentFeatures,
    getDependencies
  };
};
