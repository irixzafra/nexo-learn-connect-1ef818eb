import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Star, Users, Flame, Award, Bookmark, ChevronRight, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedCourseCardProps {
  course: Course;
  index?: number;
  isPopular?: boolean;
  isNew?: boolean;
  isUpcoming?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
}

export const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({ 
  course, 
  index = 0,
  isPopular = false,
  isNew = false,
  isUpcoming = false,
  isFeatured = false,
  onClick
}) => {
  const isMobile = useIsMobile();
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

  const cardClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };
  
  const randomStudents = Math.floor(Math.random() * 500) + 50;
  const displayStudents = course.student_count || randomStudents;

  // Use slug for the URL if available, otherwise fallback to ID
  const courseUrl = course.slug ? `/cursos/${course.slug}` : `/courses/${course.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
      onClick={cardClickHandler}
    >
      <Card className={cn(
        "h-full flex flex-col overflow-hidden transition-all duration-300 group",
        "hover:shadow-lg border-opacity-60 rounded-xl",
        isFeatured && "border-primary/40 bg-primary/5",
        isPopular && !isFeatured && "border-amber-500/40 bg-amber-500/5",
        isNew && !isFeatured && !isPopular && "border-emerald-500/40 bg-emerald-500/5",
        onClick && "cursor-pointer"
      )}>
        {/* Course Image */}
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={course.cover_image_url || "https://placehold.co/800x450?text=Curso"} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Promo badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[80%]">
            {isPopular && (
              <Badge variant="secondary" className="bg-amber-500 text-white border-0 shadow-md flex gap-1 items-center">
                <Flame className="h-3 w-3" /> Popular
              </Badge>
            )}
            
            {isNew && (
              <Badge variant="secondary" className="bg-emerald-500 text-white border-0 shadow-md">
                Nuevo
              </Badge>
            )}
            
            {isUpcoming && !isStartingSoon && (
              <Badge variant="secondary" className="bg-blue-500 text-white border-0 shadow-md flex gap-1 items-center">
                <Calendar className="h-3 w-3" /> Próximamente
              </Badge>
            )}
            
            {isStartingSoon && (
              <Badge variant="secondary" className="bg-purple-500 text-white border-0 shadow-md flex gap-1 items-center">
                <Calendar className="h-3 w-3" /> Comienza pronto
              </Badge>
            )}
            
            {hasHighRating && (
              <Badge variant="secondary" className="bg-yellow-500 text-white border-0 shadow-md flex gap-1 items-center">
                <Star className="h-3 w-3 fill-current" /> Destacado
              </Badge>
            )}
          </div>
          
          {/* Price badge */}
          <div className="absolute top-3 right-3">
            {course.price === 0 ? (
              <Badge variant="secondary" className="bg-green-500 text-white border-0 shadow-md">
                Gratis
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-white text-black border-0 font-semibold shadow-md">
                {course.price}€
              </Badge>
            )}
          </div>
          
          {/* Save bookmark button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute bottom-3 right-3 bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Bookmark functionality would go here
            }}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          
          {/* Level badge */}
          {course.level && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="outline" className="bg-black/30 text-white backdrop-blur-sm border-white/20">
                {course.level}
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
                <Link to={courseUrl} className="hover:underline">
                  {course.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm mt-1 flex items-center gap-1">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-1">
                    <Award className="h-3 w-3 text-primary" />
                  </div>
                  {course.featured_instructor || (course.instructor && course.instructor.full_name) || "Instructor"}
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="text-muted-foreground line-clamp-2 mb-4 text-sm">
            {course.description}
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-auto">
            {course.rating && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={cn(
                        "h-3.5 w-3.5", 
                        star <= Math.round(course.rating) 
                          ? "text-amber-500 fill-amber-500" 
                          : "text-muted-foreground"
                      )} 
                    />
                  ))}
                </div>
                <span className="font-medium">{course.rating.toFixed(1)}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{displayStudents} estudiantes</span>
            </div>
            
            {course.duration_text && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{course.duration_text}</span>
              </div>
            )}
          </div>
          
          {(course.category || course.tags?.length > 0) && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {course.category && (
                <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20">
                  {course.category}
                </Badge>
              )}
              
              {course.tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {isNew && (
            <div className="mt-4 bg-emerald-500/10 rounded-lg p-2 flex items-center text-xs text-emerald-600">
              <BarChart3 className="h-3.5 w-3.5 mr-1" />
              <span>Alta demanda - Curso nuevo</span>
            </div>
          )}
          
          {isPopular && !isNew && (
            <div className="mt-4 bg-amber-500/10 rounded-lg p-2 flex items-center text-xs text-amber-600">
              <Flame className="h-3.5 w-3.5 mr-1" />
              <span>Popular - {Math.floor(Math.random() * 50) + 10} inscritos esta semana</span>
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
          <Link to={courseUrl} className="text-sm text-primary hover:underline flex items-center">
            Ver detalles
            <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Link>
          <Button size="sm" className="shadow-sm" asChild>
            <Link to={courseUrl}>Inscribirme</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EnhancedCourseCard;
