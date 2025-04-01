
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { getFeatureDependencies, getFeatureDependents } from '@/contexts/features/dependencies';
import { FeatureId } from '@/contexts/features/types';

/**
 * Hook para manejar las dependencias entre características del sistema
 */
export const useFeatureDependencies = () => {
  const { isEnabled } = useFeatures();
  
  /**
   * Verifica si una característica puede ser desactivada
   * No se puede desactivar si hay características activas que dependen de ella
   */
  const checkIfCanDisable = (feature: FeatureId): boolean => {
    const dependents = getFeatureDependents(feature);
    
    // Si no hay dependientes, siempre se puede desactivar
    if (!dependents || dependents.length === 0) {
      return true;
    }
    
    // Verificar si alguna de las características dependientes está activa
    for (const dependent of dependents) {
      if (isEnabled(dependent)) {
        return false;
      }
    }
    
    return true;
  };
  
  /**
   * Obtiene la lista de características que dependen de una característica dada
   */
  const getDependentFeatures = (feature: FeatureId): FeatureId[] => {
    return getFeatureDependents(feature) || [];
  };
  
  /**
   * Obtiene la lista de características de las que depende una característica dada
   */
  const getDependencies = (feature: FeatureId): FeatureId[] => {
    return getFeatureDependencies(feature) || [];
  };
  
  /**
   * Verifica si una característica puede ser activada
   * No se puede activar si alguna de sus dependencias está desactivada
   */
  const checkIfCanEnable = (feature: FeatureId): boolean => {
    const dependencies = getFeatureDependencies(feature);
    
    // Si no hay dependencias, siempre se puede activar
    if (!dependencies || dependencies.length === 0) {
      return true;
    }
    
    // Verificar si todas las dependencias están activas
    for (const dependency of dependencies) {
      if (!isEnabled(dependency)) {
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
