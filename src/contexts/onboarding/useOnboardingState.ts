
import { useState, useMemo } from 'react';
import { OnboardingStep, OnboardingStepConfig } from './types';

// Import types for the components instead of the actual components
// We'll need to ensure these components exist in the project
type OnboardingStepComponentProps = {}; // Add props as needed

export const useOnboardingState = () => {
  const [isActive, setActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Definir todos los pasos disponibles
  const allSteps: OnboardingStepConfig[] = [
    {
      id: OnboardingStep.WELCOME,
      title: "Bienvenido a Nexo",
      component: null, // This will be replaced by the actual component at render time
      description: "Conoce las principales características de la plataforma"
    },
    {
      id: OnboardingStep.PROFILE,
      title: "Completa tu perfil",
      component: null, // This will be replaced by the actual component at render time
      description: "Personaliza tu perfil para una mejor experiencia"
    },
    {
      id: OnboardingStep.EXPLORE,
      title: "Explora cursos",
      component: null, // This will be replaced by the actual component at render time
      description: "Descubre nuestro catálogo de cursos"
    },
    {
      id: OnboardingStep.TOUR,
      title: "Tour por la plataforma",
      component: null, // This will be replaced by the actual component at render time
      description: "Navega por la plataforma y conoce sus funcionalidades"
    }
  ];

  const totalSteps = allSteps.length;
  const currentStep = currentStepIndex < allSteps.length ? allSteps[currentStepIndex].id : null;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  const goToStep = (step: OnboardingStep) => {
    const stepIndex = allSteps.findIndex(s => s.id === step);
    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex);
    }
  };

  const nextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const restartOnboarding = () => {
    setCurrentStepIndex(0);
  };

  return {
    isActive,
    setActive,
    currentStep,
    currentStepIndex,
    totalSteps,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    progress,
    allSteps,
    restartOnboarding
  };
};
