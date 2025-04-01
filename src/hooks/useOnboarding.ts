
import { useContext } from 'react';
import { toast } from 'sonner';
import { OnboardingContext } from '@/contexts/OnboardingContext';

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  
  if (!context) {
    console.error('useOnboarding must be used within an OnboardingProvider');
    return {
      isActive: false,
      currentStep: 0,
      totalSteps: 0,
      isCompleted: true,
      openOnboarding: () => {},
      closeOnboarding: () => {},
      nextStep: () => {},
      prevStep: () => {},
      goToStep: () => {},
      setOnboardingCompleted: () => {},
      startOnboarding: () => {}
    };
  }
  
  // Add a convenience method to start onboarding
  const startOnboarding = () => {
    if (!context.isActive) {
      context.openOnboarding();
      toast.info('Iniciando tour de la plataforma');
    } else {
      toast.info('Ya hay un tour en progreso');
    }
  };
  
  return {
    ...context,
    startOnboarding
  };
};

export default useOnboarding;
