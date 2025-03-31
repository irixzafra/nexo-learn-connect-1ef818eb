
import React from 'react';
import { useBadges } from '../hooks/useBadges';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BadgeCard } from './BadgeCard';
import { Loader2 } from 'lucide-react';

interface BadgesListProps {
  userId: string;
  limit?: number;
  showAll?: boolean;
  title?: string;
  description?: string;
}

export const BadgesList: React.FC<BadgesListProps> = ({
  userId,
  limit = 8,
  showAll = false,
  title = "Mis Insignias",
  description = "Insignias que has conseguido en la plataforma"
}) => {
  const { allBadges, userBadges, isLoadingBadges, isLoadingUserBadges } = useBadges(userId);
  
  const isLoading = isLoadingBadges || isLoadingUserBadges;
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!allBadges || allBadges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay insignias disponibles</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const earnedBadgeIds = userBadges?.map(badge => badge.badge_id) || [];
  
  // Si showAll es verdadero, mostramos todas las insignias
  // De lo contrario, mostramos solo las que ha ganado el usuario, hasta el límite
  const badgesToShow = showAll 
    ? allBadges
    : allBadges.filter(badge => earnedBadgeIds.includes(badge.id)).slice(0, limit);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {badgesToShow.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {badgesToShow.map(badge => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isEarned={earnedBadgeIds.includes(badge.id)}
                size="md"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              {showAll ? "No hay insignias disponibles" : "Aún no has ganado insignias"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
