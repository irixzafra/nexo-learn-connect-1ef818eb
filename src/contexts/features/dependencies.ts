
import { FeaturesConfig } from './types';

// Feature dependency mapping
const featureDependencies: Record<keyof FeaturesConfig, (keyof FeaturesConfig)[]> = {
  // Design system
  designSystemEnabled: [],
  enableDesignSystem: [],
  
  // Content management
  enableContentReordering: [],
  enableCategoryManagement: [],
  enableAdvancedEditor: ['enableContentReordering'],
  
  // UI Customization
  enableThemeSwitcher: [],
  enableMultiLanguage: [],
  enableEditMode: [],
  
  // User management
  enableRoleSwitcher: [],
  enableRoleManagement: [],
  enableCustomRoles: ['enableRoleManagement'],
  enableInvitations: [],
  enablePublicRegistration: [],
  requireEmailVerification: [],
  
  // Onboarding
  enableOnboardingSystem: [],
  showOnboardingTrigger: ['enableOnboardingSystem'],
  autoStartOnboarding: ['enableOnboardingSystem', 'showOnboardingTrigger'],
  
  // Development tools
  enableTestDataGenerator: [],
  enableDatabaseDevMode: [],
  enableMaintenanceMode: [],
  enableQueryCache: [],
  enableAutoBackups: [],
  
  // Notifications
  enableNotifications: [],
  enableRealTimeNotifications: ['enableNotifications'],
  enableEmailNotifications: ['enableNotifications'],
  
  // Security
  enable2FA: [],
  enableMultipleSessions: [],
  enableActivityLog: [],
  
  // Integrations
  enableAI: [],
  enablePublicApi: [],
  enableWebhooks: [],
  
  // Gamification
  enableLeaderboard: []
};

// Feature descriptions
const featureDescriptions: Record<keyof FeaturesConfig, string> = {
  // Design system
  designSystemEnabled: "Habilita el sistema de diseño completo de la plataforma",
  enableDesignSystem: "Activa componentes avanzados del sistema de diseño",
  
  // Content management
  enableContentReordering: "Permite reordenar contenidos mediante drag and drop",
  enableCategoryManagement: "Activa la gestión avanzada de categorías",
  enableAdvancedEditor: "Habilita el editor de contenido avanzado con más funciones",
  
  // UI Customization
  enableThemeSwitcher: "Permite a los usuarios cambiar entre temas claro y oscuro",
  enableMultiLanguage: "Activa soporte para múltiples idiomas en la interfaz",
  enableEditMode: "Habilita el modo de edición en línea para administradores",
  
  // User management
  enableRoleSwitcher: "Permite a usuarios con permisos cambiar entre roles",
  enableRoleManagement: "Activa la administración de roles del sistema",
  enableCustomRoles: "Permite crear y configurar roles personalizados",
  enableInvitations: "Activa el sistema de invitación de usuarios",
  enablePublicRegistration: "Permite el registro público de nuevos usuarios",
  requireEmailVerification: "Requiere verificación de email al registrarse",
  
  // Onboarding
  enableOnboardingSystem: "Activa el sistema de onboarding para nuevos usuarios",
  showOnboardingTrigger: "Muestra el botón de inicio de onboarding",
  autoStartOnboarding: "Inicia automáticamente el onboarding para nuevos usuarios",
  
  // Development tools
  enableTestDataGenerator: "Habilita herramientas para generar datos de prueba",
  enableDatabaseDevMode: "Activa modo desarrollador para la base de datos",
  enableMaintenanceMode: "Permite activar el modo mantenimiento",
  enableQueryCache: "Activa caché de consultas para mejor rendimiento",
  enableAutoBackups: "Habilita copias de seguridad automáticas",
  
  // Notifications
  enableNotifications: "Activa el sistema de notificaciones",
  enableRealTimeNotifications: "Habilita notificaciones en tiempo real",
  enableEmailNotifications: "Activa notificaciones por email",
  
  // Security
  enable2FA: "Habilita autenticación de dos factores",
  enableMultipleSessions: "Permite múltiples sesiones simultáneas",
  enableActivityLog: "Activa registro de actividad de usuarios",
  
  // Integrations
  enableAI: "Habilita funciones de inteligencia artificial",
  enablePublicApi: "Activa la API pública para integraciones",
  enableWebhooks: "Permite configurar webhooks para eventos",
  
  // Gamification
  enableLeaderboard: "Activa tablero de clasificación de usuarios"
};

// Get all dependencies for a feature
export const getFeatureDependencies = (feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  return featureDependencies[feature] || [];
};

// Get all features that depend on a specific feature
export const getFeatureDependents = (feature: keyof FeaturesConfig): (keyof FeaturesConfig)[] => {
  const dependents: (keyof FeaturesConfig)[] = [];
  
  Object.entries(featureDependencies).forEach(([key, dependencies]) => {
    if (dependencies.includes(feature as keyof FeaturesConfig)) {
      dependents.push(key as keyof FeaturesConfig);
    }
  });
  
  return dependents;
};

// Get the description for a feature
export const getDependencyDescription = (feature: keyof FeaturesConfig): string => {
  return featureDescriptions[feature] || '';
};
