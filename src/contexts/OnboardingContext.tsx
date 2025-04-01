
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFeature } from '@/hooks/useFeature';
import { FeaturesConfig, defaultFeaturesConfig } from './features/types';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  element?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  isComplete?: boolean;
}

export interface OnboardingContextProps {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingActive: boolean;
  startOnboarding: () => void;
  endOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  jumpToStep: (stepIndex: number) => void;
  setSteps: (steps: OnboardingStep[]) => void;
  // Additional properties for component compatibility
  featuresConfig: FeaturesConfig;
  previousStep: () => void; // Alias for prevStep
  skipOnboarding: () => void; // Alias for endOnboarding
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const { isEnabled: autoStartEnabled } = useFeature('autoStartOnboarding');
  
  // Add featuresConfig state
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultFeaturesConfig);
  
  useEffect(() => {
    // Auto-start onboarding if enabled and has steps
    if (autoStartEnabled && steps.length > 0 && !isOnboardingActive) {
      const hasSeenOnboarding = localStorage.getItem('nexo_has_seen_onboarding');
      if (hasSeenOnboarding !== 'true') {
        // Delay start to ensure DOM is ready
        const timer = setTimeout(() => {
          startOnboarding();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [autoStartEnabled, steps]);
  
  const startOnboarding = () => {
    setCurrentStep(0);
    setIsOnboardingActive(true);
  };

  const endOnboarding = () => {
    setIsOnboardingActive(false);
    localStorage.setItem('nexo_has_seen_onboarding', 'true');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const jumpToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  // Create aliases for compatibility
  const previousStep = prevStep;
  const skipOnboarding = endOnboarding;

  return (
    <OnboardingContext.Provider
      value={{
        steps,
        currentStep,
        isOnboardingActive,
        startOnboarding,
        endOnboarding,
        nextStep,
        prevStep,
        jumpToStep,
        setSteps,
        // Add these for component compatibility
        featuresConfig,
        previousStep,
        skipOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// Export FeaturesConfig type for other components to import
export type { FeaturesConfig };
export { defaultFeaturesConfig };
