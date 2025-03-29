
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Lesson, Course } from "@/types/course";
import { toast } from "@/hooks/use-toast";
import { useLessonProgress } from "@/features/courses/hooks/useLessonProgress";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Loader2, 
  Lock, 
  PlayCircle 
} from "lucide-react";
import { LessonProgressControls } from "@/features/lessons/components/LessonProgressControls";
import { LessonComments } from "@/features/lessons/components/LessonComments";

const LessonView: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);

  const {
    isCompleted,
    isUpdating,
    markLessonCompleted,
  } = useLessonProgress(user?.id, courseId, lessonId);

  useEffect(() => {
    if (courseId && lessonId) {
      fetchLessonData();
      if (user) {
        checkEnrollmentStatus();
      } else {
        setIsCheckingEnrollment(false);
      }
    }
  }, [courseId, lessonId, user]);

  const checkEnrollmentStatus = async () => {
    if (!user || !courseId) {
      setIsEnrolled(false);
      setIsCheckingEnrollment(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setIsEnrolled(!!data);
    } catch (error) {
      console.error("Error checking enrollment status:", error);
    } finally {
      setIsCheckingEnrollment(false);
    }
  };

  const fetchLessonData = async () => {
    setIsLoading(true);
    try {
      // Fetch current lesson
      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      if (lessonError) throw lessonError;
      setLesson(lessonData as Lesson);

      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData as Course);

      // Fetch navigation lessons (next and previous)
      const { data: allLessonsData, error: allLessonsError } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("lesson_order", { ascending: true });

      if (allLessonsError) throw allLessonsError;

      const allLessons = allLessonsData as Lesson[];
      const currentIndex = allLessons.findIndex(l => l.id === lessonId);

      // Set previous lesson if exists
      if (currentIndex > 0) {
        setPrevLesson(allLessons[currentIndex - 1]);
      } else {
        setPrevLesson(null);
      }

      // Set next lesson if exists
      if (currentIndex < allLessons.length - 1) {
        setNextLesson(allLessons[currentIndex + 1]);
      } else {
        setNextLesson(null);
      }
    } catch (error: any) {
      console.error("Error fetching lesson:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la lección",
        variant: "destructive",
      });
      navigate(`/courses/${courseId}`);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLesson = (lesson: Lesson | null) => {
    if (lesson) {
      if (isEnrolled || lesson.is_previewable) {
        navigate(`/courses/${courseId}/learn/${lesson.id}`);
      } else {
        toast({
          title: "Acceso restringido",
          description: "Debes inscribirte en el curso para acceder a esta lección",
        });
      }
    }
  };

  const handleMarkCompleted = async () => {
    await markLessonCompleted();
  };

  if (isLoading || isCheckingEnrollment) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center items-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!lesson) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Lección no encontrada</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No se pudo encontrar la lección solicitada.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate(`/courses/${courseId}`)}>
                Volver al curso
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Check if user can access this lesson
  if (!isEnrolled && !lesson.is_previewable) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceso restringido</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Debes inscribirte en el curso para acceder a esta lección.</p>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button onClick={() => navigate(`/courses/${courseId}`)}>
                  Volver al curso
                </Button>
                {user ? (
                  <Button variant="default" onClick={() => navigate(`/checkout/${courseId}`)}>
                    Inscribirme
                  </Button>
                ) : (
                  <Button variant="default" onClick={() => navigate('/auth/login', { state: { from: `/courses/${courseId}` } })}>
                    Iniciar sesión
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/courses/${courseId}`)}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver al curso
          </Button>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          
          {!isEnrolled && lesson.is_previewable && (
            <div className="mt-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Vista previa
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Estás viendo una lección de vista previa. Inscríbete para tener acceso completo al curso.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-6">
              {lesson.content_type === 'text' && (
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                  {lesson.content_text?.content ? (
                    <div>{lesson.content_text.content}</div>
                  ) : (
                    <p className="text-muted-foreground">
                      Esta lección aún no tiene contenido.
                    </p>
                  )}
                </div>
              )}

              {lesson.content_type === 'video' && lesson.content_video_url && (
                <div className="aspect-video">
                  <iframe
                    src={lesson.content_video_url}
                    className="w-full h-full rounded-md"
                    title={lesson.title}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              )}
              
              {!isEnrolled && lesson.is_previewable && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-medium mb-2">¿Te gusta el contenido?</h3>
                  <p className="mb-4">Inscríbete en el curso para acceder a todas las lecciones y materiales.</p>
                  {user ? (
                    <Button variant="default" onClick={() => navigate(`/checkout/${courseId}`)}>
                      Inscribirme ahora
                    </Button>
                  ) : (
                    <Button variant="default" onClick={() => navigate('/auth/login', { state: { from: `/courses/${courseId}` } })}>
                      Iniciar sesión para inscribirme
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigateToLesson(prevLesson)}
                disabled={!prevLesson || (!isEnrolled && !prevLesson.is_previewable)}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Anterior
              </Button>
              <Button
                onClick={() => navigateToLesson(nextLesson)}
                disabled={!nextLesson || (!isEnrolled && !nextLesson.is_previewable)}
              >
                Siguiente <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {isEnrolled && (
              <LessonProgressControls
                isCompleted={isCompleted}
                isUpdating={isUpdating}
                onMarkCompleted={handleMarkCompleted}
              />
            )}
          </div>
          
          {/* Comments Section - only visible for enrolled users */}
          {isEnrolled && (
            <div className="mt-6">
              {lessonId && <LessonComments lessonId={lessonId} />}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default LessonView;
