
import React, { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingModal } from './OnboardingModal';
import { Button } from '@/components/ui/button';

interface OnboardingTriggerProps {
  autoStart?: boolean;
}

export const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({ 
  autoStart = false 
}) => {
  const { startOnboarding, isOnboardingActive, featuresConfig } = useOnboarding();

  useEffect(() => {
    if (autoStart && featuresConfig.autoStartOnboarding && !isOnboardingActive) {
      // Start with a small delay to ensure everything is loaded
      const timer = setTimeout(() => {
        startOnboarding();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, startOnboarding, isOnboardingActive, featuresConfig.autoStartOnboarding]);

  // Si la funcionalidad está desactivada, no renderizamos el botón
  if (!featuresConfig.showOnboardingTrigger) {
    return <OnboardingModal />;
  }

  return (
    <>
      <Button 
        variant="outline" 
        onClick={startOnboarding}
        className="mr-4"
      >
        Iniciar tutorial
      </Button>
      <OnboardingModal />
    </>
  );
};
