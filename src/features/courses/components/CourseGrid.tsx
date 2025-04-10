
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { EnhancedCourseCard } from './EnhancedCourseCard';
import { Course } from '@/types/course';
import { useNavigate } from 'react-router-dom';

export interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  instructor: {
    id: string; 
    full_name: string;
    name?: string;
    avatar?: string;
  };
  category: string;
  level: string;
  duration: string;
  students_count: number;
  rating: number;
  is_featured?: boolean;
  discount?: number;
  tags?: string[];
  start_date?: string;
  currency: 'eur' | 'usd';
  slug?: string;
  instructor_id: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseGridProps {
  filteredCourses: FeaturedCourse[];
  selectedCategory?: string;
  onCourseClick?: (courseId: string, courseName?: string) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ 
  filteredCourses,
  selectedCategory = 'all',
  onCourseClick
}) => {
  const [visibleCourses, setVisibleCourses] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleCourses(prev => prev + 6);
      setIsLoading(false);
    }, 500);
  };
  
  // Get only the visible portion of courses
  const coursesToShow = filteredCourses.slice(0, visibleCourses);
  const hasMoreCourses = visibleCourses < filteredCourses.length;

  const handleCourseClick = (course: FeaturedCourse) => {
    if (onCourseClick) {
      onCourseClick(course.id, course.title);
    } else {
      // Use slug for navigation if available, otherwise use ID
      const courseUrl = course.slug ? `/cursos/${course.slug}` : `/courses/${course.id}`;
      navigate(courseUrl);
    }
  };

  // Animation variants for the grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold mb-2">No hay cursos disponibles</h3>
        <p className="text-muted-foreground mb-4">
          No se encontraron cursos para esta categoría.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {coursesToShow.map((course, index) => (
          <motion.div key={course.id} variants={item}>
            <EnhancedCourseCard 
              course={course as unknown as Course} 
              index={index} 
              isPopular={index === 0 && selectedCategory === 'all'}
              isNew={index === 1 && selectedCategory === 'all'}
              isUpcoming={index === 2 && course.start_date !== undefined}
              onClick={() => handleCourseClick(course)}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {hasMoreCourses && (
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              `Cargar Más Cursos (${filteredCourses.length - visibleCourses} restantes)`
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default CourseGrid;
