import { useState, useCallback } from 'react';
import { FeaturesConfig } from '../features/types';
import { OnboardingStep } from '../OnboardingContext';

interface OnboardingState {
  isOpen: boolean;
  currentStep: OnboardingStep;
  allSteps: OnboardingStep[];
  isOnboardingComplete: boolean;
}

interface OnboardingActions {
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  skipOnboarding: () => void;
  markOnboardingComplete: () => void;
}

type UseOnboardingState = OnboardingState & OnboardingActions;

/**
 * Custom hook to manage onboarding state and actions
 */
export const useOnboardingState = (): UseOnboardingState => {
  // Get from local storage or use default
  const getInitialOnboardingComplete = (): boolean => {
    const saved = localStorage.getItem('onboardingComplete');
    return saved ? JSON.parse(saved) : false;
  };

  // Define allSteps for use throughout the hook
  const allSteps: OnboardingStep[] = [
    OnboardingStep.WELCOME,
    OnboardingStep.PROFILE, 
    OnboardingStep.EXPLORE,
    OnboardingStep.TOUR,
    OnboardingStep.COMPLETE
  ];

  // State management
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.WELCOME);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(getInitialOnboardingComplete());

  // Open/close the onboarding modal
  const openOnboarding = useCallback(() => {
    setIsOpen(true);
    setCurrentStep(OnboardingStep.WELCOME);
  }, []);

  const closeOnboarding = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Step navigation
  const nextStep = useCallback(() => {
    const currentIndex = allSteps.indexOf(currentStep);
    if (currentIndex < allSteps.length - 1) {
      setCurrentStep(allSteps[currentIndex + 1]);
    } else {
      // Last step complete, mark as done
      markOnboardingComplete();
      closeOnboarding();
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    const currentIndex = allSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(allSteps[currentIndex - 1]);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: OnboardingStep) => {
    setCurrentStep(step);
  }, []);

  // Skip and complete actions
  const skipOnboarding = useCallback(() => {
    markOnboardingComplete();
    closeOnboarding();
  }, []);

  const markOnboardingComplete = useCallback(() => {
    localStorage.setItem('onboardingComplete', JSON.stringify(true));
    setIsOnboardingComplete(true);
  }, []);

  // Generate recommended feature configuration based on user role and preferences
  const getRecommendedFeatures = (userRole: string, userLevel: string): Partial<FeaturesConfig> => {
    // Base configuration common for all
    const baseConfig: Partial<FeaturesConfig> = {
      designSystemEnabled: true,
      enableThemeSwitcher: true,
      enableOnboardingSystem: true,
      enableNotifications: true,
    };

    // Role-specific configurations
    switch (userRole) {
      case 'admin':
        return {
          ...baseConfig,
          enableRoleSwitcher: true,
          enableRoleManagement: true,
          enableTestDataGenerator: true,
          enableContentReordering: true,
          enableCategoryManagement: true,
        };
      case 'instructor':
        return {
          ...baseConfig,
          enableContentReordering: true,
        };
      default: // student, guest, etc.
        return baseConfig;
    }
  };

  return {
    isOpen,
    currentStep,
    allSteps,
    isOnboardingComplete,
    openOnboarding,
    closeOnboarding,
    nextStep,
    previousStep,
    goToStep,
    skipOnboarding,
    markOnboardingComplete,
  };
};
