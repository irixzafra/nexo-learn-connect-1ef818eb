
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, Save, X, MoveHorizontal, Plus, Edit } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const FloatingEditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode, isReorderMode, toggleReorderMode, isEditModeEnabled } = useEditMode();

  // Si la funcionalidad no está habilitada, no mostrar nada
  if (!isEditModeEnabled) {
    return null;
  }

  const handleToggleEditMode = () => {
    if (isEditMode) {
      toast.success('Modo edición desactivado');
    } else {
      toast.success('Modo edición activado. Ahora puedes editar y reordenar contenido.');
    }
    toggleEditMode();
  };

  // Si no está en modo edición, solo mostrar el botón de activación
  if (!isEditMode) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggleEditMode}
              className="fixed bottom-6 right-6 shadow-lg z-50 rounded-full h-14 w-14 p-0"
              size="icon"
              variant="default"
            >
              <Pencil className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Activar modo edición</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Si está en modo edición, mostrar el botón de desactivación
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleToggleEditMode}
            className="fixed bottom-6 right-6 shadow-lg z-50 rounded-full h-14 w-14 p-0"
            size="icon"
            variant="destructive"
          >
            <X className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Desactivar modo edición</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingEditModeToggle;
