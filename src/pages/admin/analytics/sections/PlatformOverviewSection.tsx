import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { PlatformStats } from '@/features/admin/analytics/types';

interface PlatformOverviewSectionProps {
  stats: PlatformStats;
  isLoading: boolean;
}

// Sample data
const last30DaysData = [
  { date: '01/06', users: 42, courses: 3 },
  { date: '05/06', users: 51, courses: 3 },
  { date: '10/06', users: 63, courses: 4 },
  { date: '15/06', users: 75, courses: 5 },
  { date: '20/06', users: 92, courses: 5 },
  { date: '25/06', users: 105, courses: 7 },
  { date: '30/06', users: 121, courses: 8 },
];

const courseDistributionData = [
  { name: 'Programación', value: 35 },
  { name: 'Diseño', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Negocios', value: 15 },
  { name: 'Idiomas', value: 5 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const PlatformOverviewSection: React.FC<PlatformOverviewSectionProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const userActivityData = {
    totalUsers: stats.total_users,
    activeUsers: stats.active_users,
    newUsers: stats.new_users,
    completionRate: stats.completion_rate,
    averageRating: stats.average_rating,
  };

  const courseData = {
    totalCourses: stats.total_courses,
    activeCourses: stats.active_courses,
    totalEnrollments: stats.total_enrollments,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento</CardTitle>
            <CardDescription>Usuarios y cursos en los últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={last30DaysData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                    name="Usuarios"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="courses" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorCourses)" 
                    name="Cursos"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Course Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Cursos</CardTitle>
            <CardDescription>Por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {courseDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} cursos`, 'Cantidad']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Plataforma</CardTitle>
          <CardDescription>Resumen global de actividad</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList className="mb-4">
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="courses">Cursos</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Usuarios Totales</div>
                    <div className="text-2xl font-bold">{userActivityData.totalUsers}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Usuarios Activos</div>
                    <div className="text-2xl font-bold">{userActivityData.activeUsers}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Usuarios Nuevos (último mes)</div>
                    <div className="text-2xl font-bold">{userActivityData.newUsers}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Tasa de Finalización</div>
                    <div className="text-2xl font-bold">{userActivityData.completionRate}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Calificación Promedio</div>
                    <div className="text-2xl font-bold">{userActivityData.averageRating}/5</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Cursos Totales</div>
                    <div className="text-2xl font-bold">{courseData.totalCourses}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Cursos Activos</div>
                    <div className="text-2xl font-bold">{courseData.activeCourses}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Inscripciones Totales</div>
                    <div className="text-2xl font-bold">{courseData.totalEnrollments}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformOverviewSection;
