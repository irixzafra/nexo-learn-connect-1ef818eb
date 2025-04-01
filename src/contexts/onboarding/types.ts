
import { ReactNode } from 'react';

export enum OnboardingStep {
  WELCOME = 'welcome',
  PROFILE = 'profile',
  EXPLORE = 'explore',
  TOUR = 'tour'
}

export interface OnboardingStepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
  component: ReactNode;
}

export interface OnboardingContextValue {
  isActive: boolean;
  isOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  currentStep: OnboardingStep | null;
  totalSteps: number;
  goToStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  restartOnboarding: () => void;
  completeOnboarding: () => void;
  isOnboardingComplete: boolean;
  skipOnboarding: () => void;
}
