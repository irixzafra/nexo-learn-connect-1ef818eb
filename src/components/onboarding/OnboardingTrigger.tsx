
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

interface OnboardingTriggerProps {
  onActivate: () => void;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}

const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({ 
  onActivate, 
  variant = 'outline', 
  size = 'default' 
}) => {
  return (
    <Button 
      onClick={onActivate} 
      variant={variant}
      size={size}
      className="flex items-center gap-1"
    >
      <HelpCircle className="h-4 w-4" />
      Tour de bienvenida
    </Button>
  );
};

export default OnboardingTrigger;
