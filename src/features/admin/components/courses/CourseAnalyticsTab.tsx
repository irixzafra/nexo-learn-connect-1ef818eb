
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PageSection } from '@/layouts/SectionPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Users } from 'lucide-react';

interface CourseAnalyticsTabProps {
  courseId: string;
  courseName: string;
}

const CourseAnalyticsTab: React.FC<CourseAnalyticsTabProps> = ({ courseId, courseName }) => {
  const { data: courseStats, isLoading } = useQuery({
    queryKey: ['courseAnalytics', courseId],
    queryFn: async () => {
      // Fetch enrollments count
      const { count: enrollmentsCount, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId);
      
      if (enrollmentsError) throw enrollmentsError;
      
      // Fetch lesson progress
      const { data: lessonProgressData, error: progressError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('course_id', courseId)
        .eq('is_completed', true);
      
      if (progressError) throw progressError;
      
      // Fetch certificates
      const { count: certificatesCount, error: certificatesError } = await supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId);
      
      if (certificatesError) throw certificatesError;
      
      return {
        enrollmentsCount: enrollmentsCount || 0,
        completedLessonsCount: lessonProgressData?.length || 0,
        certificatesCount: certificatesCount || 0
      };
    }
  });

  if (isLoading) {
    return (
      <PageSection variant="card" title="Analíticas del Curso" description="Estadísticas y métricas">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection variant="card" title="Analíticas del Curso" description="Estadísticas y métricas">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{courseStats?.enrollmentsCount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Total de estudiantes matriculados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lecciones Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <BarChart className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{courseStats?.completedLessonsCount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Total de lecciones completadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <LineChart className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{courseStats?.certificatesCount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Estudiantes que completaron el curso</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progreso de los Estudiantes</CardTitle>
            <CardDescription>Distribución del progreso en el curso</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p>Gráficos de progreso en desarrollo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Engagement por Módulo</CardTitle>
            <CardDescription>Participación por módulo del curso</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p>Gráficos de engagement en desarrollo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageSection>
  );
};

export default CourseAnalyticsTab;
