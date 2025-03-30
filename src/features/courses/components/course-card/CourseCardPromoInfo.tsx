
import React from 'react';
import { BarChart3, Flame } from 'lucide-react';

interface CourseCardPromoInfoProps {
  isNew?: boolean;
  isPopular?: boolean;
}

export const CourseCardPromoInfo: React.FC<CourseCardPromoInfoProps> = ({ 
  isNew = false, 
  isPopular = false 
}) => {
  if (!isNew && !isPopular) {
    return null;
  }
  
  return (
    <>
      {isNew && (
        <div className="mt-4 bg-emerald-500/10 rounded-lg p-2 flex items-center text-xs text-emerald-600">
          <BarChart3 className="h-3.5 w-3.5 mr-1" />
          <span>Alta demanda - Curso nuevo</span>
        </div>
      )}
      
      {isPopular && !isNew && (
        <div className="mt-4 bg-amber-500/10 rounded-lg p-2 flex items-center text-xs text-amber-600">
          <Flame className="h-3.5 w-3.5 mr-1" />
          <span>Popular - {Math.floor(Math.random() * 50) + 10} inscritos esta semana</span>
        </div>
      )}
    </>
  );
};
