
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
  enableThemeSwitcher: boolean;
  enableMultiLanguage: boolean;
  enableLeaderboard: boolean;
  enableCategoryManagement: boolean;
  enableOfflineMode: boolean;
  enableUserTracking: boolean;
  enableGamification: boolean;
  enableCommunity: boolean;
  enableAI: boolean;
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
  enableCategoryManagement: false,
  enableOfflineMode: false,
  enableUserTracking: false,
  enableGamification: false,
  enableCommunity: false,
  enableAI: false
};

export interface OnboardingContextValue {
  isOnboardingOpen: boolean;
  currentStep: number;
  featuresConfig: FeaturesConfig;
  isSaving: boolean;
  saveError: null | string;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateFeaturesConfig: (config: Partial<FeaturesConfig>) => void;
  isOnboardingActive: boolean;
  startOnboarding: () => void;
  skipOnboarding: () => void;
  previousStep: () => void;
}
