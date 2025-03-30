
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

  // Si el sistema de onboarding está completamente desactivado, no renderizamos nada
  if (!featuresConfig.enableOnboardingSystem) {
    return null;
  }

  // Si la funcionalidad del botón está desactivada, solo renderizamos el modal
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
