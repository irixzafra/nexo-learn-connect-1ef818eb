
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Loader2, 
  BookOpen, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Lock, 
  PlayCircle,
  FileText
} from 'lucide-react';

type Module = {
  id: string;
  title: string;
  module_order: number;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  module_id: string;
  title: string;
  lesson_order: number;
  content_type: 'text' | 'video';
  is_previewable: boolean;
};

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'eur' | 'usd';
  is_published: boolean;
  created_at: string;
  instructor_id: string;
  instructor: {
    full_name: string;
    id: string;
  };
};

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    if (id) {
      fetchCourseData();
    }
  }, [id]);

  useEffect(() => {
    if (id && user) {
      checkEnrollmentStatus();
    }
  }, [id, user]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    try {
      // Fetch course with instructor name
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles(id, full_name)
        `)
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (courseError) throw courseError;
      if (!courseData) {
        navigate('/courses');
        return;
      }

      setCourse(courseData as Course);

      // Fetch modules with their order
      const { data: modulesData, error: modulesError } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', id)
        .order('module_order', { ascending: true });

      if (modulesError) throw modulesError;

      // Fetch lessons for all modules
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('lesson_order', { ascending: true });

      if (lessonsError) throw lessonsError;

      // Calculate total lessons
      setTotalLessons(lessonsData.length);

      // Group lessons by module_id
      const lessonsGroupedByModule = lessonsData.reduce((acc: Record<string, Lesson[]>, lesson: Lesson) => {
        if (!acc[lesson.module_id]) {
          acc[lesson.module_id] = [];
        }
        acc[lesson.module_id].push(lesson);
        return acc;
      }, {});

      // Combine modules with their lessons
      const modulesWithLessons = modulesData.map((module: Module) => ({
        ...module,
        lessons: lessonsGroupedByModule[module.id] || [],
      }));

      setModules(modulesWithLessons);
    } catch (error: any) {
      console.error('Error fetching course:', error);
      toast({
        title: 'Error',
        description: 'No se pudo cargar el curso',
        variant: 'destructive',
      });
      navigate('/courses');
    } finally {
      setIsLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id')
        .eq('course_id', id)
        .eq('user_id', user?.id)
        .single();

      setIsEnrolled(!!data);
    } catch (error) {
      // Not enrolled (no enrollment found)
      setIsEnrolled(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: `/courses/${id}` } });
      return;
    }

    setIsEnrolling(true);
    try {
      if (course?.price && course.price > 0) {
        // For paid courses, redirect to payment page (will be implemented later)
        navigate(`/checkout/${id}`);
        return;
      }

      // For free courses, enroll directly
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user?.id,
          course_id: id,
        });

      if (error) throw error;

      setIsEnrolled(true);
      toast({
        title: '¡Inscripción exitosa!',
        description: 'Ahora tienes acceso a todo el contenido del curso',
      });

      // Redirect to course content
      navigate(`/courses/${id}/learn`);
    } catch (error: any) {
      console.error('Error enrolling in course:', error);
      toast({
        title: 'Error',
        description: 'No se pudo completar la inscripción',
        variant: 'destructive',
      });
    } finally {
      setIsEnrolling(false);
    }
  };

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
    if (isEnrolled) {
      navigate(`/courses/${id}/learn/${lessonId}`);
    } else if (isAuthenticated) {
      toast({
        title: 'Acceso restringido',
        description: 'Debes inscribirte en el curso para acceder a esta lección',
      });
    } else {
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
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground mb-4">
                Por {course.instructor?.full_name || 'Instructor'}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{totalLessons} lecciones</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Creado en {formatDate(course.created_at)}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sobre este curso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{course.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contenido del curso</CardTitle>
                <CardDescription>
                  {modules.length} módulos • {totalLessons} lecciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                {modules.length === 0 ? (
                  <p className="text-muted-foreground">Este curso aún no tiene contenido.</p>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {modules.map((module) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-start">
                            <span className="font-medium">{module.title}</span>
                            <Badge variant="outline" className="ml-2">
                              {module.lessons.length} lecciones
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 mt-2">
                            {module.lessons.map((lesson) => (
                              <li 
                                key={lesson.id}
                                className={`p-2 rounded-md flex items-center ${lesson.is_previewable || isEnrolled ? 'cursor-pointer hover:bg-muted' : ''}`}
                                onClick={() => {
                                  if (lesson.is_previewable || isEnrolled) {
                                    navigateToLesson(lesson.id);
                                  }
                                }}
                              >
                                {lesson.content_type === 'video' ? (
                                  <PlayCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                ) : (
                                  <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                                )}
                                <span className="flex-grow">{lesson.title}</span>
                                {!lesson.is_previewable && !isEnrolled ? (
                                  <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                ) : (
                                  lesson.is_previewable && !isEnrolled && (
                                    <Badge variant="outline" className="ml-2">Vista previa</Badge>
                                  )
                                )}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Course Card (Right Column) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {course.price > 0 
                    ? formatCurrency(course.price, course.currency) 
                    : 'Gratis'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    <span>Acceso completo al curso</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    <span>Acceso de por vida</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    <span>Certificado de finalización</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                {isEnrolled ? (
                  <Button className="w-full mb-2" asChild>
                    <Link to={`/courses/${id}/learn`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Continuar Aprendizaje
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    className="w-full mb-2" 
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        {course.price > 0 ? (
                          <>Comprar Ahora</>
                        ) : (
                          <>Inscribirme Gratis</>
                        )}
                      </>
                    )}
                  </Button>
                )}
                <p className="text-xs text-center text-muted-foreground">
                  {course.price > 0 
                    ? '30 días de garantía de devolución de dinero' 
                    : 'Sin compromisos, cancela cuando quieras'}
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CourseDetail;
