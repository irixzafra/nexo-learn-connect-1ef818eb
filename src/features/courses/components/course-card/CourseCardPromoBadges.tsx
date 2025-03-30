
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Flame, Star } from 'lucide-react';

interface CourseCardPromoBadgesProps {
  isPopular?: boolean;
  isNew?: boolean;
  isUpcoming?: boolean;
  isStartingSoon?: boolean;
  hasHighRating?: boolean;
}

export const CourseCardPromoBadges: React.FC<CourseCardPromoBadgesProps> = ({
  isPopular = false,
  isNew = false,
  isUpcoming = false,
  isStartingSoon = false,
  hasHighRating = false,
}) => {
  if (!isPopular && !isNew && !isUpcoming && !isStartingSoon && !hasHighRating) {
    return null;
  }
  
  return (
    <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[80%]">
      {isPopular && (
        <Badge variant="secondary" className="bg-amber-500 text-white border-0 shadow-md flex gap-1 items-center">
          <Flame className="h-3 w-3" /> Popular
        </Badge>
      )}
      
      {isNew && (
        <Badge variant="secondary" className="bg-emerald-500 text-white border-0 shadow-md">
          Nuevo
        </Badge>
      )}
      
      {isUpcoming && !isStartingSoon && (
        <Badge variant="secondary" className="bg-blue-500 text-white border-0 shadow-md flex gap-1 items-center">
          <Calendar className="h-3 w-3" /> Próximamente
        </Badge>
      )}
      
      {isStartingSoon && (
        <Badge variant="secondary" className="bg-purple-500 text-white border-0 shadow-md flex gap-1 items-center">
          <Calendar className="h-3 w-3" /> Comienza pronto
        </Badge>
      )}
      
      {hasHighRating && (
        <Badge variant="secondary" className="bg-yellow-500 text-white border-0 shadow-md flex gap-1 items-center">
          <Star className="h-3 w-3 fill-current" /> Destacado
        </Badge>
      )}
    </div>
  );
};
