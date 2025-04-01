
import { useContext } from 'react';
import { toast } from 'sonner';
import { useOnboarding as useOnboardingContext } from '@/contexts/OnboardingContext';

export const useOnboarding = () => {
  const context = useOnboardingContext();
  
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  
  // Add a convenience method to start onboarding
  const startOnboarding = () => {
    if (context.currentStep === -1 || !context.isActive) {
      context.openOnboarding ? context.openOnboarding() : context.restartOnboarding?.();
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
