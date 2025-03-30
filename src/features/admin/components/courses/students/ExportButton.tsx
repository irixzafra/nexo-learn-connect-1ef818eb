
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ExportButtonProps {
  onClick: () => void;
  iconOnly?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, iconOnly = false }) => {
  if (iconOnly) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            onClick={onClick} 
            size="icon"
          >
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Exportar CSV</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button variant="outline" onClick={onClick} className="w-full sm:w-auto">
      <Download className="mr-2 h-4 w-4" />
      Exportar CSV
    </Button>
  );
};

export default ExportButton;
