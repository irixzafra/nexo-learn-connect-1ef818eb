
import { useState, useEffect } from 'react';

// Tipo para las características disponibles en la aplicación
type FeatureFlag = 
  | 'enableAnalytics'
  | 'enableRealTimeChat'
  | 'enableAdvancedSearch'
  | 'enablePushNotifications'
  | 'enableTestData'
  | 'darkModeDefault'
  | 'enableContentCreationTools'
  | 'enableHreflangTags'
  | 'enableRegionalContent'
  | 'enableContextualHelp'
  | 'enableAccessibility'
  | 'enableAdvancedAccessibility';

// Mock de configuración de características
const FEATURES_CONFIG = {
  enableAnalytics: true,
  enableRealTimeChat: false,
  enableAdvancedSearch: true,
  enablePushNotifications: false,
  enableTestData: true,
  darkModeDefault: false,
  enableContentCreationTools: true,
  enableHreflangTags: true,
  enableRegionalContent: false,
  enableContextualHelp: true,
  enableAccessibility: true,
  enableAdvancedAccessibility: false
};

/**
 * Hook para verificar si una característica está habilitada
 * @param featureName Nombre de la característica a verificar
 * @returns Booleano indicando si la característica está habilitada
 */
export const useFeature = (featureName: FeatureFlag): boolean => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    // En un entorno real, esto podría obtener las características de la API
    const checkFeature = async () => {
      // Simular una solicitud a la API
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verificar si la característica está habilitada
      setIsEnabled(FEATURES_CONFIG[featureName] || false);
    };

    checkFeature();
  }, [featureName]);

  return isEnabled;
};
