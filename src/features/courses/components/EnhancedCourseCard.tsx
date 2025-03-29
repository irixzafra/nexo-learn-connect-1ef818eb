
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Star, Users, Flame, Award, Bookmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { cn } from '@/lib/utils';

interface EnhancedCourseCardProps {
  course: Course;
  index?: number;
  isPopular?: boolean;
  isNew?: boolean;
  isUpcoming?: boolean;
  isFeatured?: boolean;
}

export const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({ 
  course, 
  index = 0,
  isPopular = false,
  isNew = false,
  isUpcoming = false,
  isFeatured = false
}) => {
  const isStartingSoon = course.start_date && new Date(course.start_date) > new Date() && 
    new Date(course.start_date).getTime() - new Date().getTime() < 14 * 24 * 60 * 60 * 1000; // 14 days
  
  const hasHighRating = course.rating && course.rating >= 4.5;
  const hasPromo = isPopular || isNew || isUpcoming || isStartingSoon || hasHighRating || isFeatured;
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full flex flex-col overflow-hidden transition-all duration-300",
        "hover:shadow-md border-opacity-50",
        isFeatured && "border-primary/30 bg-primary/5"
      )}>
        {/* Course Image */}
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={course.cover_image_url || "https://placehold.co/800x450?text=Curso"} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          
          {/* Promo badges */}
          {hasPromo && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isPopular && (
                <Badge variant="secondary" className="bg-amber-500/90 text-white border-0 flex gap-1 items-center">
                  <Flame className="h-3 w-3" /> Popular
                </Badge>
              )}
              
              {isNew && (
                <Badge variant="secondary" className="bg-emerald-500/90 text-white border-0">
                  Nuevo
                </Badge>
              )}
              
              {isUpcoming && !isStartingSoon && (
                <Badge variant="secondary" className="bg-blue-500/90 text-white border-0 flex gap-1 items-center">
                  <Calendar className="h-3 w-3" /> Próximamente
                </Badge>
              )}
              
              {isStartingSoon && (
                <Badge variant="secondary" className="bg-purple-500/90 text-white border-0 flex gap-1 items-center">
                  <Calendar className="h-3 w-3" /> Comienza pronto
                </Badge>
              )}
              
              {hasHighRating && (
                <Badge variant="secondary" className="bg-yellow-500/90 text-white border-0 flex gap-1 items-center">
                  <Star className="h-3 w-3 fill-current" /> Destacado
                </Badge>
              )}
            </div>
          )}
          
          {/* Price or Free badge */}
          <div className="absolute top-2 right-2">
            {course.price === 0 ? (
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                Gratis
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-white/90 text-black border-0 font-semibold">
                {course.price}€
              </Badge>
            )}
          </div>
          
          {/* Save bookmark button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute bottom-2 right-2 bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm rounded-full w-8 h-8"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="line-clamp-2 hover:text-primary transition-colors text-lg">
                {course.title}
              </CardTitle>
              <CardDescription className="text-sm mt-1 flex items-center gap-1">
                {course.featured_instructor || (course.instructor && course.instructor.full_name) || "Instructor"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3 mb-4 text-sm">
            {course.description}
          </p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-auto">
            {course.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="font-medium">{course.rating.toFixed(1)}</span>
              </div>
            )}
            
            {course.student_count && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{course.student_count} estudiantes</span>
              </div>
            )}
            
            {course.duration_text && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.duration_text}</span>
              </div>
            )}
          </div>
          
          {(course.level || course.category) && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {course.level && (
                <Badge variant="outline" className="text-xs">
                  {course.level}
                </Badge>
              )}
              
              {course.category && (
                <Badge variant="outline" className="text-xs">
                  {course.category}
                </Badge>
              )}
              
              {course.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {course.start_date && (
            <div className="mt-4 flex items-center gap-2 text-xs border-t pt-3 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Comienza: {formatDate(course.start_date)}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <Link to={`/courses/${course.id}`} className="text-sm text-primary hover:underline">
            Ver detalles
          </Link>
          <Button asChild>
            <Link to={`/courses/${course.id}`}>Inscribirme</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
