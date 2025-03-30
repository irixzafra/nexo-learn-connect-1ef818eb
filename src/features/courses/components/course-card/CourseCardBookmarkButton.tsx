
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';

export const CourseCardBookmarkButton: React.FC = () => {
  return (
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
  );
};
