
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
      toast.success('Modo edición activado. Ahora puedes editar textos y contenido.');
    }
    toggleEditMode();
  };

  const handleToggleReorderMode = () => {
    if (!isEditMode) return;
    
    if (isReorderMode) {
      toast.success('Modo reordenación desactivado');
    } else {
      toast.success('Modo reordenación activado. Ahora puedes arrastrar y soltar elementos.');
    }
    toggleReorderMode();
  };

  const handleAddElement = () => {
    if (!isEditMode) return;
    
    toast.info('Funcionalidad para añadir elemento con IA en desarrollo');
    // Aquí se implementaría la lógica para añadir un nuevo elemento mediante IA
  };

  if (!isEditMode && !isReorderMode) {
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

  return (
    <Card className="fixed bottom-6 right-6 p-3 shadow-lg z-50 bg-background/90 backdrop-blur-sm border">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-medium text-center mb-1 text-muted-foreground">
          {isReorderMode ? 'Modo reordenación' : 'Modo edición'}
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleToggleEditMode}
                variant={isEditMode ? "destructive" : "default"}
                size="icon"
                className="rounded-full h-12 w-12"
              >
                {isEditMode ? <X className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isEditMode ? "Desactivar edición" : "Activar edición"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isEditMode && (
          <>
            <Separator className="my-1" />
            
            <div className="text-xs font-medium mb-1 text-muted-foreground">
              Acciones
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleToggleReorderMode}
                    variant={isReorderMode ? "default" : "outline"}
                    size="icon"
                    className={`rounded-full h-12 w-12 ${isReorderMode ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <MoveHorizontal className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{isReorderMode ? "Desactivar reordenamiento" : "Activar reordenamiento"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleAddElement}
                    variant="secondary"
                    size="icon"
                    className="rounded-full h-12 w-12"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Añadir elemento nuevo (IA)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 ${!isReorderMode ? "border-primary/50 text-primary" : ""}`}
                    disabled={isReorderMode}
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Edición en línea activa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
    </Card>
  );
};

export default FloatingEditModeToggle;
