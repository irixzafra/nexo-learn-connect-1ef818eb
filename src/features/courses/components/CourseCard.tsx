
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, BarChart } from "lucide-react";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  actionText?: string;
  actionPath?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  actionText = "Continuar Aprendiendo",
  actionPath = `/courses/${course.id}/learn`
}) => {
  return (
    <Card key={course.id} className="overflow-hidden h-full flex flex-col">
      {course.cover_image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={course.cover_image_url} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <CardDescription>
          {course.instructor?.full_name ? `Instructor: ${course.instructor.full_name}` : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {course.level && (
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span className="capitalize">{course.level}</span>
            </div>
          )}
          {course.duration_text && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration_text}</span>
            </div>
          )}
        </div>
        
        <Button asChild className="w-full mt-4">
          <Link to={actionPath}>
            <BookOpen className="mr-2 h-4 w-4" />
            {actionText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
