
import React, { useEffect } from 'react';
import { useFeature } from '@/hooks/useFeature';
import { OnboardingModal } from './OnboardingModal';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { motion } from 'framer-motion';

interface OnboardingTriggerProps {
  autoStart?: boolean;
  onClick?: () => void;
}

export const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({ 
  autoStart = false,
  onClick 
}) => {
  const { isEnabled: onboardingEnabled } = useFeature('enableOnboardingSystem');
  const { isEnabled: triggerEnabled } = useFeature('showOnboardingTrigger');
  const { startOnboarding, isOnboardingActive, openOnboarding } = useOnboarding();
  
  useEffect(() => {
    if (autoStart && onboardingEnabled) {
      const timer = setTimeout(() => {
        startOnboarding();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoStart, onboardingEnabled, startOnboarding]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      startOnboarding();
    }
  };

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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="outline"
          size="icon"
          onClick={handleClick}
          title="Iniciar tutorial"
          className="bg-white/80 backdrop-blur-sm shadow-sm border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all"
        >
          <Info className="h-4 w-4 text-primary" />
        </Button>
      </motion.div>
      <OnboardingModal />
    </>
  );
};

export default OnboardingTrigger;
