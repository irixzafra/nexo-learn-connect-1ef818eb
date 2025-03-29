
import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { DashboardStatCard } from "@/features/instructor/components/DashboardStatCard";
import { RecentEnrollmentsCard } from "@/features/instructor/components/RecentEnrollmentsCard";
import { PopularCoursesCard } from "@/features/instructor/components/PopularCoursesCard";
import { useDashboardStats } from "@/features/instructor/hooks/useDashboardStats";
import { BookOpen, Users, BookPlus, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const InstructorDashboard: React.FC = () => {
  const {
    coursesCount,
    publishedCoursesCount,
    totalEnrollments,
    recentEnrollments,
    popularCourses,
    isLoading,
  } = useDashboardStats();

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Panel de Instructor</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </>
          ) : (
            <>
              <DashboardStatCard
                title="Total de Cursos"
                value={coursesCount}
                icon={<BookOpen />}
              />
              <DashboardStatCard
                title="Cursos Publicados"
                value={publishedCoursesCount}
                icon={<BookPlus />}
                description={`${
                  coursesCount ? Math.round((publishedCoursesCount / coursesCount) * 100) : 0
                }% de tus cursos están publicados`}
              />
              <DashboardStatCard
                title="Total de Inscripciones"
                value={totalEnrollments}
                icon={<Users />}
                description={
                  coursesCount
                    ? `Promedio: ${(totalEnrollments / coursesCount).toFixed(1)} por curso`
                    : "Crea tu primer curso"
                }
              />
              <DashboardStatCard
                title="Tasa de Conversión"
                value={`${
                  totalEnrollments && popularCourses.length
                    ? ((totalEnrollments / popularCourses.length) * 100).toFixed(1)
                    : 0
                }%`}
                icon={<TrendingUp />}
                description="Inscripciones por visitante"
              />
            </>
          )}
        </div>

        {/* Cards Row */}
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
              <RecentEnrollmentsCard enrollments={recentEnrollments} />
              <PopularCoursesCard
                courses={popularCourses}
                totalEnrollments={totalEnrollments}
              />
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default InstructorDashboard;
