
/**
 * Definición de tipos para el sistema de características (Feature Flags)
 */

// Tipo para agrupar características relacionadas
export interface FeatureGroup {
  id: string;
  name: string;
  description?: string;
  features: FeatureDefinition[];
}

// Definición de una característica individual
export interface FeatureDefinition {
  key: keyof FeaturesConfig;
  name: string;
  description?: string;
  category: FeatureCategory;
  dependencies?: Array<keyof FeaturesConfig>;
  defaultValue: boolean;
  requiresReload?: boolean;
  isExperimental?: boolean;
}

// Categorías de características
export type FeatureCategory = 
  | 'onboarding'
  | 'ui'
  | 'editor'
  | 'userManagement'
  | 'notifications'
  | 'api'
  | 'security'
  | 'dataManagement'
  | 'contentManagement'
  | 'ai';

// Configuración completa de características
export interface FeaturesConfig {
  // Onboarding features
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  enableOnboardingSystem: boolean;
  
  // UI Features
  enableEditMode: boolean;
  enableContentReordering: boolean;
  enableThemeSwitcher: boolean;
  enableMultiLanguage: boolean;
  enableDesignSystem: boolean;
  
  // Editor Features
  enableAdvancedEditor: boolean;
  
  // User Management
  enableInvitations: boolean;
  enableCustomRoles: boolean;
  enableRoleManagement: boolean;
  enableRoleSwitcher: boolean;
  
  // Notifications
  enableNotifications: boolean;
  enableRealTimeNotifications: boolean;
  enableEmailNotifications: boolean;
  
  // API and Integration
  enablePublicApi: boolean;
  enableWebhooks: boolean;
  
  // Security
  enable2FA: boolean;
  enableMultipleSessions: boolean;
  enablePublicRegistration: boolean;
  requireEmailVerification: boolean;
  enableActivityLog: boolean;
  
  // Data Management
  enableTestDataGenerator: boolean; 
  enableDatabaseDevMode: boolean;
  enableAutoBackups: boolean;
  enableQueryCache: boolean;
  enableMaintenanceMode: boolean;
  
  // Content Management
  enableCategoryManagement: boolean;
  enableLeaderboard: boolean;
  
  // AI Features
  enableAI: boolean;
}

// Valores predeterminados para todas las características
export const defaultFeaturesConfig: FeaturesConfig = {
  // Onboarding
  autoStartOnboarding: true,
  showOnboardingTrigger: true,
  enableOnboardingSystem: true,
  
  // UI
  enableEditMode: false,
  enableContentReordering: false,
  enableThemeSwitcher: true,
  enableMultiLanguage: false,
  enableDesignSystem: true,
  
  // Editor
  enableAdvancedEditor: true,
  
  // User Management
  enableInvitations: true,
  enableCustomRoles: false,
  enableRoleManagement: true,
  enableRoleSwitcher: true,
  
  // Notifications
  enableNotifications: true,
  enableRealTimeNotifications: true,
  enableEmailNotifications: true,
  
  // API
  enablePublicApi: false,
  enableWebhooks: false,
  
  // Security
  enable2FA: false,
  enableMultipleSessions: true,
  enablePublicRegistration: false,
  requireEmailVerification: true,
  enableActivityLog: true,
  
  // Data
  enableTestDataGenerator: false,
  enableDatabaseDevMode: false,
  enableAutoBackups: true,
  enableQueryCache: true,
  enableMaintenanceMode: false,
  
  // Content
  enableCategoryManagement: false,
  enableLeaderboard: false,
  
  // AI
  enableAI: false
};

// Definición de contexto para el sistema de características
export interface FeaturesContextValue {
  // Estado de todas las características
  featuresConfig: FeaturesConfig;
  
  // Estado de carga y errores
  isLoading: boolean;
  error: Error | null;
  
  // Funciones para manipular características
  toggleFeature: (feature: keyof FeaturesConfig, enabled: boolean) => Promise<void>;
  isFeatureEnabled: (feature: keyof FeaturesConfig) => boolean;
  updateFeatures: (updates: Partial<FeaturesConfig>) => Promise<void>;
  
  // Control de dependencias
  getFeatureDependencies: (feature: keyof FeaturesConfig) => Array<keyof FeaturesConfig>;
  getFeatureDependents: (feature: keyof FeaturesConfig) => Array<keyof FeaturesConfig>;
}
