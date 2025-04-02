
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, BarChart, PieChart } from 'lucide-react';
import { PlatformStats } from '@/features/admin/analytics/types';

interface PlatformOverviewSectionProps {
  stats: PlatformStats;
  isLoading: boolean;
}

const PlatformOverviewSection: React.FC<PlatformOverviewSectionProps> = ({ stats, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-primary" />
              Crecimiento de Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center bg-muted/40 rounded-md">
                <LineChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Total de Usuarios: {stats.total_users}</h3>
                <p className="text-muted-foreground">
                  {stats.new_users} nuevos usuarios en los últimos 7 días.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-primary" />
              Estadísticas de Cursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center bg-muted/40 rounded-md">
                <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Total de Cursos: {stats.total_courses}</h3>
                <p className="text-muted-foreground">
                  {stats.active_courses} cursos activos con una tasa de finalización del {stats.completion_rate}%.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-primary" />
            Distribución de Usuarios por Rol
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center bg-muted/40 rounded-md">
              <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
              <p className="text-muted-foreground">
                La distribución de usuarios por rol estará disponible próximamente.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformOverviewSection;
