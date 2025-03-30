
import React, { createContext, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingContextValue, defaultFeaturesConfig } from './types';
import { useOnboardingState } from './useOnboardingState';

// Create the context with a default value
const OnboardingContext = createContext<OnboardingContextValue>({
  isOnboardingOpen: false,
  currentStep: 0,
  featuresConfig: defaultFeaturesConfig,
  openOnboarding: () => {},
  closeOnboarding: () => {},
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  updateFeaturesConfig: () => {},
  isOnboardingActive: false,
  startOnboarding: () => {},
  skipOnboarding: () => {},
  previousStep: () => {},
});

// Hook to use the context
export const useOnboarding = () => useContext(OnboardingContext);

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { user } = useAuth();
  const {
    isOnboardingOpen,
    isOnboardingActive,
    currentStep,
    featuresConfig,
    openOnboarding,
    closeOnboarding,
    nextStep,
    prevStep,
    goToStep,
    updateFeaturesConfig,
  } = useOnboardingState({ userId: user?.id });

  // Alias functions for backward compatibility
  const startOnboarding = openOnboarding;
  const skipOnboarding = closeOnboarding;
  const previousStep = prevStep;

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingOpen,
        currentStep,
        featuresConfig,
        openOnboarding,
        closeOnboarding,
        nextStep,
        prevStep,
        goToStep,
        updateFeaturesConfig,
        // Aliased properties for compatibility
        isOnboardingActive,
        startOnboarding,
        skipOnboarding,
        previousStep
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
