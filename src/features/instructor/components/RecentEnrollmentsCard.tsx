
import React from 'react';

export interface RecentEnrollmentsCardProps {
  enrollments: any[];
  isLoading?: boolean;
}

export const RecentEnrollmentsCard: React.FC<RecentEnrollmentsCardProps> = ({ 
  enrollments,
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

  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="p-4 text-center rounded-lg border">
        <p className="text-muted-foreground">No hay inscripciones recientes</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {enrollments.map((enrollment, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary font-medium">
            {enrollment.profiles?.full_name?.charAt(0) || '?'}
          </div>
          <div className="flex-1">
            <p className="font-medium">{enrollment.profiles?.full_name || 'Usuario'}</p>
            <p className="text-sm text-muted-foreground">
              Se inscribió a: {enrollment.courses?.title || 'Curso'}
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(enrollment.enrolled_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};
