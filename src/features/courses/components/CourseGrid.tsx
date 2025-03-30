
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { EnhancedCourseCard } from './EnhancedCourseCard';

export interface FeaturedCourse {
  id: number | string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  instructor: {
    name: string;
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
  start_date?: string; // Added this property to fix the error
}

interface CourseGridProps {
  filteredCourses: FeaturedCourse[];
  selectedCategory?: string;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ 
  filteredCourses,
  selectedCategory = 'all'
}) => {
  const [visibleCourses, setVisibleCourses] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
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
              course={course} 
              index={index} 
              isPopular={index === 0 && selectedCategory === 'all'}
              isNew={index === 1 && selectedCategory === 'all'}
              isUpcoming={index === 2 && course.start_date !== undefined}
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
