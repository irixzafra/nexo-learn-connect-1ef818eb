
import React from "react";
import { Course } from "@/types/course";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { CourseProgressBar } from "./CourseProgressBar";

interface CourseEnrollCardProps {
  course: Course;
  isEnrolled: boolean;
  isEnrolling: boolean;
  courseProgressPercentage?: number;
  formatCurrency: (price: number, currency: 'eur' | 'usd') => string;
  onEnroll: () => Promise<void>;
}

export const CourseEnrollCard: React.FC<CourseEnrollCardProps> = ({
  course,
  isEnrolled,
  isEnrolling,
  courseProgressPercentage = 0,
  formatCurrency,
  onEnroll,
}) => {
  const navigate = useNavigate();

  const handleEnrollClick = async () => {
    if (course.price > 0) {
      // If it's a paid course, redirect to checkout
      navigate(`/checkout/${course.id}`);
    } else {
      // If it's a free course, use the regular enrollment flow
      await onEnroll();
    }
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-2xl">
          {course.price > 0
            ? formatCurrency(course.price, course.currency)
            : "Gratis"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEnrolled && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Tu progreso</p>
            <CourseProgressBar progress={courseProgressPercentage} />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            <span>Acceso completo al curso</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            <span>Acceso de por vida</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            <span>Certificado de finalización</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        {isEnrolled ? (
          <Button className="w-full mb-2" asChild>
            <Link to={`/courses/${course.id}/learn`}>
              <BookOpen className="mr-2 h-4 w-4" />
              Continuar Aprendizaje
            </Link>
          </Button>
        ) : (
          <Button
            className="w-full mb-2"
            onClick={handleEnrollClick}
            disabled={isEnrolling}
          >
            {isEnrolling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>{course.price > 0 ? <>Comprar Ahora</> : <>Inscribirme Gratis</>}</>
            )}
          </Button>
        )}
        <p className="text-xs text-center text-muted-foreground">
          {course.price > 0
            ? "30 días de garantía de devolución de dinero"
            : "Sin compromisos, cancela cuando quieras"}
        </p>
      </CardFooter>
    </Card>
  );
};
