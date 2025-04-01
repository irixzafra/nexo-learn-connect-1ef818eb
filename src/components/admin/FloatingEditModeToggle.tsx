
import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { 
  Pencil, 
  Check, 
  X, 
  Save, 
  MessageSquareWarning, 
  CornerUpLeft, 
  CornerUpRight,
  Settings, 
  Settings2
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const FloatingEditModeToggle: React.FC = () => {
  const { 
    isEditMode, 
    toggleEditMode, 
    isEditModeEnabled, 
    canEdit, 
    saveDraft, 
    cancelEditing,
    hasUndoHistory,
    hasRedoHistory,
    undoChange,
    redoChange
  } = useEditMode();
  
  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // No mostrar el botón si no es admin/sistemas o si la funcionalidad está desactivada
  if (!canEdit) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveDraft();
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = () => {
    if (isEditModeEnabled) {
      toggleEditMode();
    } else {
      toast.info('La funcionalidad de edición inline está siendo reconstruida. Estará disponible próximamente.');
    }
  };

  if (!isEditMode) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggle}
              className={cn(
                "fixed bottom-6 right-6 shadow-lg z-50 rounded-full h-14 w-14 p-0",
                isEditModeEnabled ? "bg-primary hover:bg-primary/90" : "bg-yellow-500 hover:bg-yellow-600"
              )}
              size="icon"
              variant="default"
            >
              <Pencil className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-medium max-w-xs">
            {isEditModeEnabled ? (
              <>
                <p>Activar Modo Edición Universal</p>
                <p className="text-xs text-muted-foreground">Haz clic para editar cualquier texto o contenido de la página</p>
              </>
            ) : (
              <>
                <p>Edición Universal en Desarrollo</p>
                <p className="text-xs text-muted-foreground">Esta funcionalidad está siendo reconstruida para mejorar la experiencia</p>
              </>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Modo edición activado - mostrar controles completos
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-2 items-end">
      {/* Botón principal */}
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              onClick={isEditMode ? () => setIsExpanded(!isExpanded) : handleToggle}
              className={cn(
                "shadow-lg rounded-full h-14 w-14 p-0 transition-all duration-300",
                isEditMode ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary/90",
                isExpanded && "rotate-45"
              )}
              size="icon"
              variant="default"
            >
              {isEditMode ? (
                isExpanded ? <X className="h-6 w-6" /> : <Check className="h-6 w-6" />
              ) : (
                <Pencil className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-medium">
            <p>{isExpanded ? "Cerrar menú" : "Menú de edición"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Menú expandido */}
      {isExpanded && (
        <div className="flex flex-col gap-2 items-end animate-fade-in">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={cancelEditing}
                  className="shadow-md rounded-full h-10 w-10 p-0 bg-destructive hover:bg-destructive/90"
                  size="icon"
                  variant="default"
                >
                  <X className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Cancelar edición</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSave}
                  className="shadow-md rounded-full h-10 w-10 p-0 bg-primary hover:bg-primary/90"
                  size="icon"
                  variant="default"
                  disabled={isSaving}
                >
                  <Save className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Guardar cambios</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={undoChange}
                  className="shadow-md rounded-full h-10 w-10 p-0 bg-amber-500 hover:bg-amber-600"
                  size="icon"
                  variant="default"
                  disabled={!hasUndoHistory}
                >
                  <CornerUpLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Deshacer cambio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={redoChange}
                  className="shadow-md rounded-full h-10 w-10 p-0 bg-amber-500 hover:bg-amber-600"
                  size="icon"
                  variant="default"
                  disabled={!hasRedoHistory}
                >
                  <CornerUpRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Rehacer cambio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="shadow-md rounded-full h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600"
                      size="icon"
                      variant="default"
                    >
                      <Settings2 className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Opciones de edición</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuLabel>Opciones de edición</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info('Próximamente: Ver historial de cambios')}>
                Ver historial de cambios
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Próximamente: Ver elementos editables')}>
                Ver elementos editables
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info('Próximamente: Ayuda de edición')}>
                Ayuda de edición
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default FloatingEditModeToggle;
