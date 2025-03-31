
import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Edit, CheckSquare, MoveHorizontal, Pencil, X, Plus, ListReorder } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FloatingEditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode } = useEditMode();
  const { userRole } = useAuth();
  const [helpVisible, setHelpVisible] = useState(true);
  
  // Only admin or sistemas roles can see this
  if (userRole !== 'admin' && userRole !== 'sistemas') {
    return null;
  }

  const handleToggle = () => {
    toggleEditMode();
    
    if (!isEditMode) {
      // When activating edit mode, show a toast
      toast.success("Modo edición activado", {
        description: "Ahora puedes editar textos, reordenar y añadir elementos."
      });
      setHelpVisible(true);
    } else {
      toast.success("Modo edición desactivado", {
        description: "Los cambios han sido guardados."
      });
      setHelpVisible(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="icon"
              onClick={handleToggle}
              className={`h-12 w-12 rounded-full shadow-lg ${isEditMode ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              {isEditMode ? (
                <CheckSquare className="h-6 w-6" />
              ) : (
                <Edit className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isEditMode ? 'Desactivar modo edición' : 'Activar modo edición'}</p>
            {isEditMode && (
              <p className="text-xs text-muted-foreground">
                Edita textos y arrastra elementos
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isEditMode && helpVisible && (
        <div className="absolute bottom-16 right-0 bg-card shadow-lg rounded-lg border p-4 mb-2 w-64">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-medium">Modo edición activado</div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setHelpVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Pencil className="h-3.5 w-3.5 mr-2 text-primary" />
              <span>Haz clic en textos para editarlos</span>
            </div>
            <div className="flex items-center">
              <ListReorder className="h-3.5 w-3.5 mr-2 text-primary" />
              <span>Arrastra elementos para reordenarlos</span>
            </div>
            <div className="flex items-center">
              <Plus className="h-3.5 w-3.5 mr-2 text-primary" />
              <span>Utiliza "+" para añadir elementos</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingEditModeToggle;
