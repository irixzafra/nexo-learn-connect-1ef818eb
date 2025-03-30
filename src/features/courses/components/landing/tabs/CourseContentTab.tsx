
import React from "react";
import { BookOpen, Clock, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Module, Lesson } from "@/types/course";
import { Button } from "@/components/ui/button";
import { CourseContentAccordion } from "../CourseContentAccordion";

interface CourseContentTabProps {
  modulesWithLessons: Array<Module & { lessons: Lesson[] }>;
  courseId: string;
}

export const CourseContentTab: React.FC<CourseContentTabProps> = ({
  modulesWithLessons,
  courseId
}) => {
  const totalLessons = modulesWithLessons.reduce(
    (acc, module) => acc + (module.lessons?.length || 0), 0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Contenido del curso
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{modulesWithLessons.length} módulos • {totalLessons} lecciones</span>
        </div>
      </div>
      
      {modulesWithLessons.length > 0 ? (
        <CourseContentAccordion 
          modulesWithLessons={modulesWithLessons || []}
          courseId={courseId}
        />
      ) : (
        <EmptyContent />
      )}
      
      <CourseAccessInfo />
    </motion.div>
  );
};

const EmptyContent: React.FC = () => (
  <div className="text-center py-8 bg-muted/20 rounded-lg border">
    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
    <h4 className="text-xl font-medium mb-2">Contenido no disponible</h4>
    <p className="text-muted-foreground">
      El contenido de este curso aún no está disponible.
    </p>
  </div>
);

const CourseAccessInfo: React.FC = () => (
  <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
    <div className="flex gap-4 items-start">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <PlayCircle className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-1">Acceso inmediato a todo el contenido</h4>
        <p className="text-muted-foreground">
          Al inscribirte, obtendrás acceso completo a todos los módulos y materiales del curso. Avanza a tu propio ritmo y recibe tu certificado al finalizar.
        </p>
        <Button className="mt-4 group" variant="outline">
          Ver lección de muestra
          <PlayCircle className="ml-2 h-4 w-4 group-hover:text-primary transition-colors" />
        </Button>
      </div>
    </div>
  </div>
);
