
import React from 'react';

export interface PopularCoursesCardProps {
  courses: any[];
  totalEnrollments: number;
  isLoading?: boolean;
}

export const PopularCoursesCard: React.FC<PopularCoursesCardProps> = ({ 
  courses, 
  totalEnrollments,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 rounded bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="p-4 text-center rounded-lg border">
        <p className="text-muted-foreground">No hay cursos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {courses.map((course, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
            {i + 1}
          </div>
          <div className="flex-1">
            <p className="font-medium">{course.title}</p>
            <p className="text-sm text-muted-foreground">
              {course.enrollmentCount} inscripciones ({Math.round((course.enrollmentCount / totalEnrollments) * 100)}%)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
