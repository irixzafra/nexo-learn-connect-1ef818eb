
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { useDashboardStats } from '@/features/instructor/hooks/useDashboardStats';

// Fix imports by using named imports instead of default imports
import { DashboardStatCard } from '@/features/instructor/components/DashboardStatCard';
import { PopularCoursesCard } from '@/features/instructor/components/PopularCoursesCard';
import { RecentEnrollmentsCard } from '@/features/instructor/components/RecentEnrollmentsCard';

// Import Lucide icons
import { BookOpen, Medal, Users, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    coursesCount, 
    publishedCoursesCount,
    totalEnrollments,
    recentEnrollments,
    popularCourses,
    isLoading 
  } = useDashboardStats();

  return (
    <SectionPageLayout
      header={{
        title: "Panel de Instructor",
        description: "Gestiona tus cursos y estudiantes"
      }}
      actions={[
        <Button key="create-course" asChild>
          <Link to="/instructor/create-course">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Curso
          </Link>
        </Button>
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardStatCard
          title="Cursos Totales"
          value={coursesCount}
          description="Todos tus cursos"
          icon={<BookOpen className="h-4 w-4" />}
          trend={{
            value: "+5%",
            label: "desde el mes pasado",
            positive: true,
          }}
        />
        <DashboardStatCard
          title="Cursos Publicados"
          value={publishedCoursesCount}
          description="Cursos visibles a estudiantes"
          icon={<Medal className="h-4 w-4" />}
          trend={{
            value: "+2%",
            label: "desde el mes pasado",
            positive: true,
          }}
        />
        <DashboardStatCard
          title="Inscripciones"
          value={totalEnrollments}
          description="Total de estudiantes"
          icon={<Users className="h-4 w-4" />}
          trend={{
            value: "+12%",
            label: "desde el mes pasado",
            positive: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="popular">Cursos Populares</TabsTrigger>
                <TabsTrigger value="recent">Actividad Reciente</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link to="/instructor/courses">
                  <span>Ver todos</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <TabsContent value="popular" className="mt-0 pt-4">
              <PopularCoursesCard 
                courses={popularCourses} 
                totalEnrollments={totalEnrollments}
                isLoading={isLoading} 
              />
            </TabsContent>
            <TabsContent value="recent" className="mt-0 pt-4">
              <RecentEnrollmentsCard 
                enrollments={recentEnrollments} 
                isLoading={isLoading} 
              />
            </TabsContent>
          </Tabs>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Próximas Clases</CardTitle>
            <CardDescription>
              Tus próximas lecciones y actividades
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 rounded bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border p-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Introducción a React</p>
                      <p className="text-xs text-muted-foreground">Hoy, 3:00 PM</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionPageLayout>
  );
};

export default Dashboard;
