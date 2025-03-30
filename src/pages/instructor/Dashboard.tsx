
import React from "react";
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { DashboardStatCard } from "@/features/instructor/components/DashboardStatCard";
import { RecentEnrollmentsCard } from "@/features/instructor/components/RecentEnrollmentsCard";
import { PopularCoursesCard } from "@/features/instructor/components/PopularCoursesCard";
import { useDashboardStats } from "@/features/instructor/hooks/useDashboardStats";
import { BookOpen, Users, BookPlus, TrendingUp, Plus, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingTrigger } from "@/components/onboarding/OnboardingTrigger";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InstructorDashboard: React.FC = () => {
  const {
    coursesCount,
    publishedCoursesCount,
    totalEnrollments,
    recentEnrollments,
    popularCourses,
    isLoading,
  } = useDashboardStats();
  
  const { user } = useAuth();
  
  // Check if the user is new (created within the last 7 days)
  const isNewUser = user?.created_at && 
    new Date(user.created_at).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days

  return (
    <SectionPageLayout
      header={{
        title: "Panel de Instructor",
        description: "Administra tus cursos y visualiza estadísticas",
        actions: [
          {
            label: "Crear Curso",
            icon: <Plus className="h-4 w-4" />,
            href: "/instructor/courses/create",
          }
        ]
      }}
      stats={{
        stats: [
          {
            label: "Total de Cursos",
            value: isLoading ? "-" : coursesCount,
            icon: <BookOpen className="h-5 w-5" />,
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Cursos Publicados",
            value: isLoading ? "-" : publishedCoursesCount,
            icon: <BookPlus className="h-5 w-5" />,
            descriptor: isLoading ? "-" : `${
              coursesCount ? Math.round((publishedCoursesCount / coursesCount) * 100) : 0
            }% de tus cursos están publicados`,
            loading: isLoading,
            color: "success"
          },
          {
            label: "Total de Inscripciones",
            value: isLoading ? "-" : totalEnrollments,
            icon: <Users className="h-5 w-5" />,
            descriptor: isLoading ? "-" : coursesCount
              ? `Promedio: ${(totalEnrollments / coursesCount).toFixed(1)} por curso`
              : "Crea tu primer curso",
            loading: isLoading,
            color: "primary"
          },
          {
            label: "Tasa de Conversión",
            value: isLoading ? "-" : `${
              totalEnrollments && popularCourses.length
                ? ((totalEnrollments / popularCourses.length) * 100).toFixed(1)
                : 0
            }%`,
            icon: <TrendingUp className="h-5 w-5" />,
            descriptor: "Inscripciones por visitante",
            loading: isLoading,
            color: "warning"
          }
        ]
      }}
      help={{
        title: "Recursos para Instructores",
        description: "Herramientas y guías para optimizar tus cursos",
        links: [
          {
            title: "Guía para instructores",
            description: "Aprende a crear cursos atractivos",
            href: "/instructor/guide",
          },
          {
            title: "Centro de recursos",
            description: "Material de apoyo y plantillas",
            href: "/resources",
            external: true
          }
        ]
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <div className="col-span-2 space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="col-span-2 space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </>
        ) : (
          <>
            <PageSection 
              title="Inscripciones Recientes" 
              variant="card"
              className="col-span-2"
            >
              {recentEnrollments.length > 0 ? (
                <div className="space-y-3">
                  {recentEnrollments.map((enrollment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{enrollment.profiles?.full_name || 'Usuario Desconocido'}</p>
                          <p className="text-sm text-muted-foreground">{enrollment.courses?.title || 'Curso Desconocido'}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(enrollment.enrolled_at || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  <p>No hay inscripciones recientes</p>
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" asChild>
                  <Link to="/instructor/students">
                    Ver todos los estudiantes
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </PageSection>
            
            <PageSection 
              title="Cursos Populares" 
              variant="card"
              className="col-span-2"
            >
              {popularCourses.length > 0 ? (
                <div className="space-y-3">
                  {popularCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-blue-500/10 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-muted-foreground">{course.enrollmentCount} estudiantes</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/instructor/courses/${course.id}`}>
                          Editar
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  <p>No hay cursos disponibles</p>
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" asChild>
                  <Link to="/instructor/courses">
                    Ver todos los cursos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </PageSection>
          </>
        )}
      </div>
      
      {/* New Instructor Call-to-Action */}
      {isNewUser && (
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-6 border border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">¡Bienvenido a la plataforma de instructor!</h3>
              <p className="text-muted-foreground">
                Comienza a crear tu primer curso y comparte tu conocimiento con el mundo.
              </p>
            </div>
            <div className="flex gap-3">
              <OnboardingTrigger autoStart={false} />
              <Button asChild>
                <Link to="/instructor/courses/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear mi primer curso
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </SectionPageLayout>
  );
};

export default InstructorDashboard;
