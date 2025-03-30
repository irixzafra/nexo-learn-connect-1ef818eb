
import React from "react";
import { Button } from "@/components/ui/button";

interface CourseCallToActionProps {
  isEnrolled: boolean;
  isEnrolling: boolean;
  handleEnroll: () => Promise<void>;
}

export const CourseCallToAction: React.FC<CourseCallToActionProps> = ({
  isEnrolled,
  isEnrolling,
  handleEnroll,
}) => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Únete a miles de estudiantes que ya están mejorando sus habilidades con nuestros cursos
        </p>
        <Button 
          size="lg" 
          onClick={handleEnroll}
          disabled={isEnrolled || isEnrolling}
        >
          {isEnrolled ? "Continuar aprendiendo" : "Inscribirme ahora"}
        </Button>
      </div>
    </section>
  );
};
