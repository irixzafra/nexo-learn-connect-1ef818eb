
import React, { createContext, useContext, useState, useCallback } from 'react';
import { type FeaturesConfig } from './features/types';

// Define step enum (not type)
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
  // Add missing properties reported in errors
  startOnboarding: () => void;
  isOnboardingActive: boolean;
  featuresConfig: FeaturesConfig;
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

  // Define allSteps for use throughout the component
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
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(false);
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({} as FeaturesConfig);

  // Open/close the onboarding modal
  const openOnboarding = useCallback(() => {
    setIsOpen(true);
    setCurrentStep(OnboardingStep.WELCOME);
  }, []);

  const closeOnboarding = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Define startOnboarding to fix the error in OnboardingTrigger
  const startOnboarding = useCallback(() => {
    setIsOnboardingActive(true);
    openOnboarding();
  }, [openOnboarding]);

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
  }, [currentStep, allSteps]);

  const previousStep = useCallback(() => {
    const currentIndex = allSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(allSteps[currentIndex - 1]);
    }
  }, [currentStep, allSteps]);

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
    // Add the missing properties
    startOnboarding,
    isOnboardingActive,
    featuresConfig
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboarding = () => useContext(OnboardingContext);

// Do not re-export types that would conflict
export { OnboardingStep };
