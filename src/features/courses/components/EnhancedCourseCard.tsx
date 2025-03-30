
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Course } from '@/types/course';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  CourseCardImage,
  CourseCardHeader,
  CourseCardStats,
  CourseCardTags,
  CourseCardPromoInfo,
  CourseCardSchedule,
  CourseCardFooter,
  isStartingSoon,
  hasHighRating
} from './course-card';

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
  const isCourseSoon = isStartingSoon(course.start_date);
  const courseHasHighRating = hasHighRating(course.rating);
  const hasPromo = isPopular || isNew || isUpcoming || isCourseSoon || courseHasHighRating || isFeatured;
  
  const randomStudents = Math.floor(Math.random() * 500) + 50;
  const displayStudents = course.student_count || randomStudents;

  // Use slug for the URL if available, otherwise fallback to ID
  const courseUrl = course.slug ? `/cursos/${course.slug}` : `/courses/${course.id}`;

  const cardClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

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
        {/* Course Image with Badges */}
        <CourseCardImage 
          course={course}
          isPopular={isPopular}
          isNew={isNew}
          isUpcoming={isUpcoming}
          isStartingSoon={isCourseSoon}
          hasHighRating={courseHasHighRating}
        />
        
        <CardHeader className="pb-2">
          <CourseCardHeader course={course} courseUrl={courseUrl} />
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="text-muted-foreground line-clamp-2 mb-4 text-sm">
            {course.description}
          </div>
          
          <CourseCardStats 
            rating={course.rating} 
            studentCount={displayStudents} 
            durationText={course.duration_text} 
          />
          
          <CourseCardTags category={course.category} tags={course.tags} />
          
          <CourseCardPromoInfo isNew={isNew} isPopular={isPopular} />
          
          <CourseCardSchedule startDate={course.start_date} />
        </CardContent>
        
        <CourseCardFooter courseUrl={courseUrl} />
      </Card>
    </motion.div>
  );
};

export default EnhancedCourseCard;
