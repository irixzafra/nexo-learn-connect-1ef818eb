
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPointsDisplay } from '@/features/gamification/components/UserPointsDisplay';
import { BadgesList } from '@/features/gamification/components/BadgesList';
import { useBadges } from '@/features/gamification/hooks/useBadges';
import { BadgeType } from '@/features/gamification/types';
import { Award, BookOpen, Users, Activity, Star } from 'lucide-react';

const Achievements: React.FC = () => {
  const { user } = useAuth();
  const { allBadges, userBadges } = useBadges(user?.id);
  
  if (!user) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Acceso Restringido</h3>
              <p className="text-muted-foreground text-center">
                Debes iniciar sesión para ver tus logros y puntos.
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Agrupar las insignias por tipo
  const badgesByType: Record<BadgeType, typeof allBadges> = {
    achievement: [],
    course: [],
    activity: [],
    community: [],
    special: []
  };

  if (allBadges) {
    allBadges.forEach(badge => {
      if (badgesByType[badge.badge_type]) {
        badgesByType[badge.badge_type].push(badge);
      }
    });
  }

  const earnedBadgeIds = userBadges?.map(ub => ub.badge_id) || [];
  const totalEarned = earnedBadgeIds.length;
  const totalBadges = allBadges?.length || 0;
  const progressPercentage = totalBadges > 0 ? Math.round((totalEarned / totalBadges) * 100) : 0;

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mis Logros y Puntos</h1>
          <p className="text-muted-foreground mt-1">
            Revisa tus insignias, puntos y nivel en la plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Progreso de Insignias</CardTitle>
              <CardDescription>
                Has obtenido {totalEarned} de {totalBadges} insignias ({progressPercentage}%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <UserPointsDisplay userId={user.id} />
                </div>
                <div className="border-l pl-4 hidden md:block"></div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-2">Insignias por Categoría</h3>
                  <div className="space-y-2">
                    {(Object.keys(badgesByType) as BadgeType[]).map(type => {
                      const badges = badgesByType[type] || [];
                      const earned = badges.filter(b => earnedBadgeIds.includes(b.id)).length;
                      if (badges.length === 0) return null;
                      
                      return (
                        <div key={type} className="flex justify-between text-sm">
                          <span className="capitalize">{type}</span>
                          <span className="text-muted-foreground">
                            {earned}/{badges.length}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Logros</CardTitle>
              <CardDescription>
                Insignias recientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userBadges && userBadges.length > 0 ? (
                <div className="space-y-3">
                  {userBadges.slice(0, 3).map(userBadge => {
                    const badge = userBadge.badge;
                    if (!badge) return null;
                    
                    return (
                      <div key={userBadge.id} className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{badge.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(userBadge.awarded_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Aún no has obtenido ninguna insignia
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="achievement">
              <Award className="h-4 w-4 mr-1" /> Logros
            </TabsTrigger>
            <TabsTrigger value="course">
              <BookOpen className="h-4 w-4 mr-1" /> Cursos
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Activity className="h-4 w-4 mr-1" /> Actividad
            </TabsTrigger>
            <TabsTrigger value="community">
              <Users className="h-4 w-4 mr-1" /> Comunidad
            </TabsTrigger>
            <TabsTrigger value="special">
              <Star className="h-4 w-4 mr-1" /> Especiales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <BadgesList userId={user.id} showAll title="Todas las Insignias" description="Todas las insignias disponibles en la plataforma" />
          </TabsContent>
          
          {(Object.keys(badgesByType) as BadgeType[]).map(type => (
            <TabsContent key={type} value={type}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">Insignias de {type}</CardTitle>
                  <CardDescription>
                    Logros relacionados con {type === 'achievement' ? 'desafíos generales' : 
                                          type === 'course' ? 'cursos completados' :
                                          type === 'activity' ? 'actividad en la plataforma' :
                                          type === 'community' ? 'participación en la comunidad' :
                                          'eventos especiales'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {badgesByType[type] && badgesByType[type].length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {badgesByType[type].map(badge => (
                        <BadgeCard
                          key={badge.id}
                          badge={badge}
                          isEarned={earnedBadgeIds.includes(badge.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No hay insignias disponibles en esta categoría</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Achievements;
