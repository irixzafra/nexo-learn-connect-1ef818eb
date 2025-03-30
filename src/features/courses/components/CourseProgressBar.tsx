
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface CourseProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function CourseProgressBar({
  progress,
  size = 'md',
  showText = true,
}: CourseProgressBarProps) {
  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'md':
        return 'h-2';
      case 'lg':
        return 'h-3';
      default:
        return 'h-2';
    }
  };

  return (
    <div className="space-y-1">
      <Progress
        value={progress}
        className={getHeight()}
      />
      {showText && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progress}% completado</span>
          <span>{100 - progress}% restante</span>
        </div>
      )}
    </div>
  );
}
