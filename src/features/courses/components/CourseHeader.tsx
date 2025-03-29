
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar } from "lucide-react";
import { Course } from "@/types/course";

interface CourseHeaderProps {
  course: Course;
  totalLessons: number;
  formatDate: (dateString: string) => string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  course,
  totalLessons,
  formatDate,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-muted-foreground mb-4">
        Por {course.instructor?.full_name || "Instructor"}
      </p>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{totalLessons} lecciones</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>Creado en {formatDate(course.created_at)}</span>
        </div>
      </div>
    </div>
  );
};
