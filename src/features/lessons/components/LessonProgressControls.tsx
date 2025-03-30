
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CheckCircle, Loader2 } from 'lucide-react';

interface LessonProgressControlsProps {
  isCompleted: boolean;
  isUpdating: boolean;
  onMarkCompleted: () => void;
}

export const LessonProgressControls: React.FC<LessonProgressControlsProps> = ({ 
  isCompleted, 
  isUpdating, 
  onMarkCompleted 
}) => {
  return (
    <div className="flex items-center gap-2">
      {isCompleted ? (
        <Button variant="outline" className="text-green-600" disabled>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Completado
        </Button>
      ) : (
        <Button onClick={onMarkCompleted} disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Marcar como completado
            </>
          )}
        </Button>
      )}
    </div>
  );
};
