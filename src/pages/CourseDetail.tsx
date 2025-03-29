
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft } from 'lucide-react';
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
