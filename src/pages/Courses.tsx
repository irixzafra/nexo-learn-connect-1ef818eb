
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { CoursesHeader } from '@/features/courses/components/CoursesHeader';
import { CategorySelector } from '@/features/courses/components/CategorySelector';
import { CourseGrid } from '@/features/courses/components/CourseGrid';
import { courseCategories, featuredCourses } from '@/features/courses/utils/featuredCoursesData';

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  
  const filteredCourses = selectedCategory === "Todos" 
    ? featuredCourses 
    : featuredCourses.filter(course => course.category === selectedCategory);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <CoursesHeader />
        
        <CategorySelector 
          categories={courseCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <CourseGrid filteredCourses={filteredCourses} />
      </div>
    </PublicLayout>
  );
};

export default Courses;
