
// Define OnboardingStep type
export type OnboardingStep = 'welcome' | 'profile' | 'explore-courses' | 'platform-tour';

// Configuration of features
export type FeaturesConfig = {
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  enableNotifications: boolean;
  enableTestDataGenerator: boolean;
  enableOnboardingSystem: boolean;
  // Nuevas opciones de seguridad
  enableRoleManagement: boolean;
  enableRoleSwitcher: boolean;
  enableMultiLanguage: boolean;
  enableLeaderboard: boolean;
};

export interface OnboardingContextValue {
  isOnboardingOpen: boolean;
  currentStep: number;
  featuresConfig: FeaturesConfig;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  updateFeaturesConfig: (updates: Partial<FeaturesConfig>) => void;
  isOnboardingActive: boolean;
  startOnboarding: () => void;
  skipOnboarding: () => void;
}

// Default values for the context
export const defaultFeaturesConfig: FeaturesConfig = {
  autoStartOnboarding: true,
  showOnboardingTrigger: true,
  enableNotifications: true,
  enableTestDataGenerator: false,
  enableOnboardingSystem: true,
  // Valores predeterminados para las nuevas opciones
  enableRoleManagement: true,
  enableRoleSwitcher: true,
  enableMultiLanguage: false,
  enableLeaderboard: true,
};
