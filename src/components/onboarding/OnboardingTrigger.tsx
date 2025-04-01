
import React from 'react';
import { useFeature } from '@/hooks/useFeature';
import { OnboardingModal } from './OnboardingModal';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface OnboardingTriggerProps {
  autoStart?: boolean;
}

export const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({ 
  autoStart = false 
}) => {
  const { isEnabled: onboardingEnabled } = useFeature('enableOnboardingSystem');
  const { isEnabled: triggerEnabled } = useFeature('showOnboardingTrigger');
  const { startOnboarding, isOnboardingActive } = useOnboarding();

  // No render anything if the onboarding system is completely disabled
  if (!onboardingEnabled) {
    return null;
  }

  // If the button functionality is disabled but system is enabled, only render the modal
  if (!triggerEnabled) {
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
