
import React from 'react';
import { Course } from '@/types/course';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarIcon, Users, Clock } from 'lucide-react';

export interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Default placeholder values for any missing properties
  const {
    title = 'Título del curso',
    category = 'Categoría',
    instructor = 'Instructor',
    rating = 0,
    student_count = 0,
    duration_hours = 0,
    thumbnail = '/placeholder.svg',
    tags = []
  } = course;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer h-full">
      <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="space-y-1">
            <h3 className="font-medium line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{instructor}</p>
          </div>
          
          <div className="flex items-center text-sm">
            {rating > 0 && (
              <div className="flex items-center mr-3">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            
            {student_count > 0 && (
              <div className="flex items-center mr-3">
                <Users className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{student_count}</span>
              </div>
            )}
            
            {duration_hours > 0 && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{duration_hours}h</span>
              </div>
            )}
          </div>
          
          {(category || tags.length > 0) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
              
              {tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              
              {tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
