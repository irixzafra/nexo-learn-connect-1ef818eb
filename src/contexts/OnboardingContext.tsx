
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FeaturesConfig {
  // Onboarding features
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  
  // UI Features
  enableEditMode: boolean;
  enableContentReordering: boolean;
  enableThemeSwitcher: boolean;
  enableMultiLanguage: boolean;
  enableDesignSystem: boolean;
  
  // Editor Features
  enableAdvancedEditor: boolean;
  
  // User Management
  enableInvitations: boolean;
  enableCustomRoles: boolean;
  
  // Notifications
  enableNotifications: boolean;
  enableRealTimeNotifications: boolean;
  enableEmailNotifications: boolean;
  
  // API and Integration
  enablePublicApi: boolean;
  enableWebhooks: boolean;
  
  // Security
  enable2FA: boolean;
  enableMultipleSessions: boolean;
  enablePublicRegistration: boolean;
  requireEmailVerification: boolean;
  enableActivityLog: boolean;
  
  // Data Management
  enableTestDataGenerator: boolean; 
  enableDatabaseDevMode: boolean;
  enableAutoBackups: boolean;
  enableQueryCache: boolean;
  enableMaintenanceMode: boolean;
  
  // AI Features
  enableAI: boolean;
}

interface OnboardingState {
  showWelcome: boolean;
  completed: boolean;
  currentStep: number;
  featuresConfig: FeaturesConfig;
}

interface OnboardingContextType {
  state: OnboardingState;
  startOnboarding: () => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  toggleFeature: (feature: keyof FeaturesConfig, enabled: boolean) => void;
}

const defaultFeaturesConfig: FeaturesConfig = {
  autoStartOnboarding: true,
  showOnboardingTrigger: true,
  enableEditMode: false,
  enableContentReordering: false,
  enableThemeSwitcher: true,
  enableMultiLanguage: false,
  enableDesignSystem: false,
  enableAdvancedEditor: true,
  enableInvitations: true,
  enableCustomRoles: false,
  enableNotifications: true,
  enableRealTimeNotifications: true,
  enableEmailNotifications: true,
  enablePublicApi: false,
  enableWebhooks: false,
  enable2FA: false,
  enableMultipleSessions: true,
  enablePublicRegistration: false,
  requireEmailVerification: true,
  enableActivityLog: true,
  enableTestDataGenerator: true,
  enableDatabaseDevMode: false,
  enableAutoBackups: true,
  enableQueryCache: true,
  enableMaintenanceMode: false,
  enableAI: true
};

const defaultOnboardingState: OnboardingState = {
  showWelcome: true,
  completed: false,
  currentStep: 0,
  featuresConfig: defaultFeaturesConfig,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(defaultOnboardingState);

  const startOnboarding = () => {
    setState(prev => ({
      ...prev,
      showWelcome: false,
    }));
  };

  const skipOnboarding = () => {
    setState(prev => ({
      ...prev,
      completed: true,
    }));
  };

  const completeOnboarding = () => {
    setState(prev => ({
      ...prev,
      completed: true,
      currentStep: 0,
    }));
  };

  const nextStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const prevStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  };

  const goToStep = (step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
    }));
  };

  const toggleFeature = (feature: keyof FeaturesConfig, enabled: boolean) => {
    setState(prev => ({
      ...prev,
      featuresConfig: {
        ...prev.featuresConfig,
        [feature]: enabled,
      },
    }));
  };

  return (
    <OnboardingContext.Provider value={{
      state,
      startOnboarding,
      skipOnboarding,
      completeOnboarding,
      nextStep,
      prevStep,
      goToStep,
      toggleFeature,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
