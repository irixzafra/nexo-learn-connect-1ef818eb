
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingTriggerProps {
  onActivate?: () => void;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  showIcon?: boolean;
  label?: string;
}

const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({ 
  onActivate, 
  variant = 'outline', 
  size = 'default',
  className = '',
  showIcon = true,
  label = 'Tour de bienvenida'
}) => {
  const handleActivate = () => {
    if (onActivate) {
      onActivate();
    } else {
      toast.info("El tour guiado estará disponible próximamente", {
        description: "Estamos trabajando para mejorar tu experiencia"
      });
    }
  };

  return (
    <Button 
      onClick={handleActivate} 
      variant={variant}
      size={size}
      className={`flex items-center gap-1 ${className}`}
      aria-label="Comenzar tour guiado"
    >
      {showIcon && <HelpCircle className="h-4 w-4" />}
      {label}
    </Button>
  );
};

export default OnboardingTrigger;
