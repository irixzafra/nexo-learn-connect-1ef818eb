
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';

interface LessonProgressControlsProps {
  isCompleted: boolean;
  isUpdating: boolean;
  onMarkCompleted: () => void;
}

export function LessonProgressControls({
  isCompleted,
  isUpdating,
  onMarkCompleted,
}: LessonProgressControlsProps) {
  return (
    <div className="flex justify-end">
      {isCompleted ? (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Lección completada</span>
        </div>
      ) : (
        <Button 
          onClick={onMarkCompleted} 
          disabled={isUpdating}
          className="flex items-center gap-2"
        >
          {isUpdating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Marcar como completada</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
