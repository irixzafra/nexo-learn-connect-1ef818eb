
import React from 'react';
import { cn } from '@/lib/utils';
import { Star, Users, Clock } from 'lucide-react';

interface CourseCardStatsProps {
  rating?: number;
  studentCount: number;
  durationText?: string;
}

export const CourseCardStats: React.FC<CourseCardStatsProps> = ({ 
  rating, 
  studentCount, 
  durationText 
}) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-auto">
      {rating && (
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={cn(
                  "h-3.5 w-3.5", 
                  star <= Math.round(rating) 
                    ? "text-amber-500 fill-amber-500" 
                    : "text-muted-foreground"
                )} 
              />
            ))}
          </div>
          <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
      )}
      
      <div className="flex items-center gap-1 text-muted-foreground">
        <Users className="h-3.5 w-3.5" />
        <span>{studentCount} estudiantes</span>
      </div>
      
      {durationText && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{durationText}</span>
        </div>
      )}
    </div>
  );
};
