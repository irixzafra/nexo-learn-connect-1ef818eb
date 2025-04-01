
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { OnboardingStep, OnboardingContextValue, OnboardingStepConfig } from './onboarding/types';
import { WelcomeStep } from '@/components/onboarding/steps/WelcomeStep';
import { ProfileStep } from '@/components/onboarding/steps/ProfileStep';
import { ExploreCoursesStep } from '@/components/onboarding/steps/ExploreCoursesStep';
import { PlatformTourStep } from '@/components/onboarding/steps/PlatformTourStep';
import { useFeatures } from './features/FeaturesContext';

// Configuración de los pasos de onboarding
const onboardingSteps: OnboardingStepConfig[] = [
  {
    id: OnboardingStep.WELCOME,
    title: 'Bienvenida',
    component: <WelcomeStep />,
    description: 'Introducción a la plataforma'
  },
  {
    id: OnboardingStep.PROFILE,
    title: 'Perfil',
    component: <ProfileStep />,
    description: 'Configura tu perfil de usuario'
  },
  {
    id: OnboardingStep.EXPLORE,
    title: 'Explorar',
    component: <ExploreCoursesStep />,
    description: 'Descubre cursos y contenidos'
  },
  {
    id: OnboardingStep.TOUR,
    title: 'Tour',
    component: <PlatformTourStep />,
    description: 'Recorrido por la plataforma'
  }
];

// Crear el contexto con un valor inicial
const OnboardingContext = createContext<OnboardingContextValue>({
  isActive: false,
  isOpen: false,
  openOnboarding: () => {},
  closeOnboarding: () => {},
  currentStep: OnboardingStep.WELCOME,
  totalSteps: onboardingSteps.length,
  goToStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  isFirstStep: true,
  isLastStep: true,
  progress: 0,
  restartOnboarding: () => {},
  completeOnboarding: () => {},
  isOnboardingComplete: false,
  skipOnboarding: () => {}
});

export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { features } = useFeatures();
  const [isOnboardingComplete, setIsOnboardingComplete] = useLocalStorage('onboarding-complete', false);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Detectar si es un usuario nuevo y mostrar onboarding automáticamente
  useEffect(() => {
    const isNewUser = localStorage.getItem('is-new-user') === 'true';
    
    if (isNewUser && features?.enableOnboarding && !isOnboardingComplete) {
      // Use autoStartOnboarding property with a fallback to false if it doesn't exist
      const autoStart = features?.autoStartOnboarding ?? false;
      
      if (autoStart) {
        setIsActive(true);
        setIsOpen(true);
        localStorage.setItem('is-new-user', 'false');
      }
    }
  }, [features, isOnboardingComplete]);

  // Calcular el progreso del onboarding
  const progress = Math.round(((currentStepIndex + 1) / onboardingSteps.length) * 100);
  
  // Obtener el paso actual
  const currentStepConfig = onboardingSteps[currentStepIndex];
  const currentStep = currentStepConfig?.id || OnboardingStep.WELCOME;
  
  // Determinar si es el primer o último paso
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === onboardingSteps.length - 1;

  // Abrir el modal de onboarding
  const openOnboarding = () => {
    setIsActive(true);
    setIsOpen(true);
  };

  // Cerrar el modal de onboarding
  const closeOnboarding = () => {
    setIsOpen(false);
  };

  // Ir a un paso específico
  const goToStep = (step: OnboardingStep) => {
    const stepIndex = onboardingSteps.findIndex(s => s.id === step);
    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex);
    }
  };

  // Avanzar al siguiente paso
  const nextStep = () => {
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  // Retroceder al paso anterior
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Reiniciar el onboarding
  const restartOnboarding = () => {
    setCurrentStepIndex(0);
    setIsActive(true);
    setIsOpen(true);
  };

  // Completar el onboarding
  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    closeOnboarding();
  };

  // Saltar el onboarding
  const skipOnboarding = () => {
    setIsOnboardingComplete(true);
    closeOnboarding();
  };

  const value: OnboardingContextValue = {
    isActive,
    isOpen,
    openOnboarding,
    closeOnboarding,
    currentStep,
    totalSteps: onboardingSteps.length,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    progress,
    restartOnboarding,
    completeOnboarding,
    isOnboardingComplete,
    skipOnboarding
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
