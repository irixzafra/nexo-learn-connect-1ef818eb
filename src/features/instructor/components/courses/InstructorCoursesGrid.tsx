
import React from 'react';
import { Course } from '@/types/course';
import { InstructorCourseCard } from './InstructorCourseCard';

interface InstructorCoursesGridProps {
  courses: Course[];
  onViewCourse: (courseId: string) => void;
  onEditCourse: (courseId: string) => void;
  onEditStructure: (courseId: string) => void;
  onEditContent: (courseId: string) => void;
  onDeleteCourse: (course: Course) => void;
  onAnalytics: (courseId: string) => void;
}

export const InstructorCoursesGrid: React.FC<InstructorCoursesGridProps> = ({
  courses,
  onViewCourse,
  onEditCourse,
  onEditStructure,
  onEditContent,
  onDeleteCourse,
  onAnalytics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <InstructorCourseCard
          key={course.id}
          course={course}
          onViewCourse={onViewCourse}
          onEditCourse={onEditCourse}
          onEditStructure={onEditStructure}
          onEditContent={onEditContent}
          onDeleteCourse={onDeleteCourse}
          onAnalytics={onAnalytics}
        />
      ))}
    </div>
  );
};
