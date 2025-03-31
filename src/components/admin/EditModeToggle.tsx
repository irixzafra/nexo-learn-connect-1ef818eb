
import React, { useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Edit, CheckSquare, PenTool, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode, isEditModeEnabled, canEdit } = useEditMode();
  const { userRole } = useAuth();
  
  useEffect(() => {
    // Debug information to check if the component is rendering
    console.log('EditModeToggle rendering, userRole:', userRole, 'isEditModeEnabled:', isEditModeEnabled, 'canEdit:', canEdit);
  }, [userRole, isEditModeEnabled, canEdit]);
  
  // No mostrar el botón si no es admin/sistemas o si la funcionalidad está desactivada
  if (!canEdit || !isEditModeEnabled) {
    console.log('Not showing edit button because userRole is not admin/sistemas or feature is disabled');
    return null;
  }

  const handleToggle = () => {
    console.log('Toggle edit mode button clicked');
    toggleEditMode();
    if (!isEditMode) {
      toast.info('Activando modo edición universal');
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isEditMode ? "secondary" : "outline"}
            size="sm"
            onClick={handleToggle}
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
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>
            {isEditMode 
              ? "Estás en modo edición universal. Puedes modificar cualquier contenido." 
              : "Activa el modo edición universal para modificar contenido."}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditModeToggle;
