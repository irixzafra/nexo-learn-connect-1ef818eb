
/**
 * Configuración de características de la plataforma
 */
export interface FeaturesConfig {
  // Core
  enableDarkMode: boolean;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  enableFeedback: boolean;
  enableUserRegistration: boolean;
  enableSocialLogin: boolean;
  enablePublicProfiles: boolean;
  
  // Onboarding
  enableOnboardingSystem: boolean;
  showOnboardingTrigger: boolean;
  autoStartOnboarding: boolean;
  
  // Learning
  enableCourses: boolean;
  enableLearningPaths: boolean;
  enableCertificates: boolean;
  enableAssessments: boolean;
  
  // Community
  enableCommunity: boolean;
  enableForums: boolean;
  enableGroupDiscussions: boolean;
  enableUserMessaging: boolean;
  
  // Commerce
  enableCommerce: boolean;
  enableSubscriptions: boolean;
  enableCoupons: boolean;
  
  // Administrative
  enableNestedCategories: boolean;
  enableAuditLogs: boolean;
  enableRoleBasedAccess: boolean;
  enableContentWorkflows: boolean;
}

/**
 * Valores por defecto para configuración de características
 */
export const defaultFeaturesConfig: FeaturesConfig = {
  // Core
  enableDarkMode: true,
  enableNotifications: true,
  enableAnalytics: true,
  enableFeedback: true,
  enableUserRegistration: true,
  enableSocialLogin: false,
  enablePublicProfiles: true,
  
  // Onboarding
  enableOnboardingSystem: true,
  showOnboardingTrigger: true,
  autoStartOnboarding: true,
  
  // Learning
  enableCourses: true,
  enableLearningPaths: true,
  enableCertificates: true,
  enableAssessments: true,
  
  // Community
  enableCommunity: true,
  enableForums: true,
  enableGroupDiscussions: false,
  enableUserMessaging: true,
  
  // Commerce
  enableCommerce: true,
  enableSubscriptions: false,
  enableCoupons: false,
  
  // Administrative
  enableNestedCategories: true,
  enableAuditLogs: true,
  enableRoleBasedAccess: true,
  enableContentWorkflows: false
};
