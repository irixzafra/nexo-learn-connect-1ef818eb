
import React from 'react';
import { motion } from 'framer-motion';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const ExploreCoursesStep: React.FC = () => {
  const { courses, isLoading } = useCoursesCatalog();
  const navigate = useNavigate();
  const { skipOnboarding } = useOnboarding();
  
  const handleExplore = () => {
    skipOnboarding();
    navigate('/courses');
  };

  return (
    <div 
      className="space-y-6" 
      role="region" 
      aria-label="Explorar cursos"
    >
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-2">Descubre cursos increíbles</h2>
        <p className="text-muted-foreground">
          Explora nuestra biblioteca de cursos y comienza tu aprendizaje hoy mismo
        </p>
      </motion.div>

      <div 
        className="space-y-4"
        aria-live="polite"
        aria-busy={isLoading}
      >
        {isLoading ? (
          // Skeleton loading state
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden" aria-hidden="true">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual courses
          courses?.slice(0, 3).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end pt-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(`/courses/${course.id}`)}
                    aria-label={`Ver detalles de ${course.title}`}
                  >
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>
      
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleExplore} 
          variant="outline"
          className="focus-visible:ring-2 focus-visible:ring-primary"
        >
          Ver todos los cursos
        </Button>
      </div>
    </div>
  );
};

export default ExploreCoursesStep;
