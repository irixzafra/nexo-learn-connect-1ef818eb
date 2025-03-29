
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  showContinueButton?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course,
  showContinueButton = true,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
    });
  };

  const formatCurrency = (price: number, currency: "eur" | "usd") => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/courses/${course.id}`} className="flex-grow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold line-clamp-2">
              {course.title}
            </CardTitle>
            {course.price === 0 ? (
              <Badge variant="secondary">Gratis</Badge>
            ) : (
              <Badge variant="secondary">
                {formatCurrency(course.price, course.currency as "eur" | "usd")}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {course.description || "Sin descripción disponible."}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {course.instructor && (
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>{course.instructor.full_name}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(course.created_at)}</span>
            </div>
            {course.duration_text && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{course.duration_text}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
      
      {showContinueButton && (
        <CardFooter className="pt-2">
          <Button asChild variant="default" className="w-full">
            <Link to={`/courses/${course.id}/learn`}>
              Continuar aprendizaje
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
