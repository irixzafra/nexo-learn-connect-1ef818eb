
import React from 'react';
import { useBadges } from '../hooks/useBadges';
import { BadgeCard } from './BadgeCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Award } from 'lucide-react';

interface BadgesListProps {
  userId: string;
  limit?: number;
  showAll?: boolean;
  title?: string;
  description?: string;
}

export const BadgesList: React.FC<BadgesListProps> = ({
  userId,
  limit = 4,
  showAll = false,
  title = "Insignias",
  description = "Colección de logros desbloqueados"
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
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
        <CardContent className="text-center py-6">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No hay insignias disponibles todavía</p>
        </CardContent>
      </Card>
    );
  }

  const earnedBadgeIds = userBadges?.map(ub => ub.badge_id) || [];
  
  // Filtrar las insignias según lo que queremos mostrar
  let badgesToShow = allBadges;
  
  if (!showAll) {
    // Si queremos mostrar solo algunas, priorizamos las ganadas
    const earnedBadges = allBadges.filter(badge => earnedBadgeIds.includes(badge.id));
    const unearnedBadges = allBadges.filter(badge => !earnedBadgeIds.includes(badge.id));
    
    badgesToShow = [
      ...earnedBadges,
      ...unearnedBadges
    ].slice(0, limit);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
          {earnedBadgeIds.length > 0 && (
            <span className="ml-1">
              ({earnedBadgeIds.length}/{allBadges.length} obtenidas)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {badgesToShow.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No hay insignias disponibles todavía</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badgesToShow.map(badge => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isEarned={earnedBadgeIds.includes(badge.id)}
                size="sm"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
