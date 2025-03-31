
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCourseDetails } from "@/features/courses/hooks/useCourseDetails";
import { useLessonProgress } from "@/features/courses/hooks/useLessonProgress";
import { Lesson, Module } from "@/types/course";
import { CourseProgressBar } from "@/features/courses/components/CourseProgressBar";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Loader2, 
  Lock, 
  PlayCircle 
} from "lucide-react";

const CourseLearn: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { course, modulesWithLessons, isLoading } = useCourseDetails(courseId);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [nextIncompleteLesson, setNextIncompleteLesson] = useState<Lesson | null>(null);
  const [moduleWithNextIncompleteLesson, setModuleWithNextIncompleteLesson] = useState<Module | null>(null);

  const {
    courseProgress,
    courseProgressPercentage,
    completedLessonsCount,
    isLoading: isLoadingProgress,
  } = useLessonProgress(user?.id, courseId);

  // Find the next incomplete lesson
  useEffect(() => {
    if (modulesWithLessons.length > 0 && courseProgress) {
      // Find incomplete lessons
      for (const module of modulesWithLessons) {
        const incompleteLesson = module.lessons.find(lesson => 
          !courseProgress.some(progress => 
            progress.lesson_id === lesson.id && progress.is_completed
          )
        );

        if (incompleteLesson) {
          setNextIncompleteLesson(incompleteLesson);
          setModuleWithNextIncompleteLesson(module);
          break;
        }
      }
    }
  }, [modulesWithLessons, courseProgress]);

  // Automatically expand the first module when data is loaded
  useEffect(() => {
    if (modulesWithLessons.length > 0 && expandedModules.length === 0) {
      setExpandedModules([modulesWithLessons[0].id]);
    }
  }, [modulesWithLessons]);

  const isLessonCompleted = (lessonId: string) => {
    return courseProgress?.some(p => p.lesson_id === lessonId && p.is_completed) || false;
  };

  const getTotalLessons = () => {
    return modulesWithLessons.reduce(
      (total, module) => total + module.lessons.length,
      0
    );
  };

  const navigateToLesson = (lessonId: string) => {
    navigate(`/courses/${courseId}/learn/${lessonId}`);
  };

  if (isLoading || isLoadingProgress) {
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
          <Card>
            <CardHeader>
              <CardTitle>Curso no encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No se pudo encontrar el curso solicitado.</p>
            </CardContent>
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
            onClick={() => navigate("/my-courses")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a mis cursos
          </Button>
          <h1 className="text-2xl font-bold">{course.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Course progress overview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Tu progreso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CourseProgressBar progress={courseProgressPercentage || 0} size="md" />
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{completedLessonsCount}</span> de{" "}
                    <span className="font-medium">{getTotalLessons()}</span> lecciones completadas
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Continúa tu aprendizaje</p>
                  {nextIncompleteLesson && (
                    <Button
                      onClick={() => navigateToLesson(nextIncompleteLesson.id)}
                      className="w-full"
                    >
                      Continuar
                    </Button>
                  )}
                  {!nextIncompleteLesson && courseProgressPercentage === 100 && (
                    <p className="text-sm text-green-600">
                      ¡Felicidades! Has completado todo el curso.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Contenido del curso</CardTitle>
                <CardDescription>
                  {modulesWithLessons.length} módulos • {getTotalLessons()} lecciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                {modulesWithLessons.length === 0 ? (
                  <p className="text-muted-foreground">
                    Este curso aún no tiene contenido.
                  </p>
                ) : (
                  <Accordion
                    type="multiple"
                    value={expandedModules}
                    onValueChange={setExpandedModules}
                    className="w-full"
                  >
                    {modulesWithLessons.map((module) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="w-full flex justify-between items-center pr-4">
                            <span className="font-medium">{module.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {module.lessons.filter(lesson => 
                                isLessonCompleted(lesson.id)
                              ).length}{" "}
                              / {module.lessons.length}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 mt-2">
                            {module.lessons.map((lesson) => {
                              const completed = isLessonCompleted(lesson.id);
                              return (
                                <li
                                  key={lesson.id}
                                  className="p-2 rounded-md flex items-center cursor-pointer hover:bg-muted"
                                  onClick={() => navigateToLesson(lesson.id)}
                                >
                                  {completed ? (
                                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                                  ) : lesson.content_type === "video" ? (
                                    <PlayCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                  ) : (
                                    <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
                                  )}
                                  <span className={`flex-grow ${completed ? "text-muted-foreground" : ""}`}>
                                    {lesson.title}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CourseLearn;
