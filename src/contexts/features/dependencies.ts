
import { FeaturesConfig } from './types';

/**
 * Define las dependencias entre características:
 * Cuando una característica depende de otra, no se puede activar si la dependencia está desactivada
 * y no se puede desactivar si hay características que dependen de ella.
 */
export const featureDependencies: Record<keyof FeaturesConfig, Array<keyof FeaturesConfig>> = {
  // Core
  enableDarkMode: [],
  enableNotifications: [],
  enableAnalytics: [],
  enableFeedback: [],
  enableUserRegistration: [],
  enableSocialLogin: ['enableUserRegistration'],
  enablePublicProfiles: ['enableUserRegistration'],
  
  // Onboarding
  enableOnboardingSystem: [],
  showOnboardingTrigger: ['enableOnboardingSystem'],
  autoStartOnboarding: ['enableOnboardingSystem'],
  
  // Learning
  enableCourses: [],
  enableLearningPaths: ['enableCourses'],
  enableCertificates: ['enableCourses'],
  enableAssessments: ['enableCourses'],
  
  // Community
  enableCommunity: [],
  enableForums: ['enableCommunity'],
  enableGroupDiscussions: ['enableCommunity', 'enableForums'],
  enableUserMessaging: ['enableUserRegistration'],
  
  // Commerce
  enableCommerce: [],
  enableSubscriptions: ['enableCommerce'],
  enableCoupons: ['enableCommerce'],
  
  // Administrative
  enableNestedCategories: [],
  enableAuditLogs: [],
  enableRoleBasedAccess: [],
  enableContentWorkflows: []
};

/**
 * Obtiene las dependencias inversas: qué características dependen de una característica dada
 */
export const getReverseDependencies = () => {
  const reverseDeps: Record<keyof FeaturesConfig, Array<keyof FeaturesConfig>> = {} as Record<keyof FeaturesConfig, Array<keyof FeaturesConfig>>;
  
  // Inicializar array vacío para cada característica
  Object.keys(featureDependencies).forEach(key => {
    reverseDeps[key as keyof FeaturesConfig] = [];
  });
  
  // Llenar las dependencias inversas
  Object.entries(featureDependencies).forEach(([feature, deps]) => {
    deps.forEach(dep => {
      reverseDeps[dep].push(feature as keyof FeaturesConfig);
    });
  });
  
  return reverseDeps;
};

/**
 * Obtiene la lista de características que dependen de una característica dada
 */
export const getFeatureDependents = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
  return getReverseDependencies()[feature] || [];
};

/**
 * Obtiene la lista de características de las que depende una característica dada
 */
export const getFeatureDependencies = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
  return featureDependencies[feature] || [];
};

/**
 * Descripciones de las características
 */
export const featureDescriptions: Record<keyof FeaturesConfig, string> = {
  // Core
  enableDarkMode: 'Permite que los usuarios cambien entre tema claro y oscuro',
  enableNotifications: 'Activa el sistema de notificaciones en tiempo real',
  enableAnalytics: 'Recolecta datos anónimos de uso para mejorar la plataforma',
  enableFeedback: 'Permite que los usuarios envíen comentarios y sugerencias',
  enableUserRegistration: 'Habilita el registro de nuevos usuarios en la plataforma',
  enableSocialLogin: 'Permite iniciar sesión con cuentas de redes sociales',
  enablePublicProfiles: 'Hace que los perfiles de usuario sean visibles para otros',
  
  // Onboarding
  enableOnboardingSystem: 'Activa el sistema de onboarding para nuevos usuarios',
  showOnboardingTrigger: 'Muestra un botón para iniciar manualmente el onboarding',
  autoStartOnboarding: 'Inicia automáticamente el onboarding para nuevos usuarios',
  
  // Learning
  enableCourses: 'Activa el sistema de cursos y lecciones',
  enableLearningPaths: 'Permite la creación de rutas de aprendizaje',
  enableCertificates: 'Habilita la emisión de certificados al completar cursos',
  enableAssessments: 'Activa el sistema de evaluaciones y exámenes',
  
  // Community
  enableCommunity: 'Activa las funciones de comunidad y redes sociales',
  enableForums: 'Habilita los foros de discusión general',
  enableGroupDiscussions: 'Permite discusiones en grupos específicos',
  enableUserMessaging: 'Activa los mensajes directos entre usuarios',
  
  // Commerce
  enableCommerce: 'Habilita las funciones de comercio electrónico',
  enableSubscriptions: 'Permite suscripciones de pago recurrentes',
  enableCoupons: 'Activa el sistema de cupones de descuento',
  
  // Administrative
  enableNestedCategories: 'Permite categorías con jerarquías multinivel',
  enableAuditLogs: 'Registra cambios importantes en el sistema',
  enableRoleBasedAccess: 'Implementa control de acceso basado en roles',
  enableContentWorkflows: 'Habilita flujos de trabajo para creación de contenido'
};

/**
 * Obtiene la descripción de una característica
 */
export const getDependencyDescription = (feature: keyof FeaturesConfig): string => {
  return featureDescriptions[feature] || 'No hay descripción disponible';
};
