
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageSection } from '@/layouts/SectionPageLayout';
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit, Layers } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useCourseDetails } from '@/features/courses/hooks/useCourseDetails';
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface CourseContentTabProps {
  course?: any;
}

const CourseContentTab: React.FC<CourseContentTabProps> = ({ course }) => {
  const navigate = useNavigate();
  const { modules, lessons, modulesWithLessons, isLoading } = useCourseDetails(course?.id);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const handleModuleClick = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  const handleEditContent = () => {
    if (!course?.id) {
      toast.error("No se pudo encontrar el ID del curso");
      return;
    }
    navigate(`/admin/courses/${course.id}/content`);
  };

  if (isLoading) {
    return (
      <PageSection variant="card" title="Contenido del Curso" description="Módulos y lecciones">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection variant="card" title="Contenido del Curso" description="Módulos y lecciones">
      {(!modulesWithLessons || modulesWithLessons.length === 0) ? (
        <div className="text-center py-10">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Estructura del Curso</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Aquí podrás organizar los módulos y lecciones del curso, configurar recursos y contenido multimedia.
          </p>
          <Button variant="outline" onClick={handleEditContent}>
            <Plus className="h-4 w-4 mr-2" />
            Crear contenido
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  Estructura del curso
                </h3>
                <p className="text-sm text-muted-foreground">
                  {modulesWithLessons.length} módulos · {lessons.length} lecciones
                </p>
              </div>
              <Button variant="outline" onClick={handleEditContent}>
                <Edit className="h-4 w-4 mr-2" />
                Editar contenido
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <Accordion type="multiple" value={expandedModules} className="w-full">
              {modulesWithLessons.map((module, moduleIndex) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger 
                    onClick={() => handleModuleClick(module.id)}
                    className="hover:no-underline py-3"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-medium">
                        {moduleIndex + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {module.lessons.length} lecciones
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="pl-11 space-y-4 my-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lesson.id} className="flex items-start gap-3">
                          <div className="text-sm text-muted-foreground w-6 text-center mt-0.5">
                            {lessonIndex + 1}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium">{lesson.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {lesson.content_type === 'video' ? (
                                    <Badge variant="outline" className="text-xs bg-blue-50">Video</Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs bg-gray-50">Texto</Badge>
                                  )}
                                  {lesson.is_previewable && (
                                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary">Vista previa</Badge>
                                  )}
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  if (course?.id) {
                                    navigate(`/admin/courses/${course.id}/lessons/${lesson.id}/edit`);
                                  }
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </PageSection>
  );
};

export default CourseContentTab;
