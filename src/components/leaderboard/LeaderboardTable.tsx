
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Medal, CheckCircle2, Flame, Star } from 'lucide-react';
import { LeaderboardUser } from '@/data/leaderboard';

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  timeFilter: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ 
  users, 
  searchTerm, 
  setSearchTerm, 
  timeFilter 
}) => {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o usuario..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Tablero de Puntuación {timeFilter === 'monthly' ? '- Mensual' : timeFilter === 'weekly' ? '- Semanal' : ''}</CardTitle>
          <CardDescription>
            Compite con otros estudiantes y sube en la clasificación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Rank</th>
                  <th className="text-left py-3 px-4 font-medium">Usuario</th>
                  <th className="text-left py-3 px-4 font-medium">Nivel</th>
                  <th className="text-left py-3 px-4 font-medium">Puntos</th>
                  <th className="text-left py-3 px-4 font-medium">Racha</th>
                  <th className="text-left py-3 px-4 font-medium">Actividad</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {user.rank <= 3 ? (
                          <div className={`p-1 rounded-full mr-2 ${
                            user.rank === 1 ? 'bg-yellow-400' : 
                            user.rank === 2 ? 'bg-slate-400' : 
                            'bg-amber-700'
                          }`}>
                            <Medal className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <span className="font-semibold text-muted-foreground ml-2 mr-1">
                            {user.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center">
                            {user.name}
                            {user.isVerified && (
                              <CheckCircle2 className="h-3 w-3 ml-1 text-blue-500" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{user.level}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {user.points.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Flame className="h-4 w-4 text-orange-500 mr-1" />
                        <span>{user.streakDays} días</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        user.activity === 'high' ? 'default' : 
                        user.activity === 'medium' ? 'secondary' : 
                        'outline'
                      }>
                        {user.activity === 'high' ? 'Alta' : 
                         user.activity === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron usuarios</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
