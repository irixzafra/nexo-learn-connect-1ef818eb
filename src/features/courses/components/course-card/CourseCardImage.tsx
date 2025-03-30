
import React from 'react';
import { Course } from '@/types/course';
import { CourseCardPromoBadges } from './CourseCardPromoBadges';
import { CourseCardPriceBadge } from './CourseCardPriceBadge';
import { CourseCardBookmarkButton } from './CourseCardBookmarkButton';
import { CourseCardLevelBadge } from './CourseCardLevelBadge';

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
      
      {/* Promotional badges */}
      <CourseCardPromoBadges 
        isPopular={isPopular}
        isNew={isNew}
        isUpcoming={isUpcoming}
        isStartingSoon={isStartingSoon}
        hasHighRating={hasHighRating}
      />
      
      {/* Price badge */}
      <CourseCardPriceBadge price={course.price} />
      
      {/* Save bookmark button */}
      <CourseCardBookmarkButton />
      
      {/* Level badge */}
      <CourseCardLevelBadge level={course.level} />
    </div>
  );
};
