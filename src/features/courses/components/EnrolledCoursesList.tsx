
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./CourseCard";
import { Course } from "@/types/course";

interface EnrolledCoursesListProps {
  courses: Course[];
  isLoading: boolean;
}

export const EnrolledCoursesList: React.FC<EnrolledCoursesListProps> = ({ 
  courses, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (courses.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-background">
        <h3 className="text-lg font-medium mb-2">No estás matriculado en ningún curso</h3>
        <p className="text-muted-foreground mb-4">Explora nuestro catálogo de cursos y matricúlate en los que te interesen.</p>
        <Button asChild>
          <Link to="/courses">Ver Cursos Disponibles</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
