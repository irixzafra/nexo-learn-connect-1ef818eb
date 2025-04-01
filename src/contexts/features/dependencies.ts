
import { FeaturesConfig } from './types';

// Define feature dependencies - what features are required for each feature
export const featureDependencies: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
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
  enableDatabaseDevMode: [],

  // Security features
  enable2FA: [],
  enableMultipleSessions: [],
  enablePublicRegistration: [],
  requireEmailVerification: [],
  enableActivityLog: [],

  // Test features
  enableTestDataGenerator: [],
  
  // Onboarding features
  enableOnboarding: [],
  enableContextualHelp: [],
  requireOnboarding: ['enableOnboarding'],
  
  // Additional properties
  autoStartOnboarding: ['enableOnboarding'],
  showOnboardingTrigger: ['enableOnboarding']
};

// Define feature dependents - what features depend on each feature
export const featureDependents: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
  // Generate dependents based on dependencies
  ...Object.fromEntries(
    Object.keys(featureDependencies).map((key) => [key, []])
  ),
};

// Fill dependents based on dependencies
Object.entries(featureDependencies).forEach(([feature, deps]) => {
  deps.forEach((dep) => {
    if (featureDependents[dep]) {
      featureDependents[dep].push(feature as keyof FeaturesConfig);
    }
  });
});

// Export helper functions for getting dependencies and dependents
export const getFeatureDependencies = (feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  return featureDependencies[feature] || [];
};

export const getFeatureDependents = (feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  return featureDependents[feature] || [];
};

// Get reverse dependencies - which features depend on a given feature
export const getReverseDependencies = (): Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> => {
  return featureDependents;
};

// Get descriptions for dependencies
export const getDependencyDescription = (feature: keyof FeaturesConfig): string => {
  const descriptions: Record<string, string> = {
    // General features
    enableDarkMode: "Habilita el modo oscuro en la interfaz de usuario",
    enableNotifications: "Permite el sistema de notificaciones para usuarios",
    enableAnalytics: "Activa el seguimiento de análisis de uso",
    enableFeedback: "Habilita la recolección de comentarios de usuarios",
    
    // User features
    enableUserRegistration: "Permite a los usuarios registrarse en la plataforma",
    enableSocialLogin: "Habilita inicio de sesión con redes sociales",
    enablePublicProfiles: "Permite perfiles públicos de usuario",

    // Design system features
    designSystemEnabled: "Activa el sistema de diseño avanzado",
    enableThemeSwitcher: "Permite cambiar entre temas de la aplicación",
    enableMultiLanguage: "Habilita soporte para múltiples idiomas",

    // Content features
    enableAdvancedEditor: "Activa el editor de contenido avanzado",
    enableContentReordering: "Permite reordenar contenido con arrastrar y soltar",
    enableCategoryManagement: "Habilita la gestión de categorías",
    enableLeaderboard: "Muestra tabla de clasificación de usuarios",

    // Data features
    enableAutoBackups: "Realiza copias de seguridad automáticas",
    enableQueryCache: "Activa el caché de consultas para mejor rendimiento",
    enableMaintenanceMode: "Permite activar el modo de mantenimiento",
    enableDatabaseDevMode: "Habilita opciones de desarrollo para la base de datos",

    // Security features
    enable2FA: "Activa la autenticación de dos factores",
    enableMultipleSessions: "Permite múltiples sesiones simultáneas",
    enablePublicRegistration: "Permite registro público de usuarios",
    requireEmailVerification: "Requiere verificación de email al registrarse",
    enableActivityLog: "Registra actividad de usuarios para auditoría",

    // Test features
    enableTestDataGenerator: "Habilita generador de datos de prueba",
    
    // Onboarding features
    enableOnboarding: "Activa el sistema de onboarding para nuevos usuarios",
    enableContextualHelp: "Muestra ayuda contextual en la interfaz",
    requireOnboarding: "Hace obligatorio completar el onboarding",
    autoStartOnboarding: "Inicia automáticamente el onboarding para nuevos usuarios",
    showOnboardingTrigger: "Muestra botón para reiniciar el onboarding"
  };

  return descriptions[feature] || `Configuración para ${String(feature)}`;
};
