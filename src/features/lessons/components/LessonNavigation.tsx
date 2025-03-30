
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Lesson } from '@/types/course';

interface LessonNavigationProps {
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  moduleId: string;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  prevLesson,
  nextLesson,
  moduleId
}) => {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t">
      <div>
        {prevLesson ? (
          <Button variant="outline" asChild>
            <Link to={`/lessons/${prevLesson.id}`}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Lección anterior
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Lección anterior
          </Button>
        )}
      </div>
      
      <div>
        {nextLesson ? (
          <Button asChild>
            <Link to={`/lessons/${nextLesson.id}`}>
              Siguiente lección
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button variant="default" asChild>
            <Link to={`/modules/${moduleId}`}>
              Volver al módulo
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
