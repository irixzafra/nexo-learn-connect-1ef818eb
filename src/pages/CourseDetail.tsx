
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ChevronLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourseDetails } from '@/features/courses/hooks/useCourseDetails';
import { useEnrollment } from '@/features/courses/hooks/useEnrollment';
import { useLessonProgress } from '@/features/courses/hooks/useLessonProgress';
import { CourseHeader } from '@/features/courses/components/CourseHeader';
import { CourseDescription } from '@/features/courses/components/CourseDescription';
import { CourseModulesList } from '@/features/courses/components/CourseModulesList';
import { CourseEnrollCard } from '@/features/courses/components/CourseEnrollCard';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [totalLessons, setTotalLessons] = useState(0);
  
  // Fetch course data using the hook
  const { course, modules, modulesWithLessons, lessons, isLoading } = useCourseDetails(id);
  
  // Enrollment logic using the hook
  const { isEnrolled, isEnrolling, isChecking, checkEnrollmentStatus, handleEnroll } = useEnrollment(id || '');
  
  // Course progress for enrolled users
  const { courseProgressPercentage } = useLessonProgress(
    user?.id,
    id
  );

  useEffect(() => {
    if (lessons) {
      setTotalLessons(lessons.length);
    }
  }, [lessons]);

  useEffect(() => {
    if (id && user) {
      checkEnrollmentStatus();
    }
  }, [id, user]);

  const formatCurrency = (price: number, currency: 'eur' | 'usd') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

  const navigateToLesson = (lessonId: string) => {
    // Obtener la lección correspondiente
    const lesson = lessons?.find(l => l.id === lessonId);
    
    if (isEnrolled) {
      // Si está inscrito, puede ver todas las lecciones
      navigate(`/courses/${id}/learn/${lessonId}`);
    } else if (lesson && lesson.is_previewable) {
      // Si la lección es previsible, redirigir directamente
      navigate(`/courses/${id}/learn/${lessonId}`);
    } else if (user) {
      // Si está autenticado pero no inscrito y no es una lección previsible
      toast({
        title: 'Acceso restringido',
        description: 'Debes inscribirte en el curso para acceder a esta lección',
      });
    } else {
      // Si no está autenticado
      navigate('/auth/login', { state: { from: `/courses/${id}` } });
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center items-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Curso no encontrado</h1>
          <p>El curso que buscas no existe o no está disponible actualmente.</p>
          <Button asChild className="mt-4">
            <Link to="/courses">Ver todos los cursos</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  // Count the number of previewable lessons
  const previewableLessonsCount = lessons?.filter(lesson => lesson.is_previewable).length || 0;

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Details (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
            <CourseHeader 
              course={course} 
              totalLessons={totalLessons} 
              formatDate={formatDate} 
            />

            <CourseDescription description={course.description || ''} />

            {previewableLessonsCount > 0 && !isEnrolled && (
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h3 className="text-lg font-medium mb-2">Prueba este curso</h3>
                <p className="mb-2">Este curso tiene {previewableLessonsCount} {previewableLessonsCount === 1 ? 'lección' : 'lecciones'} de vista previa que puedes explorar antes de inscribirte.</p>
                <p className="text-sm text-muted-foreground">Busca el icono <span className="inline-flex items-center ml-1"><Eye className="h-3 w-3 mr-1" /> Vista previa</span> en las lecciones que puedes acceder.</p>
              </div>
            )}

            <CourseModulesList 
              modules={modulesWithLessons} 
              isEnrolled={isEnrolled} 
              onLessonClick={navigateToLesson} 
            />
          </div>

          {/* Course Card (Right Column) */}
          <div className="lg:col-span-1">
            <CourseEnrollCard
              course={course}
              isEnrolled={isEnrolled}
              isEnrolling={isEnrolling}
              courseProgressPercentage={courseProgressPercentage}
              formatCurrency={formatCurrency}
              onEnroll={handleEnroll}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CourseDetail;
