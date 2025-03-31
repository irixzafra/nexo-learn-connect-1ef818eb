
// Define feature configuration interface
export interface FeaturesConfig {
  // Onboarding features
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  enableOnboardingSystem: boolean;
  
  // Notifications and alerts
  enableNotifications: boolean;
  
  // Development and testing
  enableTestDataGenerator: boolean;
  
  // User roles and permissions
  enableRoleManagement: boolean;
  enableRoleSwitcher: boolean;
  
  // Internationalization
  enableMultiLanguage: boolean;
  
  // Gamification
  enableLeaderboard: boolean;
  
  // UI Customization
  enableThemeSwitcher: boolean;
  
  // Content Management
  enableCategoryManagement: boolean;
  enableContentReordering: boolean;
  
  // Security features
  enableSocial: boolean;
  enablePasswordPolicy: boolean;
}

// Default configuration values
export const defaultFeaturesConfig: FeaturesConfig = {
  autoStartOnboarding: true,
  showOnboardingTrigger: true,
  enableNotifications: true,
  enableTestDataGenerator: false,
  enableOnboardingSystem: true,
  enableRoleManagement: true,
  enableRoleSwitcher: true,
  enableMultiLanguage: false,
  enableLeaderboard: false,
  enableThemeSwitcher: true,
  enableCategoryManagement: false,
  enableContentReordering: false,
  enableSocial: false,
  enablePasswordPolicy: false,
};

// Onboarding step interface
export interface OnboardingStep {
  title: string;
  description: string;
  component: React.ReactNode;
}

// Context value interface
export interface OnboardingContextValue {
  isOnboardingOpen: boolean;
  isOnboardingActive: boolean;
  currentStep: number;
  featuresConfig: FeaturesConfig;
  isSaving: boolean;
  saveError: string | null;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  previousStep: () => void; // Alias for prevStep
  goToStep: (step: number) => void;
  updateFeaturesConfig: (updates: Partial<FeaturesConfig>) => void;
  startOnboarding: () => void; // Alias for openOnboarding
  skipOnboarding: () => void; // Alias for closeOnboarding
}
