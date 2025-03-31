
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
}

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
}
