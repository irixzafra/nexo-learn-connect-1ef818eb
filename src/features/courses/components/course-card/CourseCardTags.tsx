
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CourseCardTagsProps {
  category?: string;
  tags?: string[];
}

export const CourseCardTags: React.FC<CourseCardTagsProps> = ({ category, tags = [] }) => {
  if (!category && (!tags || tags.length === 0)) {
    return null;
  }
  
  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {category && (
        <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20">
          {category}
        </Badge>
      )}
      
      {tags?.slice(0, 2).map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
};
