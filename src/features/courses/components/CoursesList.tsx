
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '@/types/course';
import { CourseCard } from '@/features/courses/components/CourseCard';
import { CourseCardSkeleton } from './CourseCardSkeleton';

interface CoursesListProps {
  courses: Course[];
  isLoading?: boolean;
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCardSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link 
          key={course.id} 
          to={course.slug ? `/cursos/${course.slug}` : `/courses/${course.id}`}
          className="transition-all hover:scale-[1.01]"
        >
          <CourseCard course={course} />
        </Link>
      ))}
    </div>
  );
};
