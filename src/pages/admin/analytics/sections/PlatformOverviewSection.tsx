
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  BarChart as BarChartIcon,
  BookOpen,
  Users,
  UserPlus,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export interface PlatformStats {
  total_users: number;
  active_users: number;
  new_users: number;
  total_courses: number;
  active_courses: number;
  total_enrollments: number;
  completion_rate: number;
  average_rating: number;
}

interface PlatformOverviewSectionProps {
  stats: PlatformStats;
  isLoading: boolean;
}

const PlatformOverviewSection: React.FC<PlatformOverviewSectionProps> = ({ stats, isLoading }) => {
  // Example data for charts
  const userActivityData = [
    { name: 'Lun', activos: 150, nuevos: 20 },
    { name: 'Mar', activos: 180, nuevos: 25 },
    { name: 'Mié', activos: 220, nuevos: 30 },
    { name: 'Jue', activos: 250, nuevos: 15 },
    { name: 'Vie', activos: 280, nuevos: 40 },
    { name: 'Sáb', activos: 150, nuevos: 10 },
    { name: 'Dom', activos: 120, nuevos: 5 },
  ];

  const courseCompletionData = [
    { name: 'Completados', value: stats.completion_rate },
    { name: 'En progreso', value: 100 - stats.completion_rate }
  ];

  // Color scales
  const COLORS = ['#8B5CF6', '#C4B5FD'];

  // Calculate percentage increases (example data)
  const userIncrease = "+12%";
  const courseIncrease = "+8%";
  const enrollmentIncrease = "+15%";
  
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Users Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Usuarios</CardTitle>
            <CardDescription>Actividad de usuarios en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {isLoading ? <Skeleton className="h-8 w-20" /> : stats.total_users.toLocaleString()}
                  </h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Usuarios Activos</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-2">
                      {isLoading ? <Skeleton className="h-6 w-14" /> : stats.active_users.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      {userIncrease}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nuevos Usuarios</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-2">
                      {isLoading ? <Skeleton className="h-6 w-14" /> : stats.new_users.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      +24%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Courses Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Cursos</CardTitle>
            <CardDescription>Actividad en cursos y lecciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Cursos</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {isLoading ? <Skeleton className="h-8 w-20" /> : stats.total_courses.toLocaleString()}
                  </h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cursos Activos</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-2">
                      {isLoading ? <Skeleton className="h-6 w-14" /> : stats.active_courses.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      {courseIncrease}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inscripciones</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-2">
                      {isLoading ? <Skeleton className="h-6 w-14" /> : stats.total_enrollments.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      {enrollmentIncrease}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Engagement Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Engagement</CardTitle>
            <CardDescription>Métricas de participación y complección</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasa de Complección</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {isLoading ? <Skeleton className="h-8 w-20" /> : `${stats.completion_rate}%`}
                  </h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Calificación Promedio</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-2">
                      {isLoading ? <Skeleton className="h-6 w-14" /> : stats.average_rating.toFixed(1)}
                    </span>
                    <span className="text-xs">/ 5.0</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nuevas inscripciones</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-2">
                      {isLoading ? <Skeleton className="h-6 w-14" /> : "127"}
                    </span>
                    <span className="text-xs text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      +18%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* User Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Actividad de Usuarios</CardTitle>
            <CardDescription>
              Usuarios activos y nuevos registros en la última semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Skeleton className="w-full h-[250px]" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userActivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="activos" fill="#8B5CF6" name="Usuarios Activos" />
                    <Bar dataKey="nuevos" fill="#EC4899" name="Nuevos Usuarios" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Course Completion Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Complección de Cursos</CardTitle>
            <CardDescription>
              Porcentaje de cursos completados vs en progreso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {isLoading ? (
                <Skeleton className="w-[200px] h-[200px] rounded-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseCompletionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {courseCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformOverviewSection;
