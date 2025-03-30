
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CourseCardLevelBadgeProps {
  level?: string;
}

export const CourseCardLevelBadge: React.FC<CourseCardLevelBadgeProps> = ({ level }) => {
  if (!level) {
    return null;
  }
  
  return (
    <div className="absolute bottom-3 left-3">
      <Badge variant="outline" className="bg-black/30 text-white backdrop-blur-sm border-white/20">
        {level}
      </Badge>
    </div>
  );
};
