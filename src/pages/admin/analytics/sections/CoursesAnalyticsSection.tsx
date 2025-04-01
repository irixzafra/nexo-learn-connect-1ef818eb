
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

const CoursesAnalyticsSection: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Analíticas de Cursos</CardTitle>
          <Badge variant="outline" className="font-normal">En desarrollo</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground max-w-md">
            Las analíticas detalladas de cursos estarán disponibles próximamente.
            Esta sección mostrará datos de inscripciones, finalización y valoraciones.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesAnalyticsSection;
