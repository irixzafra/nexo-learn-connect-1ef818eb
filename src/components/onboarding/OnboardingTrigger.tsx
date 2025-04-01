
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface OnboardingTriggerProps {
  title?: string;
  children?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  onActivate?: () => void;
}

export const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({
  title = 'Ayuda',
  tooltipContent = 'Haga clic para ver la ayuda contextual',
  onActivate,
  children
}) => {
  const { isFeatureEnabled } = useFeatures();
  
  // Comprobamos si el onboarding está habilitado
  if (!isFeatureEnabled('enableOnboarding')) {
    return null;
  }
  
  const handleClick = () => {
    if (onActivate) {
      onActivate();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className="rounded-full h-8 w-8"
            aria-label={title}
          >
            {children || <HelpCircle className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default OnboardingTrigger;
