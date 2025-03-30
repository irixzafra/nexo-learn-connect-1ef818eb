
import React from "react";
import { useNavigate } from "react-router-dom";
import { Module, Lesson } from "@/types/course";
import { PlayCircle, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface CourseContentAccordionProps {
  modulesWithLessons: Array<Module & { lessons: Lesson[] }>;
  courseId: string;
}

export const CourseContentAccordion: React.FC<CourseContentAccordionProps> = ({
  modulesWithLessons,
  courseId,
}) => {
  const navigate = useNavigate();

  return (
    <Accordion type="single" collapsible className="w-full">
      {modulesWithLessons?.map((module, index) => (
        <AccordionItem key={module.id} value={module.id}>
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-3 text-left">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-medium">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium">{module.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{module.lessons.length} lecciones</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pl-11 space-y-4 my-2">
              {module.lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-start gap-3">
                  {lesson.content_type === 'video' ? (
                    <PlayCircle className="h-5 w-5 text-primary mt-0.5" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    {lesson.is_previewable && (
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-xs text-primary"
                        onClick={() => navigate(`/courses/${courseId}/learn/${lesson.id}`)}
                      >
                        Ver vista previa
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
