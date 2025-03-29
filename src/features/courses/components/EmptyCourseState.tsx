
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmptyCourseStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyCourseState: React.FC<EmptyCourseStateProps> = ({
  hasFilters,
  onClearFilters,
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-10">
        {hasFilters ? (
          <>
            <p className="text-muted-foreground mb-4">
              No se encontraron cursos con los filtros seleccionados
            </p>
            <Button variant="outline" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
          </>
        ) : (
          <p className="text-muted-foreground">
            No hay cursos disponibles en este momento
          </p>
        )}
      </CardContent>
    </Card>
  );
};
