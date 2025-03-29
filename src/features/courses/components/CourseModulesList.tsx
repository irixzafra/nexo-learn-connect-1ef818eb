
import React from "react";
import { Module, Lesson } from "@/types/course";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Lock, PlayCircle, Eye } from "lucide-react";

interface CourseModulesListProps {
  modules: Module[];
  isEnrolled: boolean;
  onLessonClick: (lessonId: string) => void;
}

export const CourseModulesList: React.FC<CourseModulesListProps> = ({
  modules,
  isEnrolled,
  onLessonClick,
}) => {
  const totalLessons = modules.reduce(
    (total, module) => total + (module.lessons?.length || 0),
    0
  );

  return (
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
                      {module.lessons?.length || 0} lecciones
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 mt-2">
                    {module.lessons?.map((lesson) => (
                      <li
                        key={lesson.id}
                        className={`p-2 rounded-md flex items-center ${
                          lesson.is_previewable || isEnrolled
                            ? "cursor-pointer hover:bg-muted"
                            : ""
                        }`}
                        onClick={() => {
                          if (lesson.is_previewable || isEnrolled) {
                            onLessonClick(lesson.id);
                          }
                        }}
                      >
                        {lesson.content_type === "video" ? (
                          <PlayCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        ) : (
                          <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                        )}
                        <span className="flex-grow">{lesson.title}</span>
                        {!lesson.is_previewable && !isEnrolled ? (
                          <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          lesson.is_previewable &&
                          !isEnrolled && (
                            <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-primary/10 text-primary">
                              <Eye className="h-3 w-3" />
                              Vista previa
                            </Badge>
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
  );
};
