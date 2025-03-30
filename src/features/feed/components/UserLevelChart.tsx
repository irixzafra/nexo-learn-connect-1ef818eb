
import React from 'react';
import { useUserLevels } from '../hooks/useLeaderboard';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserLevelChartProps {
  currentPoints: number;
  className?: string;
}

export const UserLevelChart: React.FC<UserLevelChartProps> = ({ 
  currentPoints, 
  className 
}) => {
  const { data: levels = [], isLoading } = useUserLevels();
  
  // Find current level and next level
  const getCurrentAndNextLevel = () => {
    if (!levels.length) return { current: null, next: null, progress: 0 };
    
    // Sort levels by min_points
    const sortedLevels = [...levels].sort((a, b) => a.min_points - b.min_points);
    
    let currentLevel = sortedLevels[0];
    let nextLevel = null;
    
    // Find current level
    for (let i = 0; i < sortedLevels.length; i++) {
      if (currentPoints >= sortedLevels[i].min_points) {
        currentLevel = sortedLevels[i];
        nextLevel = sortedLevels[i + 1] || null;
      } else {
        break;
      }
    }
    
    // Calculate progress percentage to next level
    let progress = 100;
    if (nextLevel) {
      const pointsNeeded = nextLevel.min_points - currentLevel.min_points;
      const pointsGained = currentPoints - currentLevel.min_points;
      progress = Math.min(100, Math.max(0, Math.floor((pointsGained / pointsNeeded) * 100)));
    }
    
    return { current: currentLevel, next: nextLevel, progress };
  };
  
  const { current, next, progress } = getCurrentAndNextLevel();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <div className="h-5 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-muted rounded animate-pulse mb-3" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!current) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-primary" />
          Tu progreso
        </CardTitle>
        <CardDescription>
          Sigue participando en la comunidad para subir de nivel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-xl font-bold",
                current.color === 'yellow' && "text-yellow-600 dark:text-yellow-400",
                current.color === 'green' && "text-green-600 dark:text-green-400",
                current.color === 'blue' && "text-blue-600 dark:text-blue-400", 
                current.color === 'red' && "text-red-600 dark:text-red-400",
                current.color === 'purple' && "text-purple-600 dark:text-purple-400",
                current.color === 'orange' && "text-orange-600 dark:text-orange-400",
                current.color === 'brown' && "text-amber-800 dark:text-amber-600", 
                current.color === 'black' && "text-gray-800 dark:text-gray-300"
              )}>
                {current.icon} {current.name}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentPoints.toLocaleString()} puntos
            </span>
          </div>
          
          {next && (
            <div className="text-right">
              <div className="text-sm font-medium">Siguiente nivel</div>
              <span className={cn(
                "text-sm",
                next.color === 'yellow' && "text-yellow-600 dark:text-yellow-400",
                next.color === 'green' && "text-green-600 dark:text-green-400", 
                next.color === 'blue' && "text-blue-600 dark:text-blue-400",
                next.color === 'red' && "text-red-600 dark:text-red-400",
                next.color === 'purple' && "text-purple-600 dark:text-purple-400",
                next.color === 'orange' && "text-orange-600 dark:text-orange-400",
                next.color === 'brown' && "text-amber-800 dark:text-amber-600",
                next.color === 'black' && "text-gray-800 dark:text-gray-300"
              )}>
                {next.icon} {next.name}
              </span>
            </div>
          )}
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{currentPoints} pts</span>
          {next && <span>{next.min_points} pts</span>}
        </div>
      </CardContent>
    </Card>
  );
};
