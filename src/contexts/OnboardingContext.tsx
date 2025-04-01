
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeaturesConfig } from './features/types';

export interface OnboardingContextType {
  isOnboardingCompleted: boolean;
  isOnboardingActive: boolean;
  currentStep: number;
  featuresConfig: FeaturesConfig;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  startOnboarding: () => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType>({
  isOnboardingCompleted: false,
  isOnboardingActive: false,
  currentStep: 0,
  featuresConfig: {} as FeaturesConfig,
  completeOnboarding: () => {},
  skipOnboarding: () => {},
  startOnboarding: () => {},
  setCurrentStep: () => {},
  nextStep: () => {},
  previousStep: () => {},
});

export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(() => {
    // Check if onboarding is already completed in local storage
    const completed = localStorage.getItem('onboardingCompleted');
    return completed === 'true';
  });
  
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({} as FeaturesConfig);
  
  useEffect(() => {
    // Fetch features config on mount
    const loadFeatures = async () => {
      try {
        // Try to load from localStorage if available
        const savedFeatures = localStorage.getItem('features');
        if (savedFeatures) {
          setFeaturesConfig(JSON.parse(savedFeatures));
        }
      } catch (error) {
        console.error('Error loading features:', error);
      }
    };

    loadFeatures();
  }, []);
  
  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
    setIsOnboardingActive(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };
  
  const skipOnboarding = () => {
    setIsOnboardingActive(false);
  };
  
  const startOnboarding = () => {
    setCurrentStep(0);
    setIsOnboardingActive(true);
  };
  
  const nextStep = () => {
    if (currentStep === 3) {
      // If on the last step, complete onboarding
      completeOnboarding();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingCompleted,
        isOnboardingActive,
        currentStep,
        featuresConfig,
        completeOnboarding,
        skipOnboarding,
        startOnboarding,
        setCurrentStep,
        nextStep,
        previousStep
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

export default useOnboarding;
