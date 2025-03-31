
import React from 'react';
import { Badge } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge as UIBadge } from '@/components/ui/badge';

interface BadgeCardProps {
  badge: Badge;
  isEarned?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ 
  badge, 
  isEarned = false,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <Card className={cn(
      "relative transition-all hover:shadow-md", 
      isEarned ? "bg-primary/5 border-primary/30" : "opacity-70 grayscale",
      className
    )}>
      <CardContent className={cn("flex flex-col items-center text-center", sizeClasses[size])}>
        {isEarned && (
          <UIBadge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-primary/20 text-primary"
          >
            Obtenida
          </UIBadge>
        )}
        
        <div className={cn(
          "rounded-full bg-primary/10 p-3 mb-3 flex items-center justify-center",
          isEarned ? "text-primary" : "text-muted-foreground"
        )}>
          {badge.icon_url ? (
            <img 
              src={badge.icon_url} 
              alt={badge.name} 
              className={iconSizes[size]} 
            />
          ) : (
            <div className={cn(iconSizes[size], "bg-muted rounded-full")} />
          )}
        </div>
        
        <h3 className={cn(
          "font-medium",
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
        )}>
          {badge.name}
        </h3>
        
        {size !== 'sm' && (
          <p className="text-sm text-muted-foreground mt-1">
            {badge.description}
          </p>
        )}
        
        {size !== 'sm' && (
          <div className="mt-2 text-xs font-medium text-primary">
            +{badge.points} puntos
          </div>
        )}
      </CardContent>
    </Card>
  );
};
