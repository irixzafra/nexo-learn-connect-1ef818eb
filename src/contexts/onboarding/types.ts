
import { FeaturesConfig as BaseFeatureConfig, defaultFeaturesConfig as baseDefaultFeaturesConfig } from '../features/types';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  element?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  isComplete?: boolean;
}

// Re-export the FeaturesConfig from features/types.ts
export type FeaturesConfig = BaseFeatureConfig;

// Add a default config for usage in the OnboardingProvider
export const defaultFeaturesConfig: FeaturesConfig = baseDefaultFeaturesConfig;

// Export the OnboardingContextValue for usage in the provider
export interface OnboardingContextValue {
  isOnboardingOpen: boolean;
  currentStep: number;
  featuresConfig: FeaturesConfig;
  isSaving: boolean;
  saveError: Error | null;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateFeaturesConfig: (updates: Partial<FeaturesConfig>) => void;
  isOnboardingActive: boolean;
  startOnboarding: () => void;
  skipOnboarding: () => void;
  previousStep: () => void;
}
