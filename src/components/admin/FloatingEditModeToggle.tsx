
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, Save, X, MoveHorizontal, Plus, Edit, Wand2, Layout } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const FloatingEditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode, isReorderMode, toggleReorderMode, isEditModeEnabled } = useEditMode();

  // If functionality is not enabled, don't show anything
  if (!isEditModeEnabled) {
    return null;
  }

  const handleToggleEditMode = () => {
    if (isEditMode) {
      toast.success('Modo edición desactivado');
    } else {
      toast.success('Modo edición activado. Ahora puedes editar y reordenar cualquier elemento.');
    }
    toggleEditMode();
  };

  // If not in edit mode, only show the activation button
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
            <p>Activar modo edición universal</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // If in edit mode, show the editing tools
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <Card className="p-3 shadow-lg flex flex-col items-start gap-2">
        <div className="flex items-center justify-center w-full text-sm font-medium">
          Modo Edición Universal
        </div>
        <Separator />
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs text-muted-foreground">Todos los elementos son:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1 text-xs">
              <div className="bg-primary/20 p-1 rounded">
                <Pencil className="h-3 w-3 text-primary" />
              </div>
              <span>Editables</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="bg-primary/20 p-1 rounded">
                <MoveHorizontal className="h-3 w-3 text-primary" />
              </div>
              <span>Reordenables</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="bg-primary/20 p-1 rounded">
                <Plus className="h-3 w-3 text-primary" />
              </div>
              <span>Insertables</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="bg-primary/20 p-1 rounded">
                <Wand2 className="h-3 w-3 text-primary" />
              </div>
              <span>IA asistida</span>
            </div>
          </div>
        </div>
      </Card>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggleEditMode}
              className="shadow-lg rounded-full h-14 w-14 p-0"
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
    </div>
  );
};

export default FloatingEditModeToggle;
