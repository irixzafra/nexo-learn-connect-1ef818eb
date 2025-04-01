import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFeatures } from './features/FeaturesContext';

export type OnboardingStep = number;

interface OnboardingState {
  isActive: boolean;
  currentStep: OnboardingStep;
  totalSteps: number;
  // Other properties as needed
}

interface OnboardingContextType {
  isActive: boolean;
  currentStep: OnboardingStep;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  closeOnboarding: () => void;
  restartOnboarding: () => void;
  openOnboarding?: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: React.ReactNode;
  defaultActive?: boolean;
  defaultStep?: OnboardingStep;
  totalSteps?: number;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  defaultActive = false,
  defaultStep = 0,
  totalSteps = 5,
}) => {
  const { isEnabled } = useFeatures();
  const isOnboardingEnabled = isEnabled('enableOnboarding');
  const shouldAutoStart = isEnabled('autoStartOnboarding');
  
  const [state, setState] = useState<OnboardingState>({
    isActive: defaultActive && isOnboardingEnabled,
    currentStep: defaultStep,
    totalSteps,
  });
  
  // Auto-start onboarding when needed
  useEffect(() => {
    if (isOnboardingEnabled && shouldAutoStart && !state.isActive) {
      setState(prev => ({ ...prev, isActive: true }));
    }
  }, [isOnboardingEnabled, shouldAutoStart]);
  
  const nextStep = () => {
    setState(prev => {
      if (prev.currentStep >= prev.totalSteps - 1) {
        return { ...prev, isActive: false, currentStep: -1 as OnboardingStep };
      }
      return { ...prev, currentStep: (prev.currentStep + 1) as OnboardingStep };
    });
  };
  
  const prevStep = () => {
    setState(prev => {
      if (prev.currentStep <= 0) {
        return prev;
      }
      return { ...prev, currentStep: (prev.currentStep - 1) as OnboardingStep };
    });
  };
  
  const goToStep = (step: OnboardingStep) => {
    if (step >= 0 && step < state.totalSteps) {
      setState(prev => ({ ...prev, currentStep: step }));
    }
  };
  
  const closeOnboarding = () => {
    setState(prev => ({ ...prev, isActive: false, currentStep: -1 as OnboardingStep }));
  };
  
  const restartOnboarding = () => {
    setState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
  };
  
  const openOnboarding = () => {
    setState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        isActive: state.isActive,
        currentStep: state.currentStep,
        totalSteps: state.totalSteps,
        nextStep,
        prevStep,
        goToStep,
        closeOnboarding,
        restartOnboarding,
        openOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// Export types for external use
export type { OnboardingContextType };
