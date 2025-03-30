
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCoursePublicData, useCoursePublicDataBySlug } from '@/features/courses/hooks/useCoursePublicData';
import { CourseLandingPage } from '@/features/courses/components/CourseLandingPage';
import PublicLayout from '@/layouts/PublicLayout';

const CourseDetailPage: React.FC = () => {
  // Extract courseId or slug from URL params
  const { courseId, slug } = useParams<{ courseId?: string; slug?: string }>();
  const navigate = useNavigate();
  
  // Determine if we're using ID or slug
  const usingSlug = !courseId && !!slug;
  
  // Fetch course data based on ID or slug
  const idHook = useCoursePublicData(courseId);
  const slugHook = useCoursePublicDataBySlug(slug);
  
  // Use the appropriate data based on what's available
  const { course, isLoading, error } = usingSlug ? slugHook : idHook;

  // Temporary simplified logic for pending functionality
  const isEnrolled = false;
  const isEnrolling = false;
  const handleEnroll = () => {
    console.log("TODO: Implement enrollment functionality", courseId || slug);
    return Promise.resolve();
  };
  
  // Calculate course stats from the actual data
  const totalLessons = course?.modules?.reduce(
    (acc, module) => acc + (module.lessons?.length || 0), 0
  ) || 0;
  
  const previewableLessons = course?.modules?.flatMap(
    m => m.lessons || []
  ).filter(l => l?.is_previewable).length || 0;
  
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
          <button 
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => navigate('/courses')}
          >
            Ver todos los cursos
          </button>
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
