
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
import { 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

// Colors for charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const AnalyticsTab: React.FC = () => {
  const { stats, popularCourses, isLoading } = useAdminDashboardStats();
  
  const publicationData = [
    { name: 'Publicados', value: stats.publishedCoursesCount },
    { name: 'Borradores', value: stats.draftCoursesCount }
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Analíticas de Cursos</CardTitle>
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
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Publication Status Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Estado de Publicación</CardTitle>
                    <CardDescription>Cursos publicados vs. borradores</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Skeleton className="h-full w-full rounded-md" />
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={publicationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {publicationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
                
                {/* Popular Courses Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cursos Más Populares</CardTitle>
                    <CardDescription>Por número de matrículas</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Skeleton className="h-full w-full rounded-md" />
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={popularCourses}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="title" tick={false} />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string, props: any) => [value, 'Matrículas']}
                            labelFormatter={(label: string) => `Curso: ${label}`}
                          />
                          <Legend />
                          <Bar dataKey="enrollment_count" name="Matrículas" fill="#8884d8" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="enrollment">
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <div className="text-center">
                  <LineChart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Análisis detallado de matriculaciones en desarrollo</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="completion">
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <div className="text-center">
                  <PieChart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Análisis detallado de finalización de cursos en desarrollo</p>
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
