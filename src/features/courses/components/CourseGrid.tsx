
import React from 'react';
import { FeaturedCourse, FeaturedCourseCard } from './FeaturedCourseCard';
import { Button } from '@/components/ui/button';

interface CourseGridProps {
  filteredCourses: FeaturedCourse[];
}

export const CourseGrid: React.FC<CourseGridProps> = ({ filteredCourses }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredCourses.map((course, index) => (
          <FeaturedCourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
      
      <div className="text-center">
        <Button size="lg">Cargar Más Cursos</Button>
      </div>
    </>
  );
};
