
import React from 'react';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Course } from '@/types/course';

interface CourseCardHeaderProps {
  course: Course;
  courseUrl: string;
}

export const CourseCardHeader: React.FC<CourseCardHeaderProps> = ({ course, courseUrl }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
          <Link to={courseUrl} className="hover:underline">
            {course.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm mt-1 flex items-center gap-1">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-1">
              <Award className="h-3 w-3 text-primary" />
            </div>
            {course.featured_instructor || (course.instructor && course.instructor.full_name) || "Instructor"}
          </div>
        </CardDescription>
      </div>
    </div>
  );
};
