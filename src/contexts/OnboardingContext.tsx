
import React, { createContext, useState, useEffect } from 'react';
import { useFeatures } from './features/FeaturesContext';

// Step types for the onboarding process
export enum OnboardingStep {
  Welcome = 0,
  Profile = 1,
  ExploreCourses = 2,
  PlatformTour = 3,
  Completed = -1
}

// Context type
export interface OnboardingContextType {
  currentStep: OnboardingStep;
  totalSteps: number;
  progress: number;
  isActive: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  setCurrentStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
  restartOnboarding: () => void;
  completeOnboarding: () => void;
  isCompleted: boolean;
  isOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
}

// Create context with default values
export const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: OnboardingStep.Completed,
  totalSteps: 4,
  progress: 0,
  isActive: false,
  isFirstStep: true,
  isLastStep: false,
  setCurrentStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  skipOnboarding: () => {},
  restartOnboarding: () => {},
  completeOnboarding: () => {},
  isCompleted: true,
  isOpen: false,
  openOnboarding: () => {},
  closeOnboarding: () => {},
});

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.Completed);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { featuresConfig, isFeatureEnabled } = useFeatures();

  // Total number of steps in the onboarding process
  const totalSteps = 4; // Welcome, Profile, ExploreCourses, PlatformTour
  
  // Calculate progress percentage
  const progress = currentStep >= 0 ? ((currentStep + 1) / totalSteps) * 100 : 100;
  
  // Helper flags
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  // Check if onboarding should be active based on features and local storage
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed') === 'true';
    const shouldStartAutomatically = isFeatureEnabled('autoStartOnboarding');
    
    if (!hasCompletedOnboarding && isFeatureEnabled('enableOnboarding')) {
      setIsCompleted(false);
      
      if (shouldStartAutomatically) {
        setCurrentStep(OnboardingStep.Welcome);
        setIsActive(true);
        setIsOpen(true);
      }
    } else {
      setIsCompleted(true);
      setCurrentStep(OnboardingStep.Completed);
      setIsActive(false);
    }
  }, [featuresConfig]);

  // Move to the next step
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prevStep => (prevStep + 1) as OnboardingStep);
    } else {
      completeOnboarding();
    }
  };

  // Move to the previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => (prevStep - 1) as OnboardingStep);
    }
  };

  // Skip the entire onboarding process
  const skipOnboarding = () => {
    completeOnboarding();
  };

  // Restart the onboarding process
  const restartOnboarding = () => {
    setCurrentStep(OnboardingStep.Welcome);
    setIsActive(true);
    setIsCompleted(false);
    setIsOpen(true);
    localStorage.removeItem('onboarding_completed');
  };

  // Mark the onboarding as completed
  const completeOnboarding = () => {
    setCurrentStep(OnboardingStep.Completed);
    setIsActive(false);
    setIsCompleted(true);
    setIsOpen(false);
    localStorage.setItem('onboarding_completed', 'true');
  };

  // Open the onboarding modal
  const openOnboarding = () => {
    if (!isCompleted) {
      setIsActive(true);
      setIsOpen(true);
    } else {
      restartOnboarding();
    }
  };

  // Close the onboarding modal without completing
  const closeOnboarding = () => {
    setIsActive(false);
    setIsOpen(false);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        progress,
        isActive,
        isFirstStep,
        isLastStep,
        setCurrentStep,
        nextStep,
        prevStep,
        skipOnboarding,
        restartOnboarding,
        completeOnboarding,
        isCompleted,
        isOpen,
        openOnboarding,
        closeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext;
