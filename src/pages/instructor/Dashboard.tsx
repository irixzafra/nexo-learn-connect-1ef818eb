
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
          icon={<BookOpenIcon className="h-4 w-4" />}
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
          icon={<MedalIcon className="h-4 w-4" />}
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
          icon={<UsersIcon className="h-4 w-4" />}
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

// Import the Lucide icons as React components
const BookOpenIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const MedalIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11" />
    <path d="M8.21 10.11 7 1l5 3 5-3-1.21 9.11" />
  </svg>
);

const UsersIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Clock = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Dashboard;
