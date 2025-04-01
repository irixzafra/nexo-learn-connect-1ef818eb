
export interface FeaturesConfig {
  // General features
  enableDarkMode: boolean;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  enableFeedback: boolean;
  
  // User features
  enableUserRegistration: boolean;
  enableSocialLogin: boolean;
  enablePublicProfiles: boolean;

  // Design system features
  designSystemEnabled: boolean;
  enableThemeSwitcher: boolean;
  enableMultiLanguage: boolean;

  // Content features
  enableAdvancedEditor: boolean;
  enableContentReordering: boolean;
  enableCategoryManagement: boolean;
  enableLeaderboard: boolean;

  // Data features
  enableAutoBackups: boolean;
  enableQueryCache: boolean;
  enableMaintenanceMode: boolean;
  enableDatabaseDevMode: boolean;

  // Security features
  enable2FA: boolean;
  enableMultipleSessions: boolean;
  enablePublicRegistration: boolean;
  requireEmailVerification: boolean;
  enableActivityLog: boolean;

  // Test features
  enableTestDataGenerator: boolean;
  
  // Onboarding features
  enableOnboarding: boolean;
  enableContextualHelp: boolean;
  requireOnboarding: boolean;
  
  // Alias properties (para mantener compatibilidad)
  // Estos son los nombres que se usan en algunos componentes
  // pero mapeamos a las propiedades originales para evitar duplicación
}

// Valores por defecto para usar en el provider
export const defaultFeaturesConfig: FeaturesConfig = {
  // General features
  enableDarkMode: true,
  enableNotifications: true,
  enableAnalytics: false,
  enableFeedback: true,
  
  // User features
  enableUserRegistration: true,
  enableSocialLogin: false,
  enablePublicProfiles: true,

  // Design system features
  designSystemEnabled: true,
  enableThemeSwitcher: true,
  enableMultiLanguage: true,

  // Content features
  enableAdvancedEditor: true,
  enableContentReordering: true,
  enableCategoryManagement: true,
  enableLeaderboard: true,

  // Data features
  enableAutoBackups: true,
  enableQueryCache: true,
  enableMaintenanceMode: false,
  enableDatabaseDevMode: false,

  // Security features
  enable2FA: false,
  enableMultipleSessions: true,
  enablePublicRegistration: true,
  requireEmailVerification: true,
  enableActivityLog: true,

  // Test features
  enableTestDataGenerator: false,
  
  // Onboarding features
  enableOnboarding: true,
  enableContextualHelp: true,
  requireOnboarding: false
};

export interface FeaturesContextProps {
  features: FeaturesConfig;
  isLoading: boolean;
  error: Error | null;
  updateFeatures: (newFeatures: FeaturesConfig) => Promise<void>;
  reloadFeatures: () => Promise<void>;
  
  // Métodos adicionales para usar en componentes
  isFeatureEnabled: (feature: keyof FeaturesConfig) => boolean;
  toggleFeature: (feature: keyof FeaturesConfig, value: boolean) => Promise<void>;
  featuresConfig: FeaturesConfig; // alias para features (usado en algunos componentes)
  
  // Métodos para manejo de dependencias
  getFeatureDependencies: (feature: keyof FeaturesConfig) => (keyof FeaturesConfig)[];
  getFeatureDependents: (feature: keyof FeaturesConfig) => (keyof FeaturesConfig)[];
}
