
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Edit, CheckSquare, MoveHorizontal, Pencil, X } from 'lucide-react';
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
  
  // Only admin or sistemas roles can see this
  if (userRole !== 'admin' && userRole !== 'sistemas') {
    return null;
  }

  const handleToggle = () => {
    toggleEditMode();
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
                <CheckSquare className="h-5 w-5" />
              ) : (
                <Edit className="h-5 w-5" />
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
      
      {isEditMode && (
        <div className="absolute bottom-16 right-0 bg-card shadow-lg rounded-lg border p-3 mb-2 w-56">
          <div className="text-sm font-medium mb-2">Modo edición activado</div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Pencil className="h-3 w-3 mr-2" />
              <span>Clic en textos para editar</span>
            </div>
            <div className="flex items-center">
              <MoveHorizontal className="h-3 w-3 mr-2" />
              <span>Arrastra elementos para ordenar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingEditModeToggle;
