
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollment } from '@/features/courses/hooks/useEnrollment';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course, Lesson, Module } from '@/types/course';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BookOpen, Star, Clock, Calendar, User, PlayCircle, 
  CheckCircle, LockIcon, Award, ChevronRight, Brain
} from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { courseId, slug } = useParams<{ courseId?: string; slug?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Determine if we're using ID or slug
  const usingSlug = !courseId && !!slug;
  
  // Fetch course details
  const { data: course, isLoading } = useQuery({
    queryKey: ['courseDetail', courseId || slug],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select(`
          *,
          instructor:instructor_id(*),
          modules:modules(
            *,
            lessons:lessons(*)
          )
        `);
      
      if (usingSlug) {
        query = query.eq('slug', slug);
      } else {
        query = query.eq('id', courseId);
      }
      
      const { data, error } = await query.single();
      
      if (error) throw error;
      
      // Sort modules and lessons by order
      if (data.modules) {
        data.modules.sort((a: Module, b: Module) => a.module_order - b.module_order);
        data.modules.forEach((module: Module) => {
          if (module.lessons) {
            module.lessons.sort((a: Lesson, b: Lesson) => a.lesson_order - b.lesson_order);
          }
        });
      }
      
      return data as Course;
    }
  });
  
  // Fetch enrollment status
  const { isEnrolled, isEnrolling, handleEnroll } = useEnrollment(course?.id || '');
  
  // Calculate course stats
  const totalLessons = course?.modules?.reduce(
    (acc, module) => acc + (module.lessons?.length || 0), 0
  ) || 0;
  
  const totalVideoDuration = course?.modules?.reduce(
    (acc, module) => acc + module.lessons?.reduce(
      (lessonAcc, lesson) => lessonAcc + (lesson.duration || 0), 0
    ) || 0, 0
  ) || 0;
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const formatPrice = (price: number) => {
    return `${price.toFixed(2).replace('.', ',')} €`;
  };
  
  const getInstructorInitials = () => {
    if (!course?.instructor?.full_name) return 'IN';
    return course.instructor.full_name
      .split(' ')
      .map((name: string) => name[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  const startCourse = () => {
    // Find first lesson
    if (course?.modules && course.modules.length > 0) {
      const firstModule = course.modules[0];
      if (firstModule.lessons && firstModule.lessons.length > 0) {
        const firstLesson = firstModule.lessons[0];
        navigate(`/app/course/${course.id}/lesson/${firstLesson.id}`);
        return;
      }
    }
    
    // No lessons found
    navigate(`/app/course/${course.id}`);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-8 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-80 w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
        <p className="text-muted-foreground mb-8">
          El curso que estás buscando no existe o ha sido eliminado.
        </p>
        <Button onClick={() => navigate('/courses')}>
          Explorar cursos
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-3 mb-4">
                {course.level && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Brain className="h-3.5 w-3.5 mr-1.5" />
                    {course.level}
                  </Badge>
                )}
                
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <Star className="h-3.5 w-3.5 mr-1.5 fill-amber-500" />
                  {course.rating || '4.5'} ({course.student_count || 0} estudiantes)
                </Badge>
                
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  {formatDuration(totalVideoDuration)} de contenido
                </Badge>
                
                {course.grants_certificate && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Award className="h-3.5 w-3.5 mr-1.5" />
                    Incluye certificado
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={course.instructor?.avatar_url} alt={course.instructor?.full_name} />
                  <AvatarFallback>{getInstructorInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {course.instructor?.full_name || 'Instructor no asignado'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {course.instructor?.title || 'Instructor'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Course Cover Image */}
            <div className="rounded-lg overflow-hidden aspect-video bg-gray-100">
              <img 
                src={course.cover_image_url || '/placeholder-course-cover.jpg'} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Tabs for Different Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Descripción</TabsTrigger>
                <TabsTrigger value="content" className="flex-1">Contenido</TabsTrigger>
                <TabsTrigger value="instructor" className="flex-1">Instructor</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Opiniones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Sobre este curso</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600">{course.description}</p>
                    {/* Add more formatted course description here */}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Lo que aprenderás</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learning_objectives?.map((objective: string, i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span>{objective}</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <span>Aprender los fundamentos de la materia</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <span>Aplicar conceptos avanzados en casos prácticos</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <span>Desarrollar proyectos reales</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <span>Obtener certificación profesional</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Requisitos previos</h2>
                  <div className="space-y-2">
                    {course.prerequisites_text ? (
                      <p className="text-gray-600">{course.prerequisites_text}</p>
                    ) : (
                      <p className="text-gray-600">No se requieren conocimientos previos para comenzar este curso.</p>
                    )}
                  </div>
                </div>
                
              </TabsContent>
              
              <TabsContent value="content" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Contenido del curso</h2>
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>{course.modules?.length || 0} módulos</span>
                    <span>{totalLessons} lecciones</span>
                    <span>{formatDuration(totalVideoDuration)} de duración total</span>
                  </div>
                </div>
                
                <Accordion type="multiple" className="border rounded-md">
                  {course.modules?.map((module, index) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                        <div className="flex items-center gap-2 text-left">
                          <span className="text-gray-500 font-normal">
                            Módulo {index + 1}:
                          </span>
                          <span className="font-medium">{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-0">
                        <div className="space-y-1 pb-1">
                          {module.lessons?.map((lesson) => (
                            <Link 
                              key={lesson.id} 
                              to={`/app/course/${course.id}/lesson/${lesson.id}`}
                              className="block"
                            >
                              <div 
                                className="flex items-center justify-between px-6 py-2 hover:bg-gray-50"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.content_type === 'video' ? (
                                    <PlayCircle className="h-4 w-4 text-blue-500" />
                                  ) : (
                                    <BookOpen className="h-4 w-4 text-blue-500" />
                                  )}
                                  <span className="text-sm">{lesson.title}</span>
                                  {lesson.is_previewable && (
                                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600">
                                      Vista previa
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {lesson.duration && (
                                    <span className="text-xs text-gray-500">
                                      {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                                    </span>
                                  )}
                                  {!isEnrolled && !lesson.is_previewable ? (
                                    <LockIcon className="h-3.5 w-3.5 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Sobre el instructor</h2>
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={course.instructor?.avatar_url} alt={course.instructor?.full_name} />
                    <AvatarFallback className="text-lg">{getInstructorInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{course.instructor?.full_name}</h3>
                    <p className="text-gray-600 text-sm">{course.instructor?.title || 'Profesor'}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span>4.8 valoración</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>12 cursos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>2,345 estudiantes</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p>
                    {course.instructor?.bio || 'No hay información disponible sobre este instructor.'}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Opiniones de los estudiantes</h2>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Todavía no hay opiniones para este curso. Sé el primero en dejar una reseña.
                  </p>
                  <Button variant="outline" disabled={!isEnrolled}>
                    Escribir una opinión
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={course.cover_image_url || '/placeholder-course-thumbnail.jpg'} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    {course.original_price && course.original_price > course.price ? (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                        <span className="text-gray-500 line-through">{formatPrice(course.original_price)}</span>
                        <Badge variant="destructive">
                          {Math.round((1 - course.price / course.original_price) * 100)}% dto.
                        </Badge>
                      </div>
                    ) : (
                      <div className="mb-1">
                        <span className="text-3xl font-bold">
                          {course.price === 0 ? 'Gratis' : formatPrice(course.price)}
                        </span>
                      </div>
                    )}
                    
                    {course.price > 0 && (
                      <p className="text-sm text-gray-500 mb-4">
                        Incluye acceso de por vida a todas las actualizaciones
                      </p>
                    )}
                  </div>
                  
                  {isEnrolled ? (
                    <div className="space-y-4">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={startCourse}
                      >
                        Continuar aprendiendo
                      </Button>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tu progreso</span>
                          <span className="font-medium">30% completado</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? (
                        <>
                          <span className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          Procesando
                        </>
                      ) : course.price > 0 ? (
                        'Comprar ahora'
                      ) : (
                        'Inscribirme gratis'
                      )}
                    </Button>
                  )}
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold">Este curso incluye:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <PlayCircle className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>{totalLessons} lecciones de vídeo y texto</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>{formatDuration(totalVideoDuration)} de contenido bajo demanda</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>Acceso de por vida</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <User className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>Acceso a la comunidad de estudiantes</span>
                      </li>
                      {course.grants_certificate && (
                        <li className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                          <span>Certificado de finalización</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
