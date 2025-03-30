
import React from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  limit?: number;
  className?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ limit = 10, className }) => {
  const { data: users = [], isLoading } = useLeaderboard(limit);

  // Determine which icon to show based on rank
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-xs font-bold text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Leaderboard
        </CardTitle>
        <CardDescription>
          Los miembros más activos de la comunidad
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex items-center justify-center" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-16 bg-muted rounded animate-pulse mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {getRankIcon(user.rank)}
                </div>
                
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} 
                    alt={user.full_name} 
                  />
                  <AvatarFallback>{user.full_name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">{user.full_name}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        user.level_color === 'yellow' && "text-yellow-600 dark:text-yellow-400",
                        user.level_color === 'green' && "text-green-600 dark:text-green-400",
                        user.level_color === 'blue' && "text-blue-600 dark:text-blue-400",
                        user.level_color === 'red' && "text-red-600 dark:text-red-400",
                        user.level_color === 'purple' && "text-purple-600 dark:text-purple-400",
                        user.level_color === 'orange' && "text-orange-600 dark:text-orange-400",
                        user.level_color === 'brown' && "text-amber-800 dark:text-amber-600",
                        user.level_color === 'black' && "text-gray-800 dark:text-gray-300"
                      )}
                    >
                      {user.level_icon} {user.level_name}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground block truncate">
                    {user.points.toLocaleString()} puntos
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
