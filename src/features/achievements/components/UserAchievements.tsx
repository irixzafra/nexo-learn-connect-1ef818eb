
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Certificate, Zap, Trophy, Star } from 'lucide-react';
import { useUserAchievements } from '../hooks/useUserAchievements';
import { Skeleton } from '@/components/ui/skeleton';

interface UserAchievementsProps {
  userId: string;
}

export const UserAchievements: React.FC<UserAchievementsProps> = ({ userId }) => {
  const { 
    achievements, 
    certificates, 
    badges, 
    stats, 
    isLoading 
  } = useUserAchievements(userId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-[250px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="achievements" className="space-y-4">
      <TabsList>
        <TabsTrigger value="achievements" className="flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          <span>Logros</span>
        </TabsTrigger>
        <TabsTrigger value="certificates" className="flex items-center gap-2">
          <Certificate className="h-4 w-4" />
          <span>Certificados</span>
        </TabsTrigger>
        <TabsTrigger value="badges" className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          <span>Insignias</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span>Estadísticas</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="achievements" className="space-y-4">
        {achievements.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Sin logros todavía</CardTitle>
              <CardDescription>
                Completa cursos y actividades para ganar logros.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Obtenido el {new Date(achievement.earned_date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="certificates" className="space-y-4">
        {certificates.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Sin certificados todavía</CardTitle>
              <CardDescription>
                Completa cursos para obtener certificados.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((certificate) => (
              <Card key={certificate.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{certificate.course_name}</CardTitle>
                    <Certificate className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardDescription>Certificado de finalización</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Obtenido el {new Date(certificate.issue_date).toLocaleDateString()}
                    </div>
                    <Badge variant="outline">
                      <a href={certificate.certificate_url} target="_blank" rel="noopener noreferrer">
                        Ver certificado
                      </a>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="badges" className="space-y-4">
        {badges.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Sin insignias todavía</CardTitle>
              <CardDescription>
                Participa en la comunidad y completa desafíos para ganar insignias.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <Card key={badge.id} className="overflow-hidden">
                <div className="bg-muted p-4 flex justify-center">
                  {badge.icon_name === 'star' ? (
                    <Star className="h-12 w-12 text-yellow-500" />
                  ) : (
                    <Award className="h-12 w-12 text-indigo-500" />
                  )}
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-base">{badge.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <CardDescription className="text-xs">{badge.description}</CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date(badge.earned_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="stats" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cursos completados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.completedCourses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Lecciones vistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.completedLessons}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Puntos ganados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalPoints}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Posición en ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">#{stats.leaderboardPosition || '-'}</div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};
