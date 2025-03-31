
export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  element?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  isComplete?: boolean;
}

export interface FeaturesConfig {
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  enableNotifications: boolean;
  enableTestDataGenerator: boolean;
  enableOnboardingSystem: boolean;
  enableRoleManagement: boolean;
  enableRoleSwitcher: boolean;
  enableDebugMode: boolean;
  showSectionTags: boolean;
  enableEditMode: boolean;
  enableAIFeatures: boolean;
  enablePermissionsSystem: boolean;
  enableContentReordering: boolean;
  enableSocial: boolean;
  enablePasswordPolicy: boolean;
  // Add these missing properties
  enableThemeSwitcher: boolean;
  enableMultiLanguage: boolean;
  enableLeaderboard: boolean;
  enableCategoryManagement: boolean;
}

// Add a default config for usage in the OnboardingProvider
export const defaultFeaturesConfig: FeaturesConfig = {
  autoStartOnboarding: true,
  showOnboardingTrigger: true,
  enableNotifications: true,
  enableTestDataGenerator: false,
  enableOnboardingSystem: true,
  enableRoleManagement: true,
  enableRoleSwitcher: true,
  enableDebugMode: false,
  showSectionTags: false,
  enableEditMode: false,
  enableAIFeatures: false,
  enablePermissionsSystem: false,
  enableContentReordering: false,
  enableSocial: false,
  enablePasswordPolicy: false,
  enableThemeSwitcher: true,
  enableMultiLanguage: false,
  enableLeaderboard: false,
  enableCategoryManagement: false
};

export interface OnboardingContextValue {
  steps: OnboardingStep[];
  currentStep: number;
  isActive: boolean;
  startOnboarding: () => void;
  endOnboarding: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (stepId: string) => void;
  isStepComplete: (stepId: string) => void;
  featuresConfig: FeaturesConfig;
  updateFeaturesConfig: (config: Partial<FeaturesConfig>) => void;
  toggleFeature: (feature: keyof FeaturesConfig) => void;
  // Add these missing properties for the OnboardingContextValue
  isOnboardingActive: boolean;
  previousStep: () => void;
  skipOnboarding: () => void;
  isOnboardingOpen: boolean;
}
