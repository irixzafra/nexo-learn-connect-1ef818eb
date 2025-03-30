
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const AnalyticsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analíticas de Cursos</CardTitle>
        <CardDescription>Estadísticas sobre el desempeño de los cursos en la plataforma</CardDescription>
      </CardHeader>
      <CardContent className="h-72 flex items-center justify-center">
        <div className="text-muted-foreground text-center">
          <BarChart className="h-10 w-10 mx-auto mb-4" />
          <p>Analíticas de cursos en desarrollo</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
