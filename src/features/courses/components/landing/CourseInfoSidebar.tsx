
import React from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, BookOpen, FileText, Award, UserCheck } from "lucide-react";

interface CourseInfoSidebarProps {
  course: Course;
  totalLessons: number;
  previewableLessons: number;
  isEnrolled: boolean;
  isEnrolling: boolean;
  handleEnroll: () => Promise<void>;
  formatCurrency: (price: number, currency: string) => string;
}

export const CourseInfoSidebar: React.FC<CourseInfoSidebarProps> = ({
  course,
  totalLessons,
  previewableLessons,
  isEnrolled,
  isEnrolling,
  handleEnroll,
  formatCurrency,
}) => {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{course.price > 0 ? formatCurrency(course.price, course.currency) : "Curso gratuito"}</CardTitle>
            <CardDescription>{previewableLessons > 0 && `${previewableLessons} lecciones en vista previa`}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Este curso incluye:</h4>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{course.duration_text || "Acceso completo"}</span>
                </li>
                <li className="flex gap-2">
                  <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{totalLessons} lecciones</span>
                </li>
                <li className="flex gap-2">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Recursos complementarios</span>
                </li>
                <li className="flex gap-2">
                  <Award className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Certificado de finalización</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleEnroll}
              disabled={isEnrolled || isEnrolling}
            >
              {isEnrolled ? "Ya estás inscrito" : 
               isEnrolling ? "Inscribiendo..." : 
               "Inscribirme ahora"}
            </Button>
            
            {isEnrolled && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(`/courses/${course.id}/learn`)}
              >
                Ir al curso
              </Button>
            )}
            
            <p className="text-xs text-center text-muted-foreground">
              30 días de garantía de devolución de dinero
            </p>
          </CardFooter>
        </Card>
        
        {course.featured_instructor && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">{course.featured_instructor}</h4>
                  <p className="text-sm text-muted-foreground">Instructor experimentado</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
