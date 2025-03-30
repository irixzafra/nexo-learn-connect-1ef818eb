
import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCoursePublicData } from '@/features/courses/hooks/useCoursePublicData';
import { CourseLandingPage } from '@/features/courses/components/CourseLandingPage';
import PublicLayout from '@/layouts/PublicLayout';

const CourseDetailPage: React.FC = () => {
  // Extract courseId from URL params
  const { courseId } = useParams<{ courseId: string }>();
  
  // Fetch course data
  const { course, isLoading, error } = useCoursePublicData(courseId);

  // Temporary simplified logic for pending functionality
  const isEnrolled = false;
  const isEnrolling = false;
  const handleEnroll = () => {
    console.log("TODO: Implement enrollment functionality", courseId);
    return Promise.resolve();
  };
  
  // Estimate course stats based on data or provide fallbacks
  const totalLessons = 
    course?.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 10;
  
  const previewableLessons = 
    course?.modules?.flatMap(m => m.lessons || []).filter(l => l?.is_previewable).length || 2;
  
  // Format currency function
  const formatCurrency = (price: number) => `${price.toFixed(2).replace('.', ',')} €`;

  // Handle loading state
  if (isLoading) {
    return (
      <PublicLayout>
        <div className="flex flex-col justify-center items-center min-h-[70vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Cargando información del curso...</p>
        </div>
      </PublicLayout>
    );
  }

  // Handle error or not found
  if (error || (!isLoading && !course)) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6">Curso no encontrado</h1>
          <p className="text-lg text-muted-foreground mb-10">
            El curso que estás buscando no está disponible o ha sido eliminado.
          </p>
        </div>
      </PublicLayout>
    );
  }

  // Render CourseLandingPage component with course data
  return (
    <PublicLayout>
      <CourseLandingPage
        course={course}
        isEnrolled={isEnrolled}
        isEnrolling={isEnrolling}
        handleEnroll={handleEnroll}
        totalLessons={totalLessons}
        previewableLessons={previewableLessons}
        formatCurrency={formatCurrency}
      />
    </PublicLayout>
  );
};

export default CourseDetailPage;
