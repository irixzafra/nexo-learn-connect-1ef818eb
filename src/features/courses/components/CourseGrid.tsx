
import React, { useState } from 'react';
import { FeaturedCourse, FeaturedCourseCard } from './FeaturedCourseCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface CourseGridProps {
  filteredCourses: FeaturedCourse[];
}

export const CourseGrid: React.FC<CourseGridProps> = ({ filteredCourses }) => {
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
            <FeaturedCourseCard course={course} index={index} />
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
