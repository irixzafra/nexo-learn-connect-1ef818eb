
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { type FeaturesConfig } from './features/types';

// Define step type
export type OnboardingStep = 
  | 'welcome'
  | 'profile'
  | 'explore-courses'
  | 'community'
  | 'complete';

// Define context value type
export interface OnboardingContextValue {
  isOnboardingActive: boolean;
  currentStep: OnboardingStep;
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
  goToStep: (step: OnboardingStep) => void;
}

// Create context
const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

// Default features config (for onboarding)
export const defaultFeaturesConfig: FeaturesConfig = {
  designSystemEnabled: true,
  enableContentReordering: false,
  enableCategoryManagement: false,
  enableThemeSwitcher: true,
  enableRoleSwitcher: true,
  enableRoleManagement: true,
  enableOnboardingSystem: true,
  enableTestDataGenerator: false,
  enableNotifications: true,
  showOnboardingTrigger: true,
  autoStartOnboarding: true,
};

// List of steps in order
const STEPS: OnboardingStep[] = [
  'welcome',
  'profile',
  'explore-courses',
  'community',
  'complete'
];

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Check if user has completed onboarding before
  useEffect(() => {
    if (user) {
      const onboardingCompleted = localStorage.getItem(`onboarding_completed_${user.id}`);
      setHasCompletedOnboarding(onboardingCompleted === 'true');

      // Auto-start onboarding for new users if enabled
      const autoStart = localStorage.getItem('auto_start_onboarding') !== 'false';
      if (autoStart && !onboardingCompleted && defaultFeaturesConfig.autoStartOnboarding) {
        setIsOnboardingActive(true);
      }
    }
  }, [user]);

  const startOnboarding = () => {
    setCurrentStep('welcome');
    setIsOnboardingActive(true);
  };

  const nextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const completeOnboarding = () => {
    setIsOnboardingActive(false);
    setHasCompletedOnboarding(true);
    if (user) {
      localStorage.setItem(`onboarding_completed_${user.id}`, 'true');
    }
  };

  const skipOnboarding = () => {
    setIsOnboardingActive(false);
    if (user) {
      localStorage.setItem(`onboarding_completed_${user.id}`, 'true');
    }
  };

  const resetOnboarding = () => {
    setCurrentStep('welcome');
    setHasCompletedOnboarding(false);
    if (user) {
      localStorage.removeItem(`onboarding_completed_${user.id}`);
    }
  };

  const goToStep = (step: OnboardingStep) => {
    if (STEPS.includes(step)) {
      setCurrentStep(step);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingActive,
        currentStep,
        startOnboarding,
        nextStep,
        prevStep,
        completeOnboarding,
        skipOnboarding,
        resetOnboarding,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;
