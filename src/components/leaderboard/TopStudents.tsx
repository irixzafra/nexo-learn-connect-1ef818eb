
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { LeaderboardUser } from '@/data/leaderboard';

interface TopStudentsProps {
  users: LeaderboardUser[];
}

export const TopStudents: React.FC<TopStudentsProps> = ({ users }) => {
  // We'll display only the top 3 users
  const topUsers = users.slice(0, 3);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Top Estudiantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topUsers.map((user, index) => (
          <Card key={user.id} className={`overflow-hidden ${index === 0 ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-transparent dark:from-yellow-950/20 dark:to-transparent' : index === 1 ? 'border-slate-400 bg-gradient-to-br from-slate-50 to-transparent dark:from-slate-950/20 dark:to-transparent' : 'border-amber-700 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/20 dark:to-transparent'}`}>
            <div className="relative p-6 text-center">
              <div className="absolute top-0 left-0 w-full flex justify-center -mt-8">
                <div className={`rounded-full p-3 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-400' : 'bg-amber-700'}`}>
                  <Trophy className={`h-6 w-6 ${index === 0 ? 'text-yellow-800' : index === 1 ? 'text-slate-700' : 'text-amber-100'}`} />
                </div>
              </div>
              
              <div className="mt-6 mb-4">
                <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground">@{user.username}</p>
                {user.isVerified && (
                  <Badge variant="secondary" className="mt-1">Verificado</Badge>
                )}
              </div>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold">{user.points.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Puntos</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div>
                  <div className="font-semibold">{user.level}</div>
                  <p className="text-xs text-muted-foreground">Nivel</p>
                </div>
                <div>
                  <div className="font-semibold">{user.badges}</div>
                  <p className="text-xs text-muted-foreground">Insignias</p>
                </div>
                <div>
                  <div className="font-semibold">{user.streakDays}</div>
                  <p className="text-xs text-muted-foreground">Racha</p>
                </div>
              </div>
              
              <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                Ver Perfil
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
