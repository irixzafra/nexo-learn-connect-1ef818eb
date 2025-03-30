
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type OnboardingStep = 
  | 'welcome' 
  | 'profile' 
  | 'explore-courses' 
  | 'platform-tour'
  | 'completed';

// Añadimos la configuración para activar/desactivar funcionalidades
export interface SystemFeaturesConfig {
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  enableNotifications: boolean;
  // Podemos agregar más funcionalidades configurables aquí
}

interface OnboardingContextType {
  currentStep: OnboardingStep;
  setCurrentStep: (step: OnboardingStep) => void;
  isOnboardingActive: boolean;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  nextStep: () => void;
  previousStep: () => void;
  featuresConfig: SystemFeaturesConfig;
  updateFeaturesConfig: (config: Partial<SystemFeaturesConfig>) => void;
}

// Configuración por defecto
const defaultFeaturesConfig: SystemFeaturesConfig = {
  autoStartOnboarding: false, // Desactivado por defecto
  showOnboardingTrigger: true,
  enableNotifications: true,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(false);
  const [featuresConfig, setFeaturesConfig] = useState<SystemFeaturesConfig>(() => {
    // Intentar cargar la configuración desde localStorage
    try {
      const savedConfig = localStorage.getItem('systemFeaturesConfig');
      return savedConfig ? JSON.parse(savedConfig) : defaultFeaturesConfig;
    } catch (e) {
      return defaultFeaturesConfig;
    }
  });

  // Guardar la configuración en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('systemFeaturesConfig', JSON.stringify(featuresConfig));
  }, [featuresConfig]);

  // Check if onboarding should be displayed for this user
  useEffect(() => {
    if (user && featuresConfig.autoStartOnboarding) {
      // Check localStorage first for onboarding status
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      if (!onboardingCompleted) {
        // If no stored value and it's a new user, suggest onboarding
        const isNewUser = user.created_at && 
          new Date(user.created_at).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days
        
        if (isNewUser) {
          setTimeout(() => {
            setIsOnboardingActive(true);
          }, 1500); // Slight delay to allow the app to load first
        }
      }
    }
  }, [user, featuresConfig.autoStartOnboarding]);

  const startOnboarding = () => {
    setCurrentStep('welcome');
    setIsOnboardingActive(true);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setIsOnboardingActive(false);
    setCurrentStep('completed');
    toast.success('Onboarding completado con éxito');
  };

  const skipOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setIsOnboardingActive(false);
    toast.info('Puedes reiniciar el tutorial desde tu perfil en cualquier momento');
  };

  const nextStep = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('profile');
        break;
      case 'profile':
        setCurrentStep('explore-courses');
        break;
      case 'explore-courses':
        setCurrentStep('platform-tour');
        break;
      case 'platform-tour':
        completeOnboarding();
        break;
      default:
        break;
    }
  };

  const previousStep = () => {
    switch (currentStep) {
      case 'profile':
        setCurrentStep('welcome');
        break;
      case 'explore-courses':
        setCurrentStep('profile');
        break;
      case 'platform-tour':
        setCurrentStep('explore-courses');
        break;
      default:
        break;
    }
  };

  // Función para actualizar la configuración de características
  const updateFeaturesConfig = (config: Partial<SystemFeaturesConfig>) => {
    setFeaturesConfig(prevConfig => ({
      ...prevConfig,
      ...config
    }));
  };

  return (
    <OnboardingContext.Provider 
      value={{
        currentStep,
        setCurrentStep,
        isOnboardingActive,
        startOnboarding,
        completeOnboarding,
        skipOnboarding,
        nextStep,
        previousStep,
        featuresConfig,
        updateFeaturesConfig,
      }}
    >
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
