
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Edit, CheckSquare, PenTool, Eye, Wand2, CornerUpLeft, CornerUpRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu';

const EditModeToggle: React.FC = () => {
  const { 
    isEditMode, 
    toggleEditMode, 
    isEditModeEnabled, 
    canEdit, 
    saveDraft, 
    cancelEditing,
    undoChange,
    redoChange,
    hasUndoHistory,
    hasRedoHistory
  } = useEditMode();
  const { userRole } = useAuth();
  
  // No mostrar el botón si no es admin/sistemas o si la funcionalidad está desactivada
  if (!canEdit || !isEditModeEnabled) {
    return null;
  }

  const handleToggle = () => {
    toggleEditMode();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isEditMode ? "secondary" : "outline"}
          size="sm"
          className={`gap-2 ${isEditMode ? 'border-2 border-primary/30 bg-primary/10 text-primary hover:bg-primary/20' : 'hover:bg-primary/10'}`}
        >
          {isEditMode ? (
            <>
              <PenTool className="h-4 w-4" />
              <span className="font-medium">Editando</span>
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              <span>Editar</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {isEditMode ? "Modo Edición Activado" : "Opciones de Edición"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {isEditMode ? (
          <>
            <DropdownMenuItem onClick={saveDraft}>
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Guardar cambios</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={cancelEditing}>
              <Eye className="mr-2 h-4 w-4" />
              <span>Salir de edición</span>
              <DropdownMenuShortcut>Esc</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={undoChange} disabled={!hasUndoHistory}>
              <CornerUpLeft className="mr-2 h-4 w-4" />
              <span>Deshacer</span>
              <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={redoChange} disabled={!hasRedoHistory}>
              <CornerUpRight className="mr-2 h-4 w-4" />
              <span>Rehacer</span>
              <DropdownMenuShortcut>⌘⇧Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info("Función en desarrollo: asistente de IA")}>
              <Wand2 className="mr-2 h-4 w-4" />
              <span>Asistente de IA</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={handleToggle}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Iniciar edición</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info("La ayuda de edición estará disponible próximamente")}>
              <Wand2 className="mr-2 h-4 w-4" />
              <span>Ayuda de edición</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditModeToggle;
