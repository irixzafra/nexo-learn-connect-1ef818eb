
import React from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EnrollButtonProps {
  onClick: () => void;
  iconOnly?: boolean;
}

const EnrollButton: React.FC<EnrollButtonProps> = ({ onClick, iconOnly = false }) => {
  if (iconOnly) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={onClick}
            size="icon"
            variant="outline"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Matricular Usuario</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button 
      onClick={onClick}
      className="w-full sm:w-auto"
    >
      <UserPlus className="mr-2 h-4 w-4" />
      Matricular Usuario
    </Button>
  );
};

export default EnrollButton;
