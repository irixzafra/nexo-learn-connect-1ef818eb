
import { useState, useMemo } from 'react';
import { WelcomeStep } from '@/components/onboarding/steps/WelcomeStep';
import { ProfileStep } from '@/components/onboarding/steps/ProfileStep';
import { ExploreCoursesStep } from '@/components/onboarding/steps/ExploreCoursesStep';
import { PlatformTourStep } from '@/components/onboarding/steps/PlatformTourStep';
import { OnboardingStep, OnboardingStepConfig } from './types';

export const useOnboardingState = () => {
  const [isActive, setActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Definir todos los pasos disponibles
  const allSteps: OnboardingStepConfig[] = [
    {
      id: OnboardingStep.WELCOME,
      title: "Bienvenido a Nexo",
      component: <WelcomeStep />,
      description: "Conoce las principales características de la plataforma"
    },
    {
      id: OnboardingStep.PROFILE,
      title: "Completa tu perfil",
      component: <ProfileStep />,
      description: "Personaliza tu perfil para una mejor experiencia"
    },
    {
      id: OnboardingStep.EXPLORE_COURSES,
      title: "Explora cursos",
      component: <ExploreCoursesStep />,
      description: "Descubre nuestro catálogo de cursos"
    },
    {
      id: OnboardingStep.PLATFORM_TOUR,
      title: "Tour por la plataforma",
      component: <PlatformTourStep />,
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
