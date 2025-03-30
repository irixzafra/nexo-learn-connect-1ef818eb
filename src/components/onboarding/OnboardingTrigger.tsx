
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingModal } from './OnboardingModal';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface OnboardingTriggerProps {
  autoStart?: boolean;
}

export const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({ 
  autoStart = false 
}) => {
  const { startOnboarding, isOnboardingActive, featuresConfig } = useOnboarding();

  // Si la funcionalidad está desactivada, no renderizamos el botón
  if (!featuresConfig.showOnboardingTrigger) {
    return <OnboardingModal />;
  }

  return (
    <>
      <Button 
        variant="outline"
        size="icon"
        onClick={startOnboarding}
        title="Iniciar tutorial"
      >
        <Info className="h-4 w-4" />
      </Button>
      <OnboardingModal />
    </>
  );
};
