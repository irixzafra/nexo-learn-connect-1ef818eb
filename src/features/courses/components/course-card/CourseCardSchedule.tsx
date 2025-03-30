
import React from 'react';
import { Calendar } from 'lucide-react';

interface CourseCardScheduleProps {
  startDate?: string;
}

export const CourseCardSchedule: React.FC<CourseCardScheduleProps> = ({ startDate }) => {
  if (!startDate) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="mt-4 flex items-center gap-2 text-xs border-t pt-3 text-muted-foreground">
      <Calendar className="h-3.5 w-3.5" />
      <span>Comienza: {formatDate(startDate)}</span>
    </div>
  );
};
