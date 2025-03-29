
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Lesson } from "@/types/course";
import { toast } from "@/hooks/use-toast";
import { useLessonProgress } from "@/features/courses/hooks/useLessonProgress";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { LessonProgressControls } from "@/features/lessons/components/LessonProgressControls";
import { LessonComments } from "@/features/lessons/components/LessonComments";

const LessonView: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lesson, setLesson] = React.useState<Lesson | null>(null);
  const [nextLesson, setNextLesson] = React.useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = React.useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    isCompleted,
    isUpdating,
    markLessonCompleted,
  } = useLessonProgress(user?.id, courseId, lessonId);

  useEffect(() => {
    if (courseId && lessonId) {
      fetchLessonData();
    }
  }, [courseId, lessonId]);

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
      navigate(`/courses/${courseId}/learn`);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLesson = (lesson: Lesson | null) => {
    if (lesson) {
      navigate(`/courses/${courseId}/learn/${lesson.id}`);
    }
  };

  const handleMarkCompleted = async () => {
    await markLessonCompleted();
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
              <Button onClick={() => navigate(`/courses/${courseId}/learn`)}>
                Volver al curso
              </Button>
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
            onClick={() => navigate(`/courses/${courseId}/learn`)}
            className="mb-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Volver al curso
          </Button>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
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
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigateToLesson(prevLesson)}
                disabled={!prevLesson}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
              </Button>
              <Button
                onClick={() => navigateToLesson(nextLesson)}
                disabled={!nextLesson}
              >
                Siguiente <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <LessonProgressControls
              isCompleted={isCompleted}
              isUpdating={isUpdating}
              onMarkCompleted={handleMarkCompleted}
            />
          </div>
          
          {/* Comments Section */}
          <div className="mt-6">
            {lessonId && <LessonComments lessonId={lessonId} />}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LessonView;
