
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LessonProgressControlsProps {
  isCompleted: boolean;
  isUpdating: boolean;
  onMarkCompleted: () => Promise<void>;
  className?: string;
}

export const LessonProgressControls: React.FC<LessonProgressControlsProps> = ({
  isCompleted,
  isUpdating,
  onMarkCompleted,
  className,
}) => {
  const handleMarkCompleted = async () => {
    try {
      await onMarkCompleted();
      toast({
        title: "Lección completada",
        description: "Tu progreso ha sido guardado",
      });
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    }
  };

  return (
    <div className={className}>
      {isCompleted ? (
        <Button variant="outline" disabled className="w-full sm:w-auto">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
          Lección completada
        </Button>
      ) : (
        <Button 
          onClick={handleMarkCompleted} 
          disabled={isUpdating} 
          className="w-full sm:w-auto"
        >
          {isUpdating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            "Marcar como completada"
          )}
        </Button>
      )}
    </div>
  );
};
