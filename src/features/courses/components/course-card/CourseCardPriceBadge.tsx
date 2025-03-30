
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CourseCardPriceBadgeProps {
  price: number;
}

export const CourseCardPriceBadge: React.FC<CourseCardPriceBadgeProps> = ({ price }) => {
  return (
    <div className="absolute top-3 right-3">
      {price === 0 ? (
        <Badge variant="secondary" className="bg-green-500 text-white border-0 shadow-md">
          Gratis
        </Badge>
      ) : (
        <Badge variant="secondary" className="bg-white text-black border-0 font-semibold shadow-md">
          {price}€
        </Badge>
      )}
    </div>
  );
};
