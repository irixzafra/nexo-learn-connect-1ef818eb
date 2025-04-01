
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Pencil, ConstructionIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

const FloatingEditModeToggle: React.FC = () => {
  const { isEditModeEnabled, canEdit } = useEditMode();

  // No mostrar el botón si no es admin/sistemas o si la funcionalidad está desactivada
  if (!canEdit) {
    return null;
  }

  const handleClick = () => {
    toast.info('La funcionalidad de edición inline está siendo reconstruida. Estará disponible próximamente.');
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            className="fixed bottom-6 right-6 shadow-lg z-50 rounded-full h-16 w-16 p-0 bg-yellow-500 hover:bg-yellow-600"
            size="icon"
            variant="default"
          >
            <Pencil className="h-8 w-8" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="font-medium max-w-xs">
          <p>Edición Universal en Desarrollo</p>
          <p className="text-xs text-muted-foreground">Esta funcionalidad está siendo reconstruida para mejorar la experiencia</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingEditModeToggle;
