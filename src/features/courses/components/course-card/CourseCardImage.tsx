
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, Calendar, Flame, Star } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseCardImageProps {
  course: Course;
  isPopular?: boolean;
  isNew?: boolean;
  isUpcoming?: boolean;
  isStartingSoon?: boolean;
  hasHighRating?: boolean;
}

export const CourseCardImage: React.FC<CourseCardImageProps> = ({
  course,
  isPopular = false,
  isNew = false,
  isUpcoming = false,
  isStartingSoon = false,
  hasHighRating = false,
}) => {
  return (
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
  );
};
