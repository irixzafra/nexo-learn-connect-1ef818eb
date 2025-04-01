
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface PlatformOverviewSectionProps {
  stats: DashboardStats;
  isLoading: boolean;
}

const PlatformOverviewSection: React.FC<PlatformOverviewSectionProps> = ({ stats, isLoading }) => {
  // Datos de ejemplo para gráficos
  const activityData = [
    { name: 'Lun', usuarios: 120, cursos: 15, visitas: 234 },
    { name: 'Mar', usuarios: 150, cursos: 16, visitas: 256 },
    { name: 'Mié', usuarios: 180, cursos: 18, visitas: 265 },
    { name: 'Jue', usuarios: 170, cursos: 17, visitas: 267 },
    { name: 'Vie', usuarios: 190, cursos: 20, visitas: 280 },
    { name: 'Sáb', usuarios: 110, cursos: 14, visitas: 190 },
    { name: 'Dom', usuarios: 90, cursos: 10, visitas: 167 },
  ];

  const monthlyTrendsData = [
    { name: 'Ene', usuarios: 400, matrículas: 240, ingresos: 2400 },
    { name: 'Feb', usuarios: 420, matrículas: 250, ingresos: 2500 },
    { name: 'Mar', usuarios: 450, matrículas: 260, ingresos: 2600 },
    { name: 'Abr', usuarios: 470, matrículas: 290, ingresos: 2900 },
    { name: 'May', usuarios: 500, matrículas: 310, ingresos: 3100 },
    { name: 'Jun', usuarios: 520, matrículas: 315, ingresos: 3150 },
    { name: 'Jul', usuarios: 550, matrículas: 335, ingresos: 3350 },
    { name: 'Ago', usuarios: 570, matrículas: 350, ingresos: 3500 },
    { name: 'Sep', usuarios: 590, matrículas: 370, ingresos: 3700 },
    { name: 'Oct', usuarios: 610, matrículas: 380, ingresos: 3800 },
    { name: 'Nov', usuarios: 630, matrículas: 400, ingresos: 4000 },
    { name: 'Dic', usuarios: 650, matrículas: 420, ingresos: 4200 },
  ];

  const userSourceData = [
    { name: 'Orgánico', valor: 45 },
    { name: 'Social', valor: 25 },
    { name: 'Directo', valor: 15 },
    { name: 'Referido', valor: 10 },
    { name: 'Email', valor: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad Semanal */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Actividad Semanal</CardTitle>
            <CardDescription>
              Interacción de usuarios y cursos en los últimos 7 días
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="usuarios" name="Usuarios Activos" fill="#8884d8" />
                  <Bar dataKey="cursos" name="Cursos Vistos" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Tendencias Mensuales */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tendencias Anuales</CardTitle>
            <CardDescription>
              Evolución de métricas clave durante el último año
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <Tabs defaultValue="usuarios">
                <TabsList className="mb-4">
                  <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
                  <TabsTrigger value="matriculas">Matrículas</TabsTrigger>
                  <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="usuarios">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="usuarios" name="Usuarios" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="matriculas">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="matrículas" name="Matrículas" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="ingresos">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`€${value}`, 'Ingresos']} />
                      <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Segunda fila */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas de Plataforma */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Estadísticas de Rendimiento</CardTitle>
            <CardDescription>
              Métricas clave de rendimiento de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16">
              {/* Tasa de finalización */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Tasa de Finalización de Cursos</h4>
                <div className="text-3xl font-bold">{isLoading ? "..." : `${stats.completionRate}%`}</div>
                <div className="w-full bg-muted mt-2 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${stats.completionRate}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Promedio de todos los cursos</p>
              </div>
              
              {/* Cursos Publicados */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Cursos Publicados</h4>
                <div className="text-3xl font-bold">
                  {isLoading ? "..." : `${stats.publishedCoursesCount}/${stats.coursesCount}`}
                </div>
                <div className="w-full bg-muted mt-2 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ 
                      width: `${stats.coursesCount ? (stats.publishedCoursesCount / stats.coursesCount) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Del total de cursos creados</p>
              </div>
              
              {/* Usuarios Nuevos */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Usuarios Nuevos (7 días)</h4>
                <div className="text-3xl font-bold">{isLoading ? "..." : stats.new_users_last_7_days}</div>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-green-500 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    12%
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">vs. semana anterior</span>
                </div>
              </div>
              
              {/* Matrículas Totales */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Matrículas Totales</h4>
                <div className="text-3xl font-bold">{isLoading ? "..." : stats.total_enrollments}</div>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-green-500 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    8%
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">vs. mes anterior</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fuentes de Usuarios */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Fuentes de Usuarios</CardTitle>
            <CardDescription>
              Principales canales de adquisición
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[250px]" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={userSourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Bar dataKey="valor" name="Porcentaje" fill="#8884d8" barSize={20} />
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Footer con nota */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-1">Datos presentados con fines ilustrativos. En un entorno de producción, estos datos serían reales.</p>
            <p>Última actualización: {new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformOverviewSection;
