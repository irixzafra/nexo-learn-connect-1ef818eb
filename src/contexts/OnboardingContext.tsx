import React, { createContext, useContext, useState, useCallback } from 'react';
import { type FeaturesConfig } from './features/types';

// Define step types
export enum OnboardingStep {
  WELCOME = 'welcome',
  PROFILE = 'profile',
  EXPLORE = 'explore',
  TOUR = 'tour',
  COMPLETE = 'complete'
}

// Define the context value interface
export interface OnboardingContextValue {
  isOpen: boolean;
  currentStep: OnboardingStep;
  allSteps: OnboardingStep[];
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  skipOnboarding: () => void;
  isOnboardingComplete: boolean;
  markOnboardingComplete: () => void;
}

// Create context with default value
const OnboardingContext = createContext<OnboardingContextValue>({} as OnboardingContextValue);

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get from local storage or use default
  const getInitialOnboardingComplete = (): boolean => {
    const saved = localStorage.getItem('onboardingComplete');
    return saved ? JSON.parse(saved) : false;
  };

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

  // Context value
  const value: OnboardingContextValue = {
    isOpen,
    currentStep,
    allSteps,
    openOnboarding,
    closeOnboarding,
    nextStep,
    previousStep,
    goToStep,
    skipOnboarding,
    isOnboardingComplete,
    markOnboardingComplete,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboarding = () => useContext(OnboardingContext);

// Re-export the types for use elsewhere
export type { OnboardingContextValue, OnboardingStep };
export type { FeaturesConfig };
