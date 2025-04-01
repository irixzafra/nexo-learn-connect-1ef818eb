
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export interface OnboardingTriggerProps {
  onActivate: () => void;
}

/**
 * Componente que muestra un botón para activar el proceso de onboarding
 */
export const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({
  onActivate
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm"
      className="gap-1.5 text-muted-foreground hover:text-foreground"
      onClick={onActivate}
    >
      <HelpCircle className="h-4 w-4" />
      <span className="hidden md:inline">Ayuda</span>
    </Button>
  );
};

export default OnboardingTrigger;
