
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

  // Don't render anything if the onboarding system is completely disabled
  if (!featuresConfig.enableOnboardingSystem) {
    return null;
  }

  // If the button functionality is disabled but system is enabled, only render the modal
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
