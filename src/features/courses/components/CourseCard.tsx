
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Course } from '@/types/course';
import { Star, Clock, UserIcon, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, showProgress = false }) => {
  const {
    id,
    title,
    description,
    price,
    original_price,
    instructor,
    level,
    rating,
    created_at,
    student_count,
    badge,
    discount_percentage,
    cover_image_url,
    slug
  } = course;

  // Format price with Euro symbol and decimals
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  // Get instructor initials for avatar fallback
  const getInstructorInitials = () => {
    if (!instructor?.full_name) return 'IN';
    return instructor.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Get level badge color
  const getLevelColor = () => {
    switch (level?.toLowerCase()) {
      case 'beginner':
      case 'principiante':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'intermediate':
      case 'intermedio':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'advanced':
      case 'avanzado':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Get URL for course detail page using slug or id
  const getDetailUrl = () => {
    return slug ? `/courses/${slug}` : `/courses/${id}`;
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <Link to={getDetailUrl()}>
        <div className="relative h-48 overflow-hidden">
          {badge && (
            <div className="absolute top-2 left-0 z-10">
              <Badge variant="secondary" className="bg-primary text-primary-foreground px-3 py-1 rounded-l-none">
                {badge}
              </Badge>
            </div>
          )}
          
          {discount_percentage && discount_percentage > 0 && (
            <div className="absolute top-2 right-2 z-10">
              <Badge variant="destructive" className="rounded-full px-2 py-0.5">
                -{discount_percentage}%
              </Badge>
            </div>
          )}
          
          <img
            src={cover_image_url || '/placeholder-course.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <Link to={getDetailUrl()} className="text-lg font-semibold leading-snug hover:text-primary transition-colors line-clamp-2">
            {title}
          </Link>
          
          {rating && (
            <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="h-3.5 w-3.5 text-amber-500 mr-1 fill-amber-500" />
              <span className="text-sm font-medium text-amber-700">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {level && (
            <Badge variant="outline" className={getLevelColor()}>
              {level}
            </Badge>
          )}
          
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            <Clock className="h-3 w-3 mr-1" />
            {course.duration_text || 'Autoaprendizaje'}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Avatar className="h-5 w-5 mr-1">
                  <AvatarImage src={instructor?.avatar_url} alt={instructor?.full_name} />
                  <AvatarFallback className="text-[10px]">{getInstructorInitials()}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {instructor?.full_name || 'Instructor'}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Instructor: {instructor?.full_name}</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="text-xs text-muted-foreground flex items-center">
            <UserIcon className="h-3 w-3 mr-1" />
            {student_count || 0} estudiantes
          </div>
          
          <div className="text-xs text-muted-foreground flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(created_at), { addSuffix: true, locale: es })}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-end gap-2">
          {original_price && original_price > price ? (
            <>
              <span className="text-lg font-bold">{formatPrice(price)}</span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(original_price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">
              {price === 0 ? 'Gratis' : formatPrice(price)}
            </span>
          )}
        </div>
        
        {showProgress && (
          <div className="w-24">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary rounded-full"
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right mt-1">
              {course.progress || 0}% completado
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
