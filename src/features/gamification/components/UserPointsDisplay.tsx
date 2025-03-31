
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { usePoints } from '../hooks/usePoints';
import { Loader2, Award } from 'lucide-react';

interface UserPointsDisplayProps {
  userId: string;
  compact?: boolean;
}

export const UserPointsDisplay: React.FC<UserPointsDisplayProps> = ({ 
  userId,
  compact = false
}) => {
  const { userPoints, isLoadingPoints } = usePoints(userId);
  
  // Cálculo del nivel basado en puntos (ejemplo simple)
  const calculateLevel = (points: number) => {
    return Math.floor(points / 100) + 1;
  };
  
  // Cálculo del progreso hacia el siguiente nivel
  const calculateProgress = (points: number) => {
    const currentLevel = calculateLevel(points);
    const pointsForCurrentLevel = (currentLevel - 1) * 100;
    const pointsForNextLevel = currentLevel * 100;
    const pointsInCurrentLevel = points - pointsForCurrentLevel;
    return (pointsInCurrentLevel / (pointsForNextLevel - pointsForCurrentLevel)) * 100;
  };

  if (isLoadingPoints) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  if (!userPoints) {
    return null;
  }
  
  const level = calculateLevel(userPoints.total_points);
  const progress = calculateProgress(userPoints.total_points);
  
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Award className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Nivel {level}</span>
        <span className="text-sm text-muted-foreground">
          ({userPoints.total_points} pts)
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <span className="font-medium">Nivel {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {userPoints.total_points} puntos
        </span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Nivel {level}</span>
        <span>Nivel {level + 1}</span>
      </div>
    </div>
  );
};
