
import React from "react";
import { Course } from "@/types/course";
import { CourseCard } from "@/features/courses/components/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface EnrolledCoursesListProps {
  courses: Course[] | undefined;
  isLoading: boolean;
}

export const EnrolledCoursesList: React.FC<EnrolledCoursesListProps> = ({
  courses,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando tus cursos...</span>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No estás inscrito en ningún curso</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Explora nuestro catálogo de cursos y comienza tu aprendizaje hoy.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
