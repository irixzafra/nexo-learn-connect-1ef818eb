
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { EnhancedCourseCard } from './EnhancedCourseCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Course } from '@/types/course';

export interface CourseCarouselProps {
  courses: any[];
  selectedCategory?: string;
  onCourseClick?: (courseId: string, courseName?: string) => void;
}

export const CourseCarousel: React.FC<CourseCarouselProps> = ({
  courses,
  selectedCategory = 'all',
  onCourseClick
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
  const coursesToShow = courses.slice(0, visibleCourses);
  const hasMoreCourses = visibleCourses < courses.length;

  const handleCourseClick = (course: any) => {
    if (onCourseClick) {
      onCourseClick(course.id, course.title);
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

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold mb-2">No hay cursos disponibles</h3>
        <p className="text-muted-foreground mb-4">
          No se encontraron cursos para esta categoría.
        </p>
      </div>
    );
  }

  // Group courses into chunks of 3 for desktop view
  const courseGroups = [];
  for (let i = 0; i < coursesToShow.length; i += 3) {
    courseGroups.push(coursesToShow.slice(i, i + 3));
  }

  return (
    <div className="space-y-10">
      <div className="md:hidden">
        {/* Mobile view - vertical list */}
        <motion.div 
          className="grid grid-cols-1 gap-6"
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
      </div>

      <div className="hidden md:block">
        {/* Desktop view - carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {courseGroups.map((group, groupIndex) => (
              <CarouselItem key={groupIndex} className="basis-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {group.map((course, index) => {
                    const absoluteIndex = groupIndex * 3 + index;
                    return (
                      <motion.div 
                        key={course.id} 
                        variants={item}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: index * 0.1 }}
                      >
                        <EnhancedCourseCard 
                          course={course as unknown as Course} 
                          index={absoluteIndex} 
                          isPopular={absoluteIndex === 0 && selectedCategory === 'all'}
                          isNew={absoluteIndex === 1 && selectedCategory === 'all'}
                          isUpcoming={absoluteIndex === 2 && course.start_date !== undefined}
                          onClick={() => handleCourseClick(course)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 focus:ring-offset-0" />
          <CarouselNext className="hidden md:flex -right-4 focus:ring-offset-0" />
        </Carousel>
      </div>
      
      {hasMoreCourses && (
        <div className="text-center mt-8">
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
              `Cargar Más Cursos (${courses.length - visibleCourses} restantes)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseCarousel;
