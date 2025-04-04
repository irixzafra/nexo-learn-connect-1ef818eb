
import { useState } from 'react';
import { toast } from 'sonner';

export interface OnboardingStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const useOnboarding = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Estos serían los pasos del onboarding
  const steps: OnboardingStep[] = [
    {
      target: '.dashboard-welcome',
      title: 'Bienvenido a Nexo Learning',
      content: 'Este es tu dashboard personal. Aquí podrás ver un resumen de tu actividad y acceder rápidamente a tus cursos.',
      placement: 'bottom',
    },
    {
      target: '.dashboard-stats',
      title: 'Estadísticas',
      content: 'Aquí puedes ver un resumen de tu actividad y progreso en la plataforma.',
      placement: 'top',
    },
    {
      target: '.dashboard-courses',
      title: 'Tus cursos',
      content: 'Continúa con los cursos en los que ya estás inscrito o explora nuevos cursos.',
      placement: 'right',
    },
  ];

  const startOnboarding = () => {
    // En una implementación real, aquí iniciaríamos una biblioteca de tours
    // como Shepherd.js, Driver.js o React-Joyride
    setIsActive(true);
    setCurrentStep(0);
    toast.success("¡Bienvenido al tour! Esta funcionalidad estará disponible pronto.");
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

  const endOnboarding = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  return {
    isActive,
    currentStep,
    steps,
    startOnboarding,
    nextStep,
    prevStep,
    endOnboarding,
  };
};
