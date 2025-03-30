
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';

const AnalyticsTab: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Analíticas de Cursos</CardTitle>
          <CardDescription>Estadísticas sobre el desempeño de los cursos en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Visión General</TabsTrigger>
              <TabsTrigger value="enrollment">Matrículas</TabsTrigger>
              <TabsTrigger value="completion">Finalización</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatCard 
                  title="Total de Cursos" 
                  value={stats.coursesCount}
                  description="Número total de cursos" 
                  icon={<BarChart className="h-5 w-5" />} 
                  loading={isLoading}
                />
                <StatCard 
                  title="Cursos Publicados" 
                  value={stats.publishedCoursesCount}
                  description="Cursos disponibles públicamente" 
                  icon={<LineChart className="h-5 w-5" />} 
                  loading={isLoading}
                />
                <StatCard 
                  title="Tasa de Finalización" 
                  value={`${stats.completionRate}%`}
                  description="Promedio de finalización de cursos"
                  icon={<PieChart className="h-5 w-5" />} 
                  loading={isLoading}
                />
              </div>
              
              <div className="mt-10 h-96 flex items-center justify-center border rounded-lg bg-muted/10">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Gráficos Avanzados</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Las visualizaciones detalladas de datos de cursos y rendimiento de estudiantes estarán disponibles próximamente.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="enrollment">
              <div className="h-72 flex items-center justify-center border rounded-lg">
                <div className="text-center">
                  <LineChart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Análisis de matriculaciones en desarrollo</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="completion">
              <div className="h-72 flex items-center justify-center border rounded-lg">
                <div className="text-center">
                  <PieChart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Análisis de finalización de cursos en desarrollo</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, loading = false }) => {
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="text-primary bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        {loading ? (
          <div className="h-8 w-24 animate-pulse bg-muted rounded"></div>
        ) : (
          <div className="text-3xl font-bold">{value}</div>
        )}
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default AnalyticsTab;
