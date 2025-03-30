
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  CalendarRange,
  Award
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardStatCard from '@/features/instructor/components/DashboardStatCard';
import PopularCoursesCard from '@/features/instructor/components/PopularCoursesCard';
import RecentEnrollmentsCard from '@/features/instructor/components/RecentEnrollmentsCard';
import { useDashboardStats } from '@/features/instructor/hooks/useDashboardStats';

const InstructorDashboard: React.FC = () => {
  const { stats, isLoading } = useDashboardStats();
  
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Instructor</h1>
          <p className="mt-1 text-muted-foreground">
            Bienvenido de vuelta! Aquí tienes una visión general de tus cursos y estudiantes.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <CalendarRange className="mr-2 h-4 w-4" />
            Programar clase
          </Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Crear curso
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard 
          title="Estudiantes"
          value={stats.totalStudents}
          icon={<Users className="h-4 w-4" />}
          trend={12}
          trendLabel="vs mes anterior"
          loading={isLoading}
        />
        <DashboardStatCard 
          title="Cursos"
          value={stats.totalCourses}
          icon={<BookOpen className="h-4 w-4" />}
          trend={4}
          trendLabel="vs mes anterior"
          loading={isLoading}
        />
        <DashboardStatCard 
          title="Ingresos"
          value={`$${stats.totalRevenue}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={8}
          trendLabel="vs mes anterior"
          loading={isLoading}
        />
        <DashboardStatCard 
          title="Valoración"
          value={stats.averageRating.toFixed(1)}
          icon={<Award className="h-4 w-4" />}
          trend={0.2}
          trendLabel="vs mes anterior"
          loading={isLoading}
        />
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista general</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <PopularCoursesCard />
            <RecentEnrollmentsCard />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento</CardTitle>
              <CardDescription>
                Visión general del rendimiento de tus cursos en los últimos 30 días
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                Gráfico de rendimiento (en desarrollo)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos</CardTitle>
              <CardDescription>
                Lista de todos tus cursos activos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/40 rounded-md">
                Tabla de cursos (en desarrollo)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mis Estudiantes</CardTitle>
              <CardDescription>
                Lista de estudiantes inscritos en tus cursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/40 rounded-md">
                Tabla de estudiantes (en desarrollo)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Ingresos</CardTitle>
              <CardDescription>
                Visualización de tus ingresos a lo largo del tiempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/40 rounded-md">
                Gráfico de ingresos (en desarrollo)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorDashboard;
