
import { ReactNode } from 'react';

// Definición de los pasos del onboarding
export enum OnboardingStep {
  WELCOME = 'welcome',
  PROFILE = 'profile',
  EXPLORE_COURSES = 'explore_courses',
  PLATFORM_TOUR = 'platform_tour',
  COMPLETE = 'complete'
}

// Tipo para el contexto de onboarding
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
}

// Tipo para los pasos de onboarding
export interface OnboardingStepConfig {
  id: OnboardingStep;
  title: string;
  component: ReactNode;
  description?: string;
}
