
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./CourseCard";
import { CourseProgressBar } from "./CourseProgressBar";
import { useUserCoursesProgress } from "../hooks/useUserCoursesProgress";
import { Course } from "@/types/course";
import { Loader2 } from "lucide-react";

interface EnrolledCoursesListProps {
  courses: Course[];
  isLoading: boolean;
}

export const EnrolledCoursesList: React.FC<EnrolledCoursesListProps> = ({ 
  courses, 
  isLoading 
}) => {
  const { user } = useAuth();
  const courseIds = useMemo(() => courses.map(course => course.id), [courses]);
  
  const { coursesProgress, isLoading: isLoadingProgress } = useUserCoursesProgress(
    user?.id,
    courseIds
  );
  
  if (isLoading || isLoadingProgress) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
        <div key={course.id} className="flex flex-col">
          <CourseCard course={course} />
          <div className="mt-2">
            <CourseProgressBar 
              progress={coursesProgress[course.id] || 0} 
              size="sm" 
            />
          </div>
        </div>
      ))}
    </div>
  );
};
