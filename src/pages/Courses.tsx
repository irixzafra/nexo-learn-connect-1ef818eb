
import React, { useState, useEffect } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { CoursesHeader } from '@/features/courses/components/CoursesHeader';
import { CategorySelector } from '@/features/courses/components/CategorySelector';
import { CourseGrid } from '@/features/courses/components/CourseGrid';
import { courseCategories, featuredCourses } from '@/features/courses/utils/featuredCoursesData';
import { toast } from 'sonner';

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate loading on category change for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory]);
  
  const filteredCourses = selectedCategory === "Todos" 
    ? featuredCourses 
    : featuredCourses.filter(course => course.category === selectedCategory);
    
  // Show toast when changing categories
  useEffect(() => {
    if (selectedCategory !== "Todos") {
      toast.info(`Mostrando cursos de "${selectedCategory}"`);
    }
  }, [selectedCategory]);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <CoursesHeader />
        
        <CategorySelector 
          categories={courseCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <CourseGrid filteredCourses={filteredCourses} />
        )}
      </div>
    </PublicLayout>
  );
};

export default Courses;
