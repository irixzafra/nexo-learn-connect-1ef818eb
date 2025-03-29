
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '@/types/course';
import { CourseCard } from '@/features/courses/components/CourseCard';

interface CoursesListProps {
  courses: Course[];
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link 
          key={course.id} 
          to={`/courses/${course.id}`}
          className="transition-all hover:scale-[1.01]"
        >
          <CourseCard course={course} />
        </Link>
      ))}
    </div>
  );
};
